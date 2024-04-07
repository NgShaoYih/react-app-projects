import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderFooter from "../components/headerfooter";
import ShareButtons from "../components/ShareButtons";
import { getSample } from "../data/songs";
import { getLocations } from "../data/locations";
import { useParams } from "react-router-dom";
import '../App.css';

/**
 * The Share page of the SongTrax Application
 * @returns Songtrax share page
 */
export default function Share() {

    let { id } = useParams();
    const [song, setSong] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
      getSampleLocal()
      getLocationsLocal()
    }, [])
    
    const getSampleLocal = async() => {
      const songData = await getSample(id);
      setSong(songData)
      
    }
      
    const getLocationsLocal = async() => {
      const locationData = await getLocations();
      setLocations(locationData)
    }
  
    return (
      <HeaderFooter>
        <main>
        <h2 class="title">Share This Sample</h2>
        <div class="card">
            <div class="song-details">
                <h3>{song.name}</h3>
                <p>{song.datetime}</p>
            </div>
            <div className="buttons">
                <a href="#" class="bright-button" >Preview</a>
            </div>
        </div>
        
        {locations.map((location) => (
            <div class="toggle-row-container">
            <div class="location-name-label">
                <h4>{location.name}</h4>
            </div>
            <ShareButtons 
                locationId={location.id}
                songId={song.id}
            />

        </div>
        ))}

    </main>

      </HeaderFooter>
    );
}
