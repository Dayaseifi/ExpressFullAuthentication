const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express()
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });


const swaggerdoc = swaggerJsDoc({

    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sample authentication API',
            version: '1.0.0',
            description: 'A sample API for authentication using JWT',
        },
        servers: [
            {
                url: 'http://localhost:1457',
            },
        ],
    },
    apis: ['./routes/*.js'],
    
})
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerdoc))

const { connecting } = require('./model/DB');
const authrouter = require('./routes/auth.router');
const errorhandlers = require('./utils/errors/errorhandlers');
connecting()



app.use(express.json())
app.use(express.static(path.join(__dirname, 'public', 'upload')))
app.use(cookieparser())

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
})

app.use("/auth", authrouter)

const port = process.env.PORT

app.use(errorhandlers.error404)
app.use(errorhandlers.unexceptionError)

app.listen(port, () => {
    console.log(`project running on port ${port}`);
})