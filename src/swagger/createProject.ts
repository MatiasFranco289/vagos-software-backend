/**
 * @swagger
 * /api/admin/projects:
 *   post:
 *     summary: Create a new project
 *     description: This endpoint allows for the creation of a new project. It validates the input data, ensuring the creator, status, and tags exist. If successful, the project is created along with a board associated with the project.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the project.
 *                 example: "New Project"
 *               description:
 *                 type: string
 *                 description: A brief description of the project.
 *                 example: "This is a new project."
 *               thumbnail_url:
 *                 type: string
 *                 description: The URL of the project's thumbnail image.
 *                 example: "http://example.com/thumbnail.png"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: The start date of the project.
 *                 example: "2024-08-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: The end date of the project.
 *                 example: "2024-12-01"
 *               expected_end_date:
 *                 type: string
 *                 format: date
 *                 description: The expected end date of the project.
 *                 example: "2024-11-15"
 *               status_id:
 *                 type: integer
 *                 description: The ID of the project's status.
 *                 example: 1
 *               repository_url:
 *                 type: string
 *                 description: The URL of the project's repository.
 *                 example: "http://example.com/repo"
 *               tags_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of tag IDs associated with the project.
 *                 example: [1, 2, 3]
 *               creator_id:
 *                 type: integer
 *                 description: The ID of the user creating the project.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Project created successfully.
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
 *                   example: "Project created successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Bad Request. Could be due to a missing creator, status, or tags, or a violation of unique constraints.
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
 *                   example: "title must be unique"
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
 *       - Projects
 */
