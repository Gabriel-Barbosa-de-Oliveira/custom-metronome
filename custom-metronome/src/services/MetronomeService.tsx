export class MetronomeService {
    
    private bpm: number = 0;

    constructor(bpm: number){
        this.setNewBpm(bpm);
    }


    public setNewBpm(bpm: number) {
        this.bpm = bpm;
        console.log(this.bpm, "new bpm")
    }

    public decreaseBpm() {
        this.bpm --;
    }

    public increaseBpm() {
        this.bpm ++;
    }

    public startMetronome(){

    }

    public stopMetronome(){

    }

    public getBpm(): number {
        return this.bpm;
    }


}

export default MetronomeService;