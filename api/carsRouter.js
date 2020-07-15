const express = require('express');

const db = require("../data/connection.js");

const router = express.Router();

router.get("/", (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        })
});

router.get("/:id", (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .first()
        .then(car => {
            if (!car) {
                res.status(404).json({ error: 'account not found' });
            }
            res.status(200).json(car);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        })
});

router.post('/', (req, res) => {
    db('cars')
        .insert(req.body, 'id')
        .then(acc => {
            res.status(201).json({ id: acc[0], ...req.body });
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        })
});

router.put('/:id', (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .update(req.body)
        .then(change => {
            if (change === 0) {
                res.status(404).json({ error: 'account not found' });
            }
            res.status(200).json({ message: 'changes applied' });
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/:id', (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .del()
        .then(change => {
            if (change === 0) {
                res.status(404).json({ error: 'account not found' });
            }
            res.status(200).json({ message: 'account deleted' });
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong' });
        })
});

module.exports = router;
