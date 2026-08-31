import NavMoniteur from "./navMoniteur";
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function CalendrierM() {
    const Item = styled(Sheet)(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
        ...theme.typography['body-sm'],
        padding: theme.spacing(1),
        textAlign: 'center',
        borderRadius: 4,
        color: theme.vars.palette.text.secondary,
    }));

    const [indexT, setIndexT] = useState(null);
    const [seances, setSeances] = useState([]);
    const [moniteurs, setMoniteurs] = useState([]);
    const [moniteurId, setMoniteurId] = useState(null);

    const moniteurName = localStorage.getItem('auth_name'); // Retrieve the monitor's name from localStorage

    useEffect(() => {
        fetchSeancesData();
        fetchMoniteursData();
    }, []);

    useEffect(() => {
        if (moniteurs && moniteurs.length > 0) {
            findMoniteurIdByName(moniteurName);
        }
    }, [moniteurs, moniteurName]);

    const fetchSeancesData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/seances");
            if (response.data && response.data.seances) {
                setSeances(response.data.seances);
            } else {
                console.error("Invalid seances data:", response.data);
            }
        } catch (error) {
            console.error("Error fetching seances data", error);
        }
    };

    const fetchMoniteursData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/moniteurs');
            if (response.data && response.data.moniteur) {
                setMoniteurs(response.data.moniteur); // Set the moniteurs data
            } else {
                console.error("Invalid moniteurs data:", response.data);
            }
        } catch (error) {
            console.error('Error fetching moniteurs data:', error);
        }
    };

    const findMoniteurIdByName = (name) => {
        const moniteurInfo = moniteurs.find(moniteur => moniteur.nom === name);
        if (moniteurInfo) {
            setMoniteurId(moniteurInfo.id);
        }
    };

    const getReservationCount = (dayIndex, hourIndex) => {
        if (!moniteurId || !seances || seances.length === 0) return 0;

        const sessionIndex = dayIndex * 9 + hourIndex;
        const sessionCount = seances.filter(seance => seance.moniteur_id === moniteurId && seance.index === sessionIndex ).length;

        return sessionCount;
    };

    return (
        <>
            <NavMoniteur />

            <Grid container spacing={0} sx={{ flexGrow: 1 }}>
                <Grid xs={1}>
                    <Item sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', border: '1px solid black', color: 'black' }}>Jours/Heures</Item>
                </Grid>
                {['08 h 00 -  09 h 00', '09 h 00 - 10 h 00', '10 h 00 - 11 h 00', '11 h 00 - 12 h 00', '12 h 00 - 13 h 00', '14 h 00 - 15 h 00', '15 h 00 - 16 h 00', '16 h 00 - 17 h 00', '17 h 00 - 18 h 00'].map((hour, index) => (
                    <Grid xs={1.2} key={index}>
                        <Item sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', border: '1px solid black', color: 'black' }} className='hours'>{hour}</Item>
                    </Grid>
                ))}
            </Grid>
            {
                ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((jour, indexJour) => {
                    return (
                        <Grid container spacing={0} sx={{ flexGrow: 1 }} key={indexJour} className='g2'>
                            <Grid xs={1}>
                                <Item sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', border: '1px solid black', color: 'black' }}>{jour}</Item>
                            </Grid>
                            {[...Array(9)].map((_, index) => (
                                <Grid xs={1.2} key={index}>
                                    <Item sx={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black' }} className='itemComp'>
                                        <p style={{ marginBottom: '10px' }}>Membre: {getReservationCount(indexJour, index)}/3</p>
                                        <Button
                                            className="btn btn-success btn-sm"
                                            type="button"
                                            onClick={() => setIndexT(indexJour * 9 + index)}
                                            href={`/ListReservation/${indexJour * 9 + index}`}
                                            sx={{ color: "white", backgroundColor: "green", '&:hover': { backgroundColor: "darkgreen" } }}
                                        >
                                            Confirmer
                                        </Button>
                                        
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    )
                })
            }
        </>
    );
}
