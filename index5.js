const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 9100;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employees_db';

// Mongoose model
const employeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	salary: { type: Number, required: true },
	department: { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

// Connect to Mongo
const connectDb = async () => {
	await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
	console.log('MongoDB connected');
};

// Parse CSV text to objects
const parseCsv = (csvText) => {
	const lines = csvText.split(/\r?\n/).filter(Boolean);
	if (lines.length === 0) return [];

	const headers = lines.shift().split(',').map(h => h.trim().toLowerCase());
	const rows = [];

	for (const line of lines) {
		const cols = line.split(',').map(c => c.trim());
		const row = {};
		headers.forEach((h, idx) => {
			row[h] = cols[idx];
		});
		rows.push(row);
	}

	return rows;
};

// Basic validation: required fields present and salary numeric
const validateEmployees = (rawRows) => {
	const errors = [];
	const valid = [];

	rawRows.forEach((row, index) => {
		const name = row.name || row.fullname;
		const email = row.email;
		const salary = Number(row.salary);
		const department = row.department || 'Unknown';

		if (!name || !email || Number.isNaN(salary)) {
			errors.push({ index, reason: 'Missing required field or invalid salary', row });
			return;
		}

		valid.push({ name, email, salary, department });
	});

	return { valid, errors };
};

// Load CSV and insert into Mongo
const loadCsvAndInsert = async () => {
	const csvPath = path.join(__dirname, 'employees.csv');
	if (!fs.existsSync(csvPath)) {
		throw new Error('employees.csv not found');
	}

	const text = fs.readFileSync(csvPath, 'utf8');
	const rows = parseCsv(text);
	const { valid, errors } = validateEmployees(rows);

	if (errors.length) {
		console.warn('Skipped rows due to validation errors:', errors);
	}

	if (!valid.length) {
		throw new Error('No valid rows to insert');
	}

	// Upsert by email to avoid duplicates on repeated runs
	const bulk = Employee.collection.initializeUnorderedBulkOp();
	valid.forEach(emp => {
		bulk.find({ email: emp.email }).upsert().updateOne({ $set: emp });
	});
	const result = await bulk.execute();
	console.log(`Inserted/updated ${result.nUpserted + result.nModified} employees`);

	return { inserted: result.nUpserted, modified: result.nModified, skipped: errors.length };
};

// Endpoint to trigger CSV ingest
app.post('/ingest', async (_req, res) => {
	try {
		const summary = await loadCsvAndInsert();
		res.json({ status: 'ok', ...summary });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

// Query salaries > 50k, sorted desc, return simple HTML table
app.get('/employees/high-salary', async (_req, res) => {
	try {
		const employees = await Employee.find({ salary: { $gt: 50000 } })
			.sort({ salary: -1 })
			.select('name salary')
			.lean();

		const rows = employees.map(emp => `<tr><td>${emp.name}</td><td>${emp.salary.toLocaleString()}</td></tr>`).join('');
		const html = `
			<h1>Employees with salary > $50,000</h1>
			<table border="1" cellpadding="6" cellspacing="0">
				<thead><tr><th>Name</th><th>Salary</th></tr></thead>
				<tbody>${rows || '<tr><td colspan="2">No matches</td></tr>'}</tbody>
			</table>
		`;
		res.send(html);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch employees' });
	}
});

// Start
(async () => {
	try {
		await connectDb();
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Startup failed:', err.message);
		process.exit(1);
	}
})();
