import axios from "axios";
import { Link } from "react-router-dom";

export default function NavbarAdmin(){
  const HandleLogout= ()=>{
    axios.post("/api/logout").then(
      response=>{
        console.log("logout successfully :",response.data);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        localStorage.removeItem("auth_role");
        localStorage.removeItem("auth_prenom");
        localStorage.removeItem("auth_telephone");
        window.location.href="/";
      }
    ).catch(error=>{
      console.log("logout error :",error);

    })
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="container">
           <img src="/image/logo.png" alt="no" width="5%"/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/AccueilAdmin"> Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/servicesA"> Mes Service </Link>
              </li>
          
              <li className="nav-item">
                <Link className="nav-link" to="/ListUtilisateur"> List de Utilisateur</Link>
              </li>
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" type="button" onClick={HandleLogout}>Deconnecter</button></li>
              
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    )
}