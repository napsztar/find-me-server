const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const morgan = require('morgan')

app.use(cors());

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`server start at ${port}`)
})
