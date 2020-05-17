import express from 'express'
import {
    sequelize,
    Contador,
    Marca,
    Moto,
    OrdenEntrada,
    Persona,
    ServicioTaller,
    Servicios,
    TablaMantenimiento,
    TipoMoto,
    Transacciones
} from '../database'

import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

router.post('/create', async (req, res) => {
    return sequelize.transaction().then(async t => {
        console.log(req.body)
        try {
            const result = await OrdenEntrada.create(req.body.orden, { transaction: t });
            await Transacciones.create({
                id: 0,
                tabla: 'OrdenEntrada',
                evento: 'Create',
                registro: result.dataValues,
                adminId: req.body.orden.adminId
            }, { transaction: t });

            /*const l = await req.body.lista.map(function (item) {
              item.tipo_motoId = JSON.parse(JSON.stringify(result.id))
              console.log("id  : " + JSON.parse((item)))
              return JSON.parse(item)
            })*/

            //console.log('lt => ' +JSON.parse(JSON.stringify(l)))
            //const resultTabla = await TablaMantenimiento.bulkCreate(l, { transaction: t });
            await Servicios.bulkCreate(req.body.lista,{transaction: t})
            
            /*const lt = await resultTabla.map(function (item) {
              return {
                id: 0,
                tabla: 'tabla_mantenimiento',
                evento: 'Create',
                registro: item.dataValues,
                adminId: req.body.adminId
              }
            })*/
            //console.log(lt)
            //await Transacciones.bulkCreate(lt, { transaction: t });
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


router.post('/finalizar', async (req, res) => {
    return sequelize.transaction().then(async t => {
        try {
            const result = await OrdenEntrada.update(req.body.orden, { where: { id: req.body.orden.id }, transaction: t });
            console.log(result)
            /*if (result[0]) {

                await Transacciones.create({
                    id: 0,
                    tabla: 'marca',
                    evento: 'Update',
                    registro: { id: req.body.id, nombre: req.body.nombre },
                    adminId: req.body.adminId
                }, { transaction: t });
            }*/

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

//Busca todas las ordenes iniciadas
router.post('/findAllIniciadas', async (req, res) => {
    return sequelize.transaction(t => {
        return OrdenEntrada.findAll({
            where: {
                estado: 'Iniciado'
            },
            include: [
                { model: Persona, as: 'tecnico', attributes: ['nombre'] },
                { model: Moto, 
                    include: [
                        {model: Persona, attributes: ['nombre', 'telefono', 'direccion']} ,
                        {model: TipoMoto, include:[Marca]}
                    
                    ]
                },
                { model: Servicios, include: [{ model: ServicioTaller }] }
            ],
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

//Saber si la moto se encuentra en el taller
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

//Busca todas las ordenes por moto
router.post('/findAllByMoto', async (req, res) =>{
    return sequelize.transaction(t =>{
        return OrdenEntrada.findAll({
            where:{
                motoId: req.body.motoId
            },
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


//ultima orden saber id
router.post('/ultimaOrden', async (req, res)=>{
    return sequelize.transaction(t => {
        return OrdenEntrada.findAll({
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