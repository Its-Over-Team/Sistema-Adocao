import express from 'express'
import cookieParser from 'cookie-parser'
import { adminRoutes } from './src/routes/admin.routes.js'
import { animalRoutes } from './src/routes/animal.routes.js'
import { tutorRoutes } from './src/routes/tutor.routes.js'
import { questionarioRoutes } from './src/routes/questionario.routes.js'
import { adocoesRoutes } from './src/routes/adocoes.routes.js'
import { loginRoutes } from './src/routes/login.routes.js'
import { doacoesRoutes } from './src/routes/doacoes.routes.js'

export const app = express()
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admin', adminRoutes)
app.use('/animais', animalRoutes)
app.use('/usuario', tutorRoutes)
app.use('/questionario', questionarioRoutes)
app.use('/adocoes', adocoesRoutes)
app.use('/login', loginRoutes)
app.use('/doacoes', doacoesRoutes)
