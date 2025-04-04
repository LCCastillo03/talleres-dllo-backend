const { readUsersFile, writeUsersFile } = require("../services/dataService");

async function createUser(newUser) {
    const users = await readUsersFile();

    if (users.some(user => user.codigo === newUser.codigo)) {
        throw new Error("Ya existe un usuario con ese código");
    }

    users.push(newUser);
    await writeUsersFile(users);

    return newUser;
}

module.exports = createUser;
