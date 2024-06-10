import axios from 'axios';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Read the cookie
    const apiDataCookie = req.cookies['api_data'];
    console.log('Received api_data cookie:', apiDataCookie);

    const apiData = apiDataCookie ? JSON.parse(apiDataCookie) : null;

    if (apiData) {
      console.log('Responding with apiData:', apiData);
      res.status(200).json({ ReqData: apiData });
    } else {
      console.log('Unauthorized: No apiData found');
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    console.log('Method Not Allowed');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
