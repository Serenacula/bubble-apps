import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/bigButton.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Bad Music Generator</title>
                <meta name="description" content="Bad Music Generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <button className={styles.bigButton} onClick={playMusic}>
                    Play
                </button>

                <div></div>
            </main>
        </>
    )
}

const beatsPerMinute = 240

function playMusic() {
    // const noteFrequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88]
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


    /**
     * Builds a major scale out, based on the starting note
     */
    function getScale(rootNote: MusicalNote, scaleType: "major" | "minor" = "major"): NoteArray {
        const rootIndex = notes.indexOf(rootNote)
        const majorScale = [0, 2, 4, 5, 7, 9, 11]
        const minorScale = [0, 2, 3, 5, 7, 9, 11]
        const scalePositions = scaleType === "minor" ? minorScale : majorScale
        const doubledNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        return scalePositions.map(position => doubledNotes[position + rootIndex] as MusicalNote)
    }

    // const scaleC: NoteArray = getScale("C")
    // const scaleCSharp: NoteArray = getScale("C#")
    // const scaleD: NoteArray = getScale("D")
    // const scaleDSharp: NoteArray = getScale("D#")
    // const scaleE: NoteArray = getScale("E")
    // const scaleF: NoteArray = getScale("F")
    // const scaleG: NoteArray = getScale("G")
    // const scaleGSharp: NoteArray = getScale("G#")
    // const scaleA: NoteArray = getScale("A")
    // const scaleASharp: NoteArray = getScale("A#")
    // const scaleB: NoteArray = getScale("B")


    const audioContext = new AudioContext()



    /**
     * MAKE THE MUSIC!
     */

    const scale = getScale(randomNote())
    const melody = generateMelody(scale, randomNote(scale))
    const melody2 = generateMelody(scale, randomNote(scale))
    const chords = generateChords(melody, scale)

    playNotes(convertToFrequencies(melody, 1))
    playNotes(convertToFrequencies(melody2, 1))
    for (const chordChart of chords) {
        playNotes(convertToFrequencies(chordChart, 0.66))
        // playNotes(convertToFrequencies(chordChart, 2))
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

    function randomHarmonic(scale: NoteArray, jazzOn = false): MusicalNote {
        const harmonics = [scale[0], scale[2], scale[4]] as MusicalNote[]
        if (jazzOn) {
            harmonics.push(scale[6])
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
            const result = initialMelody.map((note) => Math.random() * 10 > 2 ? note : { note: "silence", noteLength: note.noteLength })
            return result as NoteArrayWithSilence
        }


        function randomPhrase(scale: NoteArray, startingNote?: MusicalNote, jazzOn = false): NoteArrayWithSilence {

            const firstNote: MusicalNote = startingNote ? startingNote : scale[0]

            const firstThreeNotes = randomThreeNotes(scale, firstNote)

            const secondThreeNotes = chooseThreeNoteType(scale, randomHarmonic(scale))
            const thirdThreeNotes = chooseThreeNoteType(scale, randomHarmonic(scale))


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




        function chooseThreeNoteType(scale: NoteArray, startingNote: MusicalNote) {
            if (Math.random() * 10 >= 5) {
                return randomMusicalScale(scale, startingNote)
            } else {
                return randomThreeNotes(scale, startingNote)
            }
        }

        function randomMusicalScale(scale: NoteArray, startingNote: MusicalNote): NoteArray {
            const result: NoteArray = []
            const doubledNotes = [...scale, ...scale]
            result.push(startingNote || randomNote(scale))
            // Upward scale
            if (Math.random() * 10 >= 5) {
                if (scale) {
                    result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 1])
                    result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 2])
                    // result.push(doubledNotes[doubledNotes.findIndex((note) => note === result[0]) + 3])
                }
                // Downward scale
            } else {
                if (scale) {
                    result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 1])
                    result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 2])
                    // result.push(doubledNotes[doubledNotes.lastIndexOf(result[0]) - 3])
                }
            }
            console.log(result);


            return result
        }

        /**
         * Returns 3 random notes. You can specify a starting note, which is then returned
         * as the first note.
         */
        function randomThreeNotes(scale: NoteArray, startingNote?: MusicalNote): NoteArray {
            const firstNote = startingNote ? startingNote : randomNote(scale)
            const secondNote = randomNote(scale, [firstNote])
            const thirdNote = randomNote(scale, [firstNote, secondNote])


            return [firstNote, secondNote, thirdNote]
        }


    }




    function generateChords(melody: NoteArrayWithSilence, scale: NoteArray, jazzOn = false) {
        const doubledScale = [...scale, ...scale]
        const chordFirstVoice: NoteArrayWithSilence = []
        const chordSecondVoice: NoteArrayWithSilence = []
        const chordThirdVoice: NoteArrayWithSilence = []
        const chordFourthVoice: NoteArrayWithSilence = []

        let i = 0
        for (const note of melody) {
            i++

            const beatsInBar = 3

            if (!(i % beatsInBar)) {
                if (note.note !== "silence") {
                    const random = Math.floor(Math.random() * beatsInBar)
                    if (random === 0) {
                        chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
                        chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note) + 2], noteLength: note.noteLength * beatsInBar })
                        chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note) + 4], noteLength: note.noteLength * beatsInBar })
                        chordFourthVoice.push({ note: doubledScale[scale.indexOf(note.note) + 6], noteLength: note.noteLength * beatsInBar })
                    } else if (random === 1) {
                        chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note) - 2], noteLength: note.noteLength * beatsInBar })
                        chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
                        chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note) + 2], noteLength: note.noteLength * beatsInBar })
                        chordFourthVoice.push({ note: doubledScale[scale.indexOf(note.note) + 4], noteLength: note.noteLength * beatsInBar })
                    } else {
                        chordFirstVoice.push({ note: doubledScale[scale.indexOf(note.note) - 4], noteLength: note.noteLength * beatsInBar })
                        chordSecondVoice.push({ note: doubledScale[scale.indexOf(note.note) - 2], noteLength: note.noteLength * beatsInBar })
                        chordThirdVoice.push({ note: doubledScale[scale.indexOf(note.note)], noteLength: note.noteLength * beatsInBar })
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
        if (jazzOn) {
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

                oscillator.type = "sawtooth"
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
            return (time * 60) / beatsPerMinute
        }
    }

}
