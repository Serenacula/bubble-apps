import Head from 'next/head'
import Image from 'next/image'
import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction, useState } from 'react'
import styles from '../styles/soundGenerator.module.css'

let getDisplayNotes: string
let setDisplayNotes: Dispatch<SetStateAction<string>>

let getVoice: OscillatorType
let setVoice: Dispatch<SetStateAction<OscillatorType>>

let getScale: MusicalNote | "random"
let setScale: Dispatch<SetStateAction<MusicalNote | "random">>

let getChordFrequencyMultiplier: number
let setChordFrequencyMultiplier: Dispatch<SetStateAction<number>>

let getBeatsPerMinute: number
let setBeatsPerMinute: Dispatch<SetStateAction<number>>

let getBeatsInABar: number
let setBeatsInABar: Dispatch<SetStateAction<number>>

let getPercentageOfNotesDropped: number
let setPercentageOfNotesDropped: Dispatch<SetStateAction<number>>

let getBanRepeatedNotes: boolean
let setBanRepeatedNotes: Dispatch<SetStateAction<boolean>>

let getRandomiseRootNote: boolean
let setRandomiseRootNote: Dispatch<SetStateAction<boolean>>

let getSecondMelody: boolean
let setSecondMelody: Dispatch<SetStateAction<boolean>>

let getJazzHarmonies: boolean
let setJazzHarmonies: Dispatch<SetStateAction<boolean>>

let getJazzChords: boolean
let setJazzChords: Dispatch<SetStateAction<boolean>>

export default function Home() {
    [getDisplayNotes, setDisplayNotes] = useState("") as [string, Dispatch<SetStateAction<string>>]
    [getVoice, setVoice] = useState("sawtooth") as [OscillatorType, Dispatch<SetStateAction<OscillatorType>>]
    [getScale, setScale] = useState("random") as [MusicalNote | "random", Dispatch<SetStateAction<MusicalNote | "random">>]
    [getBeatsPerMinute, setBeatsPerMinute] = useState(240) as [number, Dispatch<SetStateAction<number>>]
    [getBeatsInABar, setBeatsInABar] = useState(3) as [number, Dispatch<SetStateAction<number>>]
    [getPercentageOfNotesDropped, setPercentageOfNotesDropped] = useState(20) as [number, Dispatch<SetStateAction<number>>]
    [getChordFrequencyMultiplier, setChordFrequencyMultiplier] = useState(0.50) as [number, Dispatch<SetStateAction<number>>]
    [getBanRepeatedNotes, setBanRepeatedNotes] = useState(true) as [boolean, Dispatch<SetStateAction<boolean>>]
    [getRandomiseRootNote, setRandomiseRootNote] = useState(false) as [boolean, Dispatch<SetStateAction<boolean>>]
    [getSecondMelody, setSecondMelody] = useState(false) as [boolean, Dispatch<SetStateAction<boolean>>]
    [getJazzHarmonies, setJazzHarmonies] = useState(false) as [boolean, Dispatch<SetStateAction<boolean>>]
    [getJazzChords, setJazzChords] = useState(false) as [boolean, Dispatch<SetStateAction<boolean>>]

    return (
        <>
            <Head>
                <title>Bad Music Generator</title>
                <meta name="description" content="Bad Music Generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div>
                    <button className={styles.bigButton} onClick={playMusic}>
                        Play
                    </button>
                </div>
                <div>

                    {/* <div className={styles.display}>
                        <h1>
                            {getDisplayNotes}
                        </h1>
                    </div> */}

                    <label>
                        <select name="voice" className={styles.input} defaultValue="sawtooth" onChange={(choice) => setVoice(choice.target.value as OscillatorType)}>
                            <option value="sine">Sine</option>
                            <option value="triangle">Triangle</option>
                            <option value="sawtooth" >Sawtooth</option>
                            <option value="square">Square</option>
                        </select>
                        Voice: changes the sound produced
                    </label>
                    <label>
                        <select name="scale" className={styles.input} defaultValue="random" onChange={(choice) => setScale(choice.target.value as MusicalNote | "random")}>
                            <option value="random">Random</option>
                            {notes.map(note => <option value={note}>{note}</option>)}
                        </select>
                        Scale Key
                    </label>
                    <label>
                        <input type="number" className={styles.input} name="quantity" min="1" max="9999" step="1" value={getBeatsPerMinute} onChange={(change) => { setBeatsPerMinute(change.target.value as unknown as number) }} />
                        Beats Per Minute
                    </label>
                    <label>
                        <input type="number" className={styles.input} name="quantity" min="1" max="7" step="1" value={getBeatsInABar} onChange={(change) => { setBeatsInABar(change.target.value as unknown as number) }} />
                        Beats in a Bar
                    </label>

                    <label>
                        <input type="number" className={styles.input} name="quantity" min="0.01" max="4.00" step="0.01" value={getChordFrequencyMultiplier} onChange={(change) => { setChordFrequencyMultiplier(change.target.value as unknown as number) }} />
                        Chord Frequency Multiplier: sets the frequency of the chords, relative to the melody. 0.5 = 1 octave down, 0.66 = a harmonic up from that, etc.
                    </label>

                    <label>
                        <input type="number" className={styles.input} name="quantity" min="1" max="100" step="1" value={getPercentageOfNotesDropped} onChange={(change) => { setPercentageOfNotesDropped(change.target.value as unknown as number) }} />
                        Percentage of Notes Dropped: this is what produces an interesting rhythm. 10-20% is recommended
                    </label>
                    <label>
                        <input type="checkbox" className={styles.input} name="banRepeatedNotes" checked={getBanRepeatedNotes} onChange={() => { setBanRepeatedNotes(!getBanRepeatedNotes) }} />
                        Ban Repeated Notes: when generating a random string of notes in a bar, it will attempt to avoid repetition
                        {/* Note: If the number of beats in a bar is bigger than the number of notes in the scale, this won't work. */}
                    </label>
                    <label>
                        <input type="checkbox" className={styles.input} name="randomiseRootNote" checked={getRandomiseRootNote} onChange={() => { setRandomiseRootNote(!getRandomiseRootNote) }} />
                        Randomise Root Note: pretends that the root note of the scale is a different note
                    </label>
                    <label>
                        <input type="checkbox" className={styles.input} name="secondMelody" checked={getSecondMelody} onChange={() => { setSecondMelody(!getSecondMelody) }} />
                        Second Melody: Adds a second melody
                    </label>
                    <label>
                        <input type="checkbox" className={styles.input} name="jazzHarmonies" checked={getJazzHarmonies} onChange={() => { setJazzHarmonies(!getJazzHarmonies) }} />
                        Jazz Harmonies: 7ths are also considered a harmonic note, in the melody
                    </label>
                    <label>
                        <input type="checkbox" className={styles.input} name="jazzChords" checked={getJazzChords} onChange={() => { setJazzChords(!getJazzChords) }} />
                        Jazz Chords: Chords will drop the root in favour of the 7th
                    </label>
                </div>
            </main>
        </>
    )
}

