const pool = require('../db/pool');
const bcrypt = require('bcrypt');
const insertUsuarios = async () => {
  try {
    // Hashear contraseñas
    const hashed1 = await bcrypt.hash('casa2024', 10);
    const hashed2 = await bcrypt.hash('pass12345', 10);
    const hashed3 = await bcrypt.hash('sol12345', 10);

    const query = `
      INSERT INTO usuarios (documento, contrasena, is_admin)
      VALUES 
      ($1, $2, $3),
      ($4, $5, $6),
      ($7, $8, $9)
    `;

    const values = [
      1002003004, hashed1, true,
      1002003005, hashed2, true,
      1002003006, hashed3, false
    ];

    await pool.query(query, values);
    console.log('✅ Usuarios insertados correctamente con contraseñas hasheadas');
  } catch (error) {
    console.error('❌ Error al insertar usuarios:', error);
  }
};


    // // --- Insertar estudiantes ---
const insertEstudiantes = async () => {
  try {
    const estudiantesQuery = `
      INSERT INTO estudiantes (nombre, documento, correo, grado, clave)
      VALUES
      ($1,$2,$3,$4,$5),
      ($6,$7,$8,$9,$10),
      ($11,$12,$13,$14,$15),
      ($16,$17,$18,$19,$20),
      ($21,$22,$23,$24,$25),
      ($26,$27,$28,$29,$30),
      ($31,$32,$33,$34,$35),
      ($36,$37,$38,$39,$40),
      ($41,$42,$43,$44,$45),
      ($46,$47,$48,$49,$50),
      ($51,$52,$53,$54,$55),
      ($56,$57,$58,$59,$60)



`;

const estudiantesValues = [
'Ana María López', 1023456789, 'ana.lopez@cefa.edu.co', 'SEXTO UNO', 1234,
'Carla Pérez', 9876543210, 'carla.perez@cefa.edu.co', 'SEXTO UNO', 2345,
'Salome Bermudez Álzate', 1067891234, 'salome.alzate@cefa.edu.co', 'SEXTO UNO', '6789',
'Andrea Gómez Peláez', 1076543210, 'andre.gmz@cefa.edu.co', 'SEXTO DOS', '7123',
'Alejandra López Cardona', 1089456723, 'alj.lopez@cefa.edu.co', 'SEXTO DOS', '7124',
'Samanta Suarez Jaramillo', 1098765432, 'samanta.srz@cefa.edu.co', 'SEXTO DOS', '7125',
'Juana Gonzales Cadavid', 1290123456, 'juanita.gonzales@cefa.edu.co', 'SÉPTIMO UNO', '7126',
'Carla Guzmán Arteaga', 1301234567, 'guz.carla@cefa.edu.co', 'SÉPTIMO UNO', '7126',
'Carla Torres Gómez', 1312345678, 'torre.carla@cefa.edu.co', 'SÉPTIMO UNO', '7127',
'Hillary Marulanda Yépez', 1323456789, 'hiry.marulanda@cefa.edu.co', 'SÉPTIMO DOS', '7128',
'Gabriela Rojas Tamayo', 3134567890, 'gabriela.rojas@cefa.edu.co', 'SÉPTIMO DOS', '7129',
'Ximena Castrillón Álvarez', 1145678991, 'castrillon.xime@cefa.edu.co', 'SÉPTIMO DOS', '7130'

];

    await pool.query(estudiantesQuery, estudiantesValues);
    console.log('✅ Estudiantes insertados correctamente');
  } catch (error) {
    console.error('❌ Error al insertar estudiantes:', error);
  }
};

module.exports = insertEstudiantes;

 // 👈 Esto ejecuta la función automáticamente

    // await pool.query(estudiantesQuery, estudiantesValues);

    // // --- Eliminar usuarios por ID (si deseas hacerlo) ---
    // // const deleteResult = await pool.query(
    // //   'DELETE FROM usuarios WHERE id BETWEEN $1 AND $2',
    // //   [6, 23]
    // // );

    // // ✅ Una sola respuesta al cliente
    // res.status(200).json({
    //   mensaje: 'Operaciones completadas correctamente',
    //   estudiantes_insertados: 3,
    //   // usuarios_eliminados: deleteResult.rowCount
    // });

// const insertData = async (req, res) => {
//   try {
// const result = await pool.query(`SELECT * FROM estudiantes`);
// console.log(result.rows);

    
//   } catch (error) {
//     console.error('❌ Error en insertData:', error.message);
//     res.status(500).send('❌ Error al procesar los datos');
//   }
// };

// module.exports = insertEstudiantes;
