const express = require('express')
const app = express()
const port = 8080;


app.use(express.static(__dirname));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
    console.log(`Servidor iniciado como: http://localhost:${port}`)
})