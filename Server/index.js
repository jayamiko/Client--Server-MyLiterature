require("dotenv").config();
const express = require('express')
const cors = require('cors')
const router = require('./src/routes/index')
const app = express()
const PORT = 5000;

app.use(cors())
app.use(express.json())
app.use('/api/v1/', router)
app.use('/upload', express.static('upload'))

app.listen(PORT, () => {
    console.log(('Server Running on Port: ', PORT));
})