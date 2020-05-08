import express from 'express'
import { sequelize, Persona, Transacciones } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

// Persona Create 
router.post('/create', async (req, res) => {
	return sequelize.transaction().then(async t => {
		try {
			const result = await Persona.create(req.body, { transaction: t });
			await Transacciones.create({
				id: 0,
				tabla: 'persona',
				evento: 'Create',
				registro: result.dataValues,
				adminId: req.body.adminId
			}, { transaction: t });

			if(result.dataValues.rol > 1){
				console.log(result.dataValues.id)
				const admin = await User.create({id:0, user:result.dataValues.identificacion, userId:result.dataValues.id},{transaction: t})
				await Transacciones.create({id:0,tabla:'user',evento:'Create',registro: admin.dataValues, adminId:req.body.adminId},{transaction: t})
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

//FindOne By id
router.post('/findOne', async (req, res) => {
  return sequelize.transaction(t => {
    return Persona.findOne({
      where:{
        id: 1
      },
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

//Find All nombre asc
router.post('/findAll', async (req, res) => {
	return sequelize.transaction(t => {
		return Persona.findAll({
			order: [
				['nombre', 'asc']
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
export default router