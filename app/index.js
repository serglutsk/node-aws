const express = require('express')
const app = express()
const PORT = process.env.APP_PORT ?? 3000

const router= require('../routes/postRoutes')

app.use(express.json());
app.use('/api', router);
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // Send a 500 Internal Server Error response
});

app.get('/',(req,res)=>{
    res.send('Hello here!!!')
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})