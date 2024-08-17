/**
 * @swagger
 * /api/admin/projects/resources:
 *   post:
 *     summary: Crea un nuevo recurso.
 *     description: Crea un recurso asociado a un proyecto y a un tipo de recurso específico.
 *     tags:
 *       - Resources
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: La URL del recurso.
 *                 example: "https://example.com/admin/projects/resources"
 *               type_id:
 *                 type: integer
 *                 description: ID del tipo de recurso.
 *                 example: 1
 *               project_id:
 *                 type: integer
 *                 description: ID del proyecto al que pertenece el recurso.
 *                 example: 123
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente.
 *       400:
 *         description: No se encontró el tipo de recurso o el proyecto.
 *       500:
 *         description: Error interno del servidor.
 *
 * */
