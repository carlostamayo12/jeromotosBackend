import sequelize from './sequelize'
import Contador from './contador'
import Marca from './marca'
import Moto from './moto'
import OrdenEntrada from './ordenEntrada'
import Persona from './persona'
import Servicios from './servicios'
import ServicioTaller from './servicioTaller'
import TablaMantenimiento from './tablaMantenimiento'
import TipoMoto from './tipoMoto'
import Transacciones from './transacciones'
   
// Relacion tipomoto -> moto
TipoMoto.hasMany(Moto, {foreignKey: 'tipo_motoId', onDelete: 'cascade'})
Moto.belongsTo(TipoMoto, {foreignKey: 'tipo_motoId'})

//Relacion tipomoto -> tablaMantenimiento
TipoMoto.hasMany(TablaMantenimiento, {foreignKey: 'tipo_motoId', onDelete: 'cascade'})
TablaMantenimiento.belongsTo(TipoMoto, {foreignKey: 'tipo_motoId'})

// Relacion propietario -> moto
Persona.hasMany(Moto, {foreignKey: 'propietarioId', onDelete: 'cascade'})
Moto.belongsTo(Persona, {foreignKey: 'propietarioId'})

// Relacion propietario -> moto
/*Persona.hasMany(Token, {foreignKey: 'personaId', onDelete: 'cascade'})
Token.belongsTo(Persona, {foreignKey: 'personaId'})*/

//Relacion moto -> OrdenEntrada
Moto.hasMany(OrdenEntrada, {foreignKey: 'motoId', onDelete: 'cascade'})
OrdenEntrada.belongsTo(Moto, {foreignKey: 'motoId'})

//Relacion servicio taller -> tablaMantenimiento
ServicioTaller.hasMany(TablaMantenimiento, {foreignKey: 'servicioId', onDelete: 'cascade'})
TablaMantenimiento.belongsTo(ServicioTaller, {foreignKey: 'servicioId'})

//Relacion ServicioTaller -> ServiciosSolicitados
ServicioTaller.hasMany(Servicios, {foreignKey: 'servicioId', onDelete: 'cascade'})
Servicios.belongsTo(ServicioTaller, {foreignKey: 'servicioId'})

//Relacion OrdenEntrada -> ServiciosSolicitados
OrdenEntrada.hasMany(Servicios, {foreignKey: 'ordenId', onDelete: 'cascade'})
Servicios.belongsTo(OrdenEntrada, {foreignKey: 'ordenId'})

//Relacion Contador -> ServiciosTaller
ServicioTaller.hasMany(Contador, {foreignKey: 'servicioId', onDelete: 'cascade'})
Contador.belongsTo(ServicioTaller, {foreignKey: 'servicioId'})

//Relacion Contador -> Moto
Moto.hasMany(Contador, {foreignKey: 'motoId', onDelete: 'cascade'})
Contador.belongsTo(Moto, {foreignKey: 'motoId'})

//Relacion Marca -> Tipomoto
Marca.hasMany(TipoMoto, {foreignKey: 'marcaId', onDelete: 'cascade'})
TipoMoto.belongsTo(Marca, {foreignKey: 'marcaId'})

//Relacion ordenEntrada -> Tecnico
Persona.hasMany(OrdenEntrada, {foreignKey: 'tecnicoId', onDelete: 'cascade'})
OrdenEntrada.belongsTo(Persona, {as: 'tecnico',foreignKey: 'tecnicoId'})

//Relacion Transacciones -> Persona
Persona.hasMany(Transacciones, {foreignKey: 'adminId', onDelete: 'cascade'})
Transacciones.belongsTo(Persona, {foreignKey: 'adminId'})

export {
  sequelize,
  Contador,
  Marca,
  Moto,
  OrdenEntrada,
  Persona,
  Servicios,
  ServicioTaller,
  TablaMantenimiento,
  TipoMoto,
  Transacciones
	
};