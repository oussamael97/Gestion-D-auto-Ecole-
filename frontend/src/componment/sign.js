import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import Navbar from "./navbar";


export default function Sign(){
    const [nom,setNom]=useState();
    const [prenom,setPrenom]=useState();
    const [motdepaasse,setMotdepaasse]=useState();
    const [telephone,setTelephone]=useState();
    const [role,setRole]=useState();
    const [error_list,setError_list]=useState([]);
 
    const HandelRegister=(e)=>{
      
        e.preventDefault();
        const data = {
            nom: nom,
            prenom:prenom,
            telephone:telephone,
            motdepaasse: motdepaasse,
            role:role,
            error_list:[]
          };
          axios.get('/sanctum/csrf-cookie').then(response=>{
            axios.post('/api/signup',data).then(res=>{
              if(res.data.status === 200 ){
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_token',res.data.username);
                swal('success',res.data.message,'success');
                if(role==="client"){
                  swal({
                    title: "Succès",
                    text: "Connexion avec Succès",
                    icon: "success",
                    button: "OK"
                }).then(()=>{
                    window.location.href = "/AccueilClient";  
      
                }) 
                }else if(role==="moniteur"){
                  swal({
                    title: "Succès",
                    text: "Connexion avec Succès",
                    icon: "success",
                    button: "OK"
                }).then(()=>{
                    window.location.href = "/AccueilMoniteur";  
      
                })  
                }else if(role==="admin"){
                  swal({
                    title: "Succès",
                    text: "Connexion avec Succès",
                    icon: "success",
                    button: "OK"
                }).then(()=>{
                    window.location.href = "/AccueilAdmin"; 
      
                })  
                }
                            
              }else{
                setError_list(res.data.validation_errors)
              }
            });
          });
         
    }
    return(
        <div style={{backgroundColor:" #eee"}}>
        <Navbar/>
         <section className="h-100 gradient-form" >
    <div className="container py-3 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
  
                  <div className="text-center fw-bold">
                  
                    <p>L'inscription</p>

                  </div>
  
                  <form onSubmit={HandelRegister} >
                  <div className="form-floating mb-4">
                      <input className="form-control " id="inputnom" type="text" placeholder="Nom" onChange={(e)=>setNom(e.target.value)}/>
                      <label htmlFor="inputnom" className="text-gray-400 font-semibold block">Nom</label>
                  </div>
                    <div className="form-floating mb-4">
                      <input className="form-control " id="inputprenom" type="text" placeholder="Prenom" onChange={(e)=>setPrenom(e.target.value)}/>
                      <label htmlFor="inputprenom" className="text-gray-400 font-semibold block">Prenom</label>
                  </div>
                    <div className="form-floating mb-4">
                      <input className="form-control " id="inputtelephone" type="text" placeholder="Telephone" onChange={(e)=>setTelephone(e.target.value)}/>
                      <label htmlFor="inputtelephone" className="text-gray-400 font-semibold block">Telephone</label>
                  </div>

  
                  <div className="form-floating mb-4">
                    <input className="form-control " id="inputPassword" type="password" placeholder="password" onChange={(e)=>setMotdepaasse(e.target.value)}/>
                    <label htmlFor="inputPassword" className="text-gray-400 font-semibold block">Password</label>
                </div>
                <select class="form-select form-floating mb-4" onChange={(e)=>setRole(e.target.value)} aria-label="Selectionne votre Role">
                <option>Selectionne Votre Role</option>
                  <option value="client">Client</option>
                  <option value="moniteur">Moniteur</option>
                  <option value="admin">Admin</option>
                </select>
                      <span>{error_list}</span>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                        Enregistre</button>
                        <br/>
                    </div>  
                  </form>
  
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center gradient-custom-2 bg-light">
                   <img src="./image/Signup.png" className="img-fluid" alt=""/>
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