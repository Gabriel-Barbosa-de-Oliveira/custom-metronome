import { IconButton, Slider } from '@mui/material';

import React from 'react'
import './Metronome.scss';
import NumberController from '../../shared/partials/NumberController';

export default function Metronome() {
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
                defaultValue={60}
                min={20}
                max={280}
                track={false}
                valueLabelDisplay="auto"
              />
            </div>
          } />
          <div className="start-stop">START</div>

          <NumberController component={
            <div className="beats-number-container">4</div>
          } />

          <span className="beats-per-measure-text">Beats per measure</span>

        </section>
      </section>

    </>
  )
}
