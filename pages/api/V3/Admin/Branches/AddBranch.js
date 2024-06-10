import axios from 'axios';


export default function handler(req, res) {
    if (req.method === 'POST') {
      
        const token = getTokenFromCookie(req);

        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            
            axios.post(`${process.env.API_URL}admin/AddLibraryBranch`, { 
                token: process.env.MYKEY,
                name: req.body.name,
                Sname: req.body.Sname,
                logo: req.body.logo,
                City: req.body.City,
                Address: req.body.Address,
                State: req.body.State,
                pincode: req.body.pincode,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                GoogleMap: req.body.GoogleMap,
                isActive: req.body.isActive,
                MobileNum: req.body.MobileNum,
                Email: req.body.Email,
                Whatsapp: req.body.Whatsapp,
            
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
