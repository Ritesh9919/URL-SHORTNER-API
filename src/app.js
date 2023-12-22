import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';
import apiDocs from '../swagger.json' assert {type:'json'}

import { NotFoundMiddleware } from './middlewares/NotFound.middleware.js';




// routes import
import userRouter from './routes/user.routes.js';
import shortUrlRouter from './routes/shortUrl.routes.js';

const app = express();

// swggaer
app.use('/api/docs', swagger.serve, swagger.setup(apiDocs));

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())



app.get('/', (req, res)=> {
    res.send('<h1>URL SHORTENER API</h1><a href="/api/docs">Documentaion</a>');
})



// routes declaration
app.use('/api/users', userRouter);
app.use('/api/url', shortUrlRouter);


// notfound middleware 
app.use(NotFoundMiddleware);


export {app}