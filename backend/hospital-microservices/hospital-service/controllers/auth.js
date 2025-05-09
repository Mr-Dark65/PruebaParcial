const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth: { jwtSecret, jwtExpiresIn } } = require('../config/config');

class AuthController {
  constructor(db) {
    this.db = db;
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const [rows] = await this.db.query('SELECT * FROM usuario WHERE email = ?', [email]);
      const usuario = rows[0];
      if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' });

      let userData = {};
      
      // Si el rol es medico, obtenemos los datos adicionales
      if (usuario.rol === 'medico') {
        const [medico] = await this.db.query('SELECT * FROM medico WHERE id = ?', [usuario.id_entidad_asociada]);
        userData = { nombre: medico[0].nombre, especialidad: medico[0].id_especialidad };
      }

      // Si el rol es empleado, obtenemos los datos del empleado
      if (usuario.rol === 'empleado') {
        const [empleado] = await this.db.query('SELECT * FROM empleado WHERE id = ?', [usuario.id_entidad_asociada]);
        userData = { nombre: empleado[0].nombre, cargo: empleado[0].cargo };
      }

      // Si el rol es admin, no necesitamos datos adicionales
      if (usuario.rol === 'admin') {
        userData = { nombre: 'Administrador' }; // Puedes agregar más datos del admin si es necesario
      }

      // Crear el token JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          rol: usuario.rol,
          entidadId: usuario.id_entidad_asociada
        },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
      );

      res.json({
        token,
        user: {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol,
          ...userData
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  async register(req, res) {
    const { email, password, rol } = req.body;

    try {
      const [existingRows] = await this.db.query('SELECT * FROM usuario WHERE email = ?', [email]);
      if (existingRows.length > 0) {
        return res.status(409).json({ error: 'El usuario ya está registrado' });
      }

      let entidadId = null;

      // Verificar rol y asociar entidad
      if (rol === 'medico') {
        const [rows] = await this.db.query('SELECT id FROM medico WHERE correo = ?', [email]);
        if (!rows.length) {
          return res.status(404).json({ error: 'El correo no pertenece a ningún médico registrado' });
        }
        entidadId = rows[0].id;
      } else if (rol === 'empleado') {
        const [rows] = await this.db.query('SELECT id FROM empleado WHERE correo = ?', [email]);
        if (!rows.length) {
          return res.status(404).json({ error: 'El correo no pertenece a ningún empleado registrado' });
        }
        entidadId = rows[0].id;
      } else if (rol === 'admin') {
        // Los administradores no necesitan entidad asociada
        entidadId = null; // No asignamos entidad a un administrador
      } else {
        return res.status(400).json({ error: 'Rol inválido' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await this.db.query(
        `INSERT INTO usuario (email, password, rol, id_entidad_asociada) VALUES (?, ?, ?, ?)`,
        [email, hashedPassword, rol, entidadId]
      );

      res.status(201).json({ message: 'Usuario registrado correctamente', id: result.insertId });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor al registrar' });
    }
  }
}

module.exports = AuthController;
