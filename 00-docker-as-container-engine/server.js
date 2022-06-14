import express from 'express'

import { age } from './age.js'

const app = express()

app.get('/', (req, res) => {
  const { year } = req.query

  res.status(200).send(age(+year).toString()).end()
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`server running at port ${PORT}`))