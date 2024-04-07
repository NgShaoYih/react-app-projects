import React from "react";
import { useEffect, useState } from "react";
import { linkSample, unlinkSample } from "../data/sampleToLocation";

/**
 * Takes song and location id and links them using the linkSample function
 * @param {*} { locationId, songId } 
 * @returns Share buttons component
 */
const ShareButtons = ({ locationId, songId }) => {

    const shareTypes = ['Shared', 'Not Shared']

    const [share, setShare] = useState(shareTypes[1]);
    return (
        <div class="sequence-row-container">
          {shareTypes.map((type) => (
            <button
                className={type === share ? "toggle-selected" : "toggle"}
                onClick={() => {setShare(type); linkSample(songId, locationId);}}
            >
                {type}
            </button>
            
          ))}
        </div>
    );
    

};

export default ShareButtons;