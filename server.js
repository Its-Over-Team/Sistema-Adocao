import { app } from './app.js'

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(`Aplicação rodando na porta ${PORT}: http:localhost/${PORT}`)
)
