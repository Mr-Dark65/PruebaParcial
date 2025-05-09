class CentroMedico {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      const [rows] = await this.db.query('SELECT * FROM centro_medico');
      return rows;
    }
  
    async getById(id) {
      const [rows] = await this.db.query('SELECT * FROM centro_medico WHERE id = ?', [id]);
      return rows[0];
    }
  
    async create(nombre, direccion) {
      const [result] = await this.db.query(
        'INSERT INTO centro_medico (nombre, direccion) VALUES (?, ?)',
        [nombre, direccion]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, nombre, direccion) {
      await this.db.query(
        'UPDATE centro_medico SET nombre = ?, direccion = ? WHERE id = ?',
        [nombre, direccion, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM centro_medico WHERE id = ?', [id]);
      return { message: 'Centro médico eliminado correctamente' };
    }
  }
  
  module.exports = CentroMedico;