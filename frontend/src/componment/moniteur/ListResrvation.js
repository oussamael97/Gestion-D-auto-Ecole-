import { useEffect, useState } from "react";
import NavMoniteur from "./navMoniteur";
import { useParams } from "react-router-dom";

export default function ListReservation() {
    const [seances, setSeances] = useState([]);
    const [moniteurs, setMoniteurs] = useState([]);
    const [moniteurId, setMoniteurId] = useState(null);
    const { indexT } = useParams();
    const moniteurName = localStorage.getItem('auth_name'); // Récupère le nom du moniteur depuis le localStorage

    // Fonction pour récupérer les données des séances
    const fetchSeancesData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/seances");
            const data = await response.json();
            if (data && data.seances) {
                setSeances(data.seances);
            } else {
                console.error("Invalid seances data:", data);
            }
        } catch (error) {
            console.error("Error fetching seances data", error);
        }
    };

    // Fonction pour récupérer les données des moniteurs
    const fetchMoniteursData = async () => { 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/moniteurs');
            const data = await response.json();
            if (data && data.moniteur) {
                setMoniteurs(data.moniteur); // Set the moniteurs data
            } else {
                console.error("Invalid moniteurs data:", data);
            }
        } catch (error) {
            console.error('Error fetching moniteurs data:', error);
        }
    };

    // Trouver l'ID du moniteur par le nom
    const findMoniteurIdByName = (moniteurName) => {
        const moniteurInfo = moniteurs.find(moniteur => moniteur.nom === moniteurName);
        if (moniteurInfo) {
            setMoniteurId(moniteurInfo.id);
        }
    };

    // Mettre à jour le statut d'une séance
    const updateSeanceStatus = async (filteredIndex, newStatus) => {
        try {
            // Obtenir l'index de la séance dans le tableau complet à partir de l'index dans le tableau filtré
            const index = seances.findIndex(seance => seance.id === filteredSeances[filteredIndex].id);

            const response = await fetch(`http://127.0.0.1:8000/api/seances/${seances[index].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ etat_de_seances: newStatus }),
            });
            if (response.ok) {
                const updatedSeances = [...seances];
                updatedSeances[index].etat_de_seances = newStatus;
                setSeances(updatedSeances);
            } else {
                console.error("Failed to update seance status");
            }
        } catch (error) {
            console.error("Error updating seance status", error);
        }
    };

    // Charger les données initiales
    useEffect(() => {
        fetchSeancesData();
        fetchMoniteursData();
    }, []);

    // Trouver l'ID du moniteur après que les données des moniteurs soient chargées
    useEffect(() => {
        if (moniteurs.length > 0 && moniteurName) {
            findMoniteurIdByName(moniteurName);
        }
    }, [moniteurs, moniteurName]);

    // Filtrer les séances en fonction de l'index de l'élément de calendrier et de l'ID du moniteur
    const filteredSeances = seances.filter(seance => (!moniteurId || seance.moniteur_id === moniteurId) && (!indexT || seance.index === parseInt(indexT))
    );

    return (
        <>
            <NavMoniteur />
            <h1>Liste des Réservations</h1>
            <h2>Confirmation des Séances :</h2>
            <h3>Les membres</h3>
            <table className="table table-hover container m-5">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Téléphone</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>État</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSeances.map((s, i) => (
                        <tr key={i}>
                            <td>{s.Nom}</td>
                            <td>{s.prenom}</td>
                            <td>{s.telephone}</td>
                            <td>{s.date_de_seances}</td>
                            <td>{s.heure_de_seances}</td>
                            <td>{s.etat_de_seances}</td>
                            <td>
                                <button className="btn btn-primary m-1" onClick={() => updateSeanceStatus(i, 'confirmer')}>Confirmer</button>
                                <button className="btn btn-danger m-1" onClick={() => updateSeanceStatus(i, 'annuler')}>Annuler</button>
                                <button className="btn btn-success m-1" onClick={() => updateSeanceStatus(i, 'effectuer')}>Effectuer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
