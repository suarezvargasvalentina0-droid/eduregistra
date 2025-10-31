const pool = require('../db/pool');

exports.createReview = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) return res.status(400).json({ error: 'Contenido requerido' });

  try {
    const result = await pool.query(
      'INSERT INTO reviews (user_id, content) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ error: 'Error al guardar reseña' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id, r.content, r.created_at, u.name AS user_name
      FROM usuarios r
      JOIN usuarios u ON r.usuarios_id = u.id
      LEFT JOIN estudiantes e ON e.usuario_id = u.id
      ORDER BY r.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener reseñas:', error.message);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

exports.deleteReview = async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Acceso solo para administradores' });
  }

  const reviewId = req.params.id;

  try {
    await pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error.message);
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
};


// const pool = require('../db/pool');

exports.createEstudiante = async (req, res) => {
  const { nombre, documento, correo, grupo, clave } = req.body;

  if (!nombre || !documento || !correo || !grupo || !clave) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO estudiantes (nombre, documento, correo, grupo, clave) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, documento, correo, grupo, clave]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ error: 'Error al guardar estudiante' });
  }
};

exports.getEstudiantes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nombre, documento, correo, grupo
      FROM estudiantes
      ORDER BY nombre ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error.message);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

exports.deleteEstudiante = async (req, res) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ error: 'Acceso solo para administradores' });
  }

  const estudianteId = req.params.id;

  try {
    await pool.query('DELETE FROM estudiantes WHERE id = $1', [estudianteId]);
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error.message);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};