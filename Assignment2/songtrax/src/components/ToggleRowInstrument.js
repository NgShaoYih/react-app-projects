import React from "react";
import { useEffect, useState } from "react";

/**
 * Takes the instrument type and returns the updated instrument through the updateInstrument function
 * @param {func} updateInstrument 
 * @param {*} type 
 * @returns Displays the instrument type selection bar
 */
function ToggleRowInstrument ( updateInstrument, {type} ) {

    const instruments = [
        {id: 'guitar', label: 'Guitar'},
        {id: 'piano', label: 'Piano'},
        {id: 'violin', label: 'Violin'},
        {id: 'drums', label: 'Drums'},
    ];

    let selectedType = type;

    const [active, setActive] = useState('guitar');
    useEffect(() => {
        if((selectedType === undefined)){
            setActive('guitar')
        }else {
            setActive(selectedType)
        }
    },[selectedType])


    const handleButtonClick = (buttonId) => {
        setActive(buttonId);
        selectedType = buttonId;
        updateInstrument.func(selectedType);
    }

    console.log(selectedType);

    return (
        <div class="toggle-row-container">
        <div class="row-label">
            <h4>Type</h4>
        </div>
        <div class="sequence-row-container">
            {instruments.map((instrument) => (
              <button
                key={instrument.id}
                value={instrument.label}
                onClick={() => handleButtonClick(instrument.id)}
                className={instrument.id === active ? "toggle-selected" : "toggle"}
              >
                {instrument.label}
              </button>
            ))}
        </div>
    </div>
    )
    
};

export default ToggleRowInstrument;