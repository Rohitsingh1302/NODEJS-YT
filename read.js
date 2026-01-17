const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }
  console.log("File content:", data);
});
