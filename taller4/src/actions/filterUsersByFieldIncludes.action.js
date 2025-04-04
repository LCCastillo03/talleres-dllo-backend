const { readUsersFile } = require("../services/dataService");

async function filterUsersByFieldIncludes(field, value) {
    const users = await readUsersFile();
    return users
        .filter(user => Array.isArray(user[field]) && user[field].includes(value))
        .map(user => ({ nombre: `${user.nombre} ${user.apellido}`, hobbies: user.hobbies }));
}

module.exports = filterUsersByFieldIncludes;
