import express from 'express'
import { sequelize, Marca, TablaMantenimiento,Transacciones, TipoMoto, ServicioTaller } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

//Create Marca
router.post('/create', async (req, res) => {
    return sequelize.transaction().then(async t => {
        console.log(req.body)
        try {
            const result = await TablaMantenimiento.bulkCreate(req.body.lista, { transaction: t });
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

//Update Tabla Mantenimiento
router.post('/update', async (req, res) => {
    return sequelize.transaction().then(async t => {
        try {
            const result = await TablaMantenimiento.update(req.body, { where: { id: req.body.id }, transaction: t });
            if (result[0]) {
							await Transacciones.create({
                    id: 0,
                    tabla: 'Tabla Mantenimiento',
                    evento: 'Update',
                    //registro: { id: req.body.id, nombre: req.body.nombre },
										registro: req.body,
										adminId: req.body.adminId
                }, { transaction: t });
            }

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


//Listar por tipo de moto
router.post('/FindByTipoAll', async (req, res) => {
    return sequelize.transaction(t => {
        return TablaMantenimiento.findAll({
            where: {
                tipo_motoId: req.body.tipoMoto
            }, include: [ServicioTaller],
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



//Listar Tabla Mantenimiento de un Tipo de Moto
router.post('/FindByTipoMoto', async (req, res) => {
    return sequelize.transaction(t => {
        return TablaMantenimiento.findAll({
            where: {
                tipo_motoId: req.body.tipoMoto,
                estado: 1
            },
            include: [
                { model: ServicioTaller }
            ]
            , transaction: t
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