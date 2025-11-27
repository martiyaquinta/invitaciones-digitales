# 📖 Guía de Uso - Sistema de Invitaciones

## 🎯 Flujo Completo de Creación de Invitaciones

### 1️⃣ Crear una Nueva Invitación

1. **Accede a la plataforma**
   - Abre la página principal en tu navegador
   - Haz clic en "Crear Invitación" en el menú superior

2. **Selecciona una Plantilla**
   - Elige entre 6 diseños predefinidos:
     - 💒 **Boda**: Elegante y romántico
     - 👑 **XV Años**: Juvenil y festivo
     - 🎂 **Cumpleaños**: Alegre y colorido
     - 👶 **Baby Shower**: Tierno y dulce
     - ⛪ **Bautizo**: Tradicional y puro
     - 💼 **Corporativo**: Profesional y moderno

3. **Personaliza tu Invitación**
   
   En el editor verás dos paneles:
   - **Panel Izquierdo**: Formulario de edición
   - **Panel Derecho**: Vista previa en tiempo real

   **Campos obligatorios:**
   - Tipo de evento
   - Título de la invitación
   - Nombres de los festejados
   - Fecha del evento
   - Hora de la ceremonia
   - Ubicación
   - Dirección completa
   - Mensaje personalizado

   **Opciones adicionales:**
   - ✅ Habilitar confirmación de asistencia (RSVP)
   - ✅ Mostrar galería de fotos
   - ✅ Activar cuenta regresiva

4. **Guardar tu Invitación**
   - Haz clic en el botón **"Guardar"** (icono 💾)
   - Verás una confirmación: **"¡Guardado!"**
   - Tu invitación queda almacenada localmente

### 2️⃣ Gestionar tus Invitaciones

**Acceder a "Mis Invitaciones":**
- Desde el menú superior, haz clic en **"Mis Invitaciones"**
- Verás una cuadrícula con todas tus invitaciones guardadas

**Cada tarjeta muestra:**
- Tipo de evento (ej: "Boda")
- Nombres de los festejados
- Fecha del evento
- Hora de la ceremonia

**Acciones disponibles:**
- 👁️ **Ver**: Abre la vista pública de la invitación
- ✏️ **Editar**: Vuelve al editor con los datos cargados
- 🗑️ **Eliminar**: Borra la invitación (requiere confirmación)

### 3️⃣ Editar una Invitación Existente

1. Ve a **"Mis Invitaciones"**
2. Haz clic en el botón **"Editar"** de la invitación que quieres modificar
3. Se abrirá el editor con todos los datos precargados
4. Realiza los cambios necesarios
5. Haz clic en **"Guardar"** para actualizar

### 4️⃣ Ver y Compartir tu Invitación

**Desde el Editor:**
- Haz clic en **"Ver Invitación"** (icono 👁️)
- Se abrirá la vista pública en una nueva pestaña

**Desde "Mis Invitaciones":**
- Haz clic en el botón **"Ver"**
- Verás la invitación tal como la verán tus invitados

**Compartir:**
1. Copia la URL de la invitación desde la barra de direcciones
   - Formato: `https://tu-dominio.com/invitation/[id-único]`
2. Comparte el enlace por:
   - WhatsApp
   - Email
   - Redes sociales
   - Mensaje de texto
   - Código QR (próximamente)

### 5️⃣ Eliminar una Invitación

1. Ve a **"Mis Invitaciones"**
2. Haz clic en el botón **"Eliminar"** (🗑️) en la invitación que quieres borrar
3. Confirma la acción en el diálogo que aparece
4. La invitación será eliminada permanentemente

## 💡 Consejos y Mejores Prácticas

### Para una Invitación Perfecta:

1. **Mensaje Personalizado**
   - Sé específico y cálido
   - Incluye detalles importantes del evento
   - Menciona el código de vestimenta si aplica

2. **Información de Ubicación**
   - Proporciona la dirección completa
   - Incluye referencias cercanas
   - Considera agregar instrucciones de estacionamiento

3. **Horarios Claros**
   - Especifica hora de ceremonia y recepción
   - Indica si hay eventos previos (cóctel, fotografías, etc.)

4. **Confirmación RSVP**
   - Habilita esta opción para llevar control de asistentes
   - Establece una fecha límite de confirmación

5. **Galería de Fotos**
   - Útil para compartir momentos antes del evento
   - Puedes agregar fotos de los festejados

## 🔧 Características Técnicas

### Almacenamiento de Datos

**Actual:**
- Las invitaciones se guardan en **localStorage** del navegador
- Los datos persisten mientras no borres el caché del navegador
- Funciona 100% offline después de la carga inicial

**Limitaciones Actuales:**
- Los datos solo están disponibles en el navegador donde se crearon
- Si borras el caché, perderás las invitaciones
- No hay sincronización entre dispositivos

**Próximamente:**
- Base de datos en la nube (Supabase/Firebase)
- Sistema de cuentas de usuario
- Sincronización automática
- Backup automático

### Compatibilidad

**Navegadores Soportados:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Dispositivos:**
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets (iOS, Android)
- ✅ Móviles (iOS, Android)

## ❓ Preguntas Frecuentes

**¿Puedo acceder a mis invitaciones desde otro dispositivo?**
- Actualmente no, ya que usan localStorage. Esta funcionalidad llegará pronto con la integración de base de datos.

**¿Qué pasa si cierro el navegador sin guardar?**
- Debes hacer clic en "Guardar" para que los cambios persistan. Si cierras sin guardar, perderás los cambios.

**¿Puedo cambiar de plantilla después de guardar?**
- Sí, al editar puedes cambiar el tipo de evento y la plantilla se actualizará.

**¿Cuántas invitaciones puedo crear?**
- Actualmente no hay límite, pero recuerda que se almacenan en tu navegador.

**¿Los invitados pueden ver todas mis invitaciones?**
- No, cada invitación tiene un ID único. Solo quien tenga el enlace específico puede verla.

**¿Puedo descargar la invitación como PDF?**
- Esta funcionalidad estará disponible próximamente.

## 🆘 Solución de Problemas

**No veo mis invitaciones guardadas:**
- Verifica que estás usando el mismo navegador donde las creaste
- Revisa que no hayas borrado el caché del navegador

**La vista previa no se actualiza:**
- Verifica que hayas completado todos los campos obligatorios
- Recarga la página si el problema persiste

**No puedo eliminar una invitación:**
- Asegúrate de confirmar en el diálogo de confirmación
- Verifica que tengas JavaScript habilitado

**La invitación no se guarda:**
- Verifica que tu navegador permita localStorage
- Comprueba que no estés en modo incógnito

---

¿Necesitas ayuda adicional? Visita nuestra [página de soporte](mailto:estudionomade2025@gmail.com) o consulta la [documentación técnica](./README.md).
