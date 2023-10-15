# Proyecto de Conversión Backend

Este es un proyecto de ejemplo que demuestra una aplicación que guarda registros de conversión de moneda UF a CLP implementada con Node.js, Express, Prisma, y PostgreSQL.

## Requisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).

Además, necesitarás configurar una base de datos PostgreSQL y actualizar las variables de entorno en el archivo `.env` con la información de conexión correcta.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/lfuentealbap/conversor-backend.git
   cd conversor-backend
2. Instala las dependencias
   ```bash
   npm install

3. Configurar las variables de entorno, creando un archivo .env en la raíz del proyecto
   El archivo contiene la siguiente estructura:
   
    DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos
    SECRETO=mi_clave_secreta
    PORT=nro_puerto_backend

5. Teniendo todo esto listo, ahora hay que crear las tablas de base de datos del proyecto, por esto que prisma nos facilita esta tarea con el siguiente comando:
   ```bash
   npx prisma migrate dev --name init

6. Finalmente, para ejecutar el proyecto, se debe ejecutar el siguiente comando:
   ```bash
   npm start

##Uso
La aplicación proporciona endpoints para registrar usuarios, loguearse, realizar conversiones y obtener el historial de conversiones.

###Endpoints
POST /api/register: Registra un nuevo usuario.
POST /api/login: Inicia sesión y devuelve un token JWT.
POST /api/conversion: Guarda la conversión realizada en el historial.
GET /api/historial: Obtiene el historial de conversiones.

  
