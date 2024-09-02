# Concept

Basically this is just a list of simple apps. These are kinda a thing for practice, but also function together as part of a wider art project

The apps in mind are:
- Trinary Music: An app that 

## Idea - Music Maker

An idea for a less generated and more directed style of music is to have the user directly pass in the notes and lengths, and then the system just plays it for them.

I'm imagining something kinda like TidalCycle or whatever it's called, except with a slightly simpler UI. It also doesn't have a cycled beat like with TidalCycle, it is plain notation:

```
c c d2 -0.5 e c c d2 # Voice 1
(c e g b)2*2 # Voice 2
```
1. A note is decided with `a-g`, with `-` meaning silence
2. The length of the note is decided by a number next after it, e.g. `2a` means a for 2 beats
3. The octave can be changed with a number before it, e.g. `d0.5` means a d 1 octave below, or `e2` means e 1 octave above normal. The number changes the frequency.
4. Other effects can be added to a note before or after it, doesn't matter, only frequency and length have a position that matters
5. `*n` means do the thing n times, e.g. `e*2` means play e n times. `x2` also works, e.g. `ex2`, idk how likely that is to be used.
4. Brackets can be used to apply modifiers to a selection. Inside the brackets is calculated first, then outside
5. Modifiers outside follow the same rules as single notes
6. `evol20` means set the volume to 20%
	7. `(a b c)vol20-100` means that it will increase the volume from 20 on the first note to 100 on the last, smoothly going up in equal intervals.