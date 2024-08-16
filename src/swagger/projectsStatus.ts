/**
 * @swagger
 * /api/projects/status:
 *   get:
 *     summary: Retrieve all project statuses
 *     description: Fetches a list of all project statuses from the database.
 *     responses:
 *       200:
 *         description: Successful retrieval of project statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Project statuses retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProjectStatus'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *     tags:
 *       - Project Statuses
 */

/**
 * @typedef ProjectStatus
 * @property {integer} id - The unique identifier for the project status
 * @property {string} name - The name of the project status
 */
