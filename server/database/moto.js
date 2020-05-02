import sequelize from './sequelize'
import Sequelize from 'sequelize'

const moto = sequelize.define('moto', {
    placa:{
        type:Sequelize.STRING(6),
        unique: true,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    km_promedio: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'moto',
})

export default moto