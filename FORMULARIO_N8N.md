# Configuración del Formulario de Contacto con n8n

Este documento explica cómo configurar el formulario de contacto para que envíe datos a n8n y luego a Odoo.

## Campos del Formulario

El formulario envía un JSON con la siguiente estructura:

```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+52 55 1234 5678",
  "perfil": "CEO/Fundador",
  "projectType": "web",
  "budget": "100k-250k",
  "company": "Mi Empresa S.A.",
  "message": "Necesito desarrollar una plataforma web...",
  "urgent": true
}
```

### Descripción de campos:

| Campo | Tipo | Descripción | Valores posibles |
|-------|------|-------------|------------------|
| `name` | string | Nombre completo del contacto | Texto libre |
| `email` | string | Correo electrónico | Email válido |
| `phone` | string | Teléfono de contacto | Texto libre |
| `perfil` | string | Puesto de trabajo | CEO/Fundador, Director, Gerente, Coordinador, Desarrollador, Diseñador, Marketing, Emprendedor, Otro |
| `projectType` | string | Tipo de proyecto | web, mobile, desktop, ecommerce, api, marketing, consulting, other |
| `budget` | string | Presupuesto estimado (MXN) | <50k, 50k-100k, 100k-250k, 250k-500k, 500k+ |
| `company` | string | Nombre de la empresa o proyecto | Texto libre (opcional) |
| `message` | string | Descripción del proyecto | Texto libre |
| `urgent` | boolean | ¿Es urgente? (menos de 2 semanas) | true o false |

## Configuración

### 1. Configurar variable de entorno

Crea un archivo `.env.local` en la raíz del proyecto con la URL de tu webhook de n8n:

```bash
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/contact-form
```

### 2. En Vercel (Producción)

En la configuración de tu proyecto en Vercel:

1. Ve a **Settings** → **Environment Variables**
2. Agrega la variable:
   - **Name:** `NEXT_PUBLIC_N8N_WEBHOOK_URL`
   - **Value:** La URL completa de tu webhook de n8n
   - **Environment:** Production, Preview, Development

## Configuración del Webhook en n8n

### 1. Crear el Webhook

En n8n, crea un nuevo workflow que empiece con un nodo **Webhook**:

- **HTTP Method:** POST
- **Path:** `/contact-form` (o el que prefieras)
- **Response Mode:** Respond Immediately
- **Response Code:** 200

### 2. Procesar los datos

El webhook recibirá los datos en `$json`. Puedes acceder a cada campo así:

```javascript
{
  "name": "{{ $json.name }}",
  "email": "{{ $json.email }}",
  "phone": "{{ $json.phone }}",
  "perfil": "{{ $json.perfil }}",
  "projectType": "{{ $json.projectType }}",
  "budget": "{{ $json.budget }}",
  "company": "{{ $json.company }}",
  "message": "{{ $json.message }}",
  "urgent": "{{ $json.urgent }}"
}
```

### 3. Enviar a Odoo

Conecta el nodo de Odoo después del Webhook para crear:
- Un **Lead** o **Oportunidad** en CRM
- Un **Contacto** con los datos del cliente

## Ejemplo de Workflow en n8n

```
Webhook (POST)
    ↓
Set (formatear datos si es necesario)
    ↓
Odoo (Create Lead/Opportunity)
    ↓
Odoo (Create Contact)
    ↓
[Opcional] Slack/Email Notification
```

## Testing

### Local (desarrollo)

1. Usa una herramienta como **ngrok** o **localtunnel** para exponer tu n8n local:
   ```bash
   ngrok http 5678
   ```

2. Copia la URL de ngrok y agrégala a `.env.local`

3. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```

4. Prueba el formulario en `http://localhost:3000/#contact`

### Producción

Una vez desplegado en Vercel, verifica que:
1. La variable de entorno esté configurada
2. El webhook de n8n esté activo y accesible públicamente
3. Prueba enviando un formulario desde el sitio en producción

## Debugging

### El formulario no envía datos

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network**
3. Envía el formulario
4. Busca la petición al webhook
5. Verifica:
   - El status code (debe ser 200)
   - El payload enviado
   - La respuesta del servidor

### Verificar en n8n

1. Ve a **Executions** en n8n
2. Busca la ejecución más reciente del workflow
3. Verifica los datos recibidos en cada nodo

## Notas de Seguridad

- ✅ El formulario valida todos los campos requeridos
- ✅ Incluye validación de email
- ✅ Requiere aceptación del Aviso de Privacidad
- ⚠️ Considera agregar **reCAPTCHA** para evitar spam
- ⚠️ El webhook debe tener autenticación si es posible

## Soporte

Para dudas o problemas:
- Email: contacto@hypernetics.com.mx
- Documentación n8n: https://docs.n8n.io/
- Documentación Odoo: https://www.odoo.com/documentation/
