require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = "mongodb+srv://minhaj:minhaj@cluster0.cz1wwgy.mongodb.net/?retryWrites=true&w=majority&dbname=dataBase";

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
