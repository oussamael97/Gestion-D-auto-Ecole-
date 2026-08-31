import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavbarAdmin from "./NavbarAdmin";
import '../../css/servicecss.css';

export default function ServicesAdmin() {
    const [services, setServices] = useState([]);
    const skipServiceId = 1; // Replace with the ID of the service you want to skip

    const fetchServicesData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/services');
            const data = await response.json();
            setServices(data.services); // Ensure services is an array
        } catch (error) {
            console.error('Error fetching services data:', error);
        }
    };

    useEffect(() => {
        fetchServicesData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/services/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error deleting service');
            }
            setServices(prevServices => prevServices.filter(service => service.id !== id));
            console.log('Service deleted');
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    // Filter out the service you want to skip
    const filteredServices = services.filter(service => service.id !== skipServiceId);

    return (
        <>
            <NavbarAdmin />
            <div className="container mb-3">
                <h1>Vos Services</h1>
                <Link to="/addService" className="btn btn-primary mb-3">Ajouter un Service</Link>
                <div className="container card-groupS">
                    {filteredServices.map((s) => (
                        <div key={s.id} className="card service-cardS">
                            <img src={`http://127.0.0.1:8000/storage/${s.image}`} className="card-img-top service-imgS" alt={s.Nom} />
                            <div className="card-bodyS">
                                <h5 className="card-titleS">{s.Nom}</h5>
                                <p className="card-textS">{s.Description}</p>
                                <div className="button-group">
                                    <button className="btn btn-secondary btn-sm m-1">
                                        <Link className="text-decoration-none text-lightS" to={`/updateService/${s.id}`}>Modifier</Link>
                                    </button>
                                    <button className="btn btn-danger btn-sm m-1" onClick={() => handleDelete(s.id)}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
