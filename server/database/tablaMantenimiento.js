import sequelize from './sequelize'
import Sequelize from 'sequelize'

const tabla = sequelize.define('tabla_mantenimiento', {
    kilometraje:{
        type:Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    tiempo: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0
    },
    estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'tabla_mantenimiento',
})

export default tabla