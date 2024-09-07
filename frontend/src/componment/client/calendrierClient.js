import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import { useState,useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import NavClient from './navClient';
import Resv from '../composantresrv';


const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function CalendrierCLient() {
   
    const [nom,setNom]=useState(localStorage.getItem("auth_name") || '');
    const [prenom,setPrenom]=useState(localStorage.getItem("auth_prenom") || '');
    const [telephone,setTelephone]=useState(localStorage.getItem("auth_telephone") || '');
    const [date,setDate]=useState(moment().format('YYYY-MM-DD'));
    const [heure,setHeure]=useState();
    const [moniteur,setMoniteur]=useState([]);
    const [moniteurChoisie,setMoniteurChoisie]=useState();
    const [index,setIndex]=useState(0);
    const [seances,setSeances]=useState([])
    const fetchMoniteurData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/moniteurs');
            const data = await response.json();
            //console.log("Moniteur data:", data.moniteur); // Log moniteur data
            // Assuming moniteur data is an array of moniteur objects
            setMoniteur(data.moniteur); // Set the moniteur data
        } catch (error) {
            console.error('Error fetching moniteur data:', error);
        }
    };
    const fetchSeancesData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/seances');
            const data = await response.json();
            setSeances(data.seances)
            console.log("Seances data:", data.seances); // Log seances data
        } catch (error) {
            console.error('Error fetching seances data:', error);
        }
    };
    useEffect(() => {
        fetchMoniteurData();
        fetchSeancesData();
        const itemComps=document.querySelectorAll('.itemComp');
        const handelclick=(event,index)=>{
            const dayOffset = Math.floor(index / 9); // Calcul du décalage des jours
            const selectedDate = moment().add(dayOffset, 'days').format('YYYY-MM-DD'); // Calcul de la date sélectionnée
            setDate(selectedDate); // Mise à jour de la date
            console.log(selectedDate);
            setIndex(index)
            switch(index){
                case 0: 
                case 9: 
                case 18: 
                case 27: 
                case 36: 
                case 45: 
                       setHeure('08:00:00')
                       break;
                case 1: 
                case 10: 
                case 19: 
                case 28: 
                case 37: 
                case 46: 
                       setHeure('09:00:00')

                       break;
                case 2: 
                case 11: 
                case 20: 
                case 29: 
                case 38: 
                case 47: 
                       setHeure('10:00:00')

                       break;
                case 3: 
                case 12: 
                case 21: 
                case 30: 
                case 39: 
                case 48: 
                       setHeure('11:00:00')

                       break;
                case 4: 
                case 13: 
                case 22: 
                case 31: 
                case 40: 
                case 49: 
                       setHeure('12:00:00')

                       break;
                case 5: 
                case 14: 
                case 23: 
                case 32: 
                case 41: 
                case 50: 
                       setHeure('14:00:00')

                       break;
                case 6: 
                case 15: 
                case 24: 
                case 33: 
                case 42: 
                case 51: 
                       setHeure('15:00:00')

                       break;
                case 7: 
                case 16: 
                case 25: 
                case 34: 
                case 43: 
                case 52: 
                       setHeure('16:00:00')

                       break;
                case 8: 
                case 17: 
                case 26: 
                case 35: 
                case 44: 
                case 53: 
                       setHeure('17:00:00')

                       break;
                default:
                    setHeure(moment().format('L'))
                    break;
           }
       
        }
        itemComps.forEach((element,index)=>{
            element.addEventListener('click',(event)=>handelclick(event,index))
        })
        return ()=>{
            itemComps.forEach((element,index)=>{
            element.removeEventListener('click',()=>handelclick(index))
        })}
    },[]);
    const Enregistre = () => {
       //e.preventDefault();
      
        const data = {
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            date_de_seances:date,
            heure_de_seances:heure,
            nom_moniteur:moniteurChoisie,
            index:index
        };
        console.log(data)
        axios.post("/api/enregistresecances", data)
            .then(res => {
                if (res.data.status === 201) {
                    console.log('success',res.data.message,'success');
                    
                } else {
                    console.log('error', res.data.message, 'error');
                }
                swal({
                    title: "Succès",
                    text: "seances  a ete ajouter avec succès",
                    icon: "success",
                    button: "OK"
                }).then(() => {
                    // Redirection après la confirmation du message
                    window.location.href = "/calendrierClient";
                });

            })
            .catch(error => {
                console.error('Error while submitting data:', error);
                console.log('error', 'Une erreur est survenue lors de l\'enregistrement.', 'error');
                swal({
                    title: "Erreur",
                    text: "seances n'est pas ajouter",
                    icon: "error",
                    button: "OK"
                })
            });
            setHeure("");
    }
    
    return (
        <div>
            <NavClient />
            <h1>Calendrier</h1>
    
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
                                    <Item sx={{ height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }} className='itemComp'>
                                        <Resv
                                         index={indexJour * 9 + index} 
                                         Enregistre={Enregistre} 
                                         nom={nom} 
                                         prenom={prenom} 
                                         telephone={telephone} 
                                         setMoniteur={setMoniteur} 
                                         moniteur={moniteur} 
                                         setMoniteurChoisie={setMoniteurChoisie} 
                                         seances={seances}
                                         />
                                    </Item>
                                </Grid>
                            ))}
                        </Grid>
                    )
                })
            }
        </div>
    );
    
}