 const fs=require('fs'); // fs module ko require kiya jisme file system se related functions hote hain.

 fs.writeFileSync("./VID5/output.txt","Hello World"); // bnadi output.txt file and likhdiya "Hello World" in it.
 fs.appendFileSync("./VID5/output.txt","\nWelcome to Node.js"); // appendFileSync function use karke "Welcome to Node.js"  ko new line m add krdiya.
 const data=fs.readFileSync("./VID5/output.txt","utf-8"); // readFileSync function use karke output.txt file da content read kiya and "utf-8" encoding specify kitti.
 console.log(data); // console.log karke file da content display kitta.{READ}
// fs.unlinkSync("./VID5/output.txt"); //is fnxn ki help se file delete krdiya. {DELETE}
