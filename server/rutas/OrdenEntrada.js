import express from 'express'
import {
    sequelize,
    Contador,
    Marca,
    Moto,
    OrdenEntrada,
    Persona,
    ServicioTaller,
    TablaMantenimiento,
    TipoMoto,
    Transacciones
} from '../database'

import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

router.post('/Exist', async (req, res) => {
    return sequelize.transaction(t => {
        return OrdenEntrada.findAll({
            where:{
                motoId: req.body.motoId 
            },
            transaction: t
        })
    }).then(result => {
        res.json({
            error: false,
            datos: result
        })
    }).catch(e => {
        res.json(error(e))
    })
})

router.post('/ultimaOrden', async (req, res)=>{
    return sequelize.transaction(t => {
        return OrdenEntrada.findAll(req.body, {
            attributes: ['id', 'id'],
            order: [['id', 'DESC']],
            transaction: t
        })
    }).then(result => {
        res.json({
            error: false,
            datos: result
        })
    }).catch(e => {
        res.json(error(e))
    })
})



export default router