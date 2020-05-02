import sequelize from './sequelize'
import Sequelize from 'sequelize'

const Transacciones = sequelize.define('transacciones', {
    tabla:{
        type:Sequelize.STRING(30),
        allowNull:false,
    },
    evento:{
        type: Sequelize.ENUM('Create', 'Update','Login','Close'),
        allowNull: false,
        defaultValue: 'Update'
    },
    fecha:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    registro:{
        type:Sequelize.JSON,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'transacciones',
})

export default Transacciones