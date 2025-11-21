# Invitaciones Digitales - Copilot Instructions

## Descripción del Proyecto

Plataforma web para crear y gestionar invitaciones digitales personalizadas para bodas, XV años, cumpleaños, baby showers, bautizos y otros eventos especiales.

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Formularios**: React Hook Form
- **Estado**: Zustand
- **Fechas**: date-fns

## Estructura del Proyecto

```
app/
├── admin/              # Panel de administración
│   ├── edit/[id]/      # Editor de invitaciones
│   └── page.tsx        # Selección de plantillas
├── invitation/[id]/    # Vista pública de invitación
├── layout.tsx          # Layout principal
├── page.tsx            # Landing page
└── globals.css         # Estilos globales
```

## Características Principales

1. **Sistema de Plantillas**: 6 diseños predefinidos para diferentes tipos de eventos
2. **Editor Personalizable**: Permite modificar todos los aspectos de la invitación
3. **Cuenta Regresiva**: Contador en tiempo real hasta la fecha del evento
4. **Sistema RSVP**: Confirmación de asistencia de invitados
5. **Galería de Fotos**: Sección para compartir imágenes del evento
6. **Integración de Mapas**: Ubicación del evento con enlaces
7. **Mesa de Regalos**: Enlaces a tiendas y métodos de regalo
8. **Responsive Design**: Optimizado para todos los dispositivos

## Convenciones de Código

- Usar TypeScript para todo el código
- Componentes funcionales con hooks de React
- Tailwind CSS para estilos (evitar CSS inline)
- Nombres de archivos en kebab-case para utilidades, PascalCase para componentes
- Usar "use client" solo cuando sea necesario (interactividad del cliente)
- Preferir Server Components cuando sea posible

## Próximas Mejoras

- Integración con base de datos (Supabase/Firebase)
- Autenticación de usuarios
- Dashboard con analytics de RSVP
- Envío automático de invitaciones por email
- Exportar como PDF
- Editor de imágenes integrado
- Más plantillas y temas

## Comandos Útiles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Linter
```

## Deployment

El proyecto está configurado para Vercel con:
- Repositorio: https://github.com/martiyaquinta/invitaciones-digitales.git
- Auto-deploy desde la rama main
- Configuración en vercel.json
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
