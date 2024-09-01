/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     description: This endpoint retrieves a project by its ID, including associated tags, status, blogs, resources, and creator information.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project to retrieve.
 *     responses:
 *       200:
 *         description: Project retrieved successfully.
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
 *                   example: "Project retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Project Title"
 *                       description:
 *                         type: string
 *                         example: "Project Description"
 *                       thumbnail_url:
 *                         type: string
 *                         example: "https://example.com/thumbnail.png"
 *                       repository_url:
 *                         type: string
 *                         example: "https://github.com/example"
 *                       status_id:
 *                         type: integer
 *                         example: 1
 *                       start_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-13T00:00:00.000Z"
 *                       end_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-13T00:00:00.000Z"
 *                       expected_end_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-13T00:00:00.000Z"
 *                       creator_id:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-21T03:54:13.760Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-21T03:54:13.760Z"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Tag Name"
 *                       status:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Status Name"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-21T03:54:13.756Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-21T03:54:13.756Z"
 *                       blogs:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             title:
 *                               type: string
 *                               example: "Blog Title"
 *                             content:
 *                               type: string
 *                               example: "Blog content..."
 *                       resources:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Resource Name"
 *                             url:
 *                               type: string
 *                               example: "https://example.com/resource"
 *                             type:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 1
 *                                 name:
 *                                   type: string
 *                                   example: "Resource Type Name"
 *                       creator:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "username"
 *                           email:
 *                             type: string
 *                             example: "user@example.com"
 *                           role:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Role Name"
 *                           status:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Active"
 *                       board:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Board Name"
 *       400:
 *         description: Bad Request. Could be due to an invalid ID format or missing ID.
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
 *                   example: "Invalid project ID."
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
