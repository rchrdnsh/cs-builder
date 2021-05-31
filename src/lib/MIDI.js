import { writable } from 'svelte/store'

// ----------------------------------------------------------------
// MIDI Stores
// ----------------------------------------------------------------

export const MIDIConnection = writable(``);

export const MIDIInputs = writable([]);
export const currentMIDIInputs = writable([]);

export const MIDIOutputs = writable([]);
export const currentMIDIOutputs = writable([]);

export const currentMIDINoteNumber = writable([]);
export const currentMIDINoteFrequency = writable([]);
export const currentMIDINoteName = writable([]);
export const currentMIDINoteVelocity = writable([]);

export const CurrentHarmony = writable();

// ----------------------------------------------------------------
// MIDI Utility Functions
// ----------------------------------------------------------------

export const messageType = (message) => {
  if (message === 144) {
    return `Note On`;
  } else if (message === 128) {
    return `Note Off`;
  }
};

export const getMIDINoteName = (number) => {

  let MIDIOctave = 24;

  if (number % 12 === 0 ){
    return `C${((number - MIDIOctave) / 12)}`
  } else if (number % 12 === 1){
    return `C#${((number - (MIDIOctave + 1)) / 12)}/Db${((number - (MIDIOctave + 1)) / 12)}`
  } else if (number % 12 === 2){
    return `D${((number - (MIDIOctave + 2)) / 12)}`
  } else if (number % 12 === 3){
    return `D#${((number - (MIDIOctave + 3)) / 12)}/Eb${((number - (MIDIOctave + 3)) / 12)}`
  } else if (number % 12 === 4){
    return `E${((number - (MIDIOctave + 4)) / 12)}`
  } else if (number % 12 === 5){
    return `F${((number - (MIDIOctave + 5)) / 12)}`
  } else if (number % 12 === 6){
    return `F#${((number - (MIDIOctave + 6)) / 12)}/Gb${((number - (MIDIOctave + 6)) / 12)}`
  } else if (number % 12 === 7){
    return `G${((number - (MIDIOctave + 7)) / 12)}`
  } else if (number % 12 === 8){
    return `G#${((number - (MIDIOctave + 8)) / 12)}/Ab${((number - (MIDIOctave + 8)) / 12)}`
  } else if (number % 12 === 9){
    return `A${((number - (MIDIOctave + 9)) / 12)}`
  } else if (number % 12 === 10){
    return `A#${((number - (MIDIOctave + 10)) / 12)}/Bb${((number - (MIDIOctave + 10)) / 12)}`
  } else if (number % 12 === 11){
    return `B${((number - (MIDIOctave + 11)) / 12)}`
  }
}

export const getMIDINoteFrequency = (number) => {
  let a = 444;
  let data = ( (a / 32) * (2 ** ( (number - 9) / 12 ) ) );
  let round = (Math.round(data * 1) / 1);
  return round;
}

// ----------------------------------------------------------------
    // From React
    // ----------------------------------------------------------------

    // const notes = useMIDINotes(props.input, { channel: 1 })

    // const MIDINoteNumbers = notes.map((n) => n.note).join(', ')
    // const MIDINoteVelocities = notes.map((n) => n.velocity).join(', ')
    // const MIDINotesOn = notes.map((n) => n.on).join(', ')


    // function getMIDINoteNumber(message) {
    //   console.log(message.data[1]);
    //   return message.data[1]
    // }

    // let notes = currentMIDINote;
    // MIDINoteNumbers = notes.map((n) => n.note).join(', ')
    // let MIDIOctave = 24;
  
    // MIDINoteName = notes.map((n) => {
    //   if (n.note % 12 === 0 ){
    //     return `C${((n.note - MIDIOctave) / 12)}`
    //   } else if (n.note % 12 === 1){
    //     return `C#${((n.note - (MIDIOctave + 1)) / 12)}/Db${((n.note - (MIDIOctave + 1)) / 12)}`
    //   } else if (n.note % 12 === 2){
    //     return `D${((n.note - (MIDIOctave + 2)) / 12)}`
    //   } else if (n.note % 12 === 3){
    //     return `D#${((n.note - (MIDIOctave + 3)) / 12)}/Eb${((n.note - (MIDIOctave + 3)) / 12)}`
    //   } else if (n.note % 12 === 4){
    //     return `E${((n.note - (MIDIOctave + 4)) / 12)}`
    //   } else if (n.note % 12 === 5){
    //     return `F${((n.note - (MIDIOctave + 5)) / 12)}`
    //   } else if (n.note % 12 === 6){
    //     return `F#${((n.note - (MIDIOctave + 6)) / 12)}/Gb${((n.note - (MIDIOctave + 6)) / 12)}`
    //   } else if (n.note % 12 === 7){
    //     return `G${((n.note - (MIDIOctave + 7)) / 12)}`
    //   } else if (n.note % 12 === 8){
    //     return `G#${((n.note - (MIDIOctave + 8)) / 12)}/Ab${((n.note - (MIDIOctave + 8)) / 12)}`
    //   } else if (n.note % 12 === 9){
    //     return `A${((n.note - (MIDIOctave + 9)) / 12)}`
    //   } else if (n.note % 12 === 10){
    //     return `A#${((n.note - (MIDIOctave + 10)) / 12)}/Bb${((n.note - (MIDIOctave + 10)) / 12)}`
    //   } else if (n.note % 12 === 11){
    //     return `B${((n.note - (MIDIOctave + 11)) / 12)}`
    //   }
    // }).join(', ')