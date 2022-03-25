const axios = require('axios').default

export const sendWhatAppTextSms = (clientNo, msg) => {
  console.log('am i sendWhatAppTextSms')
  const options = {
    method: 'POST',
    url: 'https://maytapi-whatsapp.p.rapidapi.com/18762/sendMessage',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'maytapi-whatsapp.p.rapidapi.com',
      'x-rapidapi-key': '0811fc4e73msh94151d212862c23p18b7d6jsn72ebd5bb0f1a',
    },
    data: {
      to_number: `+91${clientNo}`,
      type: 'text',
      message: msg,
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export const sendWhatAppMediaSms = (clientNo) => {
  console.log('am i sendWhatAppMediaSms')
  const options = {
    method: 'POST',
    url: 'https://maytapi-whatsapp.p.rapidapi.com/18762/sendMessage',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'maytapi-whatsapp.p.rapidapi.com',
      'x-rapidapi-key': '0811fc4e73msh94151d212862c23p18b7d6jsn72ebd5bb0f1a',
    },
    data: {
      to_number: `+91${clientNo}`,
      text: 'Broucher',
      type: 'media',
      message:
        'https://www.myhomeconstructions.com/brochures/My_Home_Avatar_Brochure.pdf',
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}
