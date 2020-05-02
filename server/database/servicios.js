import sequelize from './sequelize'
import Sequelize from 'sequelize'

const servicios = sequelize.define('servicios', {
    solicitados:{
        type:Sequelize.BOOLEAN,
        default:false
    },
    realizados: {
        type: Sequelize.BOOLEAN,
        default:false
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'servicios',
})

export default servicios