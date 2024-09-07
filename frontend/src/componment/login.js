import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from './navbar';

export default function Login() {
  const [nom, setNom] = useState('');
  const [motdepaasse, setMotdepasse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nom: nom,
      motdepaasse: motdepaasse,
    };

    axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/login', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_role', res.data.role);
          localStorage.setItem('auth_prenom', res.data.prenom);
          localStorage.setItem('auth_telephone', res.data.telephone);

          swal({
            title: 'Succès',
            text: 'Connexion avec Succès',
            icon: 'success',
            button: 'OK',
          }).then(() => {
            switch (res.data.role) {
              case 'admin':
                navigate('/AccueilAdmin');
                break;
              case 'client':
                navigate('/AccueilClient');
                break;
              case 'moniteur':
                navigate('/AccueilMoniteur');
                break;
              default:
                break;
            }
          });
        } else if (res.data.status === 401) {
          swal({
            title: 'Erreur',
            text: 'Nom d\'utilisateur ou mot de passe invalide',
            icon: 'error',
            button: 'OK',
          });
        } else {
          console.log('Erreur inattendue:', res.data);
        }
      }).catch((error) => {
        console.error('Erreur Axios:', error);
      });
    });
  };

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <Navbar />
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center fw-bold">
                        <p>S'il vous plaît connectez-vous</p>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input className="form-control" id="inputnom" type="text" placeholder="Nom" onChange={(e) => setNom(e.target.value)} />
                          <label htmlFor="inputnom" className="text-gray-400 font-semibold block px-2">Nom</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input className="form-control" id="inputPassword" type="password" placeholder="password" onChange={(e) => setMotdepasse(e.target.value)} />
                          <label htmlFor="inputPassword" className="text-gray-400 font-semibold block">Password</label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Login</button>
                          <br />
                          <a className="text-muted" href="#!">Forgot password?</a>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger">
                            <Link className="text-decoration-none text-reset" to="/sign">Create new</Link>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2 bg-light">
                    <img src="./image/loginimg.png" className="img-fluid" alt="" />
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    </div>
                  </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</div>
        
    )
}
