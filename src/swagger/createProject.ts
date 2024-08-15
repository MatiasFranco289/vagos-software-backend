/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectCreationBodyRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - thumbnail_url
 *         - start_date
 *         - status_id
 *         - repository_url
 *         - tags_id
 *         - creator_id
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the project.
 *         description:
 *           type: string
 *           description: A brief description of the project.
 *         thumbnail_url:
 *           type: string
 *           description: URL of the project's thumbnail image.
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the project.
 *         end_date:
 *           type: string
 *           format: date
 *           description: (Optional) The end date of the project.
 *         expected_end_date:
 *           type: string
 *           format: date
 *           description: (Optional) The expected end date of the project.
 *         status_id:
 *           type: integer
 *           description: The ID of the project's status.
 *         repository_url:
 *           type: string
 *           description: URL of the project's repository.
 *         tags_id:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of tag IDs associated with the project.
 *         creator_id:
 *           type: integer
 *           description: The ID of the user who created the project.
 *
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided details and its corresponding Board. Returns an error if any of the required IDs (creator_id, status_id, tags_id) are not found.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreationBodyRequest'
 *     responses:
 *       201:
 *         description: The project has been successfully created.
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
 *                   example: "The project has been successfully created."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request. The request was invalid or missing required parameters.
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
 *                   example: "No user was found with the provided id."
 *       500:
 *         description: Internal server error. An unexpected error occurred.
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
 *                   example: "An unexpected error occurred."
 */
