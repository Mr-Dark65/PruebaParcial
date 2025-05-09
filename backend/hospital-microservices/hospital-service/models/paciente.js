class Paciente {
    constructor(db) {
      this.db = db;
    }
  
    async getAll() {
      try {
        console.log('Ejecutando consulta GET ALL pacientes');
        const [rows] = await this.db.query('SELECT * FROM paciente');
        console.log(`Consulta exitosa. ${rows.length} pacientes encontrados`);
        return rows;
      } catch (error) {
        console.error('Error en modelo Paciente.getAll():', error);
        throw new Error(`Error al obtener pacientes: ${error.message}`);
      }
    }
  
    async getById(id) {
      const [rows] = await this.db.query('SELECT * FROM paciente WHERE id = ?', [id]);
      return rows[0];
    }
  
    async create(nombre, apellido, cedula, fecha_nacimiento) {
      const [result] = await this.db.query(
        'INSERT INTO paciente (nombre, apellido, cedula, fecha_nacimiento) VALUES (?, ?, ?, ?)',
        [nombre, apellido, cedula, fecha_nacimiento]
      );
      return this.getById(result.insertId);
    }
  
    async update(id, nombre, apellido, cedula, fecha_nacimiento) {
      await this.db.query(
        'UPDATE paciente SET nombre = ?, apellido = ?, cedula = ?, fecha_nacimiento = ? WHERE id = ?',
        [nombre, apellido, cedula, fecha_nacimiento, id]
      );
      return this.getById(id);
    }
  
    async delete(id) {
      await this.db.query('DELETE FROM paciente WHERE id = ?', [id]);
      return { message: 'Paciente eliminado correctamente' };
    }
  
    async findByCedula(cedula) {
      const [rows] = await this.db.query('SELECT * FROM paciente WHERE cedula = ?', [cedula]);
      return rows[0];
    }
  }
  
  module.exports = Paciente;