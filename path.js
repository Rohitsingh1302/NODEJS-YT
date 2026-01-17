import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("File name:", path.basename(__filename));
console.log("Directory name:", path.dirname(__filename));
console.log("Extension:", path.extname(__filename));
