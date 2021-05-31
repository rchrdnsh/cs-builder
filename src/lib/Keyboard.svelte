<script>
	import Keys from './Keys.svelte'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'
  import { messageType, getMIDINoteName, getMIDINoteFrequency } from './MIDI.js';

//   import { index, trackList } from '../audio/stores'
//   import Play from '../audio/Play.svelte'

//   export let title = '';
//   export let artist = 'RYKR';
//   export let artwork = '/images/rykr-placeholder.svg';
//   export let alt = 'RYKR Logo.';
//   export let file = '';

  export let top = false;

  export let tiny = false;
  export let small = false;

  export let article = false;
  export let player = false;
  // export let tool = false;
  export let octaves = [];
  export let zones = [];
  // $: octavesArray = octaves.split(', ');
  export let notes = [];
  // $: notesArray = notes.split(', ');

  export let markers = false;
  export let overlay = [];
  export let MIDINotes = [];
  export let center = false;
  export let border = false;
  export let info = false;
  export let controls = false;

  let toggleNotes = false;
  let focusMode = false;
  let currentKeyboardColor = '';

  let colors = ['correct', 'surf', 'violet', 'incorrect', 'harvest', 'shore', 'cane'];
  let currentHighlight = 'correct';

  let MIDISupport = '';
  let MIDIDevice = '';
  let MIDIEvents = [];

  let MIDIInputs = [];
  const currentMIDIInputs = writable([]);

  let MIDIOutputs = [];
  const currentMIDIOutputs = writable([]);

  let MIDINoteNumber = [];
  const currentMIDINoteNumber = writable([]);
  let MIDINoteFrequency = [];
  const currentMIDINoteFrequency = writable([]);
  let MIDINoteName = [];
  const currentMIDINoteName = writable([]);
  let MIDINoteVelocity = [];
  const currentMIDINoteVelocity = writable([]);

  onMount(() => {

    // ----------------------------------------------------------------
    // Looking for MIDI support in the browser
    // ----------------------------------------------------------------

    if (navigator.requestMIDIAccess) {
      MIDISupport = `This browser supports WebMIDI!`;
    } else {
      MIDISupport = `WebMIDI is not supported in this browser.`;
    };

    // ----------------------------------------------------------------
    // Requesting MIDI Access via a promise and passing functions
    // ----------------------------------------------------------------
    
    if (navigator.requestMIDIAccess) {

      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

      function onMIDISuccess(midiAccess) {

        MIDIDevice = `Your MIDI devices have been accesed!`;

        // let inputs = midiAccess.inputs.values();
        // // loop over all available inputs and listen for any MIDI input
        // for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        //   // each time there is a midi message call the onMIDIMessage function
        //   input.value.onmidimessage = getMIDIMessage;
        // }

        for (let input of midiAccess.inputs.values()) {
          input.onmidimessage = getMIDIMessage;
        }

        // console.log(midiAccess.inputs);

        // for (var entry of midiAccess.inputs) {
        //   var input = entry[1];
        //   console.log(
        //     `
        //       Input port [type: ${input.type}]
        //       id: ${input.id}
        //       manufacturer: ${input.manufacturer}
        //       name: ${input.name}
        //       version: ${input.version}
        //       state: ${input.state}
        //     `
        //   );
        // }

        // console.log(midiAccess);

        // inputs = midiAccess.inputs;
        // console.log(inputs);
        // let outputs = midiAccess.outputs;
        // console.log(outputs);

        midiAccess.onstatechange = function(event) {

          for (let input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage;
          }

          // console.log(midiAccess.inputs);

        // console.log(event);

          // for (let entry of midiAccess.inputs) {
          //   let input = entry[1];
          //   console.log(
          //     `
          //       Input port [type: ${input.type}]
          //       id: ${input.id}
          //       manufacturer: ${input.manufacturer}
          //       name: ${input.name}
          //       version: ${input.version}
          //       state: ${input.state}
          //     `
          //   );
          // }

        // Print information about the (dis)connected MIDI controller
        // console.log(event.port.name, event.port.manufacturer, event.port.state);
        // MIDIInputs.push(`${event.port.name}, ${event.port.manufacturer}, ${event.port.state}`);
        // MIDIInputs = MIDIInputs;

        // MIDIInputs = [...MIDIInputs, `${event.port.manufacturer} ${event.port.name} ${event.port.state} ${event.port.type}`];
        // MIDIInputs = [...MIDIInputs, `${event.port.manufacturer} ${event.port.name}`];
        // currentMIDIInputs = [...currentMIDIInputs, `${event.port.manufacturer} ${event.port.name} ${event.port.state}`];

        // currentMIDIInputs.update(data => {
        //   if (event.port.state === 'connected' && event.port.type === 'input') {
        //     // data.push(`${event.port.manufacturer} ${event.port.name} ${event.port.state} ${event.port.type}`);
        //     data.push(`${event.port.manufacturer} ${event.port.name}`);
        //     return data;
        //   } else {
        //     // data = data.filter(event => event !== `${event.port.manufacturer} ${event.port.name} ${event.port.state} ${event.port.type}`);
        //     data = data.filter(event => event !== `${event.port.manufacturer} ${event.port.name}`);
        //     return data;
        //   }
        // });

        // currentMIDIInputs.update(data => {
        //   if ( event.port.type === 'input') {
        //     data.push(`${event.port.manufacturer} ${event.port.name}`);
        //     return data;
        //   }
        // });

        };
        
      };

      function onMIDIFailure() {
        MIDIDevice = `Could not access your MIDI devices.`;
      };

      // ----------------------------------------------------------------
      // MIDI Message Function
      // ----------------------------------------------------------------

      function getMIDIMessage(message) {

        let command = message.data[0];
        let note = message.data[1];
        let velocity = message.data[2];
        
        MIDIEvents = [ ...MIDIEvents, `Message: ${messageType(command)} - Number: ${note} - Velocity: ${velocity}`]

        MIDINoteNumber = [ ...MIDINoteNumber, note];

        currentMIDINoteNumber.update(data => {
          if (command === 144) {
            data.push(note);
            return data;
          } else if (command === 128) {
            data = data.filter(event => event !== note);
            return data;
          } else {
            return data;
          }
        });

        MIDINoteFrequency = [ ...MIDINoteFrequency, `${getMIDINoteFrequency(note)}`];

        currentMIDINoteFrequency.update(data => {
          if (command === 144) {
            data.push(`${getMIDINoteFrequency(note)}`);
            return data;
          } else if (command === 128) {
            data = data.filter(event => event !== `${getMIDINoteFrequency(note)}`);
            return data;
          } else {
            return data;
          }
        });

        MIDINoteName = [ ...MIDINoteName, `${getMIDINoteName(note)}`];

        currentMIDINoteName.update(data => {
          if (command === 144) {
            data.push(`${getMIDINoteName(note)}`);
            return data;
          } else if (command === 128) {
            data = data.filter(event => event !== `${getMIDINoteName(note)}`);
            return data;
          } else {
            return data;
          }
        });

        MIDINoteVelocity = [ ...MIDINoteVelocity, `${velocity}`];

        currentMIDINoteVelocity.update(data => {
          if (command === 144) {
            data.push(velocity)
            return data
          } else if (command === 128) {
            // data = data.filter(event => event !== velocity);
            data = data.slice(0, 0);
            return data;
          } else {
            return data;
          }
        }); 
      }
    }
  })

  $: MIDINotes = $currentMIDINoteName;
  // $: console.log($currentMIDIInputs);
