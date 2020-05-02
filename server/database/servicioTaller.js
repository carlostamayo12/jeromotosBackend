import sequelize from './sequelize'
import Sequelize from 'sequelize'

const servicioTaller = sequelize.define('servicioTaller', {
    nombre: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'servicio_taller',
})

export default servicioTaller