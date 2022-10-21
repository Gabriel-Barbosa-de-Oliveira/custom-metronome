import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import PulseController from '../../partials/PulseController/PulseController';
import { IPulseControllerControlObject } from '../../shared/interfaces/props/IPulseControllerControlObject';
import HeaderMenu from '../../shared/partials/HeaderMenu/HeaderMenu'
import "./Playlists.scss";

export default function PlaylistForm() {

    const [playlistName, setPlaylistName] = useState<string>("");
    const [playlistCompasses, setPlaylistCompasses] = useState<Array<any>>([]);
    const [compassName, setCompassName] = useState<string>("");
    const [compassMeasures, setCompassMeasures] = useState<number>(4);
    const [compassPositions, setCompassPositions] = useState<any>(null);
    const [compassControl, setCompassControl] = useState<Array<IPulseControllerControlObject>>([
        {
            isActive: false,
            position: 0,
            id: "0"
        },
        {
            isActive: false,
            position: 1,
            id: "1"
        },
        {
            isActive: false,
            position: 2,
            id: "2"
        },
        {
            isActive: false,
            position: 3,
            id: "3"
        }
    ]);

    let measures: Array<JSX.Element> = [];

    for (let i = 2; i < 13; i++) {
        measures.push(
            <MenuItem value={i} key={i} id={`menu-item-${i}`}>{i}</MenuItem>
        )
    }
    


    function submit() { }




    return (
        <>
            <HeaderMenu />
            <section className='playlists-container'>
                <div className='form-container'>
                    <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
                        <h3>Dados da Playlist</h3>
                        <TextField id="playlistName" label="Nome da Playlist" variant="standard" value={playlistName} onChange={(event) => {
                            setPlaylistName(event.target.value)
                        }} />
                        <h3>Dados do Compasso</h3>
                        <div className='compass-container'>
                            <TextField id="playlistCompass" label="Nome do Compass" variant="standard" value={compassName} onChange={(event) => {
                                setCompassName(event.target.value)
                            }} />
                            <TextField
                                variant='standard'
                                id='uncontrolled-native'
                                select
                                value={compassMeasures}
                                label="Número de Batidas"
                                onChange={(event) => {
                                    setCompassMeasures(Number(event.target.value))
                                }}
                            >
                                {
                                    measures
                                }
                            </TextField>
                            <TextField
                                variant='standard'
                                id='uncontrolled-native'
                                select
                                value={compassMeasures}
                                label="Número de execuções"
                                onChange={(event) => {
                                    setCompassMeasures(Number(event.target.value))
                                }}
                            >
                                {
                                    measures
                                }
                            </TextField>
                            <PulseController pulses={compassControl} changed={() => {}}/>
                        </div>

                        <footer className="authenticator-actions">
                            <Button size="small" onClick={() => submit()}>Enviar</Button>
                        </footer>
                    </FormControl>
                </div>
            </section>
        </>
    )
}
