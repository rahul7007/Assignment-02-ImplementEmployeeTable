const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const mbDetectRouter = require('./routes/empRouter')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true })) //for parsing url encoded data
//urlencoded data example  https://www.youtube.com/watch?v=iiy4I_gpVdM&ab_channel=GangulyTech
app.use(cors())
app.use(bodyParser.json()) //for parsing json data

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', mbDetectRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))