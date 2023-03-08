const express = require('express');
const router = express.Router()
const {check, validationResult} = require("express-validator")



let fruits = [
    {
        name: "Apple",
        color: "Red"
    },
    {
        name: "Banana",
        color: "Yellow"
    },
    {
        name: "Kiwi",
        color: "Green"
    },
    {
        name: "Grape",
        color: "Purple"
    },
]

router.get('/', async(req, res) => {
    res.json(fruits)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const fruit = fruits[id - 1]
    res.json(fruit)
})

router.post('/', [check("color").not().isEmpty().trim()], async(req, res) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() });
	} else {

        const {name, color} = req.body
    
        const newFruit = {
            name,
            color
        }
    
        fruits.push(newFruit)
    
        res.json(fruits)
    }
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const {name, color} = req.body

    if(name) fruits[id - 1].name = name
    if(color) fruits[id - 1].color = color

    res.json(fruits[id - 1])
})

router.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id)

    fruits.splice(id - 1, 1)
    res.send('deleted')
})
module.exports = router