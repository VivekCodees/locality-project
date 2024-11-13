import dotenv from 'dotenv'
import connectDB from './db/index.js'

import {app} from './app.js'

dotenv.config({
    path: './.env'
})

// let port = process.env.PORT
// console.log(port);


connectDB()
.then( () => {
    app.listen(5000 ,() => {
        console.log(`Server is running on port: ${process.env.PORT || 5000}`);
        // console.log('Server is running on port',port);
    })
} )
.catch((err) => {
    console.log('MONGO DB CONNECTION FAILED!!',err);
})

// app.get("/", function(req, res){
//     res.send("<h1>Hello there!</h1>")
// })



