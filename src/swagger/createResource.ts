/**
 * @swagger
 * /api/admin/projects/resources:
 *   post:
 *     summary: Create a new resource
 *     description: This endpoint allows for the creation of a new resource associated with a specific project and resource type. It validates the provided type and project IDs, and if valid, creates the resource.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the resource.
 *                 example: "http://example.com/resource"
 *               type_id:
 *                 type: integer
 *                 description: The ID of the resource type.
 *                 example: 2
 *               project_id:
 *                 type: integer
 *                 description: The ID of the project the resource is associated with.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Resource created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Resource successfully created."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Bad Request. Could be due to an invalid or missing project or resource type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "No resource type found."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
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
 *       - Create resource
 */
