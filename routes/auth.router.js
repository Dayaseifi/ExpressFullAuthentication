const { Router } = require("express");
const authcontroller = require("../controller/authcontroller");

const router = Router()

/**
* @swagger
*  components : 
*    schemas : 
*      user : 
*        type : object
*        required :     
*            -Username
*            -Email   
*            -Password
*        properties : 
*            id : 
*                type : integer
*                descrption : ID of user which increament and filled automatically
*            Username : 
*                type : string
*                description : UNIQUE username which all user should has it ownly
*            Email : 
*                type : string
*                description : Email of user
*            Password : 
*                type : string
*                description : A hashed password of user          
*
*/

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The auth managing API
*/





router.post("/signup", authcontroller.signUp)
/**
 * @swagger
 * /auth/signup:
 *   post : 
 *     tags : [User]
 *     summary : a signup user for register
 *     requestBody :
 *        required : true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       422: 
 *         description: validation error
 *       400: 
 *         description : User already Exist
 *       500: 
 *        description : internal server error
 *          
 */

router.post("/signin", authcontroller.Signin)

/**
 * @swagger
 * /auth/signin:
 *   post : 
 *     tags : [User]
 *     summary : a signin user for login
 *     requestBody :
 *        required : true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       422: 
 *         description: validation error
 *       404: 
 *         description : User already not Exist
 *       500: 
 *        description : internal server error
 *          
 */


router.get("/test", authcontroller.authChecker, (req, res) => {
    res.json({ message: "all ok" })
})


router.post("/resetpassword", authcontroller.authChecker, authcontroller.linksender)

/**
 * @swagger
 * /auth/resetpassword:
 *   post : 
 *     tags : [User]
 *     summary :  send a reset link for user
 *     requestBody :
 *        required : true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       422: 
 *         description: validation error
 *       404: 
 *         description : User already not Exist
 *       500: 
 *        description : internal server error
 *          
 */


router.post("/reset/:token", authcontroller.authChecker, authcontroller.passwordReset)

/**
 * @swagger
 * /auth/reset/{token}:
 *   post : 
 *     tags : [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The tokend sended from front-end
 *     summary : changing user password
 *     requestBody :
 *        required : true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       422: 
 *         description: validation error
 *       404: 
 *         description : User already not Exist
 *       500: 
 *        description : internal server error
 */

router.post('/refresh', authcontroller.authChecker, authcontroller.RefreshTokenChecker)

/**
 * @swagger
 * /auth/refresh:
 *   post : 
 *     tags : [User]
 *     summary :  refresh token
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       403: 
 *         description: cookie doesnt available
 *       404: 
 *         description : User already not Exist
 *       421:
 *         description : users not match
 *       500: 
 *        description : internal server error
 */

router.patch('/logout', authcontroller.authChecker, authcontroller.Logout)

/**
 * @swagger
 * /auth/logout:
 *   patch : 
 *     tags : [User]
 *     summary :  logout
 *     responses : 
 *       200: 
 *         content : 
 *           application/json : 
 *             $ref : '#/components/schemas/user'
 *       404: 
 *         description : User already not Exist
 */

module.exports = router