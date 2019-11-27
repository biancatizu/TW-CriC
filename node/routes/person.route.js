const express = require('express');
const router = express.Router();

const personController = require('../controllers/person.controller');

router.get('/getAll', personController.getAll);
router.post('/create', personController.create);
router.get('/:id', personController.getPerson);
router.put('/:id/update', personController.update);
router.delete('/:id/delete',personController.delete);
module.exports = router;