export const corsOptions = {
    origin : process.env.CORS_ORIGIN,
    method : ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
}