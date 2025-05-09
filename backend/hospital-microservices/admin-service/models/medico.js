class Medico {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      const [rows] = await this.db.query(`
        SELECT m.id,m.nombre,m.apellido,m.correo, e.nombre as especialidad, cm.nombre as centro_medico
        FROM medico m
        LEFT JOIN especialidad e ON m.id_especialidad = e.id
        LEFT JOIN centro_medico cm ON m.id_centro_medico = cm.id
      `);
      return rows;
    }
  
    async getById(id) {
      const [rows] = await this.db.query(`
        SELECT m.id,m.nombre,m.apellido,m.correo, e.nombre as especialidad, cm.nombre as centro_medico
        FROM medico m
        LEFT JOIN especialidad e ON m.id_especialidad = e.id
        LEFT JOIN centro_medico cm ON m.id_centro_medico = cm.id
        WHERE m.id = ?
      `, [id]);
      return rows[0];
    }
  
    async create(nombre, apellido, correo, id_especialidad, id_centro_medico,rol) {
      const [result] = await this.db.query(
        'INSERT INTO medico (nombre, apellido, correo, id_especialidad, id_centro_medico,rol) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, correo, id_especialidad, id_centro_medico,rol]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, nombre, apellido, correo, id_especialidad, id_centro_medico) {
      await this.db.query(
        'UPDATE medico SET nombre = ?, apellido = ?, correo = ?, id_especialidad = ?, id_centro_medico = ? WHERE id = ?',
        [nombre, apellido, correo, id_especialidad, id_centro_medico, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM medico WHERE id = ?', [id]);
      return { message: 'Médico eliminado correctamente' };
    }
  
    async findByEmail(correo) {
      const [rows] = await this.db.query('SELECT * FROM medico WHERE correo = ?', [correo]);
      return rows[0];
    }
  }
  
  module.exports = Medico;