import sequelize from './sequelize'
import Sequelize from 'sequelize'

const Marca = sequelize.define('marca', {
    nombre:{
        type:Sequelize.STRING(30),
        unique: true,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'marca'    
})

export default Marca