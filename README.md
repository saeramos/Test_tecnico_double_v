# Prueba Técnica - Your Store

Este repositorio contiene la solución completa para la prueba técnica de testing y automatización, dividida en dos partes principales:

- **API Testing**: Pruebas funcionales y de rendimiento de la API de FakeStore
- **Automatización UI**: Automatización de flujos críticos usando Playwright

## Estructura del Proyecto

```
PruebaTecnica/
├── api-testing/          # Pruebas de API
│   ├── tests/           # Casos de prueba funcionales
│   ├── load-tests/      # Pruebas de carga y estrés
│   ├── reports/         # Reportes generados
│   └── README.md        # Documentación específica
├── automation/          # Automatización UI
│   ├── pages/          # Page Object Model
│   ├── tests/          # Casos de prueba
│   ├── reports/        # Reportes de ejecución
│   └── README.md       # Documentación específica
└── README.md           # Este archivo
```

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

## Instalación

### Instalación Global

```bash
npm install
```

### Instalación por Módulo

Cada módulo tiene sus propias dependencias. Consulta los README específicos:

- [API Testing - Guía de Instalación](./api-testing/README.md)
- [Automatización UI - Guía de Instalación](./automation/README.md)

## Ejecución

### API Testing

```bash
cd api-testing
npm install
npm test
npm run load-test
```

### Automatización UI

```bash
cd automation
npm install
npm test
```

## Tecnologías Utilizadas

- **API Testing**: Node.js, Axios, k6
- **Automatización UI**: Playwright, JavaScript, Page Object Model

## Autor

Desarrollado como parte de la prueba técnica para DOUBLE V PARTNERS

