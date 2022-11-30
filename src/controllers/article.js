"use strict";

let Article = require("../models/article");

// Se crea un objeto para usar todos los métodos de ruta que vamos a definir

let controller = {

	// Método para guardar un artículo
	save:(req, res) =>{
		let params = req.body;

		let article = new Article();
		// Asignamos los valores
		article.title = params.title;
		article.content = params.content;
		article.author = params.author;

		// Guardamos el artículo
		article.save((err, articleStored) => {

			if(err || !articleStored){
				return res.status(404).send({
					status:'error',
					message:'El articulo no se ha guardado'
				})
			}
			return res.status(200).send({
				status:'success',
				articleStored
			});
		});
	},

	//Método para listar los artículos

	getArticles:(req, res) =>{
		let query = Article.find({});

		query.sort('-date').exec((err, articles) =>{

			if(err){
				return res.status(500).send({
					status:'error',
					message:'Error al extraer los datos'
				});
			}

			if(!articles){
				return res.status(404).send({
					status:'error',
					message:'No hay artículos para mostrar'
				});
			}

			return res.status(200).send({
				status:'success',
				articles
			});
		});
	},

	// Método para eliminar un artículo

	delete:(req, res) =>{
		//Recoger el id a través de la URL
		let articleID = req.params.id;

		Article.findOneAndDelete({_id: articleID}, (err, articleRemoved) =>{

			if(err){
				return res.status(500).send({
					status:'error',
					message:'Error al eliminar el artículo'
				});
			}

			if(!articleRemoved){
				return res.status(404).send({
					status:'error',
					message:'No se ha encontrado el artículo a eliminar'
				});
			}

			return res.status(200).send({
				status:'success',
				article: articleRemoved
			});

		});
	}

}

module.exports = controller;
