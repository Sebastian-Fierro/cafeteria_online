FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

CMD ["./wait-for-db.sh"]

