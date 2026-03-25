import dotenv from 'dotenv'
dotenv.config({
    path : '../../.env'
})

const exportData = {
    BACKEND_PORT : process.env.BACKEND_PORT,
    BACKEND_URL : process.env.NODE_ENV === 'development' ? process.env.DEV_BACKEND_URL : process.env.PROD_BACKEND_URL,
    NODE_ENV : process.env.NODE_ENV,
    DATABASE_URL : process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET
}

export default exportData;