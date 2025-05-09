const Empleado = require('../models/empleado');

class EmpleadoController {
  constructor(db) {
    this.empleado = new Empleado(db);
  }

  async getAll(req, res) {
    try {
      const empleados = await this.empleado.getAll();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const empleado = await this.empleado.getById(req.params.id);
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, apellido, correo, cargo, id_centro_medico } = req.body;
      
      if (!nombre || !apellido || !correo || !cargo || !id_centro_medico) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const empleadoExistente = await this.empleado.findByEmail(correo);
      if (empleadoExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const newEmpleado = await this.empleado.create(
        nombre,
        apellido,
        correo,
        cargo,
        id_centro_medico
      );
      res.status(201).json(newEmpleado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { nombre, apellido, correo, cargo, id_centro_medico } = req.body;
      const updatedEmpleado = await this.empleado.update(
        req.params.id,
        nombre,
        apellido,
        correo,
        cargo,
        id_centro_medico
      );
      res.json(updatedEmpleado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.empleado.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmpleadoController;