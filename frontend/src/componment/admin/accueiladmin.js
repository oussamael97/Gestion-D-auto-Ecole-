import React from 'react';
import Login from '../login';
import NavbarAdmin from './NavbarAdmin';
import FirstAccueil from '../FirstAccueil';

export default function AccueilAdmin() {
    return (
        <>
            <NavbarAdmin/>
            <div style={{backgroundImage: `url('./image/accueil.jpg')`, height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat",padding:'10vh'}} >
                <div className="container ">
                <h1 className="text-center text-white font-weight-bold mt-3 display-2" >Bienvenue à l'Auto Ecole</h1>
                    <div className=" mx-auto">
                        <div className="text-center">
                            <p className="text-white font-weight-bold display-6" style={{ padding: '20px', borderRadius: '10px'}}>
                                Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
                            
                        </div>  
                    </div>
                </div>    
            </div>
            
        </>  
    );
}
