import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import Key from './Key';
import Controls from './Controls';

const keyMap: { [key: string]: string } = {
  a: 'C4',
  w: 'C#4',
  s: 'D4',
  e: 'D#4',
  d: 'E4',
  f: 'F4',
  t: 'F#4',
  g: 'G4',
  y: 'G#4',
  h: 'A4',
  u: 'A#4',
  j: 'B4',
  k: 'C5',
};

const Synthesizer: React.FC = () => {
  const synthRef = useRef<Tone.Synth | null>(null);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState<number>(-12);
  const [isMuted, setIsMuted] = useState(false);
  const [waveform, setWaveform] = useState<string>('sine');
  const [attack, setAttack] = useState(0.1);
  const [decay, setDecay] = useState(0.2);
  const [sustain, setSustain] = useState(0.5);
  const [release, setRelease] = useState(0.5);

  // Initialize synth with effects
  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: waveform as any,
      },
      envelope: {
        attack,
        decay,
        sustain,
        release,
      },
    }).toDestination();

    return () => {
      synthRef.current?.dispose();
    };
  }, []);

  // Update synth parameters when they change
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.set({
        oscillator: { type: waveform },
        envelope: { attack, decay, sustain, release },
      });
    }
  }, [waveform, attack, decay, sustain, release]);

  // Update volume
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = isMuted ? -Infinity : volume;
    }
  }, [volume, isMuted]);

  const playNote = useCallback((note: string) => {
    synthRef.current?.triggerAttack(note);
    setActiveNotes((prev) => new Set(prev).add(note));
  }, []);

  const stopNote = useCallback((note: string) => {
    synthRef.current?.triggerRelease();
    setActiveNotes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = keyMap[e.key.toLowerCase()];
      if (note) {
        playNote(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note) {
        stopNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote, stopNote]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-8">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Web Synthesizer</h1>
        
        <Controls
          volume={volume}
          setVolume={setVolume}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          waveform={waveform}
          setWaveform={setWaveform}
          attack={attack}
          setAttack={setAttack}
          decay={decay}
          setDecay={setDecay}
          sustain={sustain}
          setSustain={setSustain}
          release={release}
          setRelease={setRelease}
        />

        <div className="flex justify-center relative mt-8">
          {Object.entries(keyMap).map(([key, note]) => {
            const isBlack = note.includes('#');
            return (
              <Key
                key={note}
                note={key.toUpperCase()}
                isBlack={isBlack}
                isPressed={activeNotes.has(note)}
                onMouseDown={() => playNote(note)}
                onMouseUp={() => stopNote(note)}
                onMouseLeave={() => stopNote(note)}
              />
            );
          })}
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>Use your keyboard to play! Press the corresponding letters shown on the keys.</p>
        </div>
      </div>
    </div>
  );
};

export default Synthesizer;