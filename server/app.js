const express = require('express')
const app = express()

app.get('/', (req, res) => {
    try {
        res.send('Test World')
    } catch(err) {
        console.log(err)

    }
})

app.listen(port=8080, ()=> {
    console.log(`Listening on port ${port}`)
})
