const APIKEY = 'khfu152Q21'
const URLBASE = 'https://comp2140.uqcloud.net/api/'

/**
 * Takes parameters and sends a POST api call to /sampletolocation/
 * @param {Integer} songId 
 * @param {Integer} locationId 
 * @returns json response
 */
async function linkSample(songId, locationId) {
    const url = `${URLBASE}sampletolocation/?api_key=${APIKEY}`;

    const data = {
        'api_key': APIKEY,
        'sample_id': songId,
        'location_id': locationId
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });;
    const json = await response.json();
    console.log(json);
    return json;
  }

  /**
   * Takes id of sample to location and sends a DELETE api call to unlink the song to the location
   * @param {Integer} id 
   * @returns json response
   */
  async function unlinkSample(id) {
    const url = `${URLBASE}sampletolocation/${id}/?api_key=${APIKEY}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: ""
      });;
    const json = await response.json();
    console.log(json);
    return json;
  }


export { linkSample , unlinkSample };