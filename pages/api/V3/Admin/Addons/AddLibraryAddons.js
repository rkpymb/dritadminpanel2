import axios from 'axios';


export default function handler(req, res) {
    if (req.method === 'POST') {

        const token = getTokenFromCookie(req);

        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            axios.post(`${process.env.API_URL}admin/AddLibraryAddons`, {
                token: process.env.MYKEY,
                title: req.body.title,
                details: req.body.details,
                Branchcode: req.body.Branchcode,
                img: req.body.img,
                mprice: req.body.mprice,
                sprice: req.body.sprice,
                isActive: req.body.isActive,
                ValidityDay:req.body.ValidityDay
            
            }, { headers }).then((response) => {
                const senddta = response.data;
                res.status(200).json({ ReqD: senddta })
    
            }).catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}


// Function to get JWT token from cookies
const getTokenFromCookie = (req) => {
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === 'jwt_token') {
                return decodeURIComponent(cookieValue);
            }
        }
    }

    return null;
};
