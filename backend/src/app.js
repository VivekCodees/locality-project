import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// app.use(bodyParser())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes import i.e from locality,user etc....
import localityRouter from './routes/locality.route.js'
// import bodyParser from 'body-parser'


// routes declaration
app.use('/api/v1/localities',localityRouter)

export { app }