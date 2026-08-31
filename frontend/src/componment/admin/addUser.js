import { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import swal from "sweetalert";

export default function AddUser() {
    const [utilisateur, setUtilisateur] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        role: '',
        motdepaasse: ''
    });

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
            const response = await fetch('http://127.0.0.1:8000/api/utilisateurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });
            if (!response.ok) {
                throw new Error('Error adding utilisateur');
            }
            // Clear the form fields after successful submission
            setUtilisateur({
                nom: '',
                prenom: '',
                telephone: '',
                role: '',
                motdepaasse: ''
            });
            swal({
                title: "Succès",
                text: "Utilisateur ajouté avec succès",
                icon: "success",
                button: "OK"
            }).then(()=>{
                window.location.href="/ListUtilisateur"
            });
        } catch (error) {
            console.error('Error adding utilisateur:', error);
            swal({
                title: "Erreur",
                text: "Une erreur est survenue lors de l'ajout de l'utilisateur",
                icon: "error",
                button: "OK"
            });
        }
    };

    return (
        <>
            <NavbarAdmin />
            <h1>Ajouter un Utilisateur</h1>
            <form className="container" onSubmit={handleSubmit}>
                <div className="  mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nom" name="nom" value={utilisateur.nom} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" value={utilisateur.prenom} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="telephone" className="form-label">Téléphone</label>
                    <input type="text" className="form-control" id="telephone" name="telephone" value={utilisateur.telephone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rôle</label>
                    <select className="form-select" id="role" name="role" value={utilisateur.role} onChange={handleChange}>
                        <option value="">Sélectionner un rôle</option>
                        <option value="admin">Admin</option>
                        <option value="client">Client</option>
                        <option value="moniteur">Moniteur</option>
                    </select>
                 </div>   
                <div className="mb-3">
                    <label htmlFor="mot_de_passe" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="mot_de_passe" name="motdepaasse" value={utilisateur.mot_de_passe} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter Utilisateur</button>
            </form>
        </>
    );
}
