class Especialidad {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      const [rows] = await this.db.query('SELECT * FROM especialidad');
      return rows;
    }
  
    async getById(id) {
      const [rows] = await this.db.query('SELECT * FROM especialidad WHERE id = ?', [id]);
      return rows[0];
    }
  
    async create(nombre) {
      const [result] = await this.db.query(
        'INSERT INTO especialidad (nombre) VALUES (?)',
        [nombre]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, nombre) {
      await this.db.query(
        'UPDATE especialidad SET nombre = ? WHERE id = ?',
        [nombre, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM especialidad WHERE id = ?', [id]);
      return { message: 'Especialidad eliminada correctamente' };
    }
  }
  
  module.exports = Especialidad;