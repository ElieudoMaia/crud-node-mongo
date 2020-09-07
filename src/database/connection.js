const mongoose = require('mongoose')

mongoose.connect(
    'mongodb://localhost:27017/nodemongo',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log('MongoDB connected!')
})
.catch(error => {
    console.log('Error on connection:', error)
})

module.exports = mongoose