</script>

<div
  class='container'
  class:article={article === true}
  class:center={center === true}
  class:top={top === true}
  class:border={border === true}
  class:fit-content={zones.length === 1 || octaves.length === 1 || octaves.length === 2}
  class:rounder={player === true}
  class:skinny={tiny === true || small === true}
>
  <!-- Player Controls -->
<!--   {#if player === true}
    <div class='round-player-border textured-bg'/>
    <div class='player' class:playing-border={title === $trackList[$index].title}>
      <div class='play-button'>
        <Play title={title} artist={artist} artwork={artwork} alt={alt} file={file}/>
      </div>
      <div class='title-text'>{title}</div>
    </div>
  {/if} -->

  <!-- MIDI Controls -->
  {#if info === true}
    <div class='information'>

      <div
        class='midi-status'
        class:midi-status-on={MIDINotes.length !== 0}
      />
      <div class='title'>MIDI</div>
            <!-- <div class='midi-connection'>
        <h1>MIDI Status</h1>
        <div class='midi-support'>
          <div class='light'/>
          <p>{MIDISupport}</p>
        </div>
        <div class='midi-access'>
          <div class='light'/>
          <p>{MIDIDevice}</p>
        </div>
        <div class='midi-signal'>
          <div class='light'/>
          <p>MIDI Signal</p>
        </div>
      </div> -->

      <div class='highlight textured-bg'>
        <div class='label'>Highlight</div>
        {#each colors as color}
          <button
            class='color-button {color}'
            class:active-color-button={currentHighlight === color}
            on:click={() => currentHighlight = color}
          />
        {/each}
      </div>

      <div class='highlight midi-stats textured-bg'>
        <div class='label'>Note</div>
        <h1>Number(s)</h1>
        <div class='scroll'><p>{$currentMIDINoteNumber.join(', ')}</p></div>
        <h1>Frequenc(ies)</h1>
        <div class='scroll'><p>{$currentMIDINoteFrequency.join(', ')}</p></div>
        <h1>Name(s)</h1>
        <div class='scroll'><p>{$currentMIDINoteName.join(', ')}</p></div>
        <h1>Velocitie(s)</h1>
        <div class='scroll'><p>{$currentMIDINoteVelocity.join(', ')}</p></div>
        <!-- <h1>Harmony</h1>
        <div class='scroll'><p>Coming Soon...</p></div> -->
      </div>
    </div>

  {/if}

  <!-- Keyboard Controls -->

  {#if controls === true}

    <div class='controls'>

      <button class='note-button'
        class:active={toggleNotes === true}
        on:click={() => toggleNotes = !toggleNotes}
      >
        Note Names
      </button>

      <button class='note-button'
        class:active={focusMode === true}
        on:click={() => focusMode = !focusMode}
      >
        Focus Mode
      </button>

      <div class='color-scheme'>

        <button class='scheme-button'
          class:active-scheme={currentKeyboardColor === 'inverted'}
          on:click={() =>
            currentKeyboardColor = currentKeyboardColor === '' ||
            currentKeyboardColor === 'korg-blood' ||
            currentKeyboardColor === 'all-black' ? 'inverted' :
            ''
          }
        >
          Invert<br/>Colors
        </button>
  
        <button class='scheme-button'
          class:active-scheme={currentKeyboardColor === 'korg-blood'}
          on:click={() =>
            currentKeyboardColor = currentKeyboardColor === '' ||
            currentKeyboardColor === 'inverted' ||
            currentKeyboardColor === 'all-black' ? 'korg-blood' :
            ''
          }
        >
          Korg<br/>Blood
        </button>
  
        <button class='scheme-button'
          class:active-scheme={currentKeyboardColor === 'all-black'}
          on:click={() =>
            currentKeyboardColor = currentKeyboardColor === '' ||
            currentKeyboardColor === 'inverted' ||
            currentKeyboardColor === 'korg-blood' ? 'all-black' :
            ''
          }
        >
          All<br/>Black
        </button>

      </div>

    </div>
  {/if}

  <!-- Keyboard -->
  <div
    class='keyboard-box'
    class:one-octave-keyboard={octaves.length === 1}
    class:if-player={player === true}
    class:if-info={info === true}
    class:if-controls={controls === true}
  >
    <div class='keyboard'>
      <Keys
        tiny={tiny}
        small={small}
        octaves={octaves}
        zones={zones}
        notes={notes}
        markers={markers}
        overlay={overlay}
        MIDINotes={MIDINotes}
        currentHighlight={currentHighlight}
        toggleNotes={toggleNotes}
        focusMode={focusMode}
        currentKeyboardColor={currentKeyboardColor}
      />

      <!-- {#if tool === true}
        <Keys
          octaves={octaves}
          notes={notes}
          {overlay}
          {MIDINotes}
          {currentHighlight}
          {toggleNotes}
          {focusMode}
          {currentKeyboardColor}
        />
      {:else}
        <Keys
          octaves={() => octaves.split(', ')}
          notes={() => notes.split(', ')}
          {overlay}
          {MIDINotes}
          {currentHighlight}
          {toggleNotes}
          {focusMode}
          {currentKeyboardColor}
        />
      {/if} -->
    </div>
  </div>
</div>

<style>
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: min-content;
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: min-content repeat(7, 1fr);
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    background: #2a2a2a;
    border: none;
    border-radius: 0;
/*     padding: 0.5rem; */
    background: var(--bg-4);
    border: 1px solid var(--border-4);
    border-radius: 12px;
    box-shadow: var(--box-shadow-4);
  }

  .article {
    grid-column: 1 / 4;
    justify-self: center;
  }

  .top {
    align-self: start;
  }

  .border {
/*     padding: 0.5rem; */
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 12px;
  }

  .fit-content {
    width: max-content;
  }

  .rounder {
    border-radius: 32px 12px 12px 12px;
  }

  .skinny {
    padding: 0.25rem;
  }

  @media (orientation: portrait) {
    .container {
      width: 100vw;
/*       padding: 0.5rem; */
      margin: 0;
      row-gap: 0;
      border-radius: 0;
    }
  }

  @media (orientation: landscape) {
    .container {
      border-radius: 12px;
      width: 100%;
      width: fit-content;
      max-width: 100%;
      /* max-width: fit-content; */
    }

    .one-octave {
      width: max-content;
    }

    .rounder {
      border-radius: 40px 12px 12px 12px;
    }
  }

  .player {
    grid-row: 1 / 2;
    grid-column: 1 / 9;
    z-index: 2;
    margin: 0;
    /* margin-left: -40px; */
    padding: 0;
    padding-left: 0.5rem;
    background: var(--bg-3);
    border: 1px solid var(--border-3);
    border-radius: 10px;
    border-radius: 4rem 16px 16px 4rem;
    height: 64px;
    box-shadow: var(--inset-box-shadow-4);
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 0.5rem;
    align-items: center;
    justify-items: start;
    /* box-shadow: 0px 0px 0px 1px #666, 0px 0px 0px 7px #333, 0px 0px 0px 8px #666; */
    /* box-shadow: inset 0px 0px 4px hsla(0,0%,0%,0.5), 0px 0px 0px 0.5rem #2a2a2a; */
    font-family: var(--subtitle-font);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .round-player-border {
    grid-row: 1 / 2;
    grid-column: 1 / 9;
    z-index: 1;
    margin: 0;
    margin-top: -9px;
    margin-left: -49px;
    padding: 0;
    width: 81px;
    height: 81px;
    /* background-color: red; */
    border: 1px solid #333;
    border-radius: 81px 0px 0px 81px;
  }

  /* .play-button {
    margin: 0;
    padding: 0.5rem;
    margin-top: -1rem;
    margin-left: -2rem;
    width: 4rem;
    height: 4rem;
    background-color: #222;
    border: 1px solid #333;
    border-radius: 4rem;
    box-shadow: 0px 0px 0px 1px #666, 0px 0px 0px 7px #333, 0px 0px 0px 8px #666;
  } */

  .play-button {
    margin: 0;
    padding: 0;
    width: 48px;
    height: 48px;
  }

  .information {
    grid-row: 1 / 2;
    grid-column: 1 / 9;
    margin: 0;
    padding: 0.5rem;
    background: var(--bg-3);
    border: 1px solid var(--border-3);
    border-radius: 10px;
    box-shadow: var(--inset-box-shadow-4);

    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: min-content min-content min-content 1fr;
    /* grid-template-columns: 0.25fr 1fr 188px 1fr repeat(4, 1fr 10fr); */
    grid-auto-flow: column;
    grid-column-gap: 0.5rem;
    align-items: center;
    /* justify-content: start; */
    /* display: flex; */
    /* align-items: center; */
    overflow-x: auto;

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  @media (orientation: portrait) {
    .information {
      display: none;
    }
  }

  .title, .label {
    margin: 0;
    padding: 0;
    color: var(--text-color);
    font-size: 12px;
    font-family: var(--subtitle-font);
    line-height: 1;
  }

  .label {
    padding: 0.25rem 0.5rem;
    background: var(--bg-3);
    border: 1px solid var(--border-3);
    border-radius: 3px;
    box-shadow: var(--box-shadow-4);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .highlight {
    margin: 0;
    padding: 0.5rem;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: min-content;
    align-items: center;
    column-gap: 0.5rem;
    background: var(--bg-2);
    border: 1px solid var(--border-2);
    border-radius: 8px;
    box-shadow: var(--inset-box-shadow-4);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .midi-stats {
    grid-template-columns: min-content min-content 1fr min-content 1fr min-content 1fr min-content 1fr;
  }

  /* .midi-note {
    background: red;
    color: white;
    text-shadow: 0px 0px 2px black;
  } */

  /* .info {
    margin: 0;
    padding: 0;
    line-height: 1;
  } */

  .controls {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0.5rem;
    width: 4rem;
    background: var(--bg-3);
    border: 1px solid var(--border-3);
    border-radius: 8px;
    box-shadow: var(--inset-box-shadow-4);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
    
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: min-content;
    /* grid-template-rows: 1fr; */
    /* grid-template-columns: 1fr; */
    row-gap: 0.5rem;
    /* justify-items: stretch; */
    /* overflow-x: auto; */
  }

  @media screen and (orientation: portrait) {
    .controls {
      display: none;
    }
  }

  .note-button {
    margin: 0;
    padding: 0.4rem 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    line-height: 1.25;
    background-color: var(--bg-4);
    border: 1px solid var(--border-4);
    border-radius: 4px;
    font-family: var(--subtitle-font);
    text-transform: capitalize;
    outline: none;
    box-shadow: var(--box-shadow-2);
    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .color-scheme {
    background: var(--bg-2);
    border: 1px solid var(--border-2);
    border-radius: 6px;
    margin: 0;
    padding: 0.3rem;
    display: grid;
    gap: 0.3rem;
    box-shadow: var(--inset-box-shadow-2);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .scheme-button {
    margin: 0;
    padding: 0.4rem 0;
    width: 100%;
    height: 100%;
    font-size: 8px;
    line-height: 1.25;
    font-family: var(--subtitle-font);
    text-transform: capitalize;
    outline: none;
    background-color: var(--bg-4);
    border: 1px solid var(--border-4);
    border-radius: 4px;
    box-shadow: var(--box-shadow-2);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
  }

  .color-button {
    margin: 0;
    padding: 0;
    width: 1rem;
    height: 1rem;
    font-size: 12px;
    line-height: 1.25;
    background-color: #333;
    font-family: 'Share Tech', impact, sans-serif;
    outline: none;
    border-radius: 1rem;
  }

  .active-color-button {
    box-shadow:
      0px 0px 0px 2px var(--bg-3),
      0px 0px 0px 4px var(--text-color)
    ;
  }

  .active {
    background-color: #fff;
    color: var(--text-color);
  }

  .active-scheme {
    background-color: #aaa;
    color: black;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: 'Share Tech';
    line-height: 1;
  }

  .scroll {
    /* width: 16rem; */
    height: 24px;
    margin: 0;
    padding: 0 8px;
    overflow: scroll;
    background-color: var(--bg-1);
    border: 1px solid var(--border-1);
    border-radius: 6px;
    font-size: 8px;
    display: grid;
    align-items: center;
    justify-items: start;
    box-shadow: var(--inset-box-shadow-4);

    /* background-image: var(--main-bg-image);
    background-size: 1500px 1000px;
    background-repeat: repeat;
    background-blend-mode: soft-light; */
    /* width: 100%; */
    /* max-width: 100%; */
    /* width: fit-content; */
    /* max-width: 100%; */
  }

  .scroll > p {
    display: inline;
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 1.5;
    color: var(--text-color);
    font-family: var(--subtitle-font);
    overflow: scroll;
  }

    /* .midi-info {
    margin: 0;
    padding: 0.5rem;
    grid-row: 1/2;
    grid-column: 1/9;

    background: #222;
    border: 1px solid #333;
    border-radius: 8px;
    height: 2.75rem;
    box-shadow: inset 0px 0px 4px hsla(0,0%,0%,0.5);

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 0.25fr 1fr 10fr 1fr 10fr 1fr 10fr 1fr 10fr;
    grid-column-gap: 0.5rem;
    justify-items: stretch;
  } */

  .midi-status {
    margin: 0;
    padding: 0;
    width: 0.75rem;
    height: 0.75rem;
    background: black;
    border: 1px solid #333;
    border-radius: 50%;
    align-self: center;
  }

  .midi-status-on {
    background: #87ffc5;
    box-shadow: 0px 0px 4px #87ffc5;
  }

  /* .midi-value {
    margin: 0;
    padding: 0 0.5rem;
    font-family: 'Share Tech', 'Odachi', 'Avenir Next Condensed';
    font-size: 14px;
    line-height: 1;
    color: #aaa;
    display: flex;
    background: #161616;
    border: 1px solid #2a2a2a;
    border-radius: 6px;
    overflow-y: none;
    overflow-x: auto;
    align-items: center;
    box-shadow: inset 0px 0px 4px hsla(0,0%,0%,0.5);
    vertical-align: bottom;
  } */


  .keyboard-box {
    margin: 0;
    padding: 0.5rem;
    grid-row: 1 / 3;
    grid-column: 1 / 9;
    background: #000;
    border: 1px solid var(--border-4);
    border-radius: 8px;
    overflow-x: scroll;
    z-index: 1;
    height: min-content;
    display: grid;
    grid-auto-flow: column;
    width: min-content;
    max-width: 100%;
  }

  .if-player {
    grid-row: 2 / 3;
  }

  .if-info {
    grid-row: 2 / 3;
  }

  .if-controls {
    grid-column: 2 / 9;
  }

  .one-octave-keyboard {
    overflow-x: inherit;
  }

  /* .zone-1 {
    width: fit-content;
  } */

  /* .zone-2 {
    width: fit-content;
  } */

  @media (orientation: portrait) {
    .keyboard-box {
    padding: 0.5rem;
    grid-row: 2 / 3;
    }
  }

  .keyboard {
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-flow: column;
    column-gap: 3px;
  }

  @media (orientation: portrait) {
    .keyboard {
    column-gap: 2px;
    }
  }

  .harvest {
    background: rgb(198,82,2);
    background: linear-gradient(180deg, rgba(198,82,2,1) 0%, rgba(255,148,0,1) 100%);
  }

  .surf {
    background: rgb(0,66,142);
    background: linear-gradient(180deg, rgba(0,66,142,1) 0%, rgba(0,165,194,1) 100%);
  }

  .shore {
    background: rgb(228,197,152);
    background: linear-gradient(180deg, rgba(228,197,152,1) 0%, rgba(233,213,184,1) 3%, rgba(248,242,233,1) 15%, rgba(253,251,248,1) 20%, rgba(244,253,255,1) 23%, rgba(236,252,255,1) 26%, rgba(215,249,255,1) 31%, rgba(199,247,255,1) 35%, rgba(164,243,255,1) 39%, rgba(134,229,255,1) 45%, rgba(120,206,245,1) 53%, rgba(105,182,235,1) 62%, rgba(79,141,217,1) 73%, rgba(44,78,139,1) 100%);
  }

  /* .festive {
    background: rgb(144,0,0);
    background: linear-gradient(165deg, rgba(144,0,0,1) 0%, rgba(144,0,0,1) 10%, rgba(0,116,25,1) 10%, rgba(0,116,25,1) 20%, rgba(144,0,0,1) 20%, rgba(144,0,0,1) 30%, rgba(0,116,25,1) 30%, rgba(0,116,25,1) 40%, rgba(144,0,0,1) 40%, rgba(144,0,0,1) 50%, rgba(0,116,25,1) 50%, rgba(0,116,25,1) 60%, rgba(144,0,0,1) 60%, rgba(144,0,0,1) 70%, rgba(0,116,25,1) 70%, rgba(0,116,25,1) 80%, rgba(144,0,0,1) 80%, rgba(144,0,0,1) 90%, rgba(0,116,25,1) 90%);
  } */

  .violet {
    background: rgb(164,0,153);
    background: linear-gradient(0deg, rgba(164,0,153,1) 0%, rgba(101,0,100,1) 100%);
  }

  .cane {
    background: hsla(0, 100%, 30%, 1);
    background: linear-gradient(
      145deg, 
      hsla(0, 100%, 30%, 1) 0%,
      hsla(0, 100%, 30%, 1) 10%,
      hsla(0, 0%, 90%, 1) 10%,
      hsla(0, 0%, 90%, 1) 20%,
      hsla(130, 100%, 25%, 1) 20%,
      hsla(130, 100%, 25%, 1) 30%,
      hsla(0, 0%, 90%, 1) 30%,
      hsla(0, 0%, 90%, 1) 40%,
      hsla(0, 100%, 30%, 1) 40%,
      hsla(0, 100%, 30%, 1) 50%,
      hsla(0, 0%, 90%, 1) 50%,
      hsla(0, 0%, 90%, 1) 60%,
      hsla(130, 100%, 25%, 1) 60%,
      hsla(130, 100%, 25%, 1) 70%,
      hsla(0, 0%, 90%, 1) 70%,
      hsla(0, 0%, 90%, 1) 80%,
      hsla(0, 100%, 30%, 1) 80%,
      hsla(0, 100%, 30%, 1) 90%,
      hsla(0, 0%, 90%, 1) 90%
    );
  }

  .correct {
    background: hsl(121, 100%, 32%);
    background: linear-gradient(0deg, hsl(121, 100%, 32%) 0%, hsl(121, 100%, 20%) 100%);
  }

  .incorrect {
    background: hsl(0, 100%, 40%);
    background: linear-gradient(0deg, hsl(0, 100%, 40%) 0%, hsl(0, 100%, 30%) 100%);
  }

  .playing-border {
    border: 1px solid white;
  }
</style>