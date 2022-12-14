import { Button, Card, CardActionArea, CardContent, CardHeader, Slider, Typography } from '@mui/material';
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
import { BackendService } from '../../services/backend/BackendService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToastrService } from '../../shared/services/Toastr.service';

type IMetronomeState = {
    isPlaying: boolean,
    count: number,
    metronomeValue: number,
    beatsNumber: number,
    currentPlayStatusComponent: JSX.Element,
    currentPlayStatusText: string,
    currentPulses: Array<IPulseControllerControlObject>;
    lastVelocityUsed: number,
    velocities: Array<number>,
    chartData: any,
    dataId: any
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default class Metronome extends Component<{ user: IUser | null }, IMetronomeState> {
    private documentCanvas: any;
    private click1: Howl = new Howl({
        src: require('./click2.mp3')
    });
    private click2: Howl = new Howl({
        src: require('./click1.mp3')
    });

    metronomeInstance: any;
    backendService: BackendService;
    constructor(props: any) {
        super(props);
        this.state = {
            isPlaying: false,
            count: 0,
            metronomeValue: 60,
            beatsNumber: 4,
            currentPlayStatusComponent: <PlayCircleOutlineIcon />,
            currentPlayStatusText: "Play",
            currentPulses: [],
            lastVelocityUsed: 0,
            velocities: [0],
            dataId: null,
            chartData: {
                labels: [""],
                datasets: [{
                    fill: false,
                    label: 'Velocidades Utilizadas',
                    backgroundColor: '#1976d2',
                    borderColor: '#1976d2',
                    data: [60]
                }]
            }
        };
        this.metronomeInstance = new Timer(() => { this.handleMetronomeClick() }, 60000 / this.state.metronomeValue, { immediate: true });
        this.backendService = new BackendService();
        this.mapInitialPulses();
        Howler.volume(1)
    }

    componentDidMount(): void {
        this.documentCanvas = document.getElementById('myChart');
        if (this.props.user)
            this.getUserData();
    }

    getUserSession() {
        try {
            return JSON.parse(sessionStorage.getItem("user") as any);
        } catch {
            return null;
        }

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
            if (this.getUserSession()) {
                this.putUserData();
            } else {
                this.mapUserData();
            }

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

    async getUserData() {
        try {
            const data = await this.backendService.read(`/data?userId=${this.getUserSession().id}`);
            const newChartData = this.state.chartData;
            newChartData.labels = data[0].velocities.map(() => { return "" });
            newChartData.datasets[0].data = data[0].velocities;
            const datasetsCopy = this.state.chartData.datasets.slice(0);
            console.log(newChartData)

            this.setState({
                dataId: data[0].id,
                velocities: data[0].velocities,
                lastVelocityUsed: data[0].lastVelocityUsed,
                chartData: Object.assign(newChartData, this.state.chartData, {
                    datasets: datasetsCopy
                })
            })
        } catch {

        }
    }

    async putUserData() {

        const userData = {
            "userId": this.getUserSession().id,
            "lastVelocityUsed": this.state.lastVelocityUsed,
            "velocities": this.state.velocities
        }

        try {
            const data = await this.backendService.update(`/data/${this.state.dataId}`, userData);
            new ToastrService().notifySuccess("Dados salvos com sucesso");
        } catch {
            new ToastrService().notifySuccess("Erro ao salvar dados");
        }

        this.mapUserData();
    }

    mapUserData() {
        this.mapNewLastVelocity();
        this.addNewVelocity();
        this.generateNewGraph();
    }

    mapNewLastVelocity() {
        this.setState({ lastVelocityUsed: this.state.metronomeValue })
    }

    addNewVelocity() {
        const newVelocities = this.state.velocities;
        newVelocities.push(this.state.metronomeValue);
        this.setState({ velocities: newVelocities })
    }

    generateNewGraph() {
        const newChartData = this.state.chartData;
        const { velocities } = this.state;
        newChartData.labels = velocities.map(() => { return "" });
        newChartData.datasets[0].data = velocities;
        const datasetsCopy = this.state.chartData.datasets.slice(0);

        this.setState({
            chartData: Object.assign(newChartData, this.state.chartData, {
                datasets: datasetsCopy
            })
        })
    }


    render() {

        const { metronomeValue, beatsNumber, currentPlayStatusComponent, currentPlayStatusText } = this.state;

        return (
            <>
                {/* <HeaderMenu user={this.props.user} /> */}
                <HeaderMenu />
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
                                <p><span><b>Azul</b></span> = Nota com acentua????o</p>
                                <p><span className='gray-text'>Cinza</span> = Nota sem acentua????o</p>
                                <p>Selecione a batida que gostaria de acentuar clickando no circulo abaixo dos bpms</p>
                            </div>
                        </section>



                        <section className='application-data'>
                            <section className='application-mode'>
                                <Card variant="outlined">
                                    <CardHeader title={"??ltima execu????o"} />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography color="text.secondary" component="div" variant="h5">
                                            {this.state.lastVelocityUsed} bpms
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined">
                                    <CardHeader title={"Maior velocidade atingida"} />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography color="text.secondary" component="div" variant="h5">
                                            {Math.max(...this.state.velocities)} bpms
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" id="graph">
                                    {/* <CardHeader title={"Evolu????o"} /> */}
                                    <CardContent sx={{ flex: '1 0 auto', paddingBottom: 0 }}>
                                        {/* <canvas id="myChart"></canvas> */}
                                        <Line data={this.state.chartData} />
                                    </CardContent>
                                    <div className='card-footer'>
                                        {this.getUserSession() ? "" : <small>Fa??a Login para salvar seu progresso definitvamente</small>}
                                    </div>
                                </Card>
                                {/* <Playlist /> */}
                            </section>
                        </section>
                    </section>

                    <Footer />
                </section>

            </>
        )
    }
}
