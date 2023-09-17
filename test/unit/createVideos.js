const axios = require('axios');

const urlAll = 'http://localhost:3000'

const axiosConfigPOST = (elem, url) => {
    return {
        method: 'POST',
        url: urlAll + url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        data: JSON.stringify(elem)
    }
};

(async () => {
    const data = {
        dirIn: './data/videos/',
        parts: 6,
        shortTime: 1,
        dirOut: './data/shortVideos/'
    }

    const dataReq = await axios(axiosConfigPOST(data, '/api/create/videos'));
    console.log(dataReq.data)
})();