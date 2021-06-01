<script>

  export let octave;
  // export let zones = [`1`, `2`];
  export let notes = [];
  // export let numbers = [];
  export let overlay = [];
  export let MIDINotes = [];

  export let classList = [];
  export let shore = [`shore`];
  export let currentHighlight = 'correct';

  export let clicked = false;
  let current;

  export let toggleNotes = false;
  export let focusMode = false;

  export let currentKeyboardColor = '';

  export let color;
  export let name;

  export let tiny = false;
  export let small = false;

  export let markers = false;

  let numbersArray = [`1st`, `2nd`, `3rd`, `4th`, `5th`, `6th`, `7th`, `8th`];
  let qualitiesArray = ['', 'aug', 'P', 'ma', 'mi', 'dim'];
	let num = [0, 1, 2, 3];
</script>

<div
  class:white-key={color === `white`}
  class:white-key-inverted={
    (color === `white` && currentKeyboardColor === `inverted`) ||
    (color === `white` && currentKeyboardColor === `korg-blood`) ||
    (color === `white` && currentKeyboardColor === `all-black`)
  }

  class:black-key={color === `black`}
  class:black-key-inverted={color === `black` && currentKeyboardColor === `inverted`}
  class:black-key-korg-blood={color === `black` && currentKeyboardColor === `korg-blood`}
  class:black-key-blackest={color === `black` && toggleNotes === true}

  class:focus-mode={focusMode === true}

  class:black-key-name='{
		 color === `black` && (num.map(i => `${name[0]}${octave}-${name[1]}${octave}`).some(s => notes.includes(s)))
	}'

  class:augmented-key-overlay='{num.map(i => `${name[i]}${octave}aug`).some(s => overlay.includes(s))}'
  class:perfect-key-overlay='{num.map(i => `${name[i]}${octave}P`).some(s => overlay.includes(s))}'
  class:major-key-overlay='{num.map(i => `${name[i]}${octave}ma`).some(s => overlay.includes(s))}'
  class:augmented-key='{num.map(i => `${name[i]}${octave}aug`).some(s => notes.includes(s))}'
  class:minor-key-overlay='{num.map(i => `${name[i]}${octave}mi`).some(s => overlay.includes(s))}'
  class:diminished-key-overlay='{num.map(i => `${name[i]}${octave}dim`).some(s => overlay.includes(s))}'

  class:note-name='{num.map(i => `${name[i]}${octave}`).some(s => notes.includes(s))}'
  class:ghost-name='{num.map(i => `${name[i]}${octave}-bg`).some(s => notes.includes(s))}'
  class:perfect-key='{num.map(i => `${name[i]}${octave}P`).some(s => notes.includes(s))}'
  class:perfect-key-double='{num.map(i => `${name[0]}${octave}P-${name[1]}${octave}P`).some(s => notes.includes(s))}'
  class:major-key='{num.map(i => `${name[i]}${octave}ma`).some(s => notes.includes(s))}'
  class:minor-key='{num.map(i => `${name[i]}${octave}mi`).some(s => notes.includes(s))}'
  class:diminished-key='{num.map(i => `${name[i]}${octave}dim`).some(s => notes.includes(s))}'
  class:dim-aug-key='{notes.includes(`${name[0]}${octave}aug-${name[1]}${octave}dim`)}'

  class:played-key='{
    MIDINotes.includes(`${name[0]}${octave}`) ||
    MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)
  }'
  
  class:correct='{
    (currentHighlight === 'correct' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'correct' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }'
  class:incorrect={
    (currentHighlight === 'incorrect' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'incorrect' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }
  class:harvest={
    (currentHighlight === 'harvest' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'harvest' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }
  class:violet={
    (currentHighlight === 'violet' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'violet' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }
  class:shore={
    (currentHighlight === 'shore' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'shore' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }
  class:surf={
    (currentHighlight === 'surf' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'surf' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }
  class:cane={
    (currentHighlight === 'cane' && MIDINotes.includes(`${name[0]}${octave}`)) ||
    (currentHighlight === 'cane' && MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)) ||
    ((current === `${name[0]}${octave}`) && (clicked === true))
  }

  on:click={() => classList=[...classList, shore]}
		class='{classList.join(` `)}'
		on:mousedown={() => clicked = true}
		on:mousedown={() => current = `${name[0]}${octave}`}
		on:mouseup={() => clicked = false}
		on:mouseup={() => current = ``}
	>
	{#if MIDINotes.includes(`${name[0]}${octave}`) || MIDINotes.includes(`${name[0]}${octave}/${name[1]}${octave}`)}
		{#if color === `black`}
			<div class='stack'>
				<p>{name[0]}</p>
				<p>{name[1]}</p>
			</div>
		{:else}
			<p
				class:tiny-white-p={color === 'white' && tiny === true}
				class:small-white-p={color === 'white' && small === true}
			>
      {name[0]}
    </p>
  {/if}
	
{:else if qualitiesArray.map(s => `${name[0]}${octave}${s}`).some(s => notes.includes(s))}
  <p class:tiny-white-p={color === 'white' && tiny === true}>{name[0]}</p>
{:else if qualitiesArray.map(s => `${name[1]}${octave}${s}`).some(s => notes.includes(s))}
  <p class:tiny-white-p={color === 'white' && tiny === true}>{name[1]}</p>
{:else if qualitiesArray.map(s => `${name[2]}${octave}${s}`).some(s => notes.includes(s))}
  <p class:tiny-white-p={color === 'white' && tiny === true}>{name[2]}</p>
{:else if qualitiesArray.map(s => `${name[3]}${octave}${s}`).some(s => notes.includes(s))}
  <p class:tiny-white-p={color === 'white' && tiny === true}>{name[3]}</p>
{:else if qualitiesArray.map(s => `${name[0]}${octave}${s}-${name[1]}${octave}${s}`).some(s => notes.includes(s))}
  {#if color === `black`}
    <div class='stack'>
      <p>{name[0]}</p>
      <p>{name[1]}</p>
    </div>
  {/if}
{:else if notes.includes(`${name[0]}${octave}aug-${name[1]}${octave}dim`)}
  {#if color === `black`}
    <div class='stack'>
      <p>{name[0]}</p>
      <p>{name[1]}</p>
    </div>
  {/if}
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[0]}`)}
  <div class='stack'>
    <p>{numbersArray[0]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[1]}`)}
  <div class='stack'>
    <p>{numbersArray[1]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[2]}`)}
  <div class='stack'>
    <p>{numbersArray[2]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[3]}`)}
  <div class='stack'>
    <p>{numbersArray[3]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[4]}`)}
  <div class='stack'>
    <p>{numbersArray[4]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[5]}`)}
  <div class='stack'>
    <p>{numbersArray[5]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[6]}`)}
  <div class='stack'>
    <p>{numbersArray[6]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave} - ${numbersArray[7]}`)}
  <div class='stack'>
    <p>{numbersArray[7]}</p>
    <p>{name[0]}</p>
  </div>
{:else if notes.includes(`${name[0]}${octave}-bg`)}
  <p>{name[0]}</p>
