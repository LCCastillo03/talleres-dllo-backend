const fs = require("fs").promises;
const path = require("path");

const filePath = path.resolve(__dirname, "../../24-taller-04-datos.json");

async function readUsersFile() {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        throw new Error("Error al leer el archivo JSON");
    }
}

async function writeUsersFile(users) {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        throw new Error("Error al escribir en el archivo JSON");
    }
}

module.exports = { readUsersFile, writeUsersFile };
