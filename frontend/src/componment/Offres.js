import Footer from "./footer";
import Navbar from "./navbar";

export default function Offres () {

return (<>
<Navbar/>
    <section className="container bg-light ">
        
    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" >
        <h1 className="text-dark font-weight-bold mt-3 display-3" >Offre de  formations</h1>
    </div>
    <div className="row g-4 justify-content-center">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div className="text-center p-4 pt-0">
                    <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4 rounded">2000 DH</div>
                    <h5 className="mb-3">Automatic Car Lessons</h5>
                    <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                        <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                    </ol>
                </div>
                <div className="position-relative mt-auto">
                    <img className="img-fluid" src="../image/service1.jpg" alt=""></img>
                    <div className="courses-overlay text-center">
                        <a className="btn btn-primary m-1" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>  
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div className="text-center p-4 pt-0">
                    <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4 rounded">2200 DH</div>
                    <h5 className="mb-3">Highway Driving Lesson</h5>
                    <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                        <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                    </ol>
                </div>
                <div className="position-relative mt-auto">
                <img className="img-fluid" src="../image/service3.jpg" alt=""></img>
                <div className="courses-overlay text-center">
                        <a className="btn btn-primary m-1" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div className="text-center p-4 pt-0">
                    <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4 rounded">2400 DH</div>
                    <h5 className="mb-3">International Driving</h5>
                    <p>Tempor erat elitr rebum at clita dolor diam ipsum sit diam amet diam et eos</p>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item small"><i className="fa fa-signal text-primary me-2"></i>Beginner</li>
                        <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Week</li>
                    </ol>
                </div>
                <div className="position-relative mt-auto">
                <img className="img-fluid" src="../image/service2.jpg" alt=""></img>
                <div className="courses-overlay text-center">
                        <a className="btn btn-primary m-1" href="">Read More</a>
                    </div>
                </div>
            </div>
        </div>
            
            
                
        </div>
        </section></>

)

}