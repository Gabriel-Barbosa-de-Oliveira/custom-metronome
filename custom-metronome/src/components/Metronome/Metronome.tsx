import { Button, Slider } from '@mui/material';
import { Component } from 'react';
import NumberController from '../../shared/partials/NumberController';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import "./Metronome.scss";
import Timer from '../../shared/services/timer';

const click1 = "./click1.mp3";
const click2 = "./click2.mp3";

type IMetronomeState = {
    isPlaying: boolean,
    count: number,
    metronomeValue: number,
    beatsNumber: number,
    currentPlayStatusComponent: JSX.Element,
    currentPlayStatusText: string
};

export default class Metronome extends Component<{}, IMetronomeState>{

    private click1: HTMLAudioElement = new Audio(require('./click1.mp3'));
    private click2: HTMLAudioElement = new Audio(require('./click2.mp3'));

    metronomeInstance: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isPlaying: false,
            count: 0,
            metronomeValue: 60,
            beatsNumber: 4,
            currentPlayStatusComponent: <PlayCircleOutlineIcon />,
            currentPlayStatusText: "Play"
        };
        this.metronomeInstance = new Timer(() => { this.handleMetronomeClick() }, 60000 / this.state.metronomeValue, { immediate: true });
    }

    changeValue = (event: any, value: any) => {
        this.setNewMetronomeValue(value);
    };

    setNewMetronomeValue = (value: number) => {
        this.setState({
            metronomeValue: value
        })
        this.metronomeInstance.timeInterval = 60000 / this.state.metronomeValue;
    }

    handlePlayStatus = () => {
        let currentStatus = !this.state.isPlaying;
        this.setState({
            isPlaying: currentStatus
        })
        this.handlePlayStatusView();
    }

    handlePlayStatusView = () => {
        let { isPlaying } = this.state;
        this.setState({ count: 0 });
        if (isPlaying) {
            this.metronomeInstance.stop();
            this.setState({
                currentPlayStatusText: "Play",
                currentPlayStatusComponent: <PlayCircleOutlineIcon />
            })
        } else {
            this.metronomeInstance.start();
            this.setState({
                currentPlayStatusText: "Stop",
                currentPlayStatusComponent: <StopCircleOutlinedIcon />
            })
        }
    }

    handleMetronomeClick = () => {
        debugger;
        let { beatsNumber } = this.state;
        let newCount = this.state.count;
        console.log(newCount);
        if (newCount === beatsNumber) {
            newCount = 0;
        }
        if (newCount === 0) {
            this.click1.play();
            this.click1.currentTime = 0;
        } else {
            this.click2.play();
            this.click2.currentTime = 0;
        }
        newCount++
        this.setState({
            count: newCount,
        })
    }

    handleBeatChange = (clickedOption: string) => {
        debugger;
        let newValue = this.state.metronomeValue;
        clickedOption == "add" ? newValue++ : newValue--;
        if (this.checkIfTimeNumberIsValid(newValue))
            this.setNewMetronomeValue(newValue)
    }

    checkIfTimeNumberIsValid = (value: number) => {
        return value >= 20 && value <= 280 ? true : false;
    }

    handleMeasuresChange = (clickedOption: string) => {
        let newValue = this.state.beatsNumber;
        debugger;
        clickedOption == "add" ? newValue++ : newValue--;
        if (this.checkIfBeatNumberIsValid(newValue)) {
            this.setState({
                beatsNumber: newValue,
                count: 0
            })
            // this.setNewMetronomeInstance()
        }
    }
    checkIfBeatNumberIsValid = (value: number) => {
        return value >= 2 && value <= 12 ? true : false;
    }

    render() {

        const { metronomeValue, beatsNumber, currentPlayStatusComponent, currentPlayStatusText } = this.state;

        return (
            <>

                <section className="container">
                    <section className="metronome">
                        <div className="bpm-display">
                            <span className="tempo">{metronomeValue}</span>
                            <span className="bpm">BPM</span>
                        </div>
                        <div className="tempo-text">Nice and steady</div>
                        <NumberController onButtonClick={this.handleBeatChange} component={
                            <div className='slider-container'>

                                <Slider
                                    aria-label="slider"
                                    defaultValue={60}
                                    min={20}
                                    max={280}
                                    track={false}
                                    value={metronomeValue}
                                    valueLabelDisplay="auto"
                                    onChange={this.changeValue}
                                />
                            </div>
                        } />

                        <section className="action-button">

                            <Button size="large" startIcon={currentPlayStatusComponent} onClick={this.handlePlayStatus}>
                                {currentPlayStatusText}
                            </Button>

                        </section>

                        <NumberController onButtonClick={this.handleMeasuresChange} component={
                            <div className="beats-number-container">{beatsNumber}</div>
                        } />

                        <span className="beats-per-measure-text">Beats per measure</span>

                    </section>
                </section>

            </>
        )
    }
}
