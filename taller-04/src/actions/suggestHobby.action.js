const { readUsersFile, writeUsersFile } = require("../services/dataService");

async function suggestHobby(codigo, hobby) {
    const users = await readUsersFile();
    const userIndex = users.findIndex(user => user.codigo === codigo);

    if (userIndex === -1) throw new Error("Usuario no encontrado");

    if (!Array.isArray(users[userIndex].hobbies)) {
        users[userIndex].hobbies = [];
    }

    if (users[userIndex].hobbies.length >= 3) {
        return { message: `El usuario ${users[userIndex].nombre} ${users[userIndex].apellido} ya tiene 3 hobbies` };
    }

    users[userIndex].hobbies.push(hobby);
    await writeUsersFile(users);

    return { message: `Hobby agregado a ${users[userIndex].nombre} ${users[userIndex].apellido}.`, usuario: users[userIndex] };
}

module.exports = suggestHobby;
