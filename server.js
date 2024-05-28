import app from './index.js'

const port = process.env.SERVER_PORT

app.listen(port, () => {
	console.log(`HTTP Server now available at http://localhost:${port}`)
})
