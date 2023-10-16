const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require("../utils/jwt");

//Registrar usuario nuevo
const registarUsuario = async (req, res) => {
  const { nombre, rol, username, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const usuario = await prisma.usuario.create({
      data: { nombre, rol, username, password: hashedPassword },
    });

    res.json(usuario);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Iniciar sesión y retornar token
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { username },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const passwordMatch = await comparePasswords(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = generateToken({
      userId: usuario.id,
      username: usuario.username,
      role: usuario.rol,
    });

    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { registarUsuario, login };
