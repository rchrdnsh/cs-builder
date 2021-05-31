*For our algorithm the example root will be 'Db' and the example musical entity will be 'Major Traid'*

# Algorithm

1. We recieve the chosen root note and musical entity (chord, scale, etc...) from the users input
2. We store the chosen root note string, 'Db' in our example, in a variable called `chosen_root`
3. We store the chosen musical entity, 'Major Traid' in our example, in a variable called `chosen_entity`	
4. We find the current entity from either the `chords.js` or `scales.js` arrays and then get the intervals necessary to create that entity and store them in a variable...maybe `chosen_entity_intervals`?
  ```
  const chords = [
    name: 'Minor Triad', intervals: ['root', 'mi3', 'P5']
    name: 'Major Triad', intervals: ['root', 'ma3', 'P5'] - THIS ONE!
  ];
  ```
  using the following code:
  ```
  $: chosen_entity_intervals = chords.find(chord => chord.name === chosen_entity)?.intervals;
  ```
  will give me:
  ```
  chosen_entity_intervals = ['root', 'ma3', 'P5']
  ```
5. We find all the necessary intervals from the `intervals.js` array that align with the intervals in the current musical entity and then save them to a variable...maybe `chosen_entity_intervals_steps`?

  ```
  export const intervals = [
    { name: `root`, steps: [0, 0] }, - index 0 - **THIS ONE!**

    { name: `dim2`, steps: [1, 0] }, - index 1
    { name: `mi2`, steps: [1, 1] }, - index 2
    { name: `ma2`, steps: [1, 2] }, - index 3
    { name: `aug2`, steps: [1, 3] }, - index 4

    { name: `dim3`, steps: [2, 2] }, - index 5
    { name: `mi3`, steps: [2, 3] }, - index 6
    { name: `ma3`, steps: [2, 4] }, - index 7 - **THIS ONE**
    { name: `aug3`, steps: [2, 5] }, - index 8

    { name: `dim4`, steps: [3, 4] }, - index 9
    { name: `P4`, steps: [3, 5] }, - index 10
    { name: `aug4`, steps: [3, 6] }, - index 11

    { name: `dim5`, steps: [4, 6] }, - index 12
    { name: `P5`, steps: [4, 7] }, - index 13 - **THIS ONE**
    { name: `aug5`, steps: [4, 8] }, - index 14

    { name: `dim6`, steps: [5, 7] }, - index 15
    { name: `mi6`, steps: [5, 8] }, - index 16
    { name: `ma6`, steps: [5, 9] }, - index 17
    { name: `aug6`, steps: [5, 10] }, - index 18

    { name: `dim7`, steps: [6, 9] }, - index 19
    { name: `mi7`, steps: [6, 10] }, - index 20
    { name: `ma7`, steps: [6, 11] }, - index  21
    { name: `aug7`, steps: [6, 12] }, - index 22

    { name: `P8`, steps: [7, 12] }, - index 23
  ];
  ```
  using this code:
  ```
  $: chosen_entity_intervals_steps = intervals.filter(interval => chosen_entity_intervals?.includes(interval.name));
  ```
  will give me this output:
  ```
  let current_entity_intervals_steps = [
    {name: 'root', steps: [0, 0]},
    {name: 'ma3', steps: [2, 4]},
    {name: 'P5', steps: [4, 7]}
  ]
  ```
  
6. We use the chosen_root to find the starting point in the letters array, which we will then apply the diatonic steps to to figure out which are the correct enharmonic letters.
6. We determine the letter names from the diatonic steps (first number in the array) in the intervals and how they compare to the letters array, starting with the `root` letter
  ```
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  ```
  Diatonic Steps:
  ```
  forEach.current_entity_intervals(i => {
    [i].root[0] = [0, 2, 4]
  })
  ```
  Applying this series of numbers to the letters array, starting with the chosen root letter
  ```
  root = 'Db'
  find the letter from the current root, which is D
  then find the other letters using the diatonic steps [0, 2, 4] starting with the root note
  letters = [
    A, - index 0 somehow +4 here - this is the thid letter then
    B, - index 1
    C, - index 2
    D, - index 3 - here it is! The D!
    E, - index 4 +1
    F, - index 5 +2 - here is the second note name based on the diatonic steps
    G - index 6 +3
  ]
  ...if the letters arrray has no more letters in it, then I need to go back around to the beginning of the array and start counting again maybe? maybe do something like add the current index with the diatonic steps number of the current interval in the loop and if they add up to more then 6 then subtract 7 to start over at the beginning of the letters array to find the next letter...not sure yet.
  
  so the correct letters would be - D, F, and A - put in an array maybe?
  let current_entity_letter_names = [`D`, `F`, `A`] ... something along these lines, maybe...
  ```
7. Now we look at the enharmonic index with our chosen letters (D F A) and half steps (second interval number) to determine the correct enharmonic note name:
  1. find the index of the array that contains the root, then use the half steps defined in the intervals of the chord to find the other enhamronic arrys as well;
  
  ```
  export const enharmonics = [
    ['A', 'Gx', 'Bbb'], - index 0
    ['A#'','Bb','Cbb'], - index 1
    ['B','Ax','Cb'], - index 2
    ['C','B#','Dbb'], - index 3
    ['C#','Bx','Db'], - index 4 - **ROOT!**
    ['D','Cx','Ebb'], - index 5 +1
    ['D#','Eb','Fbb'], - index 6 +2
    [`E`,`Dx`,`Fb`], - index 7 +3
    [`F`,`E#`,`Gbb`], - index 8 +4 **MAJOR 3RD**
    [`F#`,`Gb`,`Ex`], - index 9 +5
    [`G`,`Fx`,`Abb`], - index 10 +6
    [`G#`,`Ab`,`Bbbb`] - index 11 +7 **Perfect 5th**
    ];
  ```
  2. we then determine the enharmonic spelling of the selected note and it's possible note names by comparing the first letter in the `chord_letters` array against the different enharmonic names at the right index found by using the half step number to find the enharmonic name that contains the right letter...this will now be the correct note name for that note in the entity. We do this for each letter to find all the enharmonic note names.
  
  - `['C#','Bx','Db']`, - the string at index 2 contains the letter D so that is the one we pick - `Db`
  - `['F', 'E#','Gbb']`, - the string at index 0 contains the letter F so that is the one we pick - `F`
  - `['G#','Ab','Bbbb']`, - the string at index 1 contains the letter A so that is the one we pick - `Ab`

So, the final answer to which notes are in a `Db` `Major Traid` are `['Db', 'F', 'Ab']`

We can then add the quality of the intervals to the strings with the right names, like so:

```
['DbP', 'Fma', 'AbP']
```
...not sure how, but we need to do this..also need to add the octaves to them as well, like so:

```
[`Db${octave}P`, `F${octave}ma`, `Ab${octave}P`]
```

This array of note names can then be given to the Keyboard component to render the right notes on the keyboard itself.