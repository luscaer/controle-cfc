# ==========================================
# ESTÁGIO 1: COMPILAÇÃO (BUILD)
# ==========================================
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# ==========================================
# ESTÁGIO 2: Execução (Run)
# ==========================================
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]