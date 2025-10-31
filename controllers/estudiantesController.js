const pool = require('../db/pool');

// ✅ Crear estudiante
exports.createEstudiante = async (req, res) => {
  const { nombre, documento, correo, grado, clave } = req.body;

  if (!nombre || !documento || !correo || !grado || !clave) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO estudiantes (nombre, documento, correo, grado, clave)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, documento, correo, grado, clave]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear estudiante:', error.message);
    res.status(500).json({ error: 'Error al guardar estudiante' });
  }
};

// ✅ Obtener todos los estudiantes o por grado (query)
exports.getEstudiantes = async (req, res) => {
  try {
    const grado = req.query.grado;

    let consulta = "SELECT id, nombre, documento, correo, grado, clave FROM estudiantes";
    let datos = [];

    if (grado) {
      consulta += " WHERE grado = $1 ORDER BY nombre ASC";
      datos.push(grado);
    } else {
      consulta += " ORDER BY nombre ASC";
    }

    const resultado = await pool.query(consulta, datos);
    res.json(resultado.rows);
  } catch (error) {
    console.error("Hubo un error al obtener los estudiantes:", error.message);
    res.status(500).json({ error: "No se pudieron obtener los estudiantes" });
  }
};

// ✅ Obtener estudiante por ID
exports.getEstudianteById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, nombre, documento, correo, grado FROM estudiantes WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al buscar estudiante:', error.message);
    res.status(500).json({ error: 'Error al obtener estudiante' });
  }
};

// ✅ Obtener estudiantes por grado (versión con depuración)
exports.getEstudiantesBygrado = async (req, res) => {
  const { grado } = req.params;

  console.log("📩 Grado recibido:", grado);

  try {
    const result = await pool.query(
      'SELECT id, nombre, documento, correo, grado, clave FROM estudiantes WHERE grado = $1 ORDER BY nombre ASC',
      [grado]
    );

    console.log("✅ Resultado de la consulta:", result.rows.length, "filas");

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron estudiantes para ese grado' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error exacto en getEstudiantesBygrado:", error);
    res.status(500).json({ error: 'Error al obtener estudiantes por grado', detalle: error.message });
  }
};


// ✅ Actualizar estudiante
exports.updateEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, documento, correo, grado, clave } = req.body;

  try {
    const result = await pool.query(
      `UPDATE estudiantes
       SET nombre = $1, documento = $2, correo = $3, grado = $4, clave = $5
       WHERE id = $6
       RETURNING *`,
      [nombre, documento, correo, grado, clave, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error.message);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

// ✅ Eliminar estudiante
exports.deleteEstudiante = async (req, res) => {


  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM estudiantes WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error.message);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};
