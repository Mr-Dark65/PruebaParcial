const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const AuthController = require('../controllers/auth');

module.exports = (db) => {
  const CentroMedicoController = require('../controllers/centroMedico');
  const centroMedicoController = new CentroMedicoController(db);
  const EspecialidadController = require('../controllers/especialidad');
  const especialidadController = new EspecialidadController(db);
  const MedicoController = require('../controllers/medico');
  const medicoController = new MedicoController(db);
  const EmpleadoController = require('../controllers/empleado');
  const empleadoController = new EmpleadoController(db);
  const authController = new AuthController(db);
  
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
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/auth/login', authController.login.bind(authController));

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
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - rol
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: secreto123
 *               rol:
 *                 type: string
 *                 enum: [medico, empleado]
 *                 example: medico
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Datos inválidos o faltantes
 *       404:
 *         description: El correo no pertenece a ninguna entidad válida
 *       409:
 *         description: El usuario ya está registrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/auth/register', authController.register.bind(authController));

/**
 * @swagger
 * /api/ruta-protegida:
 *   get:
 *     summary: Ruta de prueba protegida por JWT
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso permitido
 *       401:
 *         description: No autorizado
 */
router.get('/ruta-protegida', authMiddleware, (req, res) => {
  res.json({ mensaje: 'Ruta protegida accedida con éxito', usuario: req.user });
});


/**
 * @swagger
 * tags:
 *   name: Centros Médicos
 *   description: Gestión de centros médicos
 */

/**
 * @swagger
 * /api/centros:
 *   get:
 *     summary: Obtiene todos los centros médicos
 *     tags: [Centros Médicos]
 *     responses:
 *       200:
 *         description: Lista de centros médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CentroMedico'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CentroMedico:
 *       type: object
 *       required:
 *         - nombre
 *         - direccion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental
 *         nombre:
 *           type: string
 *           description: Nombre del centro médico
 *         direccion:
 *           type: string
 *           description: Dirección física
 *       example:
 *         id: 1
 *         nombre: "Hospital Quito"
 *         direccion: "Av. Primera 123"
 */

  // Centros Médicos
  router.get('/centros', centroMedicoController.getAll.bind(centroMedicoController));
  
  /**
 * @swagger
 * /api/centros/{id}:
 *   get:
 *     summary: Obtener un centro médico por ID
 *     tags: [Centros Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Centro médico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CentroMedico'
 *       404:
 *         description: Centro médico no encontrado
 */
router.get('/centros/:id', centroMedicoController.getById.bind(centroMedicoController));

/**
 * @swagger
 * /api/centros:
 *   post:
 *     summary: Crear un nuevo centro médico
 *     tags: [Centros Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CentroMedico'
 *     responses:
 *       201:
 *         description: Centro médico creado
 */
router.post('/centros', centroMedicoController.create.bind(centroMedicoController));

/**
 * @swagger
 * /api/centros/{id}:
 *   put:
 *     summary: Actualizar un centro médico
 *     tags: [Centros Médicos]
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
 *             $ref: '#/components/schemas/CentroMedico'
 *     responses:
 *       200:
 *         description: Centro actualizado
 *       404:
 *         description: Centro no encontrado
 */
router.put('/centros/:id', centroMedicoController.update.bind(centroMedicoController));

/**
 * @swagger
 * /api/centros/{id}:
 *   delete:
 *     summary: Eliminar un centro médico
 *     tags: [Centros Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 *       404:
 *         description: No encontrado
 */
router.delete('/centros/:id', centroMedicoController.delete.bind(centroMedicoController));

  // Especialidades
  /**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Endpoints para gestionar especialidades médicas
 */

/**
 * @swagger
 * /api/especialidades:
 *   get:
 *     summary: Obtener todas las especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Especialidad'
 */
router.get('/especialidades', especialidadController.getAll.bind(especialidadController));

/**
 * @swagger
 * /api/especialidades/{id}:
 *   get:
 *     summary: Obtener una especialidad por ID
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Especialidad'
 *       404:
 *         description: Especialidad no encontrada
 */
router.get('/especialidades/:id', especialidadController.getById.bind(especialidadController));

/**
 * @swagger
 * /api/especialidades:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Especialidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Especialidad creado
 *       400:
 *         description: Error en la creación
 */
router.post('/especialidades', especialidadController.create.bind(especialidadController));

/**
 * @swagger
 * /api/especialidades/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       400:
 *         description: Error en la actualización
 */
router.put('/especialidades/:id', especialidadController.update.bind(especialidadController));

/**
 * @swagger
 * /api/especialidades/{id}:
 *   delete:
 *     summary: Eliminar una especialidad
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad eliminada correctamente
 *       500:
 *         description: Error al eliminar la especialidad
 */
router.delete('/especialidades/:id', especialidadController.delete.bind(especialidadController));


  // Médicos
/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
router.get('/medicos', medicoController.getAll.bind(medicoController));

/**
 * @swagger
 * /api/medicos/{id}:
 *   get:
 *     summary: Obtener un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Médico encontrado
 */
router.get('/medicos/:id', medicoController.getById.bind(medicoController));

/**
 * @swagger
 * /api/medicos:
 *   post:
 *     summary: Crear un nuevo medico
 *     tags: [Medicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - id_centro_medico
 *               - id_especialidad
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               id_centro_medico:
 *                 type: integer
 *               id_especialidad:
 *                type: integer
 *               rol:
 *                type: string
 *     responses:
 *       201:
 *         description: Medico creado
 *       400:
 *         description: Error en la creación
 */
router.post('/medicos', medicoController.create.bind(medicoController));

/**
 * @swagger
 * /api/medicos/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Medicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - id_centro_medico
 *               - id_especialidad
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               id_centro_medico:
 *                 type: integer
 *               id_especialidad:
 *                type: integer
 *     responses:
 *       200:
 *         description: Medico actualizado
 *       400:
 *         description: Error en la actualización
 */
router.put('/medicos/:id', medicoController.update.bind(medicoController));

/**
 * @swagger
 * /api/medicos/{id}:
 *   delete:
 *     summary: Eliminar un médico
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 */
router.delete('/medicos/:id', medicoController.delete.bind(medicoController));

  // Empleados
/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 */
router.get('/empleados', empleadoController.getAll.bind(empleadoController));

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/empleados/:id', empleadoController.getById.bind(empleadoController));

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - cargo
 *               - id_centro_medico
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               cargo:
 *                 type: string
 *               id_centro_medico:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Empleado creado
 *       400:
 *         description: Error en la creación
 */
router.post('/empleados', empleadoController.create.bind(empleadoController));

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Empleados]
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
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - cargo
 *               - id_centro_medico
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               cargo:
 *                 type: string
 *               id_centro_medico:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       400:
 *         description: Error en la actualización
 */
router.put('/empleados/:id', empleadoController.update.bind(empleadoController));

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       500:
 *         description: Error al eliminar
 */
router.delete('/empleados/:id', empleadoController.delete.bind(empleadoController));

  return router;
};