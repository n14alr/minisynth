import React from 'react';
import { Volume2, Volume1, VolumeX, Music2 } from 'lucide-react';

interface ControlsProps {
  volume: number;
  setVolume: (value: number) => void;
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  waveform: string;
  setWaveform: (value: string) => void;
  attack: number;
  setAttack: (value: number) => void;
  decay: number;
  setDecay: (value: number) => void;
  sustain: number;
  setSustain: (value: number) => void;
  release: number;
  setRelease: (value: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  waveform,
  setWaveform,
  attack,
  setAttack,
  decay,
  setDecay,
  sustain,
  setSustain,
  release,
  setRelease,
}) => {
  const VolumeIcon = isMuted ? VolumeX : volume < -20 ? Volume1 : Volume2;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 className="text-purple-400" size={20} />
            <span className="text-white">Waveform</span>
          </div>
          <select
            value={waveform}
            onChange={(e) => setWaveform(e.target.value)}
            className="bg-gray-700 text-white rounded px-2 py-1 border border-gray-600"
          >
            {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <VolumeIcon size={20} />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="-40"
              max="0"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
          <span className="text-white w-8">{volume}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-white w-16">Attack</span>
          <input
            type="range"
            min="0.01"
            max="2"
            step="0.01"
            value={attack}
            onChange={(e) => setAttack(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-white w-12">{attack.toFixed(2)}s</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white w-16">Decay</span>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={decay}
            onChange={(e) => setDecay(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-white w-12">{decay.toFixed(2)}s</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white w-16">Sustain</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={(e) => setSustain(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-white w-12">{sustain.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white w-16">Release</span>
          <input
            type="range"
            min="0.01"
            max="5"
            step="0.01"
            value={release}
            onChange={(e) => setRelease(Number(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-white w-12">{release.toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;