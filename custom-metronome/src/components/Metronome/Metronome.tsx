import { Button, IconButton, Slider } from '@mui/material';

import React, { Component, useEffect, useState } from 'react'
import './Metronome.scss';
import NumberController from '../../shared/partials/NumberController';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import MetronomeService from '../../services/MetronomeService';
import * as _ from 'lodash';
import Timer from '../../shared/services/timer';

export default function Metronome() {
  const [metronomeValue, setValue] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayStatusText, setCurrentPlayStatusText] = useState("Play");
  const [currentPlayStatusComponent, setCurrentPlayStatusComponent] = useState(<PlayCircleOutlineIcon />);
  const [beatsNumber, setBeatsNumber] = useState(4);
  const [metronome, setMetronome] = useState(new Timer(handleMetronomeClick, 60000 / metronomeValue, { immediate: true }));
  let metronomeInstance = metronome;
  const click1 = new Audio(require('./click1.mp3'));
  const click2 = new Audio(require('./click2.mp3'));


  let count = 0;
  
  function setNewMetronomeInstance(){
    setMetronome(new Timer(handleMetronomeClick, 60000 / metronomeValue, { immediate: true }));
    metronomeInstance = metronome;
  }

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
    count = 0;
    if (isPlaying) {
      setCurrentPlayStatusText("Play");
      metronomeInstance.stop();
      setCurrentPlayStatusComponent(<PlayCircleOutlineIcon />);
      setNewMetronomeInstance();
    } else {
      setCurrentPlayStatusText("Stop");
      metronomeInstance.start();
      setCurrentPlayStatusComponent(<StopCircleOutlinedIcon />);
    }
  }

  function handleMetronomeClick() {
    console.log(count);
    if (count === beatsNumber) {
      count = 0;
    }
    if (count === 0) {
      click1.play();
      click1.currentTime = 0;
    } else {
      click2.play();
      click2.currentTime = 0;
    }
    count++;
  }




  function handleBeatChange(clickedOption: string): void {
    let newValue = metronomeValue;
    clickedOption == "add" ? newValue++ : newValue--;
    if (checkIfTimeNumberIsValid(newValue))
      setNewMetronomeValue(newValue)
  }

  function checkIfTimeNumberIsValid(value: number) {
    return value >= 20 && value <= 280 ? true : false;
  }

  function handleMeasuresChange(clickedOption: string) {
    let newValue = beatsNumber;
    clickedOption == "add" ? newValue++ : newValue--;
    if (checkIfBeatNumberIsValid(newValue))
      setBeatsNumber(newValue)

  }

  function checkIfBeatNumberIsValid(value: number) {
    return value >= 2 && value <= 12 ? true : false;
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
            <div className="beats-number-container">{beatsNumber}</div>
          } />

          <span className="beats-per-measure-text">Beats per measure</span>

        </section>
      </section>

    </>
  )
}
