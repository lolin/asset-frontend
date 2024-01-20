module.exports = {
    port: process.env.NEXT_PUBLIC_PORT || 3000,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    apiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    secret: process.env.NEXTAUTH_SECRET || '',
}