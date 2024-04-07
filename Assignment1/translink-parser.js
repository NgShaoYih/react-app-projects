import fs from 'fs';
import promptSync from "prompt-sync";
import {parse} from 'csv-parse/sync';
import fetch from 'node-fetch';

// Declare Global Constants
const DATE = "date";
const TIME = "time";
const VALID_BUS_ROUTES = ["66", "192", "169", "209", "29", "P332", "139", "28"];
const ROUTES = "routes"
const TRIPS = "trips"
const STOP_TIMES = "stop_times"
const TRIP_UPDATE_URL = "http://127.0.0.1:5343/gtfs/seq/trip_updates.json";
const VEHICLE_POS_URL = "http://127.0.0.1:5343/gtfs/seq/vehicle_positions.json";

const prompt = promptSync({sigint: true})

/**
 * This function will save a JSON cache file with the specified filename & data.
 * -- function referenced from Week 4 contact
 * @param {string} filenameAppend - The string to append to the JSON filename.
 * @param {string} data - The string containing JSON data to save.
 */
async function save_cache(filename, data) {
    try {
        await fs.writeFile(filename, JSON.stringify(data));
    }
    catch(error) {
        console.log(error);
    }
}

/**
 * This function will read a JSON cache file with the specified filename.
 * -- function referenced from Week 4 contact
 * @param {string} filename - The string to append to the JSON filename.
 * @returns {string} the JSON data from the cache file.
 */
async function read_cache(filename) {
    try {
        const data = await fs.readFile(filename);
        return data;
    }
    catch(error) {
        console.log(error);
    }
}

/**
 * This function fetches data asynchronously based on the URL provided.
 * -- function referenced from Week 4 contact
 * @param {string} url - the API url
 * @returns {string} JSON response of data
 */
async function fetch_data(url) {
    const response = await fetch(url);
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    } else {
        console.log(`Failed to fetch data: ${response.statusText}`);
        return null;
    }
}

/**
 * This function will filter the fetched data 
 * -- function referenced from Week 4 contact
 * @param {string} routeId - The array to sort against.
 * @param {string} url - The API url.
 * @returns {[string]} the filtered array.
 */
async function filter_data(routeIds, url) {
    const fetchArr = await fetch_data(url);  // fetchArr should contain the resolved value
    let resultArray = [];
    if (url === TRIP_UPDATE_URL) {
        fetchArr.entity.forEach((item) => {
            if (routeIds.includes(item.tripUpdate.trip.routeId)) {
                resultArray.push(item);
            }
         })
    } else {
        fetchArr.entity.forEach((item) => {
            if (routeIds.includes(item.vehicle.trip.routeId)) {
                resultArray.push(item);
            }
         })
    }
    
    return resultArray;
}

/**
 * This function parse the .txt files
 * -- function referenced from Week 4 lecture
 * @param {string} file - The array to sort against.
 * @param {string} filterOption - The API url.
 * @param {[string]} filterContent - The array of content to filter against.
 * @returns {[string]} the csv array.
 */
const parse_CSV = (file, filterOption = null, filterContent = null) => {
    const data = fs.readFileSync(file, 'utf8');
    
    if (filterOption == ROUTES) {
        return parse(data, {
            columns: true
        }).filter((route) => VALID_BUS_ROUTES.includes(route.route_short_name))
    }

    if (filterOption == STOP_TIMES) {
        return parse(data, {
            columns: true,
            on_record: (record) => 
            filterContent.includes(record.trip_id) ? record : null
        })
    }

    return parse(data, {
        columns: true
    });
}

/**
 * This function validates user input
 * @param {string} userInput - The user's input.
 * @param {string} dataType - The type of data to validate.
 * @returns {boolean} valid or invalid.
 */
function validate_data(userInput, dataType) {
    let valid = false;

    try {
        if (dataType === DATE) {
            let validateArr = userInput.split("-").map(Number).map((x) => parseInt(x));
            if ((0 < validateArr[1] && validateArr[1] < 13) && (0 < validateArr[2] && validateArr[2] < 32) && (validateArr.length == 3)) {
                valid = true;
            }
        } else if (dataType === TIME) {
            let validateArr = userInput.split(":").map(Number).map((x) => parseInt(x));
            if ((0 <= validateArr[0] && validateArr[0] < 24) && (0 <= validateArr[1] && validateArr[1] < 60) && (validateArr.length == 2)) {
                valid = true;
            }
        }
    } catch (error) {
        console.log(error);
    }

    return valid;
    
}

