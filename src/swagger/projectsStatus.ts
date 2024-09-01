/**
 * @swagger
 * /api/projects/status:
 *   get:
 *     summary: Retrieve all project statuses
 *     description: This endpoint retrieves all project statuses stored in the database. If successful, it returns a list of project statuses. If an error occurs, an appropriate error message and status code are returned.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project statuses retrieved successfully. Returns a list of project statuses.
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
 *                   example: "Project statuses retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "In Progress"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-11T04:17:07.511Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-11T04:17:07.511Z"
 *       401:
 *         description: Unauthorized. The provided token is invalid or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid token."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       500:
 *         description: Internal server error. An unexpected error occurred while processing the request.
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
 *                   example: "An unexpected error occurred. Please try again later."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *     tags:
 *       - Get all project status
 */
