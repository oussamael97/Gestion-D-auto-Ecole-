import About from "./About"
import FirstAccueil from "./FirstAccueil"
import Offres from "./Offres"
import Footer from "./footer"
import Navbar from "./navbar"
export default function Accueil(){
    return(
        <>
                <Navbar/>
                <FirstAccueil/>
                <About/>
                <Offres/>
        </>
    )
}