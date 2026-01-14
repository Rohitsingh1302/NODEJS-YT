const fs = require("fs");

// Write file
fs.writeFileSync("test.txt", "Hello Node.js");

// Read file
const data = fs.readFileSync("test.txt", "utf8");
console.log(data);

// Delete file
fs.unlinkSync("test.txt");
