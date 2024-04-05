const axios = require('axios');

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json',
};

export const getGas = async() => {
  const url = `https://snowtrace.io/_next/data/routescan:mainnet:199c2bd7c4fd261cb7759eb976e3b3fa91a76985/gastracker.json`;
  //making axios POST request to Pinata
  return axios
    .post(url, {headers})
    .then(function (response: any) {
      // Handle the successful response
      console.log("snowtrace", response.data);
      return response.data.pageProps.values;
    })
    .catch(function (error: any) {
      // Handle any errors
      console.error("Error posting data:", error);
  });
};
