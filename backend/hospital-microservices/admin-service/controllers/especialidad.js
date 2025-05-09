const Especialidad = require('../models/especialidad');

class EspecialidadController {
  constructor(db) {
    this.especialidad = new Especialidad(db);
  }

  async getAll(req, res) {
    try {
      const especialidades = await this.especialidad.getAll();
      res.json(especialidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const especialidad = await this.especialidad.getById(req.params.id);
      if (!especialidad) {
        return res.status(404).json({ error: 'Especialidad no encontrada' });
      }
      res.json(especialidad);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre } = req.body;
      if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }
      const newEspecialidad = await this.especialidad.create(nombre);
      res.status(201).json(newEspecialidad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { nombre } = req.body;
      const updatedEspecialidad = await this.especialidad.update(
        req.params.id,
        nombre
      );
      res.json(updatedEspecialidad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.especialidad.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EspecialidadController;