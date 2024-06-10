import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${req.body.JwtToken}`,
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

        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}