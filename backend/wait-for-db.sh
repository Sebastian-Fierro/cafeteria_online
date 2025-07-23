#!/bin/sh

echo "⏳ Esperando que MySQL esté disponible en db:3306..."

# Esperar hasta que el puerto 3306 de db esté abierto
while ! nc -z db 3306; do
  sleep 1
done

echo "Base de datos disponible. Continuando..."

# Generar cliente Prisma
npx prisma generate

# Aplicar cambios del schema a la DB
npx prisma db push

# (Opcional) Ejecutar script de seed si lo tienes
node prisma/seed.js

# Iniciar el servidor
npm run start
