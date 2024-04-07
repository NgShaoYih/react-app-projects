const APIKEY = 'khfu152Q21'
const URLBASE = 'https://comp2140.uqcloud.net/api/'

/**
 * get all possible share locations
 * @returns json response
 */
async function getLocations() {
  const url = `${URLBASE}location/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export {getLocations};