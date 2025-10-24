#!/bin/bash

# Script de deployment para Hypernetics Landing a S3
# Autor: Hypernetics Team
# Uso: ./deploy.sh

set -e  # Detener en caso de error

# Configuración
BUCKET_NAME="hypernetics.com.mx"
AWS_PROFILE="corezip10"
BUILD_DIR="out"
CLOUDFRONT_DISTRIBUTION_ID="EF8SMKPQVYZ66"

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando deployment de Hypernetics Landing...${NC}"
echo ""

# Verificar que existe el directorio out
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Error: No existe la carpeta '$BUILD_DIR'${NC}"
    echo -e "${YELLOW}💡 Ejecuta 'npm run build' primero${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Carpeta de build encontrada"

# Verificar que AWS CLI está instalado
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ Error: AWS CLI no está instalado${NC}"
    echo -e "${YELLOW}💡 Instala AWS CLI: https://aws.amazon.com/cli/${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} AWS CLI instalado"

# Verificar que el profile existe
if ! aws configure list --profile $AWS_PROFILE &> /dev/null; then
    echo -e "${RED}❌ Error: Profile AWS '$AWS_PROFILE' no encontrado${NC}"
    echo -e "${YELLOW}💡 Configura el profile con: aws configure --profile $AWS_PROFILE${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Profile AWS '$AWS_PROFILE' configurado"
echo ""

# Preguntar confirmación
echo -e "${YELLOW}📦 Bucket destino:${NC} s3://$BUCKET_NAME"
echo -e "${YELLOW}📂 Directorio:${NC} $BUILD_DIR/"
echo ""
read -p "¿Continuar con el deployment? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Deployment cancelado${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}📤 Sincronizando archivos con S3...${NC}"
echo ""

# Sync con S3 - Archivos estáticos con cache largo
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME \
  --profile $AWS_PROFILE \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "*.html" \
  --exclude "*.txt" \
  --exclude "*.xml"

# Sync HTML/TXT/XML con cache corto (para que los cambios se reflejen rápido)
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME \
  --profile $AWS_PROFILE \
  --exclude "*" \
  --include "*.html" \
  --include "*.txt" \
  --include "*.xml" \
  --cache-control "public,max-age=0,must-revalidate"

echo ""
echo -e "${GREEN}✅ Archivos sincronizados exitosamente!${NC}"
echo ""

# Invalidar cache de CloudFront
echo -e "${YELLOW}🔄 Invalidando cache de CloudFront...${NC}"
echo ""

INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*" \
  --profile $AWS_PROFILE 2>&1)

if [ $? -eq 0 ]; then
    INVALIDATION_ID=$(echo $INVALIDATION_OUTPUT | grep -o '"Id": "[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Invalidación de CloudFront creada exitosamente!${NC}"
    echo -e "${YELLOW}📋 Invalidation ID:${NC} $INVALIDATION_ID"
    echo ""
    echo -e "${YELLOW}💡 Tip:${NC} Puedes verificar el estado con:"
    echo -e "   aws cloudfront get-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --id $INVALIDATION_ID --profile $AWS_PROFILE"
else
    echo -e "${RED}❌ Error al invalidar CloudFront${NC}"
    echo -e "${YELLOW}💡 Puedes intentar manualmente:${NC}"
    echo -e "   aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*' --profile $AWS_PROFILE"
fi

echo ""
echo -e "${GREEN}✅ Deployment completado exitosamente!${NC}"
echo ""
echo -e "${YELLOW}🌐 URL:${NC} https://$BUCKET_NAME"
echo -e "${YELLOW}⏱️  Tiempo de propagación:${NC} ~1-3 minutos"
echo ""
