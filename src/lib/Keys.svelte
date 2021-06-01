<script>
  import Key from './Key.svelte';
	import { enharmonics } from '$lib/data/enharmonics.js'

  export let octaves = [];
  export let zones = [];
  export let notes = [];
  export let overlay = [];
  export let MIDINotes = [];

  let classList = [];
  let shore = [`shore`];
  export let currentHighlight = 'correct';

  let clicked = false;
  let current;

  export let toggleNotes = false;
  export let focusMode = false;

  export let currentKeyboardColor = '';

  export let tiny = false;
  export let small = false;

  export let markers = false;

  let zone1 = [
    {
      color: `white`,
      names: [
        {id: 1, name: enharmonics[0]},
        {id: 2, name: enharmonics[2]},
        {id: 3, name: enharmonics[4]}
      ]
    },
    {
      color: `black`,
      names: [
        {id: 1, name: enharmonics[1]},
        {id: 2, name: enharmonics[3]}
      ]
    }
  ];

  let zone2 = [
    {
      color: `white`,
      names: [
        {id: 1, name: enharmonics[5]},
        {id: 2, name: enharmonics[7]},
        {id: 3, name: enharmonics[9]},
        {id: 4, name: enharmonics[11]}
      ]
    },
    {
      color: `black`,
      names: [
        {id: 1, name: enharmonics[6]},
        {id: 2, name: enharmonics[8]},
        {id: 3, name: enharmonics[10]}
      ]
    }
  ];

  function color(cssClass, pianoKey, pianoOctave) {
    return (
      (currentHighlight === cssClass && MIDINotes.includes(`${pianoKey.name[0]}${pianoOctave}`)) ||
      (currentHighlight === cssClass && MIDINotes.includes(`${pianoKey.name[0]}${pianoOctave}/${pianoKey.name[1]}${pianoOctave}`)) ||
      ((current === `${pianoKey.name[0]}${pianoOctave}`) && (clicked === true))
    )
  }

</script>

