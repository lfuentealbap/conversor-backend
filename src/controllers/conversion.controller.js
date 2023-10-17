const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Registra una conversion y lo almacena en la base de datos
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
  }finally{
    await prisma.$disconnect();
  }
};

//Obtiene el historial de conversiones almacenadas en la base de datos, incluiendole el nombre del usuario
const historialConversiones = async (req, res) => {
  try {
    const historial = await prisma.historialConversion.findMany({
      orderBy: { fechaHoraActividad: "desc" }, // Ordenar por fecha de actividad descendente
      include: {
        usuario: {
          select: { nombre: true },
        },
      }
    });

    res.json(historial);
  } catch (error) {
    console.error("Error al obtener el historial de conversiones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }finally{
    await prisma.$disconnect();
  }
};

module.exports = { guardarConversion, historialConversiones };
