import express from 'express'
import { sequelize, Marca, TipoMoto, Transacciones } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op


//Create Servicio Taller
router.post('/create', async (req, res) => {
	return sequelize.transaction().then(async t => {
		try {
			const result = await ServicioTaller.create(req.body, { transaction: t });
			await Transacciones.create({
				id: 0,
				tabla: 'servicio_taller',
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

// Update Servicio Taller
router.post('/update', async (req, res) => {
	return sequelize.transaction().then(async t => {
		try {
			const result = await ServicioTaller.update(req.body, { where: { id: req.body.id }, transaction: t });
			//console.log(result[0])
			if (result[0]) {
				await Transacciones.create({
					id: 0,
					tabla: 'servicio_taller',
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

//Listar Servicios taller con nombre ascendente
router.post('/findAll', async (req, res) => {
	return sequelize.transaction(t => {
		return ServicioTaller.findAll({
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