<div class='keyboard'>
  {#each octaves as octave}
    <div
      class='reset octave'
      class:octave-tiny={tiny === true}
      class:octave-small={small === true}
      class:zone-1={zones.length === 1 && zones.includes(`1`)}
      class:zone-2={zones.length === 1 && zones.includes(`2`)}
      class:zone-1-tiny={zones.length === 1 && zones.includes(`1`) && tiny === true}
      class:zone-2-tiny={zones.length === 1 && zones.includes(`2`) && tiny === true}
      class:zone-1-small={zones.length === 1 && zones.includes(`1`) && small === true}
      class:zone-2-small={zones.length === 1 && zones.includes(`2`) && small === true}
    >
      {#each zones as zone}
        {#if zone ===`1`}
          <div class='reset fill zone-1-grid'>
            {#each zone1 as { color, names }}
              <div
                class={
                  (color === `white`) ? `reset fill zone-1-white-key-grid` :
                  (color === `black`) ? `reset fill zone-1-black-key-grid` :
                  ``
                }
              >
              {#each names as { name }}
                <Key
                  tiny={tiny}
                  small={small}
                  octave={octave}
                  notes={notes}
                  color={color}
                  name={name}
                  overlay={overlay}
                  markers={markers}
                  currentKeyboardColor={currentKeyboardColor}
                  currentHighlight={currentHighlight}
                  focusMode={focusMode}
                  MIDINotes={MIDINotes}
                  clicked={clicked}
                  classList={classList}
                  toggleNotes={toggleNotes}
                  shore={shore}
                />
              {/each}
            </div>
          {/each}
          </div>
        {:else if zone === `2`}
          <div class='reset fill zone-2-grid'>
            {#each zone2 as {color, names}}
              <div
                class={
                  (color === `white`) ? `reset fill zone-2-white-key-grid` :
                  (color === `black`) ? `reset fill zone-2-black-key-grid` :
                  ``
                }
              >
              {#each names as { name }}
                <Key
                  tiny={tiny}
                  small={small}
                  octave={octave}
                  notes={notes}
                  color={color}
                  name={name}
                  overlay={overlay}
                  currentKeyboardColor={currentKeyboardColor}
                  currentHighlight={currentHighlight}
                  focusMode={focusMode}
                  MIDINotes={MIDINotes}
                  clicked={clicked}
                  classList={classList}
                  toggleNotes={toggleNotes}
                  shore={shore}
                />
              {/each}
            </div>
          {/each}
          </div>
        {/if}
      {/each}

      <!-- {#each zonesArray as zone}
        <div
          class={
            zone.number === 1 ? `reset fill zone-1-grid` :
            zone.number === 2 ? `reset fill zone-2-grid` :
            ``
          }
        >
          {#each zone.keys as keys}
            <div
              class={
                (zone.number === 1 && keys.color === `white`) ? `reset fill zone-1-white-key-grid` :
                (zone.number === 1 && keys.color === `black`) ? `reset fill zone-1-black-key-grid` :
                (zone.number === 2 && keys.color === `white`) ? `reset fill zone-2-white-key-grid` :
                (zone.number === 2 && keys.color === `black`) ? `reset fill zone-2-black-key-grid` :
                ``
              }
            >
              {#each keys.names as key (key.id)}
                <Key
                  octave={octave}
                  notes={notes}
                  color={keys.color}
                  name={key.name}
                  overlay={overlay}
                  currentKeyboardColor={currentKeyboardColor}
                  currentHighlight={currentHighlight}
                  focusMode={focusMode}
                  MIDINotes={MIDINotes}
                  clicked={clicked}
                  classList={classList}
                  toggleNotes={toggleNotes}
                  shore={shore}
                />
              {/each}
            </div>
          {/each}
        </div>
      {/each} -->

    </div>
  {/each}
</div>

<style>
  .reset {
    margin: 0;
    padding: 0;
  }

  .fill {
    width: 100%;
    height: 100%;
  }

  .keyboard {
    display: grid;
    grid-auto-flow: column;
    column-gap: 2px;
    width: fit-content;
  }

  @media screen and (orientation: portrait) {
    .keyboard {
      column-gap: 2px;
    }
  }

  .octave {
    /* width of the keyboard by octaves */
    width: 350px;
    /* height of the keyboard */
    height: 250px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3fr 4fr;
  }

  .octave-small {
    width: 280px;
    height: 200px;
  }

  .octave-tiny {
    width: 210px;
    height: 135px;
  }

  @media (orientation: portrait) {
    .octave {
      grid-column-gap: 2px;
      /* width of the keyboard by octaves */
      width: 256px;
      /* height of the keyboard */
      height: 150px;
    }
  }

  @media (orientation: landscape) {
    .octave {
      grid-column-gap: 2px;
    }
  }

  .zone-1 {
    /* width of the keyboard by zone 1 */
    width: 150px;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  .zone-1-small {
    width: 120px;
    height: 200px;
  }

  .zone-1-tiny {
    width: 90px;
    height: 135px;
  }

  .zone-2 {
    /* width of the keyboard by zone 2 */
    width: 200px;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  .zone-2-small {
    width: 160px;
    height: 200px;
  }

  .zone-2-tiny {
    width: 120px;
    height: 135px;
  }

  .zone-1-grid {
    background: black;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr;
  }

  .zone-2-grid {
    background: black;
    display: grid;
    grid-template-rows: 2fr 1fr;
    grid-template-columns: 1fr;
  }

  .zone-1-white-key-grid {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 35fr);
    z-index: 1;
  }

  @media (orientation: portrait) {
    .zone-1-white-key-grid {
      grid-column-gap: 2px;
    }
  }

  @media (orientation: landscape) {
    .zone-1-white-key-grid {
      grid-column-gap: 2px;
    }
  }

  .zone-2-white-key-grid {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(4, 35fr);
    z-index: 1;
  }

  @media (orientation: portrait) {
    .zone-2-white-key-grid {
      grid-column-gap: 2px;
    }
  }

  @media (orientation: landscape) {
    .zone-2-white-key-grid {
      grid-column-gap: 2px;
    }
  }

  .zone-1-black-key-grid {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 21fr);
    align-items: center;
    justify-items: center;
    z-index: 2;
  }

  @media (orientation: portrait) {
    .zone-1-black-key-grid {
      grid-column-gap: 2px;
    }
  }

  @media (orientation: landscape) {
    .zone-1-black-key-grid {
      grid-column-gap: 2px;
    }
  }

  .zone-2-black-key-grid {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(7, 20fr);
    align-items: center;
    justify-items: center;
    z-index: 2;
  }

  @media (orientation: portrait) {
    .zone-2-black-key-grid {
      grid-column-gap: 2px;
    }
  }

  @media (orientation: landscape) {
    .zone-2-black-key-grid {
      grid-column-gap: 2px;
    }
  }

  /* .white-key {
    margin: 0;
    padding: 0 0 0.1rem 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: end;
    justify-items: center;
    color: #999;
    font-family: 'Share Tech', 'odachi', sans-serif;
    font-size: 24px;
    border-radius: 0 0 4px 4px;
    background: white;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%);
  } */

  /* .white-key-inverted {
    background: hsl(0, 0%, 20%);
    background: linear-gradient(0deg, hsl(0, 0%, 20%) 0%, hsl(0, 0%, 17.5%) 100%);
  } */

  /* .white-key > p {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech', 'odachi', sans-serif;
  } */

  /* @media (orientation: portrait) {
    .white-key > p {
      font-size: 16px;
    }
  } */

  /* @media (orientation: portrait) {
    .white-key {
      padding: 0 0 0.1rem 0;
    }
  } */

  /* @media (orientation: landscape) {
    .white-key {
      padding: 0 0 0.1rem 0;
    }
  } */

  /* .black-key {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: end;
    justify-items: center;
    color: #999;
    font-family: 'Share Tech', 'Odachi', 'Avenir Next Condensed', sans-serif;
    font-size: 12px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-position: top center;
    background-size: stretch stretch;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='84' viewBox='0 0 14 84' preserveAspectRatio='none' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H14V83H0V0Z' fill='%23262626'/%3E%3Cpath d='M14 83C14 82 12 77 10 77H4C2 77 0 82 0 83C0 84 1 84 1 84H13C13 84 14 84 14 83Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M12 0V68C12 68 12 76 10 76H4C2 76 2 68 2 68V0H12Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' y1='84' x2='7' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23666666'/%3E%3Cstop offset='0.139'/%3E%3Cstop offset='1' stop-color='%23595959'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' y1='74.556' x2='7' y2='2.35397' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23595959'/%3E%3Cstop offset='1' stop-color='%23535353'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  } */

  /* .black-key-inverted {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='84' fill='none' viewBox='0 0 14 84' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0 0h14v84H0z'/%3E%3Cpath fill='%23666666' d='M0 0h14v83H0V0z'/%3E%3Cpath fill='url(%23paint0_linear)' d='M14 83c0-1-2-6-4-6H4c-2 0-4 5-4 6s1 1 1 1h12s1 0 1-1z'/%3E%3Cpath fill='url(%23paint1_linear)' d='M12 0v68s0 8-2 8H4c-2 0-2-8-2-8V0h10z'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' x2='7' y1='84' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='.139' stop-color='%237A7A7A'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' x2='7' y1='74.556' y2='2.354' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23E8E8E8'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
  } */

  /* .black-key-korg-blood {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='84' viewBox='0 0 14 84' preserveAspectRatio='none' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H14V83H0V0Z' fill='%23660000'/%3E%3Cpath d='M14 83C14 82 12 77 10 77H4C2 77 0 82 0 83C0 84 1 84 1 84H13C13 84 14 84 14 83Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M12 0V68C12 68 12 76 10 76H4C2 76 2 68 2 68V0H12Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' y1='84' x2='7' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CC0000'/%3E%3Cstop offset='0.139' stop-color='%23660000'/%3E%3Cstop offset='1' stop-color='%23CC0000'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' y1='74.556' x2='7' y2='2.35397' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BF0000'/%3E%3Cstop offset='1' stop-color='%23B30000'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  } */

  /* .black-key-blackest {
    background: black;
  } */

  /* .black-key:nth-child(1) {
    grid-column: 2/3;
  } */

  /* .black-key:nth-child(2) {
    grid-column: 4/5;
  } */

  /* .black-key:nth-child(3) {
    grid-column: 6/7;
  } */

  /* .black-key > p {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    font-family: 'Share Tech', 'Odachi', 'Avenir Next Condensed', sans-serif;
    writing-mode: vertical-lr;
    -webkit-text-orientation: upright;
    text-orientation: upright;
  } */

  /* @media (orientation: portrait) {
    .black-key > p {
      font-size: 12px;
    }
  } */

  /* .black-key > .stack {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  } */

  /* .black-key > .stack > p {
    line-height: 1;
    margin: 0;
    padding: 0;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.25;
    font-size: 12px;
    padding: 0 0 0.25rem 0;
  } */

  /* @media(orientation: portrait) {
    .black-key {
      border: 2px solid black;
      border-top: 0;
      font-size: 8px;
      line-height: 1;
      letter-spacing: 0px;
    }
  } */

  /* @media(orientation: landscape) {

    .black-key {
    border: 3px solid black;
    border-top: 0;
    }

    .black-key > p { 
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      writing-mode: horizontal-tb;
      letter-spacing: 0px;
      text-align: center;
      line-height: 1.25;
      font-size: 14px;
      padding: 0 0 0.25rem 0;
    }
  } */

  /* .augmented-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(39, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .augmented-key {
    background: hsla(39, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .perfect-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(360, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .perfect-key {
    background: hsla(360, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .major-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(28, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .major-key {
    background: hsla(28, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .minor-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(240, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .minor-key {
    background: hsla(240, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .diminished-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(300, 100%, 50%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .diminished-key {
    background: hsla(300, 100%, 25%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .octave-number {
    margin: 0;
    font-family: 'Share Tech', 'Odachi', 'Avenir Next Condensed';
    color: #ccc;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    z-index: 0;
  } */

  /* .played-key {
    color: white;
    text-shadow: 0px 0px 4px black;
  } */

  /* .focus-mode:not(.diminished-key):not(.minor-key):not(.major-key):not(.perfect-key):not(.augmented-key):not(.diminished-key-overlay):not(.minor-key-overlay):not(.major-key-overlay):not(.perfect-key-overlay):not(.augmented-key-overlay):not(.played-key) {
    background: #333;
  } */

  /* .focus-mode:not(*) {
    background: #333;
    transition: all 250ms ease;
    box-shadow: inset 0px 0px 2px 4px #444;
  } */

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

  .festive {
    background: rgb(144,0,0);
    background: linear-gradient(165deg, rgba(144,0,0,1) 0%, rgba(144,0,0,1) 10%, rgba(0,116,25,1) 10%, rgba(0,116,25,1) 20%, rgba(144,0,0,1) 20%, rgba(144,0,0,1) 30%, rgba(0,116,25,1) 30%, rgba(0,116,25,1) 40%, rgba(144,0,0,1) 40%, rgba(144,0,0,1) 50%, rgba(0,116,25,1) 50%, rgba(0,116,25,1) 60%, rgba(144,0,0,1) 60%, rgba(144,0,0,1) 70%, rgba(0,116,25,1) 70%, rgba(0,116,25,1) 80%, rgba(144,0,0,1) 80%, rgba(144,0,0,1) 90%, rgba(0,116,25,1) 90%);
  }

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

  .midi-note {
    background: red;
    color: white;
    text-shadow: 0px 0px 2px black;
  }

  .octave-number {
    margin: 0;
    font-family: 'Share Tech', 'Odachi', 'Avenir Next Condensed';
    color: #ccc;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    z-index: 0;
    transition: all 250ms ease;
  }

  @media(orientation: portrait) {
    .octave-number {
      font-size: 12px;
      padding: 0 0 0.25rem 0;
    }
  }

  @media(orientation: landscape) {
    .octave-number {
      font-size: 24px;
      padding: 0 0 0.5rem 0;
    }
  }
</style>