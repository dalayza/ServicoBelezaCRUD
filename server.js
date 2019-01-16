var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://denis_alayza:caracas01@ds133094.mlab.com:33094/beleza", { useNewUrlParser: true }, function(err, response){
    if(err){ console.log(err); }
    else{ console.log('Connected to ' + db, ' + ', response ); }
});

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({ limit:'5mb' }));
app.use(bodyParser.json({ extended:true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','http://localhost/4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Rquested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongo.Schema;

var ServicosSchema = new Schema({
    nome: { type: String },
    descricao: { type: String },
    preco: { type: String },
},{ versionKey: false });

var model = mongo.model('servicos', ServicosSchema, 'servicos');

app.post("/api/SaveServico", function(req, res){
    var mod = new model(req.body);
    mod.save(function(err, data){
        if(err){
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Inserted..!!" });
        }
    });
})

app.post("/api/UpdateServico", function(req, res){
    var mod = new model(req.body);
    model.findByIdAndUpdate(req.body._id, { nome: req.body.nome, descricao: req.body.descricao, preco:req.body.preco },
    function(err, data){
        if(err){
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Updated..!!" });
        }
    });
})

app.post("/api/deleteServico", function(req, res){
    model.remove({ _id: req.body.id }, function(err) {
        if(err){
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
})

app.get("/api/getServico", function(req, res){
    model.find({}, function(err, data) {
        if(err){
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})

app.listen(8080, function() {
    console.log('App listening on port 8080!');
})