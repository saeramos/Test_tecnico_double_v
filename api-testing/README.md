# API Testing - FakeStore API

Este módulo contiene las pruebas funcionales y de rendimiento para la API de FakeStore (https://fakestoreapi.com/docs).

## Estructura

```
api-testing/
├── tests/              # Pruebas funcionales
│   ├── functional/    # Casos de prueba funcionales
│   └── helpers/       # Utilidades y helpers
├── load-tests/        # Pruebas de carga y estrés
│   ├── load-test.js   # 150 usuarios concurrentes
│   └── stress-test.js # Escalado de 100 a 1000 usuarios
├── reports/           # Reportes generados
└── package.json       # Dependencias
```

## Instalación

```bash
npm install
```

## Dependencias

- `axios`: Cliente HTTP para las pruebas funcionales
- `k6`: Herramienta de pruebas de carga y estrés
- `chai`: Librería de aserciones
- `mocha`: Framework de testing

## Ejecución

### Pruebas Funcionales

```bash
npm test
```

Ejecuta todos los casos de prueba funcionales:
1. Consulta de productos por categoría "electronics"
2. Consulta de un producto específico
3. Creación de un nuevo producto
4. Actualización de imagen del producto creado

### Pruebas de Carga

Prueba con 150 usuarios concurrentes durante 2 minutos:

```bash
npm run load-test
```

### Pruebas de Estrés

Escalado de usuarios de 100 a 1000 en intervalos de 150:

```bash
npm run stress-test
```

## Casos de Prueba

### 1. Consulta de Productos por Categoría
- **Endpoint**: GET /products/category/electronics
- **Validación**: Verifica que todos los productos retornados pertenezcan a la categoría "electronics"

### 2. Consulta de Producto Específico
- **Endpoint**: GET /products/{id}
- **Validación**: Verifica estructura y datos del producto

### 3. Creación de Producto
- **Endpoint**: POST /products
- **Validación**: Verifica que el producto se crea correctamente con los datos proporcionados

### 4. Actualización de Imagen
- **Endpoint**: PUT /products/{id}
- **Validación**: Verifica que la imagen del producto se actualiza correctamente

## Reportes

Los reportes se generan automáticamente en la carpeta `reports/` después de cada ejecución:
- `functional-report.html`: Reporte de pruebas funcionales
- `load-test-report.html`: Reporte de pruebas de carga
- `stress-test-report.html`: Reporte de pruebas de estrés

## Notas

- Las pruebas de carga requieren k6 instalado globalmente o mediante Docker
- Para la instalación de k6: choco install k6 -y
- Los tiempos de respuesta se registran en los reportes generados
- Se incluyen métricas de rendimiento: tiempo promedio, p95, p99, tasa de errores

