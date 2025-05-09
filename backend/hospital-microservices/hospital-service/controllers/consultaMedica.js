const ConsultaMedica = require('../models/consultaMedica');

class ConsultaMedicaController {
  constructor(db) {
    this.consultaMedica = new ConsultaMedica(db);
  }

  async getAll(req, res) {
    try {
      const consultas = await this.consultaMedica.getAll();
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const consulta = await this.consultaMedica.getById(req.params.id);
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta médica no encontrada' });
      }
      res.json(consulta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente } = req.body;
      const newConsulta = await this.consultaMedica.create(
        fecha,
        motivo,
        diagnostico,
        tratamiento,
        id_medico,
        id_paciente
      );
      res.status(201).json(newConsulta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { fecha, motivo, diagnostico, tratamiento, id_medico, id_paciente } = req.body;
      const updatedConsulta = await this.consultaMedica.update(
        req.params.id,
        fecha,
        motivo,
        diagnostico,
        tratamiento,
        id_medico,
        id_paciente
      );
      res.json(updatedConsulta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.consultaMedica.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByMedico(req, res) {
    try {
      const consultas = await this.consultaMedica.getByMedico(req.params.id_medico);
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ConsultaMedicaController;