import express from 'express';

const router = express.Router();
import { shortUrl, getOriginalUrl } from '../controllers/shortUrl.controller.js';
import {varifyJwt} from '../middlewares/auth.middleware.js';

router.post('/shorten', varifyJwt, shortUrl);
router.get('/:shortUrl', varifyJwt, getOriginalUrl);


export default router;