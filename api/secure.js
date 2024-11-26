export default function handler(req, res) {
    const domain = process.env.AUT0_DOMAIN; 
    const clientId = process.env.AUTH0_CLIENT_ID; 
    res.status(200).json({ domain, clientId });
}