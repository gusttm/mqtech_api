const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

   const productRoute = require('./routes/product.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Banco MQtech rodando.') },
      err => { console.log('Não foi possível conectar ao banco MQtech'+ err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/products', productRoute);
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
     console.log('Escutando a porta ' + port);
    });