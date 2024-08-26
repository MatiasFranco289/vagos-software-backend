/**
 * @swagger
 * /api/admin/blogs:
 *   post:
 *     summary: Create a new blog
 *     description: This endpoint allows for the creation of a new blog. It validates the input data, ensuring the project and user exist. If successful, the blog is created and associated with the specified project and user.
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
 *                 description: The title of the blog.
 *                 example: "New Blog Post"
 *               description:
 *                 type: string
 *                 description: The main text of the blog.
 *                 example: "This is a new blog post."
 *               project_id:
 *                 type: integer
 *                 description: The ID of the project associated with the blog.
 *                 example: 1
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user creating the blog.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Blog created successfully.
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
 *                   example: "The blog has been successfully created."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       400:
 *         description: Bad Request. Could be due to a missing project or user.
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
 *                   example: "The provided user id does not correspond to any existent user."
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
 *       - Blogs
 */
