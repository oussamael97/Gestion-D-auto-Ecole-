import FirstAccueil from "../FirstAccueil";
import Navbar from "../navbar";

export default function PageDaccueil(){
    return(
        <>
        <Navbar/>
        <FirstAccueil/>
        <div className="container bg-light">  
                    <div className = "d-flex flex-row mt-3">
                    <div className="p-3">
                    <img  src="../image/about.jpg"></img>
                    </div>
                    <div className="p-3">
                    <h1 className="text-dark font-weight-bold display-3">A propos</h1>
                    <p className="">
                        Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
                    
                        <p className="">
                        Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>

                    </div>
                    </div>
                   
        </div>
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
        </section>
        </>
    )
}