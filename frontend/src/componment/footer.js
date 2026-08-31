export default function Footer(){
  return(
<footer className="container-fluid bg-dark text-light footer  pt-3">


<section >
  <div className="container text-center text-md-start">
    <div className="row">
      <div className="col-lg-3 col-md-6">
          
        <h6 className="text-uppercase fw-bold mb-4">
          <i className="fas fa-gem me-3"></i>Auto-Ecole
        </h6>
        <p>
          Lorem ipsum
          dolor sit amet, consectetur adipisicing elit.
          Lorem 
        </p>
      </div>
 
      <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
        <h6 className="text-uppercase fw-bold mb-2">
          Services
        </h6>
        <p>
          <a href="#!" className="text-reset">Permis B,C,D,E</a>
        </p>
        <p>
          <a href="#!" className="text-reset">heure supplémentaire de conduire</a>
        </p>
        <p>
          <a href="#!" className="text-reset">heure supplémentaire de code </a>
        </p>
        
      </div>
      
      <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-2">
        <h6 className="text-uppercase fw-bold mb-2">
          Autre
        </h6>
        <p>
          <a href="#!" className="text-reset">Service</a>
        </p>
        <p>
          <a href="#!" className="text-reset">Login</a>
        </p>
        <p>
          <a href="#!" className="text-reset">Sign up</a>
        </p>
        <p>
          <a href="#!" className="text-reset">About us</a>
        </p>
      </div>
 
      <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
        <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
        <p><i className="fas fa-home me-3"></i> Rue8 Zitoune Meknes,Maroc</p>
        <p>
          <i className="fas fa-envelope me-3"></i>
          auto_ecole@example.com
        </p>
        <p><i className="fas fa-phone me-3"></i> +212 634 000000</p>
        <p><i className="fas fa-print me-3"></i> +212 634 000000</p>
      </div>
    </div>
  </div>
</section>

<div className="text-center p-1" style={{backgroundColor:" rgba(0, 0, 0, 0.05)"}}>
  © 2024 Copyright
</div>
</footer>
  )
}