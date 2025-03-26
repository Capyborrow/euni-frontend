FROM mcr.microsoft.com/devcontainers/typescript-node
WORKDIR /src
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 5174
CMD ["npm", "run", "dev"]