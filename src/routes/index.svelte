<script>
  import '../app.css';

  import Toggle from '$lib/Toggle.svelte';
  import Keyboard from '$lib/Keyboard.svelte';
  
  import { intervals } from '$lib/data/intervals.js';
  import { enharmonics } from '$lib/data/enharmonics.js';
  import { chords } from '$lib/data/chords.js';
  import { scales } from '$lib/data/scales.js';
  
  const entities = [
    ...chords,
    ...scales
  ];
  
  const letters = [`C`, `D`, `E`, `F`, `G`, `A`, `B`, ];
  // const accidentals = [``, `#`, `b`, `x`, `bb`, `#x`, `bbb`];
  // const qualities = [`dim`, `mi`, `ma`, `P`, `aug`];
  
  let chosen_root = '';
  let chosen_entity = '';
  let octave = 3;
  
  let chosen_entity_intervals = [];
  $: chosen_entity_intervals = entities
      .find(entity => entity.name === chosen_entity)?.intervals
  ;
  
  function removeLastChar(string) {
    if (string === 'root') {
      return 'P';
    } else {
      return string.slice(0, -1);
    }
  };
  
  let chosen_entity_interval_qualities = [];
  $: chosen_entity_interval_qualities = chosen_entity_intervals?.map(
    interval => removeLastChar(interval)
  );
  
  let chosen_entity_diatonic_steps = [];
  $: chosen_entity_diatonic_steps = intervals
      .filter(interval => chosen_entity_intervals?.includes(interval.name))
      .map(interval => interval.steps[0])
  ;
  
  let chosen_entity_half_steps = [];
  $: chosen_entity_half_steps = intervals
      .filter(interval => chosen_entity_intervals?.includes(interval.name))
      .map(interval => interval.steps[1])
  ;
  
  let correct_root_letter = [];
  $: correct_root_letter = letters
      .find((letter, index) => chosen_root?.includes(letter))
  ;
  
  let correct_root_letter_index = 0
  $: correct_root_letter_index = letters.indexOf(correct_root_letter);
  
  let adjusted_diatonic_steps = []
  $: adjusted_diatonic_steps = chosen_entity_diatonic_steps
    .map(step => {
      if (step + correct_root_letter_index > 6) {
        return step + correct_root_letter_index - 7
      } else {
        return step + correct_root_letter_index
      }
  });
  
  let enharmonic_root = '';
  $: enharmonic_root = enharmonics
      .find((array, index) => array.includes(chosen_root))
  ;
  
  let enharmonic_root_index;
  $: enharmonic_root_index = enharmonics.indexOf(enharmonic_root);
  
  let adjusted_half_steps = []; 
  $: adjusted_half_steps = chosen_entity_half_steps
      .map(step => {
        if (step + enharmonic_root_index > 11) {
          return step + enharmonic_root_index - 12
        } else {
          return step + enharmonic_root_index
        };
  });
  
  $: adjusted_octaves = chosen_entity_half_steps
    .map(step => step + enharmonic_root_index);
  
  let adjusted_octave_displacement = [];
  $: adjusted_octave_displacement = adjusted_octaves
    .map(step => {
      if (step >= 12) {
        return octave + 1
      } else {
        return octave
      }
  });
  
  let correct_letter_names = [];
  $: correct_letter_names = adjusted_diatonic_steps.map(i => letters[i]);
  
  let correct_enharmonic_note_name_arrays = [];
  $: correct_enharmonic_note_name_arrays = adjusted_half_steps.map(i => enharmonics[i]);
  
  let result = [];
  $: {
    result = [];
    for (const index in correct_enharmonic_note_name_arrays) {
      let list = correct_enharmonic_note_name_arrays[index];
      let letter = correct_letter_names[index];
      if ( chosen_root === '') {
        result = [];
      } else {
        result = [...result, ...list.filter(item => item.startsWith(letter))];
      }
    }
  };
  
  let result_with_qualities = []
  $: result_with_qualities = result?.map(
    (note, i) => {
      return `${note}${adjusted_octave_displacement[i]}${chosen_entity_interval_qualities[i]}`
    }
  );
  
</script>

<div class='toggle-box'>
  <Toggle/>
</div>

