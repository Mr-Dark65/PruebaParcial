const CentroMedico = require('../models/centroMedico');

class CentroMedicoController {
  constructor(db) {
    this.centroMedico = new CentroMedico(db);
  }

  async getAll(req, res) {
    try {
      const centros = await this.centroMedico.getAll();
      res.json(centros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const centro = await this.centroMedico.getById(req.params.id);
      if (!centro) {
        return res.status(404).json({ error: 'Centro médico no encontrado' });
      }
      res.json(centro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, direccion } = req.body;
      const newCentro = await this.centroMedico.create(nombre, direccion);
      res.status(201).json(newCentro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { nombre, direccion } = req.body;
      const updatedCentro = await this.centroMedico.update(
        req.params.id,
        nombre,
        direccion
      );
      res.json(updatedCentro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.centroMedico.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CentroMedicoController;