// DEPENDENCIES 

const band = require('express').Router()
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')
   

// FIND ALL BANDS
band.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ONE BAND
band.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


// CREATE BAND
band.post('/', async (req, res) => {
    try {
        const createdBand = await Band.create(req.body)
        res.status(200).json(createdBand)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// UPDATE BAND
band.put('/:id', async (req, res) => {
    try {
        const updatedBand = await Band.update(req.body, {
            where: { band_id: req.params.id },
            returning: true
        })
        res.status(200).json(updatedBand)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// DELETE BAND
band.delete('/:id', async (req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: { band_id: req.params.id }
        })
        res.status(200).json(deletedBand)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = band
