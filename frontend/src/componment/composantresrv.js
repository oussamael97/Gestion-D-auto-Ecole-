import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import swal from 'sweetalert';
import axios from 'axios';

export default function Resv({ index, Enregistre, nom, prenom, telephone, moniteur, setMoniteurChoisie, seances }) {
    const [open, setOpen] = useState(false);
    const [seancesReservees, setSeancesReservees] = useState(0);
    
   
    // Fonction pour vérifier si la réservation est autorisée en fonction du nombre de séances réservées
    const isReservationAllowed = () => {
        return seancesReservees < 3;
    };

    const openPopup = () => {
        // Vérifier si la réservation est autorisée avant d'ouvrir la popup
        if (isReservationAllowed()) {
            setOpen(true);
        } else {
            swal({
                title: "Alert",
                text: "Il y a déjà 3 séances réservées pour cet horaire",
                icon: "error",
                button: "OK"
            });
        }
    };

    const closePopup = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Compter le nombre de séances réservées pour cet index
        const reservedSessions = seances.filter(seance => seance.index === index && ['en_cours', 'confirmer', 'effectuer'].includes(seance.etat_de_seances)).length;
        setSeancesReservees(reservedSessions);
    }, [seances, index]);

   

    return (
        <div style={{ textAlign: 'center' }}>
            <p>Membres: {seancesReservees}/3</p>
            <Button onClick={openPopup} color="primary" variant="contained">Réserver</Button>
            <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
                <DialogTitle>
                    Remplissez vos informations
                    <IconButton onClick={closePopup} style={{ float: 'right' }}>
                        <CloseIcon color="primary" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} margin={2}>
                        <TextField  value={nom} inputProps={{readOnly:true}}  variant="outlined" label="Nom" />
                        <TextField value={prenom} inputProps={{readOnly:true}}   variant="outlined" label="Prénom" />
                        <TextField value={telephone} inputProps={{readOnly:true}}   variant="outlined" label="Téléphone" />
                        <label>Choisissez votre moniteur :</label>
                        <select className="form-select" onChange={(e) => setMoniteurChoisie(e.target.value)} aria-label="Choisissez votre moniteur">
                            {moniteur.map((m, i) => (
                                <option key={i} value={m.nom}>{m.nom}</option>
                            ))}
                        </select>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => Enregistre(index)} color="success" variant="contained">Enregistrer</Button>
                    <Button onClick={closePopup} color="error" variant="contained">Fermer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
