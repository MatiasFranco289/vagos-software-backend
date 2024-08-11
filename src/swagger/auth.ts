/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a token
 *     description: This endpoint allows users to log in by providing their username and password. If successful, it returns a JSON Web Token (JWT) in a cookie and user details in the response. If the login fails, appropriate error messages and status codes are returned.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user attempting to log in.
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user attempting to log in.
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT in a cookie and user details in the response.
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
 *                   example: "Login successful."
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
 *                         example: johndoe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       password:
 *                          type: string
 *                          example: "******"
 *                       role_id:
 *                          type: number
 *                          example: 1
 *                       created_at:
 *                          type: string
 *                          format: date-time
 *                          example: "2024-08-11T04:17:07.511Z"
 *                       updated_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-08-11T04:17:07.511Z"
 *                       role:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: ADMIN
 *                           created_at:
 *                              type: string
 *                              format: date-time
 *                              example: "2024-08-11T04:17:07.511Z"
 *                           updated_at:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-08-11T04:17:07.511Z"
 *       401:
 *         description: Invalid password. The password provided does not match the stored password.
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
 *                   example: "Invalid password."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       404:
 *         description: User not found. No user was found with the provided username.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "User not found."
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
 */
