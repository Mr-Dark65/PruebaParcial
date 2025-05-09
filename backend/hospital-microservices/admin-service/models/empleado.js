class Empleado {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      const [rows] = await this.db.query(`
        SELECT e.id, e.nombre,e.apellido,e.correo,e.cargo, cm.nombre as centro_medico_nombre 
        FROM empleado e
        LEFT JOIN centro_medico cm ON e.id_centro_medico = cm.id
      `);
      return rows;
    }
  
    async getById(id) {
      const [rows] = await this.db.query(`
        SELECT e.nombre,e.apellido,e.correo,e.cargo, cm.nombre as centro_medico_nombre 
        FROM empleado e
        LEFT JOIN centro_medico cm ON e.id_centro_medico = cm.id
        WHERE e.id = ?
      `, [id]);
      return rows[0];
    }
  
    async create(nombre, apellido, correo, cargo, id_centro_medico) {
      const [result] = await this.db.query(
        'INSERT INTO empleado (nombre, apellido, correo, cargo, id_centro_medico,rol) VALUES ( ?, ?, ?, ?, ?,?)',
        [nombre, apellido, correo, cargo, id_centro_medico,cargo]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, nombre, apellido, correo, cargo, id_centro_medico) {
      await this.db.query(
        'UPDATE empleado SET nombre = ?, apellido = ?, correo = ?, cargo = ?, id_centro_medico = ? WHERE id = ?',
        [nombre, apellido, correo, cargo, id_centro_medico, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM empleado WHERE id = ?', [id]);
      return { message: 'Empleado eliminado correctamente' };
    }
  
    async findByEmail(correo) {
      const [rows] = await this.db.query('SELECT * FROM empleado WHERE correo = ?', [correo]);
      return rows[0];
    }
  }
  
  module.exports = Empleado;