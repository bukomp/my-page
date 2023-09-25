import React, { useState } from 'react';
import AppWindow from '../../../AppWindow/AppWindow.jsx';
import moment from 'moment';
import './MidiPlayer.css';

/* eslint-disable no-undef */
const MidiPlayerComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [selectedSong] = useState(
    //'/assets/music/clown.mp3'
    '/assets/music/the_beat.mid'
  );
  const [timer, setTimer] = useState(null);
  const [Player, setPlayer] = useState(null);

  const createPlaybackTimer = (duration) => {
    const timerId = setInterval(() => {
      setTimePassed((timePassed) => timePassed + 1000);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerId);
    }, duration - timePassed);
    return timerId;
  };

  const handleMidi = () => {
    if (!timePassed) {
      MIDIjs.get_duration(selectedSong, (s) => {
        const duration = s * 1000;
        const playbackTimer = createPlaybackTimer(duration);
        MIDIjs.play(selectedSong);
        setSongDuration(() => duration);
        setTimer(() => playbackTimer);
      });
    } else {
      if (isPlaying) {
        clearInterval(timer);
        MIDIjs.pause();
      } else {
        setTimer(createPlaybackTimer(songDuration));
        MIDIjs.resume();
      }
    }

    setIsPlaying(!isPlaying);
  };

  const handleMusic = () => {
    if (!timePassed) {
      const audio = new Audio(selectedSong);
      audio.onloadedmetadata = () => {
        const duration = audio.duration * 1000;
        const playbackTimer = createPlaybackTimer(duration);
        audio.play();
        setSongDuration(duration);
        setPlayer(audio);
        setTimer(() => playbackTimer);
      };
    } else {
      if (isPlaying) {
        clearInterval(timer);
        Player.pause();
      } else {
        setTimer(createPlaybackTimer(songDuration));
        Player.play();
      }
    }

    setIsPlaying(!isPlaying);
  };

  const handleClick = () => {
    if (selectedSong.split('.').pop() === 'mid') {
      handleMidi();
    } else {
      handleMusic();
    }
  };

  const msToReadableFormat = (time) => {
    return moment(time).format('mm:ss');
  };

  return (
    <div className="midi-player">
      <div className="player-info">
        <p>Now Playing: {selectedSong.split('/').pop()}</p>
        <p>
          {msToReadableFormat(timePassed)}/
          {msToReadableFormat(songDuration - timePassed)}
        </p>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(timePassed / songDuration) * 100}%` }}
        ></div>
      </div>
      <button onClick={handleClick}>
        {(songDuration <= timePassed ? 'Replay' : false) ||
          (isPlaying ? 'Pause' : 'Play')}
      </button>
    </div>
  );
};

const MidiPlayer = () => {
  return (
    <AppWindow appName={'Midi Player'} AppComponent={<MidiPlayerComponent />} />
  );
};

export default MidiPlayer;
