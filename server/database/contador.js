import sequelize from './sequelize'
import Sequelize from 'sequelize'

const contador = sequelize.define('Contador', {
    fecha_km:{
        type: Sequelize.DOUBLE(15,5),
        defaultValue: 0,
        allowNull: false
    },
    fecha_time: {
        type: Sequelize.DOUBLE(15,5),
        defaultValue: 0,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'contador',
})

export default contador