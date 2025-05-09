class Usuario {
    constructor(db) {
      this.db = db;
    }
  
    async findByEmail(email) {
      const [rows] = await this.db.query('SELECT * FROM usuario WHERE email = ?', [email]);
      return rows[0];
    }
  
    async create({ email, password, rol, idEntidad }) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await this.db.query(
        'INSERT INTO usuario (email, password, rol, id_entidad_asociada) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, rol, idEntidad]
      );
      return this.findById(result.insertId);
    }
  
    async findById(id) {
      const [rows] = await this.db.query('SELECT id, email, rol FROM usuario WHERE id = ?', [id]);
      return rows[0];
    }
  }
  
  module.exports = Usuario;