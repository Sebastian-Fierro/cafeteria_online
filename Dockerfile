# Usa una imagen base oficial de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del backend
COPY . .

# Expone el puerto en el que corre tu app
EXPOSE 4200

# Comando para ejecutar la aplicación
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]