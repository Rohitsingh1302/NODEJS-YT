const fs = require('fs');

let rs = fs.createReadStream('question.txt', 'utf8');
let ws = fs.createWriteStream('question.txt','utf8');//it 
ws.write('hello world\n');
ws.write('hold\n');
let data='';
rs.on('open', (fd) => {
  console.log('File opened with file descriptor:', fd);
});

rs.on('data', (chunk) => {
  data+=chunk;
  console.log('Received chunk:', data);
});

rs.on('end', () => {
  console.log('Finished reading file.');
});

rs.on('error', (err) => {
  console.error('Error:', err);
});

