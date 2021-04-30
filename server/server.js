const express = require('express')

const db = require('./db')
const mbDetectRouter = require('./routes/empRouter')

const app = express()
const apiPort = 5000


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', mbDetectRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))