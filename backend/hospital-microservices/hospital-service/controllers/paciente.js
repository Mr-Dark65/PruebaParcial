const Paciente = require('../models/paciente');

class PacienteController {
  constructor(db) {
    this.paciente = new Paciente(db);
  }

  async getAll(req, res) {
    console.log('Iniciando GET /pacientes', {
      headers: req.headers,
      query: req.query
    });
    
    try {
      const startTime = Date.now();
      const pacientes = await this.paciente.getAll();
      const duration = Date.now() - startTime;
      
      console.log(`GET /pacientes completado en ${duration}ms`);
      return res.json({
        success: true,
        count: pacientes.length,
        data: pacientes,
        duration: `${duration}ms`
      });
      
    } catch (error) {
      console.error('Error crítico en GET /pacientes:', error);
      return res.status(500).json({
        success: false,
        error: 'Error al obtener pacientes',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  async getById(req, res) {
    try {
      const paciente = await this.paciente.getById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente no encontrado' });
      }
      res.json(paciente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, apellido, cedula, fecha_nacimiento } = req.body;
      
      if (!nombre || !apellido || !cedula || !fecha_nacimiento) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Validar cédula única
      const pacienteExistente = await this.paciente.findByCedula(cedula);
      if (pacienteExistente) {
        return res.status(400).json({ error: 'La cédula ya está registrada' });
      }

      const newPaciente = await this.paciente.create(
        nombre,
        apellido,
        cedula,
        fecha_nacimiento
      );
      res.status(201).json(newPaciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { nombre, apellido, cedula, fecha_nacimiento } = req.body;
      const updatedPaciente = await this.paciente.update(
        req.params.id,
        nombre,
        apellido,
        cedula,
        fecha_nacimiento
      );
      res.json(updatedPaciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.paciente.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PacienteController;