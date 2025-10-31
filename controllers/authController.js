const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
require('dotenv').config()
exports.register = async (req, res) => {
  const { name, email, password, is_admin = false } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, name, email, is_admin',
      [name, email, hashedPassword, is_admin]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { documento, contrasena } = req.body;
  console.log('hola',documento,contrasena);
  
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE documento = $1', [documento]);
    console.log('usuarios',await pool.query('SELECT * FROM usuarios '));
    if (result.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const user = result.rows[0];
    console.log(documento);
    console.log(contrasena);

    const match = await bcrypt.compare(contrasena, user.contrasena);
    console.log(match,'match');
    
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, documento: user.documento, is_admin: user.is_admin },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

