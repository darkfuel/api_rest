import express from 'express'
import cors from 'cors'

import { findall } from './models/joyas.models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/joyas', async (req, res) => {
  try {
    const result = await findall(req.query)
    console.log(req.query)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: error })
  }
})

app.listen(PORT, () => console.log(`server inciado en el puerto ${PORT} ...`))

export default app
