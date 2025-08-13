const { Router } = require('express');
const router = Router();

const { validarJwt } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

router.use(validarJwt);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('notes', 'Las notas son opcionales').optional().isString(),
        check('start', 'La fecha de inicio es obligatoria').isISO8601().toDate(),
        check('end', 'La fecha de fin es obligatoria').isISO8601().toDate(),
        validarCampos
    ],
    createEvent
);

router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('notes', 'Las notas son opcionales').optional().isString(),
        check('start', 'La fecha de inicio es obligatoria').isISO8601().toDate(),
        check('end', 'La fecha de fin es obligatoria').isISO8601().toDate(),
        validarCampos
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
