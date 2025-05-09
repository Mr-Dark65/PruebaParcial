class ConsultaMedica {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      const [rows] = await this.db.query('SELECT * FROM consulta_medica');
      return rows;
    }
  
    async getById(id) {
      const [rows] = await this.db.query('SELECT * FROM consulta_medica WHERE id = ?', [id]);
      return rows[0];
    }
  
    async create(fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente) {
      const [result] = await this.db.query(
        'INSERT INTO consulta_medica (fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente) VALUES (?, ?, ?, ?, ?, ?)',
        [fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente) {
      await this.db.query(
        'UPDATE consulta_medica SET fecha = ?, motivo = ?, diagnostico = ?, tratamiento = ?, id_medico = ?, id_paciente = ? WHERE id = ?',
        [fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM consulta_medica WHERE id = ?', [id]);
      return { message: 'Consulta médica eliminada correctamente' };
    }
  
    async getByMedico(id_medico) {
      const [rows] = await this.db.query(
        'SELECT * FROM consulta_medica WHERE id_medico = ?',
        [id_medico]
      );
      return rows;
    }
  }
  
  module.exports = ConsultaMedica;