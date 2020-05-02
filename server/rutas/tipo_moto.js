import express from 'express'
import { sequelize, Marca, TipoMoto, Transacciones } from '../database'
import Sequelize from 'sequelize'
import error from '../functions/error'

var router = express.Router()
const Op = Sequelize.Op

export default router