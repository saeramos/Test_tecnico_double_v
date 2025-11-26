# Casos de Prueba - Automatización UI

Este documento describe todos los casos de prueba diseñados para validar el correcto funcionamiento de la aplicación web OpenCart.

## Requisitos Funcionales

### RF-001: Completar Formulario de Registro

**Objetivo**: Verificar que un usuario puede registrarse exitosamente en el sistema.

**Precondiciones**: 
- Acceso a la página principal de OpenCart
- Datos válidos para el registro

**Datos de Prueba**:
- Nombre: Generado dinámicamente
- Apellido: Generado dinámicamente
- Email: Generado dinámicamente (único)
- Teléfono: Generado dinámicamente
- Contraseña: Test1234!

**Pasos**:
1. Navegar a la página principal
2. Hacer clic en "My Account"
3. Seleccionar "Register"
4. Completar todos los campos del formulario
5. Aceptar la política de privacidad
6. Hacer clic en "Continue"
7. Validar mensaje de éxito

**Resultado Esperado**: 
- El usuario se registra exitosamente
- Se muestra un mensaje de confirmación
- El usuario queda autenticado en el sistema

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Completar formulario de registro"

---

### RF-002: Validar Inicio de Sesión

**Objetivo**: Verificar que un usuario registrado puede iniciar sesión correctamente.

**Precondiciones**: 
- Debe existir un usuario registrado previamente
- Credenciales válidas (email y contraseña)

**Pasos**:
1. Registrar un nuevo usuario
2. Cerrar sesión (si aplica)
3. Navegar a la página principal
4. Hacer clic en "My Account"
5. Seleccionar "Login"
6. Ingresar email y contraseña
7. Hacer clic en "Login"
8. Validar que se muestra la sección "My Account"

**Resultado Esperado**: 
- El usuario inicia sesión exitosamente
- Se muestra la información de la cuenta
- El usuario queda autenticado

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Validar inicio de sesión"

---

### RF-003: Probar Restablecimiento de Contraseña

**Objetivo**: Verificar que el flujo de recuperación de contraseña funciona correctamente.

**Precondiciones**: 
- Acceso a la página de inicio de sesión
- Email de usuario válido (puede ser recién registrado)

**Pasos**:
1. Navegar a la página de login
2. Hacer clic en "Forgotten Password"
3. Ingresar el email del usuario
4. Hacer clic en "Continue"
5. Validar mensaje de confirmación

**Resultado Esperado**: 
- Se muestra un mensaje indicando que se envió el enlace de recuperación
- El proceso se completa sin errores

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Probar restablecimiento de contraseña"

---

### RF-004: Navegar a Laptops & Notebooks

**Objetivo**: Verificar que se puede acceder a la sección de Laptops & Notebooks y mostrar todos los productos.

**Precondiciones**: 
- Acceso a la página principal

**Pasos**:
1. Navegar a la página principal
2. Hacer hover sobre el menú "Laptops & Notebooks"
3. Hacer clic en "Show All Laptops & Notebooks"
4. Validar que se carga la página de productos

**Resultado Esperado**: 
- Se navega correctamente a la sección de laptops
- Se muestran todos los productos disponibles
- El título de la página contiene "Laptop"

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Navegar a Laptops & Notebooks y mostrar todos"

---

### RF-005: Agregar MacBook Pro al Carrito

**Objetivo**: Verificar que se puede agregar un MacBook Pro al carrito de compras.

**Precondiciones**: 
- Acceso a la sección de Laptops & Notebooks
- El producto MacBook Pro debe estar disponible

**Pasos**:
1. Navegar a la sección de Laptops & Notebooks
2. Buscar y hacer clic en el producto "MacBook Pro"
3. Hacer clic en "Add to Cart"
4. Validar que el carrito muestra el producto agregado

**Resultado Esperado**: 
- El producto se agrega al carrito exitosamente
- El contador del carrito muestra al menos 1 item
- El producto está disponible en el carrito

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Agregar MacBook Pro al carrito"

---

### RF-006: Buscar y Agregar Samsung Galaxy Tablet

**Objetivo**: Verificar que se puede buscar un producto y agregarlo al carrito.

**Precondiciones**: 
- Acceso a la página principal
- El producto Samsung Galaxy Tab debe existir en el catálogo

**Pasos**:
1. Navegar a la página principal
2. Utilizar la barra de búsqueda para buscar "Samsung Galaxy"
3. Seleccionar el producto de los resultados
4. Hacer clic en "Add to Cart"
5. Validar que el producto se agregó al carrito

