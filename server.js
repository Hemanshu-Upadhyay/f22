const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const CustomerRoutes = require('./routes/CustomerRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/Customer', CustomerRoutes)
app.use('/', (req, res) => {
    res.send('Hello World!')
})

mongoose.connect('mongodb+srv://Hari:87654321@test.fyspn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log('Connected to The Database')
    app.listen(port, () => {
        console.log(`Server Started On: ${port}`)
    })
}).catch(err => {
    console.log(err)

})