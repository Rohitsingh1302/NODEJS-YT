const fs = require("fs");

fs.appendFile("log.txt", "\nNew log added", (err) => {
  if (err) {
    console.log("Error");
    return;
  }
  console.log("Data appended");
});
