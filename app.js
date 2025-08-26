import express from 'express'
import adminRoutes from './src/routes/admin.routes.js'
import animalRoutes from './src/routes/animal.routes.js'
import tutorRoutes from './src/routes/tutor.routes.js'
import questionarioRoutes from './src/routes/questionario.routes.js'
import adocaoRoutes from './src/routes/adocao.routes.js'
import loginRoutes from './src/routes/login.routes.js'
import doacaoRoutes from './src/routes/doacao.routes.js'

export const app = express()

app.use(express.json())

app.use('/admin', adminRoutes)
app.use('/animais', animalRoutes)
app.use('/tutores', tutorRoutes)
app.use('/questionário', questionarioRoutes)
app.use('/adocoes', adocaoRoutes)
app.use('/login', loginRoutes)
app.use('/doacoes', doacaoRoutes) 