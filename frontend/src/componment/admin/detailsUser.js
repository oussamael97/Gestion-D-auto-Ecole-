import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailUtilisateur() {
    const { id } = useParams();
    const [utilisateur, setUtilisateur] = useState(null);
    const [etatPayment, setEtatPayment] = useState("");
    const [newEtatPayment, setNewEtatPayment] = useState("");
    const [categorie, setCategorie] = useState("");
    const [montant, setMontant] = useState("");
    const [newMontant, setNewMontant] = useState("");

    const fetchUtilisateurDetails = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}`);
            const data = await response.json();

            setUtilisateur(data.utilisateur);

            if (data.utilisateur.role === 'client') {
                const responsePayment = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}/payment-status`);
                const paymentData = await responsePayment.json();

                setCategorie(paymentData.categorie);
                setEtatPayment(paymentData.etatPayment);
                setNewEtatPayment(paymentData.etatPayment); // Initialize newEtatPayment with fetched value

                const responseMontant = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}/montant-status`);
                const montantData = await responseMontant.json();

                setMontant(montantData.montant);
                setNewMontant(montantData.montant); // Initialize newMontant with fetched value
               /*  const candidat = await fetch(`http://127.0.0.1:8000/api/candidats`);
                const candidatData = await candidat.json();

                setCandidatHeure(montantData.montant);
                setNewMontant(montantData.montant); // Initialize newMontant with fetched value */
            }
        } catch (error) {
            console.error('Error fetching utilisateur details:', error);
        }
    };

    const handlePaymentStatusUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}/payment-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Etat_de_paiement: newEtatPayment }),
            });

            if (!response.ok) {
                throw new Error('Error updating payment status');
            }
            //3eeeql 3liha mzyan mini ykon 3endk 2 action f form we7da
            await ChangmentMontant();

            swal({
                title: "Succès",
                text: "État de paiement mis à jour avec succès",
                icon: "success",
                button: "OK"
            }).then(() => {
                window.location.href = "/ListUtilisateur"
            });
        } catch (error) {
            console.error('Error updating payment status:', error);
            swal({
                title: "Erreur",
                text: "Une erreur est survenue lors de la mise à jour de l'état de paiement",
                icon: "error",
                button: "OK"
            });
        }
    };

    const ChangmentMontant = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}/montant-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ montant: newMontant }),
            });

            if (!response.ok) throw new Error('Error updating montant status');

        } catch (error) {
            console.error('Error updating montant status:', error);
            throw error; // Rethrow to handle in `handlePaymentStatusUpdate`.
        }
    }

    useEffect(() => {
        fetchUtilisateurDetails();
    }, [id]);

    if (!utilisateur) return <div className="container mt-5">Loading...</div>;

    return (
        <>
            <NavbarAdmin />
            <div className="container my-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Détails de l'utilisateur</h1>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Nom:</strong></label>
                            <div className="col-sm-10">
                                <p className="form-control-plaintext">{utilisateur.nom}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Prénom:</strong></label>
                            <div className="col-sm-10">
                                <p className="form-control-plaintext">{utilisateur.prenom}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Téléphone:</strong></label>
                            <div className="col-sm-10">
                                <p className="form-control-plaintext">{utilisateur.telephone}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><strong>Rôle:</strong></label>
                            <div className="col-sm-10">
                                <p className="form-control-plaintext">{utilisateur.role}</p>
                            </div>
                        </div>

                        {utilisateur.role === 'client' && (
                            <>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label"><strong>Catégorie:</strong></label>
                                    <div className="col-sm-10">
                                        <p className="form-control-plaintext">{categorie}</p>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label"><strong>Montant Payer:</strong></label>
                                    <div className="col-sm-10">
                                         <input
                                            type="text"
                                            name="montant"
                                            value={newMontant}
                                            onChange={(e) => setNewMontant(e.target.value)}
                                        /> 
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="etatPaymentSelect" className="col-sm-2 col-form-label"><strong>État de paiement:</strong></label>
                                    <div className="col-sm-10">
                                        <select
                                            id="etatPaymentSelect"
                                            className="form-select"
                                            value={newEtatPayment}
                                            onChange={(e) => setNewEtatPayment(e.target.value)}
                                        >
                                            <option value="paye">Payé</option>
                                            <option value="en cours">En cours</option>
                                            <option value="non paye">Non payé</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePaymentStatusUpdate}
                                        >
                                            Mettre à jour
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
