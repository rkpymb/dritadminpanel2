import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
       
        axios.post(`${process.env.API_URL}admin/Checkwebid`, { token: process.env.MYKEY,webid:req.body.webid}, ).then((response) => {
            
            res.status(200).json({ ReqData: response.data });
        });

    } else {
        res.status(200).json({ ReqS: 'invalid entry' });
    }
}