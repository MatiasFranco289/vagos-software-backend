/**
 * @swagger
 * /api/tags/all:
 *   get:
 *     summary: Retrieve all tags
 *     description: Fetches a list of all tags from the database.
 *     responses:
 *       200:
 *         description: Successful retrieval of tags
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
 *                   example: Tags retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tag'
 *       500:
 *         description: Internal server error
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
 *                   example: Internal server error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *     tags:
 *       - Tags
 */

/**
 * @typedef Tag
 * @property {integer} id - The unique identifier for the tag
 * @property {string} name - The name of the tag
 */
