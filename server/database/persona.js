import sequelize from './sequelize'
import Sequelize from 'sequelize'

const Persona = sequelize.define('persona', {
    identificacion: {
        unique: true,
        type: Sequelize.STRING(15),
        allowNull: false   
    },
    nombre: {
        type : Sequelize.STRING(50),
        allowNull: false
    }, 
    telefono: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    direccion: Sequelize.STRING(50),
    correo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    rol:{
       type : Sequelize.BIGINT,
       defaultValue: 0,
       allowNull: false
    },
    uId:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    token:{
        type: Sequelize.TEXT
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'persona',
})

export default Persona