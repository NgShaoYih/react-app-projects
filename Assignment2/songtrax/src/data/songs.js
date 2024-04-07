//code sampled from songtrax_restful_examples
const APIKEY = 'khfu152Q21'
const URLBASE = 'https://comp2140.uqcloud.net/api/'

/**
 * Gets all song samples using the GET API call
 * @returns json response
 */
async function getSamples() {
  const url = `${URLBASE}sample/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

/**
 * Get the sample matching the song id using the GET API call
 * @param {Integer} id 
 * @returns json response
 */
async function getSample(id) {
  const url = `${URLBASE}sample/${id}/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

/**
 * POST the new song using the API call
 * @param {*} newSong 
 * @returns json response
 */
async function createSample(newSong) {
  const url = `${URLBASE}sample/?api_key=${APIKEY}`;

  const data = newSong

  const response = await fetch(url, {
                    method: "POST",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  });

  const json = await response.json();
  console.log(json);
  return json;
}

export {getSamples, getSample, createSample};