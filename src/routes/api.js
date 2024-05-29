import express from 'express'

const router = express.Router()

// Access via http://localhost:[SERVER_PORT]/test/123 ---> returns { testId: 123 }

router.get('/test/:testId', (req, res) => {
    res.send(req.params)
})

export default router
