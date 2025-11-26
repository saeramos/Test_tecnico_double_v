# Automatización UI - OpenCart

Este módulo contiene las pruebas automatizadas de la interfaz de usuario para la tienda OpenCart (https://opencart.abstracta.us) utilizando Playwright y el patrón Page Object Model.

## Estructura

```
automation/
├── pages/              # Page Object Model
│   ├── BasePage.js    # Clase base para todas las páginas
│   ├── HomePage.js    # Página principal
│   ├── RegisterPage.js # Página de registro
│   ├── LoginPage.js   # Página de inicio de sesión
│   ├── ProductPage.js # Página de productos
│   ├── CartPage.js    # Página del carrito
│   └── CheckoutPage.js # Página de checkout
├── tests/             # Casos de prueba
│   └── e2e/          # Pruebas end-to-end
├── utils/             # Utilidades y helpers
├── reports/           # Reportes generados
└── playwright.config.js # Configuración de Playwright
```

## Instalación

```bash
npm install
npx playwright install
```

## Dependencias

- `playwright`: Framework de automatización
- `@playwright/test`: Librería de testing de Playwright

## Ejecución

### Ejecutar todas las pruebas

```bash
npm test
```

### Ejecutar pruebas en modo UI

```bash
npm run test:ui
```

### Ejecutar pruebas en modo headed

```bash
npm run test:headed
```

### Generar reporte HTML

```bash
npm run report
```

## Funcionalidades Automatizadas

1. **Registro de Usuario**: Completa el formulario de registro con datos válidos
2. **Inicio de Sesión**: Valida el proceso de autenticación
3. **Restablecimiento de Contraseña**: Prueba el flujo de recuperación de contraseña
4. **Navegación a Laptops**: Accede a la sección de Laptops & Notebooks
5. **Agregar MacBook Pro**: Añade el producto al carrito de compras
6. **Búsqueda y Agregar Tablet**: Busca Samsung Galaxy tablet y la agrega al carrito
7. **Eliminar Producto**: Elimina MacBook Pro del carrito
8. **Actualizar Cantidad**: Agrega otra unidad de la tablet Samsung Galaxy
9. **Proceso de Compra**: Completa el checkout hasta la confirmación de la orden

## Casos de Prueba

Los casos de prueba están organizados en la carpeta `tests/e2e/` y cubren todos los flujos críticos de la aplicación.

## Reportes

Los reportes se generan automáticamente después de cada ejecución:
- Reporte HTML en `playwright-report/`
- Screenshots y videos en `test-results/` (si están habilitados)

## Configuración

La configuración de Playwright se encuentra en `playwright.config.js`. Puedes ajustar:
- Navegadores a usar
- Timeouts
- Configuración de reportes
- Modo de ejecución (headless/headed)

## Notas

- Las pruebas están diseñadas para ser independientes y ejecutables en cualquier orden
- Se utilizan datos de prueba dinámicos para evitar conflictos
- Los selectores están centralizados en las clases Page Object para facilitar el mantenimiento

