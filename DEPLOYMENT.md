# Guía de Deployment - Hypernetics Landing

## Opción 1: S3 + CloudFront (Actual)

### Ventajas
- Costo bajo (~$1-5/mes)
- CDN global con CloudFront
- SSL gratuito con ACM

### Desventajas
- Solo contenido estático
- Sin API Routes, SSR, ISR
- Sin optimización de imágenes

### Deployment
```bash
npm run build
./deploy.sh
```

---

## Opción 2: Vercel (Recomendado)

### Ventajas
- Optimizado para Next.js
- Zero-config deployment
- Edge network global
- SSL automático
- Preview deployments
- Dominio personalizado incluido
- **Gratis para proyectos como este**
- **Compatible con GitLab**
- **No afecta SES ni correos**

### Setup inicial (GitLab + Route53 + SES)

#### 1. Crear cuenta en Vercel
- Visita: https://vercel.com
- Click en "Sign Up"
- Selecciona "Continue with GitLab"
- Autoriza acceso a tus repos

#### 2. Importar proyecto desde GitLab
```
Dashboard → Add New... → Project
→ Import Git Repository
→ Selecciona tu repo de GitLab
→ Configure Project:
  - Framework Preset: Next.js (auto-detectado)
  - Root Directory: ./
  - Build Command: npm run build (default)
  - Output Directory: .next (default)
→ Deploy
```

#### 3. Configurar dominio personalizado

**En Vercel Dashboard:**
```
Project Settings → Domains → Add Domain
→ Ingresa: hypernetics.com.mx
→ Vercel te pedirá verificar con DNS
```

**En AWS Route53 (⚠️ IMPORTANTE: NO elimines registros MX/TXT de SES):**

Opción A - A Record (Recomendado para apex domain):
```
Hosted Zone: hypernetics.com.mx
→ Create Record
   Type: A
   Name: (dejar vacío para @)
   Value: 76.76.21.21
   TTL: 300
```

Opción B - CNAME (solo para www):
```
Hosted Zone: hypernetics.com.mx
→ Create Record
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 300
```

**Configuración completa recomendada:**
```
# Website
A       @      → 76.76.21.21           (Vercel)
CNAME   www    → cname.vercel-dns.com (Vercel)

# Email (SES - NO TOCAR)
MX      @      → 10 inbound-smtp.us-east-1.amazonaws.com
TXT     @      → "v=spf1 include:amazonses.com ~all"
TXT     _dmarc → "v=DMARC1;p=none;..."
CNAME   (DKIM) → (tus registros de SES)
```

#### 4. Verificar en Vercel
```
Domains → Refresh
→ Debe mostrar "Valid Configuration" ✅
```

#### 5. SSL Automático
- Vercel genera certificado SSL automáticamente (~5 min)
- Se renueva automáticamente

#### 6. Deployment automático (GitLab)
```
GitLab Settings → Webhooks (ya configurado por Vercel)
- Cada push a main → deployment automático
- Cada Merge Request → preview deployment único
```

### ⚠️ Importante: SES y correos

**NO se afectan** porque:
- SES usa registros MX/TXT/CNAME específicos
- Vercel usa registros A/CNAME para el sitio web
- Son servicios completamente independientes

**Registros que NO debes tocar:**
- ✅ MX (correo entrante)
- ✅ TXT con "v=spf1"
- ✅ TXT con "v=DMARC1"
- ✅ CNAME para DKIM (nombres tipo: `xyz._domainkey.hypernetics.com.mx`)

**Registros que agregarás:**
- ➕ A record para @ (sitio web)
- ➕ CNAME para www (sitio web)

### Migración desde S3

Si decides migrar a Vercel:

1. Revertir cambios en `next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     // Remover: output: "export"
     // Remover: images: { unoptimized: true }
   };

   export default nextConfig;
   ```

2. Push a GitHub/GitLab

3. Importar en Vercel

4. Configurar DNS

5. Listo! ✅

### Costos Vercel

- **Hobby (Gratis):**
  - 100GB bandwidth/mes
  - Deployments ilimitados
  - SSL automático
  - Perfecto para este proyecto

- **Pro ($20/mes):**
  - 1TB bandwidth
  - Analytics
  - Equipos
  - Solo si escalas mucho

---

## Opción 3: EC2 (No recomendado)

### Solo considera si:
- Necesitas control total del servidor
- Vas a correr otros servicios
- Tienes experiencia con DevOps

### Requiere configurar:
- Nginx/Apache
- PM2 para proceso Node.js
- SSL con Let's Encrypt
- Renovación de certificados
- Backups
- Seguridad
- Escalamiento

**Costo:** ~$5-20/mes + tiempo de mantenimiento

---

## Recomendación Final

**Para Hypernetics Landing:**

1. **Corto plazo:** Continuar con S3 + CloudFront (ya configurado)
2. **Largo plazo:** Migrar a Vercel cuando:
   - Necesites API Routes
   - Quieras agregar features dinámicos
   - Necesites optimización de imágenes
   - Quieras deployments más fáciles

**Beneficio de Vercel:**
- Deployments en segundos vs minutos
- No necesitas `deploy.sh`
- No necesitas invalidar CloudFront manualmente
- Preview URLs para cada cambio
- Todo gratis para tu caso de uso

---

## Comparación Rápida

| Feature | S3+CloudFront | Vercel | EC2 |
|---------|---------------|--------|-----|
| Costo | $1-5/mes | Gratis | $5-20/mes |
| Setup | Complejo | Fácil | Muy complejo |
| Deployment | Manual | Automático | Manual |
| SSL | Manual (ACM) | Automático | Manual (Let's Encrypt) |
| CDN | ✅ CloudFront | ✅ Edge Network | ❌ (necesitas agregar) |
| API Routes | ❌ | ✅ | ✅ |
| SSR/ISR | ❌ | ✅ | ✅ |
| Image Optimization | ❌ | ✅ | Manual |
| Mantenimiento | Medio | Cero | Alto |
| Escalamiento | Manual | Automático | Manual |
