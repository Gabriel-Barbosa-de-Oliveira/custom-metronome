import { Button, Slider } from '@mui/material';
import { Component } from 'react';
import NumberController from '../../shared/partials/NumberController/NumberController';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import "./Metronome.scss";
import Timer from '../../shared/services/timer';
import { Howl, Howler } from 'howler';
import HeaderMenu from '../../shared/partials/HeaderMenu/HeaderMenu';
import PulseController from '../../partials/PulseController/PulseController';
import { IPulseControllerControlObject } from '../../shared/interfaces/props/IPulseControllerControlObject';
import _ from 'lodash';
import Footer from '../../partials/Footer/Footer';
import Playlist from '../Playlist/Playlist';
import { IUser } from '../../shared/interfaces/context/User.interface';

type IMetronomeState = {
    isPlaying: boolean,
    count: number,
    metronomeValue: number,
    beatsNumber: number,
    currentPlayStatusComponent: JSX.Element,
    currentPlayStatusText: string,
    currentPulses: Array<IPulseControllerControlObject>;
};

export default class Metronome extends Component<{user: IUser | null}, IMetronomeState> {

    private click1: Howl = new Howl({
        src: require('./click2.mp3')
    });
    private click2: Howl = new Howl({
        src: require('./click1.mp3')
    });

    metronomeInstance: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isPlaying: false,
            count: 0,
            metronomeValue: 60,
            beatsNumber: 4,
            currentPlayStatusComponent: <PlayCircleOutlineIcon />,
            currentPlayStatusText: "Play",
            currentPulses: []
        };
        this.metronomeInstance = new Timer(() => { this.handleMetronomeClick() }, 60000 / this.state.metronomeValue, { immediate: true });
        this.mapInitialPulses();
        Howler.volume(1)
        console.log(props.user)
    }

    mapInitialPulses(initialState?: boolean) {
        const beatsQuantity: number = this.state.beatsNumber;
        const { currentPulses } = this.state;
        for (let index = 0; index < beatsQuantity; index++) {
            currentPulses.push({
                id: (index + 1).toString(),
                isActive: index === 0 ? true : false,
                position: index
            })
        }
    }

    addNewPulse(): Array<IPulseControllerControlObject> {
        const { currentPulses } = this.state;
        currentPulses.push({
            id: (currentPulses.length + 2).toString(),
            isActive: false,
            position: currentPulses.length
        })
        return currentPulses
    }

    removeLastPulse(): Array<IPulseControllerControlObject> {
        const { currentPulses } = this.state;
        currentPulses.pop();
        return currentPulses;
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

        let { beatsNumber } = this.state;
        let newCount = this.state.count;
        console.log(newCount);
        if (newCount === beatsNumber) {
            newCount = 0;
        }

        let index = this.state.currentPulses.findIndex(x => (x.position === newCount && x.isActive));

        if (index != -1) {
            this.click1.play();
        } else {
            this.click2.play();
        }

        newCount++
        this.setState({
            count: newCount,
        })
    }

    handleBeatChange = (clickedOption: string) => {

        let newValue = this.state.metronomeValue;
        clickedOption === "add" ? newValue++ : newValue--;
        if (this.checkIfTimeNumberIsValid(newValue))
            this.setNewMetronomeValue(newValue)
    }

    checkIfTimeNumberIsValid = (value: number) => {
        return value >= 20 && value <= 280 ? true : false;
    }

    handleMeasuresChange = (clickedOption: string) => {
        let newValue = this.state.beatsNumber;
        let newPulses: Array<IPulseControllerControlObject> = [];
        if (clickedOption === "add") {
            newValue++;
            newPulses = this.addNewPulse();
        } else {
            newValue--;
            newPulses = this.removeLastPulse();
        };
        if (this.checkIfBeatNumberIsValid(newValue)) {

            this.setState({
                beatsNumber: newValue,
                count: 0,
                currentPulses: newPulses

            })
        }
    }

    checkIfBeatNumberIsValid = (value: number) => {
        return value >= 2 && value <= 12 ? true : false;
    }

    handlePulseIntensityChange = (newPulses: Array<IPulseControllerControlObject>) => {
        this.setState({ currentPulses: newPulses, count: 0 })
    }

    render() {

        const { metronomeValue, beatsNumber, currentPlayStatusComponent, currentPlayStatusText } = this.state;

        return (
            <>
                <HeaderMenu user={this.props.user} />
                <section className="container">
                    <section className="metronome">
                        <section>
                            <div>

                                <div className="bpm-display">
                                    <span className="tempo">{metronomeValue}</span>
                                    <span className="bpm">BPM</span>
                                </div>
                                <section className='pulse-controller-container'>
                                    <PulseController changed={this.handlePulseIntensityChange} pulses={this.state.currentPulses} />
                                </section>
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

                                <NumberController disableLeft={(this.state.beatsNumber == 2)} disableRight={(this.state.beatsNumber == 12)} onButtonClick={this.handleMeasuresChange} component={
                                    <div className="beats-number-container">{beatsNumber}</div>
                                } />

                                <div className="beats-per-measure-text">
                                    <span>Batidas por Compasso</span>
                                </div>
                            </div>
                            <div className='sub-text'>
                                <p><span><b>Azul</b></span> = Nota com acentuação</p>
                                <p><span className='gray-text'>Cinza</span> = Nota sem acentuação</p>
                                <p>Selecione a batida que gostaria de acentuar clickando no circulo abaixo dos bpms</p>
                            </div>
                        </section>

                        <section className='application-mode'>
                            <Playlist />
                        </section>
                    </section>

                    <Footer />
                </section>

            </>
        )
    }
}