<div class='container'>
  
  <p class='instruction'>
    <strong>Pick a root note</strong>
  </p>
  
  <div class='root-picker'>
    {#each letters as note}
      <button
        class='note-button row-2'
        class:selected={note + '#' === chosen_root}
        on:click={() => chosen_root = note + '#'}
      >
        {note + '#'}
      </button>
      <button
        class='note-button row-3'
        class:selected={note === chosen_root}
        on:click={() => chosen_root = note}
      >
        {note}
      </button>
      <button
        class='note-button row-4'
        class:selected={note + 'b' === chosen_root}
        on:click={() => chosen_root = note + 'b'}
      >
        {note + 'b'}
      </button>
    {/each}
  </div>
  
<!-- 	<hr/> -->
  
  <p class='instruction'>
    <strong>Pick a musical entity</strong>
  </p>
  
  <div class='entity-picker'>
    {#each chords as chord, i}
      <button
        class={`entity-button`}
        class:selected={chord.name === chosen_entity}
        on:click={() => chosen_entity = chord.name}
      >
        {chord.name}
      </button>
    {/each}
    {#each scales as scale, i}
      <button
        class={`entity-button`}
        class:selected={scale.name === chosen_entity}
        on:click={() => chosen_entity = scale.name}
      >
        {scale.name}
      </button>
    {/each}
  </div>
  
<!-- 	<div class='state'>
    <p>Chosen Root: {chosen_root}</p>
    <p>Chosen Entity: {chosen_entity}</p>
    <p>Correct Root Letter: {correct_root_letter}</p>
    <p>Correct Root Letter Index: {correct_root_letter_index}</p>
    <p>Chosen Entity Intervals: {chosen_entity_intervals}</p>
    <p>Chosen Entity Diatonic Steps: {chosen_entity_diatonic_steps}</p>
    <p>Adusted Entity Diatonic Steps: {adjusted_diatonic_steps}</p>
    <p>Chosen Entity Half Steps: {chosen_entity_half_steps}</p>
    <p>Adusted Entity Half Steps: {adjusted_half_steps}</p>
    <p>Correct Letter Names: {correct_letter_names}</p>
    <p>Correct Enharmonic Note Name Arrays: {correct_enharmonic_note_name_arrays}</p>
  </div> -->
  
<!-- 	<hr/> -->
  
  <p class='instruction'>
    <strong>Result</strong> <span>{chosen_root} {chosen_entity}</span>
  </p>
  
  <div class='selection-result'>
    <div class='result-notes'>
      <p class='note-names'>{result.join(' ')}</p>
      <button class='reset-button'
        on:click={() => {chosen_root = ''; chosen_entity = ''}}
      >
        Reset
      </button>
    </div>
  </div>
  
  <div class='keyboard-box'>
    <Keyboard
      markers
      octaves={[`3`, `4`, `5`, `6`]}
      zones={[`1`, `2`]}
      notes={result_with_qualities}
    />
  </div>
</div>

<style>
  button {
    background-color: var(--bg-color);
    border-radius: 4px;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: var(--text-color);
    border: 1px solid var(--border);
  }
  
  p {
    margin: 0;
    padding: 0;
    line-height: 1;
    font-size: 14px;
  }
  
  span {
    margin-left: 0.5rem;
    min-width: 4rem;
    font-weight: 400;
  }
  
/* 	hr {
    grid-column: 1/3;
    width: 100%;
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
  } */

  .container {
    margin: 0;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, fit-content);
    background-color: var(--bg-color-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    gap: 1rem;
  }
  
  .state {
    grid-column: 1/3;
    display: grid;
    row-gap: 0.5rem;
  }
  
  .instruction {
    grid-column: 1/2;
    align-self: center;
  }
  
  .root-picker {
    grid-column: 1/3;
    margin: 0;
    padding: 0;
/* 		width: fit-content; */
/* 		height: fit-content; */
    display: grid;
/* 		grid-auto-flow: column; */
/* 		grid-template-rows: repeat(3, fit-content); */
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }
  
  .note-button {
    width: 100%;
    height: 1.75rem;
  }
  
  .entity-picker {
    grid-column: 1/3;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.25rem;
  }
  
  .entity-button {
    width: 100%;
    height: 1.75rem;
  }
  
  .selected {
    color: var(--bg-color);
    background-color: var(--text-color);
    border: 1px solid black;
  }
  
  .selection-result {
    grid-column: 1/3;
  }
  
  .result-notes {
    background-color: var(--bg-color);
    height: 2.5rem;
    font-size: 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    display: grid;
    align-items: center;
    padding: 0 0.5rem 0 0.75rem;
  }
  
  .note-names {
    grid-column: 1/2;
    grid-row: 1/2;
    margin: 0;
    padding: 0;
    justify-self: start;
  }
  
  .reset-button {
    grid-column: 1/2;
    grid-row: 1/2;
    margin: 0;
    padding: 0;
    height: 1.5rem;
    width: 4rem;
    border-radius: 4px;
    justify-self: end;
  }
  
  .row-1 {grid-row: 1 / 2; grid-column: 1 / 8;}
  .row-2 {grid-row: 2 / 3;}
  .row-3 {grid-row: 3 / 4;}
  .row-4 {grid-row: 4 / 5;}
  
  .keyboard-box {
    margin: 0;
    padding: 0;
    border: 1px solid black;
    border-radius: 10px;
    grid-column: 1/3;
    overflow-x: hidden;
    transform: translateZ(0);
  }
  
  .toggle-box {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1rem;
    padding: 0;
  }
</style>