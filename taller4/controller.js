const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "24-taller-04-datos.json");

const readUsersFile = (callback, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo JSON" });
        }

        try {
            const users = JSON.parse(data);
            callback(users, res); 
        } catch (parseError) {
            return res.status(500).json({ error: "Error al parsear el JSON" });
        }
    });
};


const getUsersByHobby = (req, res) => {
    const hobby = req.query.hobby;
    if (!hobby) {
        return res.status(400).json({ error: "Debes enviar un hobby" });
    }

    readUsersFile(users => {
        const filteredUsers = users
            .filter(user => user.hobbies.includes(hobby))
            .map(user => ({ nombre: `${user.nombre} ${user.apellido}`, hobbies: user.hobbies }));
        res.json(filteredUsers);
    }, res);
};


const getUsersExists = (req, res) => {
    const codigo = req.query.codigo;
    if (!codigo) {
        return res.status(400).json({ error: "Debes enviar un código" });
    }

    readUsersFile(users => {
        const user = users.find(user => user.codigo === codigo);
        
        if (user) {
            res.json({ message: `Usuario ${user.nombre} ${user.apellido} existe` });
        } else {
            res.json({ message: "Usuario no encontrado" });
        }
    }, res);
};

const getUsersHobbyCount = (req, res) => {
    const hobby = req.query.hobby;
    if (!hobby) {
        return res.status(400).json({ error: "Debes enviar un hobby" });
    }

    readUsersFile(users => {
        const count = users.filter(user => user.hobbies.includes(hobby)).length;
        res.json({ hobby, cantidad: count });
    }, res);
};


const getIsFree = (res) => {
    readUsersFile((users, res) => {  
        const freeUsers = users.filter(user => user.hobbies.length < 3).map(user => ({ nombre: `${user.nombre} ${user.apellido}`, hobbies: user.hobbies }));
        res.json(freeUsers);
    }, res);
};



const suggestHobby = (req, res) => {
    const { codigo, hobby } = req.body;

    if (!codigo || !hobby) {
        return res.status(400).json({ error: "Debes enviar un código y un hobby." });
    }

    readUsersFile((users, res) => {
        const userIndex = users.findIndex(user => user.codigo === codigo);

        if (userIndex === -1) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }

        const user = users[userIndex];

        if (!Array.isArray(user.hobbies)) {
            user.hobbies = [];
        }

        if (user.hobbies.length >= 3) {
            return res.json({ 
                message: `El usuario ${user.nombre} ${user.apellido} ya tiene 3 hobbies, no se puede agregar más.` 
            });
        }

        user.hobbies.push(hobby);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error al actualizar el archivo JSON." });
            }
            res.json({ message: `Hobby agregado a ${user.nombre} ${user.apellido}.`, usuario: user });
        });
    }, res);
};


const createUser = (req, res) => {
    const { codigo, nombre, apellido, hobbies } = req.body;
    
    // Validación de datos
    if (!codigo || !nombre || !apellido || !hobbies) {
        return res.status(400).json({ error: "Todos los campos son obligatorios: codigo, nombre, apellido y hobbies" });
    }
    
    // Validar que hobbies sea un array con al menos 2 elementos
    if (!Array.isArray(hobbies) || hobbies.length < 2) {
        return res.status(400).json({ error: "Debe incluir al menos dos hobbies" });
    }
    
    readUsersFile((users) => {
        // Verificar si el código ya existe
        if (users.some(user => user.codigo === codigo)) {
            return res.status(409).json({ error: "Ya existe un usuario con ese código" });
        }
        
        // Crear el nuevo usuario
        const newUser = {
            codigo,
            nombre,
            apellido,
            hobbies
        };
        
        // Agregar el usuario al array
        users.push(newUser);
        
        // Guardar en el archivo
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error al actualizar el archivo JSON." });
            }
            res.status(201).json({ 
                message: "Usuario registrado exitosamente", 
                usuario: newUser 
            });
        });
    }, res);
};


module.exports = { getUsersByHobby, getUsersExists, getUsersHobbyCount, getIsFree, suggestHobby, createUser };
