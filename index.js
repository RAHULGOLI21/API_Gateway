const express = require('express');
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')
const axios = require('axios');

const rateLimit = require('express-rate-limit')

const app = express();

const PORT = 3005;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 5 requests per `window` (here, per 2 minutes).
})

app.use(morgan('combined'))
app.use(limiter)

// checking if the user is authenticated before hitting the BOOKING_SERVICE Api's
app.use('/bookingService',async (req,res,next)=>{
    try {
        const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        })
        console.log("response.data",response.data)
        if(response.data.success){
            next(); // This will call the below app.use with createProxyMiddleware if the user is authenticated
        }else{
            return res.status(401).json({
                message:'Unauthorised'
            })
        }
    } catch (error) {
        return res.status(401).json({
            message:'Unauthorised'
        })
    }
})
app.use('/bookingService',createProxyMiddleware({target: 'http://localhost:3002/bookingService',changeOrigin: true,}),);
app.get('/home',(req,res)=>{
    return res.json({ message: 'OK'})
})

app.listen(PORT, ()=>{
    console.log(`Started listening at PORT ${PORT}`)
})