import sequelize from './sequelize'
import Sequelize from 'sequelize'

const OrdenEntrada = sequelize.define('ordenEntrada', {
    fechaIngreso:{
        type: Sequelize.DOUBLE(15,5),
        defaultValue: 0,
        allowNull: false
    },
    fechaEntregaEstimada: {
        type: Sequelize.DOUBLE(15,5),
        defaultValue: 0,
        allowNull: false
    },
    fechaSalida: {
        type: Sequelize.DOUBLE(15,5),
        defaultValue: 0,
        allowNull: false
    },
    kilometraje:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    kmTotal:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    solicitudes:{
        type: Sequelize.STRING,
        defaultValue:''
    },
    observaciones:{
        type: Sequelize.TEXT,
        defaultValue: ''
    },
    costoServicio:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    costoRepuestos:{
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    estado:{
        type: Sequelize.ENUM('Iniciado', 'Finalizado','Cancelado'),
        allowNull: false,
        defaultValue: 'Iniciado'
    }

},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'ordenEntrada',
})

export default OrdenEntrada