/**
 * This function accepts user input for date
 * @returns {string} user's input for date.
 */
function get_user_date() {
    let inputDate = prompt("What date will you depart UQ Lakes station by bus? ");
    
    if (!(validate_data(inputDate, DATE))) {
        console.log("Incorrect date format. Please use YYYY-MM-DD");
        inputDate = get_user_date();
    }

    return inputDate;
}

/**
 * This function accepts user input for time
 * @returns {string} user's input for time.
 */
function get_user_time() {
    let inputTime = prompt("What time will you depart UQ Lakes station by bus? ");
    
    if (!(validate_data(inputTime, TIME))) {
        console.log("Incorrect time format. Please use HH:mm");
        inputTime = get_user_time();
    }

    return inputTime;
}

/**
 * This function accepts user input for route
 * @returns {[string]} user's input for routes.
 */
function get_user_route() {
    console.log("What Bus Route would you like to take? \n 1 - Show all routes \n 2 - 66 \n 3 - 192 \n 4 - 169 \n 5 - 209 \n 6 - 29 \n 7 - P332 \n 8 - 139 \n 9 - 28 ");
    let inputRoute = prompt();
    const validInput = ['1', '2', '3', '4', '5', '6', '7' ,'8', '9']
    let outputRoutes

    if (!validInput.includes(inputRoute)) {
        console.log("Please enter a valid option for a bus route");
        inputRoute = get_user_route();
    }
    
    if (inputRoute == "1") {
        outputRoutes = VALID_BUS_ROUTES
    } else {
        outputRoutes = [VALID_BUS_ROUTES[parseInt(inputRoute)-2]]
    }

    return outputRoutes;

}

/**
 * This function will ask the user if they would like to search again
 */
function retry_parser() {
    let userInput = prompt("Would you like to search again? ");
    let retry = userInput.toLowerCase();

    if (retry == 'y' || retry == 'yes') {
        main();
    } else if (retry == 'n' || retry == 'no') {
        console.log("Thanks for using the UQ Lakes station bus tracker!");
    } else {
        console.log("Please enter a valid option. ");
        retry_parser();
    }

}

/**
 * The main function
 * -- referenced from Week 4 lecture
 */
