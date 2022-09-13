import { Button, IconButton, Slider } from '@mui/material';

import React, { Component, useEffect, useState } from 'react'
import './Metronome.scss';
import NumberController from '../../shared/partials/NumberController';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import MetronomeService from '../../services/MetronomeService';
import * as _ from 'lodash';

export default function Metronome() {

  let metronomeDefaultValue: number = 60;

  const [value, setValue] = useState(metronomeDefaultValue);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayStatusText, setCurrentPlayStatusText] = useState("Play");
  const [currentPlayStatusComponent, setCurrentPlayStatusComponent] = useState(<PlayCircleOutlineIcon />);

  const changeValue = (event: any, value: any) => {
    metronomeDefaultValue = value;
    setValue(value);
  };

  function handlePlayStatus(){
    let currentStatus = !isPlaying;
    setIsPlaying(currentStatus);
    handlePlayStatusView();
  }

  function handlePlayStatusView(){
    if(isPlaying){
      setCurrentPlayStatusText("Play");
      setCurrentPlayStatusComponent(<PlayCircleOutlineIcon />);
    }else{
      setCurrentPlayStatusText("Stop");
      setCurrentPlayStatusComponent(<StopCircleOutlinedIcon />);
    }
  } 

   




  return (
    <>

      <section className="container">
        <section className="metronome">
          <div className="bpm-display">
            <span className="tempo">140</span>
            <span className="bpm">BPM</span>
          </div>
          <div className="tempo-text">Nice and steady</div>
          <NumberController component={
            <div className='slider-container'>

              <Slider
                aria-label="slider"
                defaultValue={metronomeDefaultValue}
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

          <NumberController component={
            <div className="beats-number-container">4</div>
          } />

          <span className="beats-per-measure-text">Beats per measure</span>

        </section>
      </section>

    </>
  )
}
