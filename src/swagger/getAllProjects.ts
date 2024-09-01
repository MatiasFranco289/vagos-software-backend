/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retrieve all projects
 *     description: This endpoint retrieves all projects, allowing optional filtering by tags, searching by project title, and pagination through limit and offset.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: order_by
 *         schema:
 *           type: string
 *         description: The field by which to order the results. Default is "createdAt".
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The order direction (ascending or descending). Default is "ASC".
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of projects to return. Default is 20.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of projects to skip before starting to collect the result set. Default is 0.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search term to filter projects by title.
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: A comma-separated list of tags to filter projects by.
 *     responses:
 *       200:
 *         description: Projects retrieved successfully.
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
 *                   example: "Projects retrieved successfully."
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
 *                         example: "test"
 *                       description:
 *                         type: string
 *                         example: "test description"
 *                       thumbnail_url:
 *                         type: string
 *                         example: "www.test.png"
 *                       repository_url:
 *                         type: string
 *                         example: "www.github.com"
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
 *                         type: object
 *                         example: {}
 *                       status:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "WORKING"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-21T03:54:13.756Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-21T03:54:13.756Z"
 *       400:
 *         description: Bad Request. Could be due to invalid query parameters.
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
 *                   example: "Invalid query parameters."
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
