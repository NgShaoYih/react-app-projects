import React from "react";
import { useEffect, useState } from "react";
import HeaderFooter from "../components/headerfooter";
import ToggleRowContainer from "../components/ToggleRowContainer";
import ToggleRowInstrument from "../components/ToggleRowInstrument";
import { useParams } from "react-router-dom";
import { getSample, createSample } from "../data/songs";
import  Preview  from "../data/playback";
import '../App.css';

/**
 * The Edit and Create page of the SongTrax Application
 * @returns Songtrax edit/create page
 */
export default function Create() {
    
    const recording_data = [
        {"B": [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
        {"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}
    ];

    let newSong= {
        'type': "guitar", 
        'name': "new song", 
        'recording_data': JSON.stringify(recording_data),
        'api_key': 'khfu152Q21'
     }

    let { id } = useParams();
    const [song, setSongs] = useState([])

    useEffect(() => {
        getSamplesLocal()
    }, [])
    
    const getSamplesLocal = async() => {
        const data = await getSample(id);
        setSongs(data);
    }

    const updateInstrument = (type) => {
        newSong.type = type
    }

    const updateSong = (data) => {
        newSong.recording_data = data
    }

    if (id === 'create') {

        return (
            <HeaderFooter>
                <h1>creating new song</h1>
                <main>
                    <h2 class="title">Edit Sample:</h2>
                    <form class="card edit-card">
                        <input type="text" value={newSong.name}></input>
                        <div class="button-group-container">
                                <Preview

                                />
                                <button type="button" class="bright-button" onClick={() => createSample(newSong)}>Save</button>
                        </div>
                    </form>

                <ToggleRowInstrument
                    func={updateInstrument}
                    type={undefined}
                />

                <ToggleRowContainer
                    func={updateSong}
                    type={newSong.type}
                    name={newSong.name}
                    recording_data={newSong.recording_data}
                />
                
                </main>
            </HeaderFooter>
      );
    }
    
    else {
        

        return (
        <HeaderFooter>
            <main>
                <h2 class="title">Edit Sample:</h2>
                <form class="card edit-card">
                    <input type="text" value={song.name}></input>
                    <div class="button-group-container">
                            <button type="button" class="button">Preview</button>
                            <button type="button" class="bright-button" onClick={() => createSample(song)} >Save</button>
                    </div>
                </form>

                <ToggleRowInstrument
                    func={updateInstrument}
                    type={song.type}
                />

                <ToggleRowContainer
                    func={updateSong}
                    type={song.type}
                    name={song.name}
                    recording_data={song.recording_data}
                />
        </main>

        </HeaderFooter>
        );
}
}