**Resultado Esperado**: 
- La búsqueda retorna resultados relevantes
- El producto se agrega al carrito exitosamente
- El contador del carrito se actualiza

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Buscar y agregar Samsung Galaxy tablet al carrito"

---

### RF-007: Eliminar MacBook Pro del Carrito

**Objetivo**: Verificar que se puede eliminar un producto del carrito de compras.

**Precondiciones**: 
- Debe haber al menos dos productos en el carrito
- Uno de ellos debe ser MacBook Pro

**Pasos**:
1. Agregar MacBook Pro al carrito
2. Agregar Samsung Galaxy tablet al carrito
3. Ir al carrito de compras
4. Localizar el MacBook Pro en el carrito
5. Hacer clic en el botón de eliminar del MacBook Pro
6. Validar que el producto se eliminó

**Resultado Esperado**: 
- El MacBook Pro se elimina del carrito
- El carrito solo contiene el Samsung Galaxy tablet
- El total del carrito se actualiza correctamente

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Eliminar MacBook Pro del carrito"

---

### RF-008: Agregar Otra Unidad de Samsung Galaxy Tablet

**Objetivo**: Verificar que se puede actualizar la cantidad de un producto en el carrito.

**Precondiciones**: 
- Debe haber una Samsung Galaxy tablet en el carrito

**Pasos**:
1. Agregar Samsung Galaxy tablet al carrito
2. Ir al carrito de compras
3. Localizar la Samsung Galaxy tablet
4. Actualizar la cantidad a 2 unidades
5. Hacer clic en "Update"
6. Validar que la cantidad se actualizó

**Resultado Esperado**: 
- La cantidad del producto se actualiza a 2
- El total del carrito se recalcula correctamente
- El producto sigue presente en el carrito

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Agregar otra unidad de Samsung Galaxy tablet"

---

### RF-009: Completar Proceso de Compra

**Objetivo**: Verificar que se puede completar todo el proceso de compra hasta la confirmación de la orden.

**Precondiciones**: 
- Usuario registrado y autenticado
- Producto agregado al carrito

**Pasos**:
1. Registrar un nuevo usuario
2. Buscar y agregar Samsung Galaxy tablet al carrito
3. Ir al carrito de compras
4. Hacer clic en "Checkout"
5. Completar todos los pasos del checkout:
   - Información de facturación
   - Método de entrega
   - Método de pago
6. Confirmar la orden
7. Validar mensaje de confirmación

**Resultado Esperado**: 
- Se completa todo el proceso de checkout
- Se muestra un mensaje de confirmación de orden
- La orden queda registrada en el sistema

**Archivo de Prueba**: `tests/e2e/opencart-flow.spec.js` - Test: "Completar proceso de compra hasta confirmación"

---

## Patrón de Diseño: Page Object Model

Todos los casos de prueba utilizan el patrón Page Object Model para:

- **Mantenibilidad**: Los selectores están centralizados en las clases Page
- **Reutilización**: Los métodos de las páginas se reutilizan en múltiples tests
- **Legibilidad**: Los tests son más claros y fáciles de entender
- **Escalabilidad**: Fácil agregar nuevas funcionalidades

### Estructura de Pages:

- `BasePage.js`: Clase base con métodos comunes
- `HomePage.js`: Página principal y navegación
- `RegisterPage.js`: Formulario de registro
- `LoginPage.js`: Inicio de sesión y recuperación de contraseña
- `ProductPage.js`: Páginas de productos y agregar al carrito
- `CartPage.js`: Gestión del carrito de compras
- `CheckoutPage.js`: Proceso de checkout

## Criterios de Aceptación

Todos los casos de prueba deben cumplir con los siguientes criterios:

1. **Funcionalidad**: Todas las operaciones deben ejecutarse correctamente
2. **Estabilidad**: Las pruebas deben ser confiables y repetibles
3. **Mantenibilidad**: El código debe seguir el patrón Page Object Model
4. **Documentación**: Los resultados deben quedar documentados en los reportes
5. **Datos Dinámicos**: Se utilizan datos generados dinámicamente para evitar conflictos

## Reportes

Los reportes se generan automáticamente después de cada ejecución:

- **Reporte HTML**: `playwright-report/index.html`
- **Screenshots**: `test-results/` (en caso de fallos)
- **Videos**: `test-results/` (en caso de fallos)

