var path = require('path');
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // exportar tabla Quiz

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate( 
        [ {pregunta: 'Lema de la casa Stark',   respuesta: 'SE ACERCA EL INVIERNO', casa:"Stark"},
          {pregunta: 'Hijo bastardo de Ned Stark', respuesta: 'JON NIEVE', casa: "Stark"},
          {pregunta: 'Nombre del Huargo de Bran Stark',   respuesta: 'VERANO', casa: "Stark"},
          {pregunta: 'Hija pequeña de Ned Stark', respuesta: 'ARYA', casa: "Stark"},
          {pregunta: 'Nombre de la bruja roja',   respuesta: 'MELISSANDRE', casa: "Dios rojo"},
          {pregunta: 'Pupilo de Ned de las Islas del hierro', respuesta: 'THEON', casa: "Greyjoy"},
          {pregunta: 'Hijo bastardo de Roose Bolton',   respuesta: 'RAMSAY', casa: "Bolton"},
          {pregunta: 'Lema de la casa Targaryen', respuesta: 'FUEGO Y SANGRE', casa: "Targaryen"}
        ]
      ).then(function(){console.log('Base de datos inicializada')});
    };
  });
});