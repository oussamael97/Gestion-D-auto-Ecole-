import { useParams } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function UtilisateurUpdate() {
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        role: ''
    });

    const { id } = useParams();

    const fetchUtilisateurData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/utilisateurs');
            const data = await response.json();
            const selectedUtilisateur = data.utilisateur.find((u) => u.id === parseInt(id));
            if (selectedUtilisateur) {
                setUtilisateur(selectedUtilisateur);
            }
        } catch (error) {
            console.error('Error fetching utilisateur data:', error);
        }
    };

    useEffect(() => {
        fetchUtilisateurData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({
            ...utilisateur,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/utilisateursUpdate/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });
            if (!response.ok) {
                throw new Error('Error updating utilisateur');
            }
            const updatedUtilisateur = await response.json();
            console.log('Utilisateur updated:', updatedUtilisateur);
            swal({
                title: "Succès",
                text: "Utilisateur mis à jour avec succès",
                icon: "success",
                button: "OK"
            }).then(() => {
                window.location.href = "/ListUtilisateur";
            });

        } catch (error) {
            console.error('Error updating utilisateur:', error);
            swal({
                title: "Erreur",
                text: "Une erreur est survenue lors de la mise à jour de l'utilisateur",
                icon: "error",
                button: "OK"
            });
        }
    };

    return (
        <>
            <NavbarAdmin />
            <h1>Modifier L'Utilisateur</h1>
            <section className="h-100 gradient-form">
                <div className="container py-3 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center fw-bold">
                                                <p>Modification</p>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-floating mb-4">
                                                    <input
                                                        className="form-control"
                                                        id="inputnom"
                                                        type="text"
                                                        name="nom"
                                                        placeholder="Nom"
                                                        value={utilisateur.nom}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="inputnom" className="text-gray-400 font-semibold block">Nom</label>
                                                </div>
                                                <div className="form-floating mb-4">
                                                    <input
                                                        className="form-control"
                                                        id="inputprenom"
                                                        type="text"
                                                        name="prenom"
                                                        placeholder="Prenom"
                                                        value={utilisateur.prenom}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="inputprenom" className="text-gray-400 font-semibold block">Prenom</label>
                                                </div>
                                                <div className="form-floating mb-4">
                                                    <input
                                                        className="form-control"
                                                        id="inputtelephone"
                                                        type="text"
                                                        name="telephone"
                                                        placeholder="Telephone"
                                                        value={utilisateur.telephone}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="inputtelephone" className="text-gray-400 font-semibold block">Telephone</label>
                                                </div>
                                                <div className="form-floating mb-4">
                                                    <select
                                                        className="form-select form-floating"
                                                        name="role"
                                                        value={utilisateur.role}
                                                        onChange={handleChange}
                                                        aria-label="Selectionne votre Role"
                                                    >
                                                        <option value="">Selectionne Votre Role</option>
                                                        <option value="client">Client</option>
                                                        <option value="moniteur">Moniteur</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button
                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                        type="submit"
                                                    >
                                                        Enregistre
                                                    </button>
                                                    <br />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2 bg-light">
                                        <img src="../image/Signup.png" className="img-fluid" alt="" />
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
