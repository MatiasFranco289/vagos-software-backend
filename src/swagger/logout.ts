/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user and clear the authentication token
 *     description: This endpoint logs out the user by clearing the JWT cookie. After a successful logout, a confirmation message is returned. If an error occurs during the process, an appropriate error message and status code are returned.
 *     responses:
 *       200:
 *         description: Logout successful. The JWT cookie has been cleared.
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
 *                   example: "Logout successful."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       500:
 *         description: Internal server error. An unexpected error occurred while processing the logout request.
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
 *       - Auth
 */
