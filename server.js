const express = require('express');
const app = express();
require('dotenv').config('./.env')
const mongoose = require('mongoose');
app.use(express.json())
const PORT = process.env.PORT || 3000;


app.use('/Users', require('./routes/UserRouter'))


mongoose.connect("mongodb+srv://med:12345@cluster0.t1rfwmk.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(res=> console.log('Db connected'))
.catch(err=> console.log(err))
app.listen(PORT, err=> err? console.log(err) : console.log('server is running on port', PORT))