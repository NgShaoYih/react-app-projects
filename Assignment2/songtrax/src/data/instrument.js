import * as Tone from "tone";

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

export const tonePart = new toneObject.Part((time, note) => {
    guitar.triggerAttackRelease(note, "8n", time);
}, []).start(0);

export const guitar = new toneObject.Sampler({
    urls: {
        "F3": "F3.mp3",
        "G3": "G3.mp3",
        "A3": "A3.mp3",
        "B3": "B3.mp3",
        "C3": "C3.mp3",
        "D3": "D3.mp3",
        "E3": "E3.mp3",
    },
    release: 1,
    baseUrl: "samples/guitar-acoustic/"
}).toDestination();

export const piano = new toneObject.Sampler({
    urls: {
        "F3": "F3.mp3",
        "G3": "G3.mp3",
        "A3": "A3.mp3",
        "B3": "B3.mp3",
        "C3": "C3.mp3",
        "D3": "D3.mp3",
        "E3": "E3.mp3",
    },
    release: 1,
    baseUrl: "samples/piano/"
}).toDestination();

export const violin = new toneObject.Sampler({
    urls: {
        "F3": "F3.mp3",
        "G3": "G3.mp3",
        "A3": "A3.mp3",
        "B3": "B3.mp3",
        "C3": "C3.mp3",
        "D3": "D3.mp3",
        "E3": "E3.mp3",
    },
    release: 1,
    baseUrl: "samples/violin/"
}).toDestination();