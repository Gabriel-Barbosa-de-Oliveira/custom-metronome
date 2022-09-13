import MetronomeService from "./MetronomeService";

test('it should create new Metronome Service', () => {
    const service = new MetronomeService(60);
    expect(service).toBeTruthy();
});

test('it should decrease bpm from metronome service', () => {
    const service = new MetronomeService(60);
    service.decreaseBpm();
    expect(service.getBpm()).toBe(59);
});

test('it should increase bpm from metronome service', () => {
    const service = new MetronomeService(60);
    service.increaseBpm();
    expect(service.getBpm()).toBe(61);
});

test('it should set bpm from metronome service', () => {
    const service = new MetronomeService(60);
    service.setNewBpm(140);
    expect(service.getBpm()).toBe(140);
});
  