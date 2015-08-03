module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta: { 
            	type: DataTypes.STRING,
            	validate: { notEmpty: {msg: "-> Falta pregunta"}}
            }, 
              respuesta: {
              	type: DataTypes.STRING,
              	validate: { notEmpty: {msg: "-> Falta respuesta"}}
              },
              casa: {
                type: DataTypes.STRING,
                validate: { notEmpty: {msg: "-> Falta casa a la que pertenece"}}
              } 
            });
}