import React, { useEffect, useState } from 'react';
import AppWindow from '../../../AppWindow/AppWindow.jsx';

/* eslint-disable no-undef */
const MidiPlayerComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [selectedSong, setSelectedSong] = useState(
    '/assets/music/the_beat.mid'
  );
  const [timer, setTimer] = useState(null);
  const [Player, setPlayer] = useState(null);

  const createPlaybackTimer = () => {
    const timerId = setInterval(() => {
      setTimePassed((timePassed) => timePassed + 1);
    }, 1);
    return timerId;
  };

  const handleClick = () => {
    if (!timePassed) {
      MIDIjs.play(selectedSong);
      setTimer(createPlaybackTimer());
    } else {
      if (isPlaying) {
        clearInterval(timer);
        MIDIjs.pause();
      } else {
        setTimer(createPlaybackTimer());
        MIDIjs.resume();
      }
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="midi-player">
      {timePassed}
      <button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

const MidiPlayer = () => {
  return (
    <AppWindow appName={'Midi Player'} AppComponent={<MidiPlayerComponent />} />
  );
};

export default MidiPlayer;
