module.exports = {
    port: process.env.NEXT_PUBLIC_PORT || 3000,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    authURL: process.env.NEXTAUTH_URL || 'http://localhost:3000/login',
    localApiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    apiURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || '',
}