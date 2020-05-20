import express from 'express'
import { sequelize, Contador, Moto, Persona, ServicioTaller, TablaMantenimiento } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op



router.post('/create', async (req, res) => {
    return sequelize.transaction().then(async t => {
        console.log(req.body)
        try {
            const result = await Contador.bulkCreate(req.body.lista, { transaction: t });
            /*await Transacciones.create({
                id: 0,
                tabla: 'marca',
                evento: 'Create',
                registro: { id: result.id, nombre: req.body.nombre },
                adminId: req.body.adminId
            }, { transaction: t });*/
            res.json({
                error: false,
                datos: result
            })
            return t.commit();
        }
        catch (err) {
            res.json(error(err))
            return t.rollback();
        }
    });
})

router.post('/Notificacion', async (req, res) =>{
    return sequelize.transaction(t =>{
        return Contador.findAll({
            where:{
                id: 18
            },
            include:[
                { model: Moto, include:[{ model: Persona }] }, 
                { model: ServicioTaller, include:[{ model: TablaMantenimiento}] }
            ],
            transaction: t
        })
    }).then(result =>{
        res.json({
            error: false,
            datos: result
        })
    }).catch(e =>{
        res.json(error(e))
    })
})



export default router