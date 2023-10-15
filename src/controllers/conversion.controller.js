const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const guardarConversion = async (req, res) => {
  const {
    usuario,
    montoOrigen,
    fechaConversion,
    valorMoneda,
    montoConversion,
  } = req.body;

  try {
    //Envía los datos a la base de datos a través de prisma
    const conversion = await prisma.historialConversion.create({
      data: {
        usuarioId: usuario,
        montoOrigen,
        fechaConversion: new Date(fechaConversion).toISOString(),
        valorMoneda,
        montoConversion,
        fechaHoraActividad: new Date(),
      },
    });

    res.json(conversion);
  } catch (error) {
    console.error("Error al guardar la conversión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const historialConversiones = async (req, res) => {
  try {
    const historial = await prisma.historialConversion.findMany({
      orderBy: { fechaHoraActividad: "desc" }, // Ordenar por fecha de actividad descendente
    });

    res.json(historial);
  } catch (error) {
    console.error("Error al obtener el historial de conversiones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { guardarConversion, historialConversiones };
