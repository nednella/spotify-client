import 'dotenv/config'
import express from 'express'

const PORT = process.env.DEV_PORT

const app = express()

app.get('/', (req, res) => {
	res.send('Test route')
})

app.listen(PORT, () => {
	console.log(`HTTP Server now available at http://localhost:${PORT}`)
})
