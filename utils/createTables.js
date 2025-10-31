const pool = require('../db/pool');
const bcrypt = require('bcrypt');

// --- Crear tablas ---
const createTables = async (req, res) => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS estudiantes CASCADE;
      DROP TABLE IF EXISTS usuarios CASCADE;

      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        documento BIGINT NOT NULL,
        contrasena TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS estudiantes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        documento BIGINT NOT NULL,
        correo VARCHAR(100) NOT NULL,
        grado VARCHAR(100) NOT NULL,
        clave BIGINT NOT NULL
      );
    `);

    res.send('✅ Tablas creadas correctamente');
  } catch (error) {
    console.error('❌ Error al crear tablas:', error);
    res.status(500).send('❌ Error al crear las tablas');
  }
};

module.exports = createTables;