let audioContext: AudioContext
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
const musicalNotes = {
    "C": 261.63,
    "C#": 277.18,
    "D": 293.66,
    "D#": 311.13,
    "E": 329.63,
    "F": 349.23,
    "F#": 369.99,
    "G": 392.00,
    "G#": 415.30,
    "A": 440.00,
    "A#": 466.16,
    "B": 493.88
}

type MusicalNote = typeof notes[number]
type MusicalNoteWithLength = {
    note: MusicalNote,
    noteLength: number
}
type NoteArray = MusicalNote[]
type NoteArrayWithLength = MusicalNoteWithLength[]
type NoteArrayWithSilence = Array<MusicalNoteWithLength | { note: "silence", noteLength: number }>





function playMusic() {

    audioContext = new AudioContext()

    /**
     * MAKE THE MUSIC!
     */

    const scale = getScale === "random" ? generateScale(randomNote()) : generateScale(getScale)
    const rootNote = getRandomiseRootNote ? randomNote(scale) : scale[0]
    const melody = generateMelody(scale, rootNote)
    const melody2 = generateMelody(scale, randomHarmonic(scale, rootNote))
    const chords = generateChords(melody, scale)

    playNotes(convertToFrequencies(melody, 1))
    getSecondMelody && playNotes(convertToFrequencies(melody2, 1))
    for (const chordChart of chords) {
        playNotes(convertToFrequencies(chordChart, getChordFrequencyMultiplier))
    }
}







/**
 * Builds a major scale out, based on the starting note
 */
