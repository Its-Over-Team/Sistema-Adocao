import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Adoção',
      version: '1.0.0',
      description: 'Documentação da API de adoção de animais',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [],
  },
  apis: ['./src/routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)
export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec)

export function createSwaggerSpec(customOptions = {}) {
  const merged = { ...options, ...customOptions }
  return swaggerJSDoc(merged)
}
