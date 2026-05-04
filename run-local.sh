#!/bin/bash
trap "kill 0" EXIT

ARQUIVO_ENV=".env"

if [ -f "$ARQUIVO_ENV" ]; then
    echo "Carregando variáveis de $ARQUIVO_ENV..."
    set -a
    source "$ARQUIVO_ENV"
    set +a
else
    echo "Aviso: Arquivo $ARQUIVO_ENV não encontrado!"
fi

cd backend/controle-cfc

./mvnw spring-boot:run -Dspring-boot.run.profiles=dev &

cd ../../frontend

npm run dev