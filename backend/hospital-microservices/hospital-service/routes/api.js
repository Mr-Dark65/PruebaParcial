const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { getConnectionByCity } = require('../config/index');

// Middleware para manejar la conexión a la base de datos según la ciudad
router.use(async (req, res, next) => {
  try {
    const ciudad = req.headers['x-city']?.toLowerCase() || 'quito';
    console.log(`Conectando a BD de ${ciudad}`);
    
    if (!req.db) {
      req.db = await getConnectionByCity(ciudad);
      await req.db.query('SELECT 1'); // Test connection
      console.log(`Conexión a ${ciudad} verificada`);
    }
    
    next();
  } catch (error) {
    console.error('Error de conexión a BD:', {
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({ 
      error: 'Error de conexión a BD',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Cargar controladores con la conexión actual
router.use((req, res, next) => {
  const AuthController = require('../controllers/auth');
  const ConsultaMedicaController = require('../controllers/consultaMedica');
  const PacienteController = require('../controllers/paciente');

  req.authController = new AuthController(req.db);
  req.consultaMedicaController = new ConsultaMedicaController(req.db);
  req.pacienteController = new PacienteController(req.db);
  
  next();
});

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Endpoints para autenticación de usuarios
 *   - name: Consultas Médicas
 *     description: Endpoints para manejo de consultas médicas
 *   - name: Pacientes
 *     description: Endpoints para manejo de pacientes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         rol:
 *           type: string
 *           enum: [medico, empleado]
 *     Paciente:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         documento_identidad:
 *           type: string
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *     ConsultaMedica:
 *       type: object
 *       properties:
 *         fecha:
 *           type: string
 *           format: date
 *         motivo:
 *           type: string
 *         diagnostico:
 *           type: string
 *         tratamiento:
 *           type: string
 *         paciente_id:
 *           type: integer
 *         medico_id:
 *           type: integer
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica un usuario y retorna un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error del servidor
 */
router.post('/auth/login', (req, res) => req.authController.login(req, res));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *             required:
 *               - email
 *               - password
 *               - rol
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El usuario ya está registrado
 *       500:
 *         description: Error del servidor
 */
router.post('/auth/register', (req, res) => req.authController.register(req, res));

// Rutas protegidas por autenticación
router.use(authMiddleware);

/**
 * @swagger
 * /api/consultas:
 *   get:
 *     summary: Obtiene todas las consultas médicas
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consultas médicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConsultaMedica'
 *       500:
 *         description: Error del servidor
 */
router.get('/consultas', (req, res) => req.consultaMedicaController.getAll(req, res));

/**
 * @swagger
 * /api/consultas/{id}:
 *   get:
 *     summary: Obtiene una consulta médica por su ID
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta médica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultaMedica'
 *       404:
 *         description: Consulta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/consultas/:id', (req, res) => req.consultaMedicaController.getById(req, res));

/**
 * @swagger
 * /api/consultas:
 *   post:
 *     summary: Crea una nueva consulta médica
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultaMedica'
 *     responses:
 *       201:
 *         description: Consulta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/consultas', (req, res) => req.consultaMedicaController.create(req, res));

/**
 * @swagger
 * /api/consultas/{id}:
 *   put:
 *     summary: Actualiza una consulta médica
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultaMedica'
 *     responses:
 *       200:
 *         description: Consulta actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Consulta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/consultas/:id', (req, res) => req.consultaMedicaController.update(req, res));

/**
 * @swagger
 * /api/consultas/{id}:
 *   delete:
 *     summary: Elimina una consulta médica
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Consulta eliminada exitosamente
 *       404:
 *         description: Consulta no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/consultas/:id', (req, res) => req.consultaMedicaController.delete(req, res));

/**
 * @swagger
 * /api/consultas/medico/{id_medico}:
 *   get:
 *     summary: Obtiene consultas por médico
 *     tags: [Consultas Médicas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_medico
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de consultas del médico
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConsultaMedica'
 *       500:
 *         description: Error del servidor
 */
router.get('/consultas/medico/:id_medico', (req, res) => req.consultaMedicaController.getByMedico(req, res));

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Obtiene todos los pacientes
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       500:
 *         description: Error del servidor
 */
router.get('/pacientes', (req, res) => req.pacienteController.getAll(req, res));

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Obtiene un paciente por ID
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/pacientes/:id', (req, res) => req.pacienteController.getById(req, res));

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Crea un nuevo paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/pacientes', (req, res) => req.pacienteController.create(req, res));

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Actualiza un paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       200:
 *         description: Paciente actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Paciente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/pacientes/:id', (req, res) => req.pacienteController.update(req, res));

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Elimina un paciente
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Paciente eliminado exitosamente
 *       404:
 *         description: Paciente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/pacientes/:id', (req, res) => req.pacienteController.delete(req, res));

module.exports = router;