/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows for the creation of a new user. It validates the input data, ensuring that the specified role and status exist. If successful, the user is created with the provided data.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The email address of the new user.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: "StrongPassword123!"
 *               role_id:
 *                 type: integer
 *                 description: The ID of the role to assign to the new user.
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 description: The ID of the status to assign to the new user.
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully.
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
 *                   example: "User has been created successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       password:
 *                         type: string
 *                         example: "******"
 *                       role_id:
 *                         type: integer
 *                         example: 1
 *                       status_id:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-10T02:54:42.647Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-10T02:54:42.647Z"
 *       400:
 *         description: Bad Request. Could be due to an invalid role or status ID.
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
 *                   example: "The provided role_id does not correspond to any existing role."
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
 *       - Users
 */
