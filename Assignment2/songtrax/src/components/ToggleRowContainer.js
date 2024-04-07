import React from "react";
import { useEffect, useState } from "react";
import { guitar, piano, violin } from "../data/instrument.js";
import { toneObject, toneTransport, tonePart } from "../data/instrument.js";

const noteMapping = [
    {id: 'B', value: 'B3'},
    {id: 'A', value: 'A3'},
    {id: 'G', value: 'G3'},
    {id: 'F', value: 'F3'},
    {id: 'E', value: 'E3'},
    {id: 'D', value: 'D3'},
    {id: 'C', value: 'C3'},
];

/**
 * Displays one button per note
 * @param {*} barID barEnabled handleBarClick
 * @returns Button class for each note
 */
function Bar({ barID, barEnabled, handleBarClick }) {

    function barSelected() {
       if (barEnabled) {
           return "toggle-selected";
       }
       return "toggle";
   }
   
    return (
        <button 
        className={barSelected()} 
        onClick={handleBarClick}
        >
        </button>
    );
   
}

/**
 * Displays the whole bar of buttons the notes
 * @param {*} sequence, setSequence, toneObject
 * @returns Full 16 bars for each note
 */
function Bars({ sequence, setSequence, toneObject }) {

    function sortSequence(bar, otherBar) {
        if (bar.barID < otherBar.barID) {
            return -1;
        }
        if (bar.barID > otherBar.barID) {
            return 1;
        }
        return 0;
    }

    function handleBarClick(bar) {
        const now = toneObject.now();
        // guitar.triggerAttackRelease("C3", "8n", now);   // this is problematic
        let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
        setSequence([ ...filteredSequence, { ...bar, barEnabled: !bar.barEnabled } ]);
    }

    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);

}

/**
 * Accepts song recording data and displays the notes and bars
 * @param {*} dataId, data, toneObject, toneTransport, tonePart
 * @returns The note and it's full bar
 */
function Sequencer({ dataId, data, toneObject, toneTransport, tonePart }) {

    let barData = [];

    switch (dataId) {
        case "B":
            barData = data.B;
            break;
        case "A":
            barData = data.A;
            break;
        case "G":
            barData = data.G;
            break;
        case "F":
            barData = data.F;
            break;
        case "E":
            barData = data.E;
            break;      
        case "D":
            barData = data.D;
            break;
        case "C":
            barData = data.C;
            break;          
    };

    const initialSequence = [];
    for(let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barEnabled: false,
            barEnabled: barData[bar-1] ? true : false
        });
    }
    const [sequence, setSequence] = useState(initialSequence);

    const initialPreviewing = false;
    const [previewing, setPreviewing] = useState(initialPreviewing);

    useEffect(() => {

        tonePart.clear();
        toneTransport.cancel();

        sequence.filter(bar => bar.barEnabled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "C3"); // Plays an C note on 3rd octave 0.25s apart
        });

        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16/4);

    });

    return (
        <>
            <div className="sequence-row-container">
                <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} />
            </div>
        </>
    );

}

/**
 * Takes song details and display it
 * @param {*} type, name, recording_data
 * @returns The notes and bars component
 */
const ToggleRowContainer = ( { type, name, recording_data }) => {

    let data = [];

    if (recording_data != undefined) {
        data = JSON.parse(recording_data);


        return (
            <div>
                {data.map((item, index) => (
                <div className="toggle-row-container" key={index}>
                    <div className="row-label">
                    <h4>{Object.keys(item)[0]}</h4>
                    </div>
                    <div className="sequence-row-container">
                        <Sequencer 
                        dataId={Object.keys(item)[0]} 
                        data={item}
                        toneObject={toneObject} 
                        toneTransport={toneTransport} 
                        tonePart={tonePart} />
                    </div>
                </div>
                ))}
            </div>
        )};
};

export default ToggleRowContainer;