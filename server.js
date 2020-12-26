const express = require('express');
require('dotenv').config();
require('./db')
const morgan = require('morgan');
const path = require('path');


const app = express();

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());

if( process.env.NODE_ENV === 'development' ){
    app.use(morgan('dev'))
}

app.use('/transactions', require('./routes/transaction'))

if( process.env.NODE_ENV === 'production' ){
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) )
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`))