function generateScale(rootNote: MusicalNote, scaleType: "major" | "minor" = "major"): NoteArray {
    const rootIndex = notes.indexOf(rootNote)
    const majorScale = [0, 2, 4, 5, 7, 9, 11]
    const minorScale = [0, 2, 3, 5, 7, 9, 11]
    const scalePositions = scaleType === "minor" ? minorScale : majorScale
    const doubledNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return scalePositions.map(position => doubledNotes[position + rootIndex] as MusicalNote)
}


/**
 * Returns a random note. Can optionally ban notes, and specify a scale to use.
 * If no scale is specified, it will use the complete spectrum of notes.
 */
function randomNote(scale?: NoteArray, bannedNotes?: MusicalNote[]): MusicalNote {
    function getRandomNote() {
        if (scale) {
            return scale[Math.floor(Math.random() * scale.length)] as MusicalNote
        } else {
            return notes[Math.floor(Math.random() * notes.length)] as MusicalNote
        }
    }

    while (true) {
        const note = getRandomNote()
        if (!bannedNotes?.includes(note)) {
            return note
        }
    }
}

function randomHarmonic(scale: NoteArray, rootNote: MusicalNote): MusicalNote {
    const doubledScale = [...scale, ...scale]
    const harmonics = [rootNote, scale[scale.indexOf(rootNote) + 2], scale[scale.indexOf(rootNote) + 4]] as MusicalNote[]
    if (getJazzHarmonies) {
        harmonics.push(scale[scale.indexOf(rootNote) + 6])
    }

    return harmonics[Math.floor(Math.random() * harmonics.length)]
}

function generateMelody(inputScale: NoteArray, rootNote: MusicalNote = inputScale[0]): NoteArrayWithSilence {

    // const scale: NoteArray = transposeScale(Math.floor(Math.random() * 10))
    const scale = inputScale

    const firstPhrase = randomPhrase(scale, rootNote)
    const melody: NoteArrayWithSilence = [
        ...firstPhrase,
        ...firstPhrase,
        ...randomPhrase(scale, rootNote),
        ...firstPhrase,
        // {
        //     note: rootNote,
        //     noteLength: 4
        // }
    ]

    return melody






    function removeRandomNotes(initialMelody: NoteArrayWithSilence) {
        const result = initialMelody.map((note) => Math.random() * 100 > getPercentageOfNotesDropped ? note : { note: "silence", noteLength: note.noteLength })
        return result as NoteArrayWithSilence
    }


    function randomPhrase(scale: NoteArray, firstNote: MusicalNote = scale[0]): NoteArrayWithSilence {

        const firstThreeNotes = randomSetOfNotes(scale, firstNote)

        const secondThreeNotes = chooseNoteType(scale, randomHarmonic(scale, firstNote))
        const thirdThreeNotes = chooseNoteType(scale, randomHarmonic(scale, firstNote))
        firstNote

        const phrase = [
            ...firstThreeNotes,
            ...secondThreeNotes,
            ...thirdThreeNotes,
            firstNote
        ]


        // Change random notes to 2 beats long
        const phraseWithLength = phrase.map((note) => { return { note: note, noteLength: Math.floor(Math.random() * 2) ? 1 : 2 } })




        return removeRandomNotes(phraseWithLength)
    }




    function chooseNoteType(scale: NoteArray, startingNote: MusicalNote) {
        if (Math.random() * 10 >= 5) {
            return randomMusicalScale(scale, startingNote)
        } else {
            return randomSetOfNotes(scale, startingNote)
        }
    }

    function randomMusicalScale(scale: NoteArray, startingNote: MusicalNote): NoteArray {
        const result: NoteArray = []
        // This can probably break and is definitely not the best way to do this,
        // but it's also way easier than dynamically changing based on the number of beats in a bar
        const doubledNotes = [...scale, ...scale, ...scale, ...scale, ...scale, ...scale]
        result.push(startingNote || randomNote(scale))
        // Upward scale
        if (Math.random() * 10 >= 5) {
            let i = 1
            while (i < getBeatsInABar) {
                result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0] + i)])

                i++
            }
            // result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 1])
            // result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 2])
            // result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 3])

            // Downward scale
        } else {
            let i = 1
            while (i < getBeatsInABar) {
                result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - i])

                i++
            }
            // result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 1])
            // result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 2])
            // result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 3])
        }
        console.log(result);


        return result
    }

    /**
     * Returns 3 random notes. You can specify a starting note, which is then returned
     * as the first note.
     */
    function randomSetOfNotes(scale: NoteArray, startingNote?: MusicalNote): NoteArray {
        const firstNote = startingNote ? startingNote : randomNote(scale)

        let i = 0 // just a safety
        const result: NoteArray = [firstNote]
        const bannedNotes: NoteArray = [firstNote]
        while (result.length < getBeatsInABar && i < 25) {
            if (bannedNotes.length >= scale.length) {
                console.warn("cannot have more beats in a bar than notes in the scale")
                result.push(randomNote(scale))
            } else {
                const newNote = randomNote(scale, bannedNotes)
                result.push(newNote)
                bannedNotes.push(newNote)
            }

            i++
        }

        // const secondNote = randomNote(scale, [firstNote])
        // const thirdNote = randomNote(scale, [firstNote, secondNote])


        return result
    }


}




