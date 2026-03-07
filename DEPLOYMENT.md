# Guía de Despliegue en Servidor

## Requisitos para Hosting

### 1. **Requisitos de Hardware**

Para una librería pequeña a mediana:

- **CPU**: 2 cores mínimo (4 recomendado)
- **RAM**: 2GB mínimo (4GB recomendado)
- **Almacenamiento**: 20GB mínimo SSD
- **Ancho de banda**: 1Mbps mínimo

### 2. **Requisitos de Software**

```bash
# Sistema Operativo
- Ubuntu 20.04 LTS o superior
- CentOS 8+
- Debian 11+
- Ubuntu en WSL2 (para Windows)

# Herramientas necesarias
- Docker 20.10+
- Docker Compose 2.0+
- Git
- Certificados SSL (Let's Encrypt gratuito)
```

### 3. **Dependencias del Sistema**

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
  docker.io \
  docker-compose-plugin \
  git \
  curl \
  wget \
  nano

# Habilitar Docker sin sudo
sudo usermod -aG docker $USER
newgrp docker
```

## Pasos de Despliegue

### 1. **Preparación del Servidor**

```bash
# Clonar el repositorio
git clone <your-repo> /home/app/library-system
cd /home/app/library-system

# Crear archivo .env con valores de producción
cp .env.example .env
nano .env
```

**Valores recomendados para `.env` en producción:**

```env
NODE_ENV=production
JWT_SECRET=<generar-valor-seguro-aleatorio-32-caracteres>
VITE_API_BASE_URL=https://api.tudominio.com
API_PORT=3000
WEB_PORT=4173
```

### 2. **Generar JWT_SECRET Seguro**

```bash
# Opción 1: Usar OpenSSL
openssl rand -base64 32

# Opción 2: Usar Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. **Configurar SSL/TLS**

Para producción, es crítico usar HTTPS:

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtener certificado (Let's Encrypt es gratuito)
sudo certbot certonly -d api.tudominio.com -d web.tudominio.com
```

Certificados estarán en: `/etc/letsencrypt/live/`

### 4. **Configurar Nginx como Reverse Proxy**

Crear `/etc/nginx/sites-available/library-system`:

```nginx
# API
upstream api {
    server api:3000;
}

# Web
upstream web {
    server web:4173;
}

server {
    listen 80;
    server_name api.tudominio.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    # Configuraciones SSL recomendadas
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    proxy_read_timeout 300;
    proxy_connect_timeout 300;
    proxy_send_timeout 300;

    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

server {
    listen 80;
    server_name web.tudominio.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name web.tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
```

Habilitar el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/library-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. **Iniciar los Contenedores**

```bash
# Hacer build (opcional, docker-compose lo hace automáticamente)
docker-compose build

# Iniciar servicios
docker-compose up -d

# Verificar estado
docker-compose ps

# Ver logs
docker-compose logs -f api
docker-compose logs -f web
```

### 6. **Renovación Automática de Certificados SSL**

```bash
# Crear script de renovación
sudo nano /usr/local/bin/renew-certs.sh
```

```bash
#!/bin/bash
certbot renew --quiet
systemctl reload nginx
```

```bash
sudo chmod +x /usr/local/bin/renew-certs.sh

# Agregar a crontab (ejecutar diariamente)
sudo crontab -e
# Agregar: 0 2 * * * /usr/local/bin/renew-certs.sh
```

## Características Críticas para Producción

### 1. **Seguridad**

- ✅ **CORS**: Configurar correctamente los orígenes permitidos
- ✅ **Rate Limiting**: Implementado en Express
- ✅ **JWT**: Token expiramientos configurados
- ✅ **HTTPS**: Obligatorio con certificados SSL
- ✅ **Headers de Seguridad**: Agregar middleware de seguridad

```bash
# Instalar helmet para Express
yarn workspace api add helmet
```

En API:

```typescript
import helmet from "helmet";
app.use(helmet());
```

### 2. **Monitoreo y Logging**

```bash
# Ver logs de Docker
docker-compose logs -f

# Con timestamp
docker-compose logs -f --timestamps

# Solo servicio específico
docker-compose logs -f api
```

Instalar ELK Stack (Elasticsearch, Logstash, Kibana) para logging centralizado en producción.

### 3. **Backups**

```bash
# Backup automático de la BD SQLite (diariamente)
0 2 * * * cd /home/app/library-system && \
  docker exec library-api tar czf - /app/apps/api/data | \
  gzip > /backups/library-$(date +\%Y\%m\%d).tar.gz

# Mantener solo últimos 7 días
find /backups -name "library-*.tar.gz" -mtime +7 -delete
```

### 4. **Health Checks y Restart Policies**

Ya están configurados en `docker-compose.yml`:

- Restart automático si un contenedor falla
- Health checks cada 30 segundos
- Los servicios web dependen de que API esté saludable

### 5. **Actualización de Código**

```bash
# Pull de cambios
git pull origin main

# Rebuild de imágenes
docker-compose down
docker-compose build --no-cache

# Reiniciar servicios
docker-compose up -d

# Verificar logs para errores
docker-compose logs -f
```

## Alternativas de Hosting

### Cloud Providers

1. **AWS ECS/Fargate**
   - Autopilot con contenedores
   - RDS para base de datos
   - CloudFront para CDN

2. **Google Cloud Run**
   - Pago por uso
   - Escala automática
   - Integración con Cloud SQL

3. **Azure Container Instances**
   - Contenedores simples
   - Azure SQL para BD
   - AppService para hosting

4. **DigitalOcean App Platform**
   - Más económico
   - Documentación clara
   - Buena para pequeños proyectos

5. **Heroku** (Deprecado, pero alternativas)
   - Railway
   - Render.com
   - Fly.io

### VPS (Virtual Private Server)

- DigitalOcean Droplet
- Linode
- Vultr
- Hetzner Cloud

## Monitoreo y Mantenimiento

```bash
# Ver uso de recursos
docker stats

# Limpiar imágenes no usadas
docker image prune -a

# Limpiar volúmenes no usados
docker volume prune

# Actualizar imágenes
docker-compose pull
docker-compose up -d
```

## Troubleshooting

### El API no responde

```bash
# Verificar si está corriendo
docker-compose ps

# Ver logs
docker-compose logs api | tail -100

# Reiniciar
docker-compose restart api
```

### Problemas de conexión entre contenedores

```bash
# Verificar que están en la misma red
docker network ls
docker network inspect library-network

# Probar conectividad
docker-compose exec web curl http://api:3000/health
```

### Certificado SSL expirado

```bash
# Renovar certificado
sudo certbot renew --force-renewal

# Reload nginx
sudo systemctl reload nginx
```

## Performance

### Caching

- Nginx cachea respuestas estáticas
- React SPA cachea en el navegador
- Implementar Redis para sesiones en producción

### CDN

- CloudFlare (gratuito) para cachear assets estáticos
- Mejorar velocidad de entrega global

### Escalabilidad

Para muchos usuarios, considerar:

- Load balancing con múltiples instancias de API
- Database replication
- Separar read/write queries

## Conclusión

El sistema está listo para producción con Docker y Nginx. Los puntos clave son:

1. SSL/HTTPS obligatorio
2. Backups automáticos
3. Monitoreo constante
4. Updates de seguridad
5. Logs centralizados
