import express from 'express'
import { sequelize, Marca, TipoMoto, Transacciones } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

//Create Marca
router.post('/create', async (req, res) => {
  return sequelize.transaction().then(async t => {
    console.log(req.body)
    try {
      const result = await Marca.create(req.body, { transaction: t });
      await Transacciones.create({
        id: 0,
        tabla: 'marca',
        evento: 'Create',
        registro: { id: result.id, nombre: req.body.nombre },
        adminId: req.body.adminId
      }, { transaction: t });
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

//Update Marca
router.post('/update', async (req, res) => {
  return sequelize.transaction().then(async t => {
    try {
      const result = await Marca.update(req.body, { where: { id: req.body.id }, transaction: t });
      console.log(result)
      if (result[0]) {

        await Transacciones.create({
          id: 0,
          tabla: 'marca',
          evento: 'Update',
          registro: { id: req.body.id, nombre: req.body.nombre },
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

//Listar Marcas con nombre ascendente
router.post('/findAll', async (req, res) => {
  return sequelize.transaction(t => {
    return Marca.findAll({
      order: [
        ['nombre', 'asc']
      ], transaction: t
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

//Listar Marcas y Tipos para q-selected
router.post('/findAllMarcaTipoMaps', async (req, res) => {
  return sequelize.transaction(t => {
    return Marca.findAll({
      order: [
        ['nombre', 'asc']
      ],
      attributes: [['id', 'value'], ['nombre', 'label']],
      include: [{ model: TipoMoto, attributes: [['id', 'value'], ['referencia', 'label'], ['marcaId', 'marcaId']], order: ['label', 'asc'], required: true }],
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

//Listar Marcas para q-selected
router.post('/findAllMarcaMaps', async (req, res) => {
  return sequelize.transaction(t => {
    return Marca.findAll({
      order: [
        ['nombre', 'asc']
      ],
      attributes: [['id', 'value'], ['nombre', 'label']],
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