function generateChords(melody: NoteArrayWithSilence, scale: NoteArray) {
    const doubledScale = [...scale, ...scale]
    const chordFirstVoice: NoteArrayWithSilence = []
    const chordSecondVoice: NoteArrayWithSilence = []
    const chordThirdVoice: NoteArrayWithSilence = []
    const chordFourthVoice: NoteArrayWithSilence = []

    let i = 0
    for (const note of melody) {
        i++

        const beatsInBar = getBeatsInABar

        if (!(i % beatsInBar)) {
            if (note.note !== "silence") {
                const random = Math.floor(Math.random() * beatsInBar)
                if (random === 0) {
                    getJazzChords || chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
                    chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note) + 2], noteLength: note.noteLength * beatsInBar })
                    chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note) + 4], noteLength: note.noteLength * beatsInBar })
                    chordFourthVoice.push({ note: doubledScale[scale.indexOf(note.note) + 6], noteLength: note.noteLength * beatsInBar })
                } else if (random === 1) {
                    chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note) - 2], noteLength: note.noteLength * beatsInBar })
                    getJazzChords || chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
                    chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note) + 2], noteLength: note.noteLength * beatsInBar })
                    chordFourthVoice.push({ note: doubledScale[scale.indexOf(note.note) + 4], noteLength: note.noteLength * beatsInBar })
                } else {
                    chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note) - 4], noteLength: note.noteLength * beatsInBar })
                    chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note) - 2], noteLength: note.noteLength * beatsInBar })
                    getJazzChords || chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
                    chordFourthVoice.push({ note: doubledScale[scale.indexOf(note.note) + 2], noteLength: note.noteLength * beatsInBar })
                }

            } else {
                chordFirstVoice.push({ note: "silence", noteLength: note.noteLength * beatsInBar })
                chordSecondVoice.push({ note: "silence", noteLength: note.noteLength * beatsInBar })
                chordThirdVoice.push({ note: "silence", noteLength: note.noteLength * beatsInBar })
                chordFourthVoice.push({ note: "silence", noteLength: note.noteLength * beatsInBar })
            }
        }
    }

    const result = [chordFirstVoice, chordSecondVoice, chordThirdVoice]
    if (getJazzChords) {
        result.push(chordFourthVoice)
    }

    return result
}



type PlayableFrequencies = Array<{ frequency: number | null, noteLength: number }>

function convertToFrequencies(score: NoteArrayWithSilence, frequencyMultiplier: number) {
    return score.map((note) => {
        return {
            frequency: note.note === "silence" ? null : musicalNotes[note.note] * frequencyMultiplier || 1,
            noteLength: note.noteLength
        }
    })
}

function playNotes(noteFrequencies: PlayableFrequencies, timeDelay = 0) {
    // console.log(noteFrequencies);

    let timeCounter = tempo(timeDelay)
    for (const note of noteFrequencies) {
        if (note.frequency) {

            const oscillator = audioContext.createOscillator()
            oscillator.connect(audioContext.destination);

            oscillator.type = getVoice || "square"
            oscillator.frequency.value = note.frequency


            const startTime = audioContext.currentTime + timeCounter //+ tempo(Math.random() / 8)
            oscillator.start(startTime)
            oscillator.stop(audioContext.currentTime + timeCounter + tempo(note.noteLength))

            timeCounter += tempo(note.noteLength)
        } else {
            timeCounter += tempo(note.noteLength)
        }
    }


    function tempo(time: number) {
        return (time * 60) / getBeatsPerMinute
    }
}
