import { useState, useEffect } from "react";
import { guitar, piano, violin } from "../data/instrument.js";
import { toneObject, toneTransport, tonePart } from "../data/instrument.js";

/**
 * preview button component, when clicked it will play the users song
 * @param {*} previewing, setPreviewing 
 * @returns preview button
 */
const Preview = ({ previewing, setPreviewing }) => {

    function handleButtonClick() {

        toneObject.start();
        toneTransport.stop();

        if(previewing) {
            setPreviewing(false);
            console.log("Preview stopped manually.");
        }
        else {
            setPreviewing(true);
            console.log("Preview started.");
            toneTransport.start();
        }

    }

    return <button onClick={handleButtonClick}>{previewing ? "Stop Previewing" : "Preview"}</button>;

}

export default Preview;