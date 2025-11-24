import bcrypt from "bcrypt";

const password = "luki ganteng";
const hash = await bcrypt.hash(password, 10);
console.log("Hash:", hash);
