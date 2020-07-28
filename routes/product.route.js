// product.route.js
const express = require('express');
const app = express();
const productRoutes = express.Router();

// Requires
let Product = require('../models/Product');

// Adiciona um produto
productRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  if(!req.body.ProductCode || typeof req.body.ProductCode !== 'number' || !req.body.ProductQnt || typeof req.body.ProductQnt !== 'number') {
    res.status(400).send("Campos quantidade e código devem ser números.");
  } else {
      Product.findOne({ProductCode: req.body.ProductCode}, function (err, products){
        console.log(req.body);
        if(err){
          console.log(err);
        }
        else {
          if(products) {
            res.status(500).send("Já existe um produto com esse código!");
          } else {
            let product = new Product(req.body);      
            product.save()
              .then(product => {
                res.status(200).json({'Product': 'Produto adicionado com sucesso!'});
              })
              .catch(err => {
              res.status(400).send("Não foi possível adicionar o produto!");
              });
          }
        }
      });
  }
});

// Pega a lista de produtos
productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products){
    if(err){
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

// Pega o produto:id
productRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, product){
    res.json(product);
  });
});

//  Salva as edições feitas no produto:id
productRoutes.route('/update/:id').post(function (req, res) {
  if(!req.body.ProductQnt || typeof req.body.ProductQnt !== 'number') {
    res.status(400).send("Campo quantidade deve ser um número");
  } else {
      Product.findById(req.params.id, function(err, product) {
        if (!product)
        res.status(404).send("Não encontrado");
        else {
          product.ProductCode = req.body.ProductCode;
          product.ProductName = req.body.ProductName;
          product.ProductQnt = req.body.ProductQnt;
          product.ProductUnit = req.body.ProductUnit;
          
          product.save().then(product => {
            res.json('Sucesso!');
            console.log(product);
          })
          .catch(err => {
            res.status(400).send("Backend: Impossível atualizar produto!");
          });
        }
      });
  }
});

// Deleta um produto
productRoutes.route('/delete/:id').get(function (req, res) {
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
      if(err) res.json(err);
      else res.json('Produto removido com sucesso!');
    });
});

module.exports = productRoutes;