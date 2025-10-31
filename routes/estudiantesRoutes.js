const express = require('express');
const router = express.Router();

const {
  getEstudiantesBygrado,
  createEstudiante,
  getEstudiantes,
  getEstudianteById,
  updateEstudiante,
  deleteEstudiante
} = require('../controllers/estudiantesController');

// ✅ Obtener estudiantes por grado (ejemplo: /api/estudiantes/grado/6-1)
router.get('/grado/:grado', getEstudiantesBygrado);

// ✅ Obtener todos los estudiantes o filtrar por query (?grado=6-1)
router.get('/', getEstudiantes);

// ✅ Obtener estudiante por ID (ejemplo: /api/estudiantes/5)
router.get('/:id', getEstudianteById);

// ✅ Crear estudiante
router.post('/', createEstudiante);

// ✅ Actualizar estudiante
router.put('/:id', updateEstudiante);

// ✅ Eliminar estudiante
router.delete('/:id', deleteEstudiante);

module.exports = router;
