import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import swal from 'sweetalert';

export default function AddService() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Nom: '',
        Description: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('Nom', formData.Nom);
        data.append('Description', formData.Description);
        data.append('image', formData.image);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/services', {
                method: 'POST',
                body: data
            });
            if (!response.ok) {
                throw new Error('Error adding service');
            }
            swal({
                title: "Succès",
                text: "Service a été ajouté avec succès",
                icon: "success",
                button: "OK"
            }).then(() => {
                navigate('/servicesA');
            });
        } catch (error) {
            console.error('Error adding service:', error);
            swal({
                title: "Erreur",
                text: "Service n'a pas été ajouté",
                icon: "error",
                button: "OK"
            });
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className='container'>
                
            
            <h1>Ajouter un Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        name="Nom"
                        value={formData.Nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
            </form>
            </div>
        </>
    );
}
