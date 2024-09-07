import { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function ListUtilisateur(){
    const [utilisateur, setUtilisateur] = useState([]);
    const fetchUtilisateurData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/utilisateurs');
            const data = await response.json();
            setUtilisateur(data.utilisateur);
        } catch (error) {
            console.error('Error fetching utilisateur data:', error);
        }
    };

    useEffect(() => {
        fetchUtilisateurData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/utilisateurs/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error deleting utilisateur');
            }
            // Remove the deleted user from the state
            setUtilisateur(prevUtilisateurs => prevUtilisateurs.filter(u => u.id !== id));

            swal({
                title: "Succès",
                text: "Utilisateur supprimé avec succès",
                icon: "success",
                button: "OK"
            });

        } catch (error) {
            console.error('Error deleting utilisateur:', error);
            swal({
                title: "Erreur",
                text: "Une erreur est survenue lors de la suppression de l'utilisateur",
                icon: "error",
                button: "OK"
            });
        }
    };

    return(
        <>
            <NavbarAdmin/>
            <div className="container">
                <h1 className="text-left">Liste D'utilisateur</h1>
                <div className="d-flex justify-content-start m-2">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 m-2" type="button">
                        <Link to="/UtilisateurAdd" className="text-light text-decoration-none">Ajouter Utilisateur</Link>  
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Telephone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateur.map((u) => (
                            <tr key={u.id}>
                                <td>{u.nom}</td>
                                <td>{u.prenom}</td>
                                <td>{u.telephone}</td>
                                <td>{u.role}</td>
                                <td>
                                    <button className="btn btn-secondary btn-block fa-lg gradient-custom-2 m-2" type="button">
                                        <Link to={`/UtilisateurUpdate/${u.id}`} className="text-light text-decoration-none">Modifier</Link>  
                                    </button>
                                    <button className="btn btn-danger btn-block fa-lg gradient-custom-2 m-2" type="button"
                                        onClick={() => handleDelete(u.id)} 
                                    >
                                        Supprimer
                                    </button>
                                    <button className="btn btn-info btn-block fa-lg gradient-custom-2 m-2" type="button">
                                        <Link to={`/UtilisateurDetail/${u.id}`} className="text-light text-decoration-none">Détails</Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
