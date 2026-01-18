FROM node:20-slim

WORKDIR /app

# Install system dependencies (needed for Prisma and Baileys sometimes)
RUN apt-get update && apt-get install -y openssl

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3002

CMD ["npm", "start"]
