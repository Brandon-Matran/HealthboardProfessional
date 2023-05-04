const express = require('express')
const app = express()

app.get('/', (req, res) => {
    try {
        res.send('Welcome')
    } catch(err) {
        console.log(err)

    }
})

app.listen(5000, ()=> {
    console.log('Listening on port 5000')
})
