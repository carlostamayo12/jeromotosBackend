import sequelize from './sequelize'
import Sequelize from 'sequelize'

const tipo_moto = sequelize.define('tipo_moto', {
    referencia: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'tipo_moto',
    //Revisar
    hooks:true
})

export default tipo_moto