/**
 * @swagger
 * /api/admin/resources/types/{id}:
 *   delete:
 *     summary: Delete a resource type
 *     description: This endpoint deletes a specific resource type by its ID. If successful, it returns a success message. If the resource type is not found or an error occurs, an appropriate error message and status code are returned.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource type to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Resource type deleted successfully.
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
 *                   example: "The resource type was successfully deleted."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *       404:
 *         description: Resource type not found.
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
 *                   example: "The resource type was not found."
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
 *       - Resource Types
 */
