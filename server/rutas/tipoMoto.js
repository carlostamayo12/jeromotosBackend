import express from 'express'
import { sequelize, Marca, TipoMoto, Transacciones, ServicioTaller } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op


//Crear Tipo Moto y Tabla de Mantenimiento
router.post('/create', async (req, res) => {
  //console.log(req.body)
  return sequelize.transaction().then(async t => {
    try {
      const result = await TipoMoto.create(req.body, { transaction: t });
      await Transacciones.create({
        id: 0,
        tabla: 'tipo_moto',
        evento: 'Create',
        registro: result.dataValues,
        adminId: req.body.adminId
      }, { transaction: t });

      /*const l = await req.body.lista.map(function (item) {
        item.tipo_motoId = JSON.parse(JSON.stringify(result.id))
        console.log("id  : " + JSON.parse((item)))
        return JSON.parse(item)
      })*/

      //console.log('lt => ' +JSON.parse(JSON.stringify(l)))
      //const resultTabla = await TablaMantenimiento.bulkCreate(l, { transaction: t });

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

//Listar Los tipos de moto
router.post('/findAll', async (req, res) => {
  return sequelize.transaction(t => {
    return TipoMoto.findAll({
      order: [
        ['referencia', 'asc']
      ],
      include: [{ model: Marca }],
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