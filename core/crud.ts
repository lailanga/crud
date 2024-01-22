import fs from "fs"; //ES6

// const fs = require("fs");
const DB_FILE_PATH = "./core/db"

console.log("[CRUD]");

function create(content: string) {
    fs.writeFileSync(DB_FILE_PATH, content)
    return content;
}


// [SIMULATION]
console.log(create("Hoje é domingo"));

