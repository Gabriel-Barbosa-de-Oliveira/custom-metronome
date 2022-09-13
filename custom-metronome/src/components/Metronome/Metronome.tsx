import { Button, IconButton, Slider } from '@mui/material';

import React, { Component, useEffect, useState } from 'react'
import './Metronome.scss';
import NumberController from '../../shared/partials/NumberController';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import MetronomeService from '../../services/MetronomeService';
import * as _ from 'lodash';

export default function Metronome() {

  const [metronomeValue, setValue] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayStatusText, setCurrentPlayStatusText] = useState("Play");
  const [currentPlayStatusComponent, setCurrentPlayStatusComponent] = useState(<PlayCircleOutlineIcon />);

  const changeValue = (event: any, value: any) => {
    setNewMetronomeValue(value);
  };

  function setNewMetronomeValue(value: number) {
    setValue(value);
  }

  function handlePlayStatus() {
    let currentStatus = !isPlaying;
    setIsPlaying(currentStatus);
    handlePlayStatusView();
  }

  function handlePlayStatusView() {
    if (isPlaying) {
      setCurrentPlayStatusText("Play");
      setCurrentPlayStatusComponent(<PlayCircleOutlineIcon />);
    } else {
      setCurrentPlayStatusText("Stop");
      setCurrentPlayStatusComponent(<StopCircleOutlinedIcon />);
    }
  }


  function handleBeatChange(clickedOption: string): void {
    let newValue = metronomeValue;
    clickedOption == "add" ? newValue++ : newValue--;
    setNewMetronomeValue(newValue)
  }

  function handleMeasuresChange(clickedOption: string) {
    console.log(clickedOption)

  }

  return (
    <>

      <section className="container">
        <section className="metronome">
          <div className="bpm-display">
            <span className="tempo">{metronomeValue}</span>
            <span className="bpm">BPM</span>
          </div>
          <div className="tempo-text">Nice and steady</div>
          <NumberController onButtonClick={handleBeatChange} component={
            <div className='slider-container'>

              <Slider
                aria-label="slider"
                defaultValue={60}
                min={20}
                max={280}
                track={false}
                valueLabelDisplay="auto"
                onChange={changeValue}
              />
            </div>
          } />




          <section className="action-button">

            <Button size="large" startIcon={currentPlayStatusComponent} onClick={handlePlayStatus}>
              {currentPlayStatusText}
            </Button>

          </section>

          <NumberController onButtonClick={handleMeasuresChange} component={
            <div className="beats-number-container">4</div>
          } />

          <span className="beats-per-measure-text">Beats per measure</span>

        </section>
      </section>

    </>
  )
}
