const Medico = require('../models/medico');

class MedicoController {
  constructor(db) {
    this.medico = new Medico(db);
  }

  async getAll(req, res) {
    try {
      const medicos = await this.medico.getAll();
      res.json(medicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const medico = await this.medico.getById(req.params.id);
      if (!medico) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }
      res.json(medico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, apellido, correo, id_especialidad, id_centro_medico, rol } = req.body;
      
      if (!nombre || !apellido || !correo  || !id_especialidad || !id_centro_medico || !rol) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const medicoExistente = await this.medico.findByEmail(correo);
      if (medicoExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const newMedico = await this.medico.create(
        nombre,
        apellido,
        correo,
        id_especialidad,
        id_centro_medico,
        rol
      );
      res.status(201).json(newMedico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { nombre, apellido, correo, id_especialidad, id_centro_medico } = req.body;
      const updatedMedico = await this.medico.update(
        req.params.id,
        nombre,
        apellido,
        correo,
        id_especialidad,
        id_centro_medico
      );
      res.json(updatedMedico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.medico.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MedicoController;