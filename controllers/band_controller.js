const band = require('express').Router()
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

// FIND ALL BANDS
band.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            attributes: [['name','Band Name'], 'genre', ['available_start_time', 'Start Time']],
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (e) {
        res.status(500).json(e)
    }
})

// FIND ONE BAND BY ID
band.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json(foundBand)
    } catch (e) {
        res.status(500).json(e)
    }
})

// CREATE A BAND
band.post('/', async(req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json({
            message: 'New band created',
            data: newBand
        })
    } catch (e) {
        res.status(500).json(e)
    }
})

// UPDATE A BAND
band.put('/:id', async(req, res) => {
    try {
        const updatedBand = await Band.update(req.body, {
            where: { band_id: req.params.id }
        })
        res.status(200).json({
            message: `Updated  ${updatedBand} band(s)`
        })
    } catch(e) {
        res.status(500).json(e)
    }
})

// DESTROY A BAND
band.delete('/:id', async(req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: { band_id: req.params.id }
        })
        res.status(200).json({
            message: `Deleted ${deletedBand} band(s)`
        })
    } catch(e) {
        res.status(500).json(e)
    }
})

module.exports = band