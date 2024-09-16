import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import swal from 'sweetalert';

export default function UpdateServices() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({
        Nom: '',
        Description: '',
        image: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`);
            if (!response.ok) {
                throw new Error('Service not found');
            }
            const data = await response.json();
            if (data && data.service) {
                setService({
                    Nom: data.service.Nom,
                    Description: data.service.Description,
                    image: data.service.image
                });
            } else {
                throw new Error('Invalid service data');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching service data:', error);
            setError('Error fetching service data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServiceData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(service)
            });
            if (!response.ok) {
                throw new Error('Error updating service');
            }
            swal({
                title: "Succès",
                text: "Service mis à jour avec succès",
                icon: "success",
                button: "OK"
            }).then(() => {
                window.location.href = "/servicesA";
            });
        } catch (error) {
            console.error('Error updating service:', error);
            swal({
                title: "Erreur",
                text: "Une erreur est survenue lors de la mise à jour d'un Service",
                icon: "error",
                button: "OK"
            })
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <NavbarAdmin />
            <div className='container'>
                
            
            <h1>Modifier le Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        name="Nom"
                        value={service.Nom}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="Description"
                        value={service.Description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"

                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
            </div>
        </>
    );
}
