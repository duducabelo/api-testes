const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const objectId = require('mongodb').ObjectId;





const server = express();

server 
	// .use(bodyParser.urlencoded({ extnded: true})) meu erro
	.use(bodyParser.urlencoded({extended: true}))
	.use(bodyParser.json());

const port = 8080;
server.listen(port);
console.log('Servidor http está escutando na porta' + port);

var db = new mongo.Db(
	'quartos-qt',
	new mongo.Server(
		'localhost',
		27017,
		{}
	),
	{},
	console.log('conexao com db')
);

server
	.get('/', (req, res) =>{
		res.send({msg: 'oi c de agulha'});
	})

	//post
	.post('/api',(req, res) =>{
		const dados = req.body;

		db.open( (err, mongoClient) =>{
			if (err) return console.log(err);
			mongoClient.collection('quarto',(err, collection) =>{
				if (err) return console.log(err);
				collection.insert(dados, (err, records) =>{
					if (err) {
						res.json('este é erro no post' + err);
					} else {
						res.json(records);
					}
					mongoClient.close();
					console.log('fechado db')
				});
			})
		})

	})


	//get total em Array
	.get('/api',(req, res) =>{
		

		db.open( (err, mongoClient) =>{
			if (err) return console.log(err);
			mongoClient.collection('quarto',(err, collection) =>{
				if (err) return console.log(err);
				collection.find().toArray((err, results) =>{
					if (err) {
						res.json('este é erro no get' + err);
					} else {
						res.json(results);
					}
					mongoClient.close();
					console.log('fechado db')
				});
			})
		})

	})


	//get por id
	.get('/api/:id',(req, res) =>{
		

		db.open( (err, mongoClient) =>{
			if (err) return console.log(err);
			mongoClient.collection('quarto',(err, collection) =>{
				if (err) return console.log(err);
				collection.find(objectId(req.params.id)).toArray((err, results) =>{
					if (err) {
						res.json('este é erro get por id' + err);
					} else {
						res.json(results);
					}
					mongoClient.close();
					console.log('fechado db')
				});
			})
		})

	})


	//put update por id
	.put('/api/:id',(req, res) =>{
		

		db.open( (err, mongoClient) =>{
			if (err) return console.log(err);
			mongoClient.collection('quarto',(err, collection) =>{
				if (err) return console.log(err);
				collection.update(
					{ _id : objectId(req.params.id) },
					{ $set : {titulo : req.body}},
					{},
					(err, records) =>{
					if (err) {
						res.json('este é erro no put update' + err);
					} else {
						res.json(records);
					}
					mongoClient.close();
					console.log('fechado db')
				});
			})
		})

	})


	//delete por id
	.delete('/api/:id',(req, res) =>{
		

		db.open( (err, mongoClient) =>{
			if (err) return console.log(err);
			mongoClient.collection('quarto',(err, collection) =>{
				if (err) return console.log(err);
				collection.remove(
					{ _id : objectId(req.params.id) },
					(err, records) =>{
					if (err) {
						res.json('este é erro em delete' + err);
					} else {
						res.json(records);
					}
					mongoClient.close();
					console.log('fechado db')
				});
			})
		})

	})

