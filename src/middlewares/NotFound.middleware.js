
export const NotFoundMiddleware = (req, res)=> {
    res.status(404).send('This route does not exist please check out documentation for more info <a href="/api/docs">Documentation</a>');
}