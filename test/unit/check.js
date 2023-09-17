const axios = require('axios');

const urlAll = 'http://localhost:3000'

const axiosConfigPOST = (elem, url) => {
    return {
        method: 'GET',
        url: urlAll + url, 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        data: JSON.stringify(elem)
    }
};

(async() => {
    const data = {
        dir: 'videods/',
        auten: ''
    }
    const ReqData = await axios(axiosConfigPOST(data, '/api/transaction/videos'))
    console.log(ReqData.data)
})();