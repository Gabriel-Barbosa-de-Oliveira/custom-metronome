import { IconButton, Slider } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React from 'react'
import './Metronome.scss';

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
          <div className="tempo-settings">
            <div className="adjust-tempo-btn decrease-tempo">-</div>
            <Slider
              aria-label="slider"
              defaultValue={60}
              min={20}
              max={280}
              track={false}
              valueLabelDisplay="auto"
            />
            <div className="adjust-tempo-btn increase-tempo">+</div>
          </div>
          <div className="start-stop">START</div>
          <div className="measures">
            <IconButton color="primary" aria-label="decrease velocity" component="label">
              <RemoveCircleOutlineIcon />
            </IconButton>
            <div className="measure-count">4</div>
            <IconButton color="primary" aria-label="raise velocity" component="label">
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <span className="beats-per-measure-text">Beats per measure</span>

        </section>
      </section>

    </>
  )
}