<!-- {:else if notes.includes(`${name[0]}${octave} - ${numbersArray[i]}`)}
  <div class='stack'>
    <p>{numbersArray[i]}</p>
    <p>{name[0]}</p>
  </div> -->
<!-- {:else if numbersArray.map(n => `${name[0]}${octave} - ${n}`).some(n => notes.includes(n))}
  <div class='stack'>
    <p>
      {#each numbersArray as number}
        {number}
      {/each}
    </p>
    <p>{name[0]}</p>
  </div> -->
{:else if toggleNotes === true}
  {#if color === `black`}
    <div class='stack'>
      <p>{name[0]}</p>
      <p>{name[1]}</p>
    </div>
  {:else}
    {#if name[0] == `C` && markers === true}
      <p class='octave-number' class:tiny-white-p={color === 'white' && tiny === true}>{name[0]}{octave}</p>
    {:else}
      <p>{name[0]}</p>
    {/if}
  {/if}
{:else if name[0] == `C` && markers === true}
  <p class='octave-number' class:tiny-white-p={color === 'white' && tiny === true}>{name[0]}{octave}</p>
{:else}
  {#each numbersArray as i}
    {#if notes.includes(`${name[0]}${octave} - ${numbersArray[i]}`)}
      <div class='stack'>
        <p>{numbersArray[i]}</p>
        <p>{name[0]}</p>
      </div>
    {/if}
  {/each}
{/if}
</div>

<style>
  .white-key {
    margin: 0;
    padding: 0 0 0.1rem 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    align-items: end;
    justify-items: center;
    color: #999;
    font-family: var(--subtitle-font);
    font-size: 24px;
    border-radius: 0 0 4px 4px;
    background: white;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(238,238,238,1) 100%);
  }

  .white-key-inverted {
    background: hsl(0, 0%, 20%);
    background: linear-gradient(0deg, hsl(0, 0%, 20%) 0%, hsl(0, 0%, 17.5%) 100%);
  }

  .white-key > p {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--subtitle-font);
  }

  @media (orientation: portrait) {
    .white-key > p {
      font-size: 16px;
    }
  }

  @media (orientation: landscape) {
    .white-key > p {
      font-size: 24px;
    }
    .tiny-white-p {
      font-size: 16px !important;
    }
  }

  @media (orientation: portrait) {
    .white-key {
      padding: 0 0 0.1rem 0;
      /* border-radius: ${props => props.vertical ? `0 2px 2px 0` : `0 0 2px 2px` }; */
      /* font-size: 16px; */
    }
  }

  @media (orientation: landscape) {
    .white-key {
      padding: 0 0 0.1rem 0;
      /* border-radius: ${props => props.vertical ? `0 2px 2px 0` : `0 0 4px 4px` }; */
      /* font-size: 40px; */
    }
  }

  .tiny-white-p {
    font-size: 16px;
  }

  .small-white-p {
    font-size: 20px;
  }

  .white-key > .stack {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .white-key > .stack > p {
    line-height: 1;
    margin: 0;
    padding: 0;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.25;
    font-size: 24px;
    padding: 0 0 0.25rem 0;
  }

  .black-key {
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
    font-family: var(--subtitle-font);
    font-size: 12px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-position: top center;
    background-size: stretch stretch;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='84' viewBox='0 0 14 84' preserveAspectRatio='none' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H14V83H0V0Z' fill='%23262626'/%3E%3Cpath d='M14 83C14 82 12 77 10 77H4C2 77 0 82 0 83C0 84 1 84 1 84H13C13 84 14 84 14 83Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M12 0V68C12 68 12 76 10 76H4C2 76 2 68 2 68V0H12Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' y1='84' x2='7' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23666666'/%3E%3Cstop offset='0.139'/%3E%3Cstop offset='1' stop-color='%23595959'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' y1='74.556' x2='7' y2='2.35397' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23595959'/%3E%3Cstop offset='1' stop-color='%23535353'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  }

  .black-key-inverted {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='84' fill='none' viewBox='0 0 14 84' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M0 0h14v84H0z'/%3E%3Cpath fill='%23666666' d='M0 0h14v83H0V0z'/%3E%3Cpath fill='url(%23paint0_linear)' d='M14 83c0-1-2-6-4-6H4c-2 0-4 5-4 6s1 1 1 1h12s1 0 1-1z'/%3E%3Cpath fill='url(%23paint1_linear)' d='M12 0v68s0 8-2 8H4c-2 0-2-8-2-8V0h10z'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' x2='7' y1='84' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='.139' stop-color='%237A7A7A'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' x2='7' y1='74.556' y2='2.354' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23E8E8E8'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
  }

  .black-key-korg-blood {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='84' viewBox='0 0 14 84' preserveAspectRatio='none' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H14V83H0V0Z' fill='%23660000'/%3E%3Cpath d='M14 83C14 82 12 77 10 77H4C2 77 0 82 0 83C0 84 1 84 1 84H13C13 84 14 84 14 83Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M12 0V68C12 68 12 76 10 76H4C2 76 2 68 2 68V0H12Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='7' y1='84' x2='7' y2='77' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23CC0000'/%3E%3Cstop offset='0.139' stop-color='%23660000'/%3E%3Cstop offset='1' stop-color='%23CC0000'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='7' y1='74.556' x2='7' y2='2.35397' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23BF0000'/%3E%3Cstop offset='1' stop-color='%23B30000'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  }

  .black-key-blackest {
    background: black;
  }

  .black-key:nth-child(1) {
    grid-column: 2/3;
  }

  .black-key:nth-child(2) {
    grid-column: 4/5;
  }

  .black-key:nth-child(3) {
    grid-column: 6/7;
  }

  .black-key > p {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    font-family: var(--subtitle-font);
    writing-mode: vertical-lr;
    -webkit-text-orientation: upright;
    text-orientation: upright;
  }

  @media (orientation: portrait) {
    .black-key > p {
      font-size: 12px;
    }
  }

  .black-key > .stack {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .black-key > .stack > p {
    line-height: 1;
    margin: 0;
    padding: 0;
    letter-spacing: 0px;
    text-align: center;
    line-height: 1.25;
    font-size: 12px;
    padding: 0 0 0.25rem 0;
  }

  @media(orientation: portrait) {
    .black-key {
      border: 2px solid black;
      border-top: 0;
      font-size: 8px;
      line-height: 1;
      letter-spacing: 0px;
    }
  }

  @media(orientation: landscape) {

    .black-key {
      border: 2px solid black;
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

    /* padding: 0; */
    /* padding: 0; */
    /* border: 0.25rem solid black; */
    /* border: 4px solid black;
    border-top: ${props => props.vertical ? `4px` : `none`};
    border-left: ${props => props.vertical ? `none` : `4px`}; */
    /* font-size: 24px; */
  }

  .black-key-name {
    background: black;
    color: white;
  }

  .augmented-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(39, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .augmented-key {
    background: hsla(39, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
  }

  .dim-aug-key {
    background: hsla(39, 100%, 50%, 1);
    background-image: linear-gradient(hsl(49, 100%, 50%), hsl(257, 100%, 46%));
    color: white;
    text-shadow: 0px 0px 4px black;
  }

  .perfect-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(360, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .note-name {
    color: hsla(0, 0%, 0%, 1);
  }

  .ghost-name {
    color: hsla(0, 0%, 75%, 1);
  }

  .perfect-key {
    background: hsla(360, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .perfect-key-double {
    background: hsla(360, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .major-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(28, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .major-key {
    background: hsla(28, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
  }

  .minor-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(240, 100%, 75%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .minor-key {
    background: hsla(240, 100%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
  }

  .diminished-key-overlay:not(.augmented-key):not(.perfect-key):not(.major-key):not(.minor-key):not(.diminished-key) {
    background: hsla(300, 100%, 50%, 1);
    background: hsla(0, 0%, 50%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
    /* opacity: 0.25; */
  }

  .diminished-key {
    background: hsla(300, 100%, 25%, 1);
    color: white;
    text-shadow: 0px 0px 4px black;
    /* border: 2px solid black; */
    /* transition: all 250ms ease; */
  }

  .played-key {
    color: white;
    text-shadow: 0px 0px 4px black;
    /* transition: all 0s; */
  }

  .focus-mode:not(.diminished-key):not(.minor-key):not(.major-key):not(.perfect-key):not(.augmented-key):not(.diminished-key-overlay):not(.minor-key-overlay):not(.major-key-overlay):not(.perfect-key-overlay):not(.augmented-key-overlay):not(.played-key) {
    background: #333;
    /* transition: all 250ms ease; */
    /* box-shadow: inset 0px 0px 2px 4px #444; */
  }

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
    font-family: var(--subtitle-font);
    color: #ccc;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    z-index: 0;
/*     transition: all 250ms ease; */
  }

  @media(orientation: portrait) {
    .octave-number {
      font-size: 12px;
      padding: 0 0 0.25rem 0;
    }
  }

  @media(orientation: landscape) {
    .octave-number {
      font-size: 12px;
      padding: 0 0 0.5rem 0;
    }
  }
</style>