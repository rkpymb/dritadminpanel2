import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
    
        axios.post(`${process.env.API_URL}adminlogin/MainAdminSignup`, { 
            token: process.env.MYKEY, 
            name:req.body.name,
            mobile: req.body.mobile,
            PassKey: req.body.PassKey,
            email: req.body.email,
            webid: req.body.webid,
            WebName: req.body.WebName
        
        }).then((response) => {
          
            const senddta = response.data;
            res.status(200).json({ ReqD: senddta })
          
        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}