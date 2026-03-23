import dotenv from 'dotenv'
dotenv.config({
    path : '../../.env'
})

const exportData = {
    BACKEND_PORT : process.env.BACKEND_PORT,
    BACKEND_URL : process.env.NODE_ENV === 'development' ? process.env.DEV_BACKEND_URL : process.env.PROD_BACKEND_URL
}

export default exportData;