async function main() {

    /**
     * This function accepts user input for route
     * @param {[string]} routes - routes array
     * @param {[string]} trips - trips array
     * @param {[string]} stopTimes - stopTimes array
     * @param {[string]} arrivalArr - live arrival array
     * @param {[string]} vehicleArr - live vehicle array
     * @returns {[string]} final table output.
     */
    const merge_bus_details = (routes, trips, stopTimes, arrivalArr, vehicleArr) => {
        return stopTimes.map((data) => {

            try {
                let tripId = data.trip_id;
                let stopId = data.stop_id;

                let tripUpdateObj = arrivalArr.find((elem) => elem.tripUpdate.trip.tripId === tripId);
                                
                let stopTimeUpdateObj = tripUpdateObj.tripUpdate.stopTimeUpdate.filter((t) => t.stopId === stopId);
                let liveArrivalTime = stopTimeUpdateObj[0].arrival.time;

                let vehicleObj = vehicleArr.find((elem) => elem.vehicle.trip.tripId == tripId)
                let liveLat = vehicleObj.vehicle.position.latitude;
                let liveLong = vehicleObj.vehicle.position.longitude;
                
                let tripEntry = trips.find((trip) => trip.trip_id == tripId)
                let dataRoute = routes.find((r) => tripEntry.route_id == r.route_id);

                return {
                    route_short_name: dataRoute.route_short_name,
                    route_long_name: dataRoute.route_long_name,
                    service_id: tripEntry.service_id,
                    trip_headsign: tripEntry.trip_headsign,
                    arrival_time: data.arrival_time,
                    live_arrival_time: liveArrivalTime,
                    live_position: `${liveLat}, ${liveLong}`
                };
            } catch (error) {
                // if live data does not work

                let tripId = data.trip_id;
                let stopId = data.stop_id;
                
                let tripEntry = trips.find((trip) => trip.trip_id == tripId)
                let dataRoute = routes.find((r) => tripEntry.route_id == r.route_id);

                return {
                    route_short_name: dataRoute.route_short_name,
                    route_long_name: dataRoute.route_long_name,
                    service_id: tripEntry.service_id,
                    trip_headsign: tripEntry.trip_headsign,
                    arrival_time: data.arrival_time,
                };
            }
            
        });
    };

    // Display Welcome message
    console.log("Welcome to the UQ Lakes station bus tracker!");

    let inputDate = get_user_date();
    let inputTime = get_user_time();
    let inputRoute = get_user_route();
    
    // join the inputDate and inputTime into a date object
    let userDateTime = new Date(inputDate);
    userDateTime.setHours(inputTime.split(":")[0]);
    userDateTime.setMinutes(inputTime.split(":")[1]);

    let dateTime10Min = new Date(userDateTime);
    dateTime10Min.setMinutes(dateTime10Min.getMinutes() + 10);

    const [
        routes
      ] = await Promise.all([
        parse_CSV('static-data/routes.txt', ROUTES, inputRoute),
      ]);

    const routesIdArr = [...routes].map((route) => route.route_id);

    const [
        calendar
    ] = await Promise.all([
        parse_CSV('static-data/calendar.txt')
    ]);

    const calendarServiceArr = [...calendar].filter((record) => {
                                    let startDate = new Date(record.start_date.slice(0,4), record.start_date.slice(4,6), record.start_date.slice(6,8));
                                    return (userDateTime >= startDate);
                                })
                                .map((data) => data.service_id)

    const [
        trips
      ] = await Promise.all([
        parse_CSV('static-data/trips.txt')
      ]);

    const tripIdArr = [...trips].filter((data) => routesIdArr.includes(data.route_id))
                                .filter((data) => calendarServiceArr.includes(data.service_id))
                                .map((data) => data.trip_id)

    const [
      stopTimesAll
    ] = await Promise.all([
      parse_CSV('static-data/stop_times.txt', STOP_TIMES, tripIdArr)
      ]);



    let stopTimes = stopTimesAll.filter((data) => {
        let tripTime = new Date(inputDate);
        tripTime.setHours(data.arrival_time.split(':')[0], data.arrival_time.split(':')[1]);
        return (tripTime >= userDateTime && tripTime <= dateTime10Min);
    });

    //get cached data
    // let tripUpdateCache = await read_cache('cached-data/trip-updates.json');
    
    // let arrivalArr = filter_data(routesIdArr, TRIP_UPDATE_URL)
    //         .then(filteredArrival => {
    //             return filteredArrival
    //         });

    // if (tripUpdateCache) {
    //     tripUpdateAll = JSON.parse(tripUpdateCache);
    // }

    // if (tripUpdateAll != arrivalArr) {
        
    //     let vehicleArr = filter_data(routesIdArr, VEHICLE_POS_URL)
    //         .then(filteredPosition => {
    //             return filteredPosition
    //         });
    
    //     //save to cache
    //     await save_cache('cached-data/trip-updates.json', arrivalArr);
    //     await save_cache('cached-data/vehicle-position.json', vehicleArr);

    // } else {
    //     let vehiclePosCache = await read_cache('cached-data/vehicle-position.json');
    //     vehicleArr = JSON.parse(vehiclePosCache);
    //     arrivalArr = tripUpdateAll;
    // }


    // if cache doesnt work
    let arrivalArr = await filter_data(routesIdArr, TRIP_UPDATE_URL)
        .then(filteredArrival => {
            return filteredArrival
        });

    let vehicleArr = await filter_data(routesIdArr, VEHICLE_POS_URL)
        .then(filteredPosition => {
            return filteredPosition
        });

    // merge data and then filter by route
    const busFullDetails = merge_bus_details(routes, trips, stopTimes, arrivalArr, vehicleArr);

    console.table(busFullDetails);

    retry_parser();
}

main();