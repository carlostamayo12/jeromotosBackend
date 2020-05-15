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

//Create Moto
router.post('/create', async (req, res) => {
	return sequelize.transaction().then(async t => {
		//console.log(req.body)
		try {
			const result = await Moto.create(req.body.moto, { transaction: t });
			await Transacciones.create({
				id: 0,
				tabla: 'moto',
				evento: 'Create',
				//registro: { id: result.id, nombre: req.body.nombre },
				registro: result.dataValues,
				adminId: req.body.moto.adminId
			}, { transaction: t });

			await Contador.bulkCreate(req.body.lista, { transaction: t })

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

router.post('/findByPlaca', async (req, res) => {
	return sequelize.transaction(t => {
		return Moto.findAll({
			where: {
				placa: req.body.placa
			},
			include: [{ model: TipoMoto, attributes: ['referencia'], include: [{ model: Marca, attributes: ['nombre'] }] },
				{ model: Persona ,attributes: ['nombre', 'telefono', 'direccion']}]
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

router.post('/findOneByPlacaNew', async (req, res) => {
	return sequelize.transaction(t => {
		return Moto.findOne({
			where: {
				placa: req.body.placa
			},
			include: [
				{
					model: TipoMoto, attributes: ['referencia'],
					include: [
						{ model: Marca, attributes: ['nombre'] },
						{
							model: TablaMantenimiento, where: { estado: 1 },
							include: [{ model: ServicioTaller }]
						}
					]
				},
				{ model: Persona, attributes: ['nombre', 'telefono', 'direccion'] },
				{ model: OrdenEntrada, where: { estado: 'Iniciado' }, attributes: ['id'], required: false },
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

//Ultimo id
router.post('/lastId', async (req, res) =>{
	return sequelize.transaction(t =>{
		return Moto.findAll({
			order: [['id', 'DESC']], transaction:t
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