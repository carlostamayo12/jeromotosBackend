import express from 'express'
import { sequelize, Marca, Moto, TipoMoto, Persona, Transacciones } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

//Create Moto
router.post('/create', async (req, res) => {
	return sequelize.transaction().then(async t => {
		console.log(req.body)
		try {
			const result = await Moto.create(req.body, { transaction: t });
			await Transacciones.create({
				id: 0,
				tabla: 'moto',
				evento: 'Create',
				//registro: { id: result.id, nombre: req.body.nombre },
				registro:result.dataValues,
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




router.post('/findAll', async (req, res) => {
	return sequelize.transaction(t => {
		return Moto.findAll({
			include: [
				{ model: TipoMoto, include: [{ model: Marca }] },
				{ model: Persona }
			], order: [
				['placa', 'asc']
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