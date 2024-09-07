import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Footer from './componment/footer';
import PageDaccueil from './componment/Accueil/pageDaccueil';
import Login from './componment/login';
import Sign from './componment/sign';
import AccueilAdmin from './componment/admin/accueiladmin';
import AccueilClient from './componment/client/AccueilClient';
import AccueilMoniteur from './componment/moniteur/AccueilMoniteur';
import ListReservation from './componment/moniteur/ListResrvation';
import ListUtilisateur from './componment/admin/ListUtilisateur';
import Offres from './componment/Offres';
import CalendrierM from './componment/moniteur/CalendrieM';
import CalendrierClient from './componment/client/calendrierClient';
import ServicesClient from './componment/client/ServiceClient';
import AboutusClient from './componment/client/AboutusClient';
import ServicesAdmin from './componment/admin/servicesAdmin';
import UtilisateurUpdate from './componment/admin/UtilisateurUpdate';
import AddUser from './componment/admin/addUser';
import UpdateServices from './componment/admin/modifierService';
import AddService from './componment/admin/addService';
import DetailUtilisateur from './componment/admin/detailsUser';
import About from './componment/About';
import PrivateRoute from './componment/PrivateRoute';  // Importez le composant PrivateRoute

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageDaccueil />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Sign' element={<Sign />} />
          <Route path='/About' element={<About />} />
          <Route path='/Services' element={<Offres />} />
          
          <Route path='/AccueilAdmin' element={<PrivateRoute role="admin"><AccueilAdmin /></PrivateRoute>} />
          <Route path='/ListUtilisateur' element={<PrivateRoute role="admin"><ListUtilisateur /></PrivateRoute>} />
          <Route path='/ServicesA' element={<PrivateRoute role="admin"><ServicesAdmin /></PrivateRoute>} />
          <Route path='/AddService' element={<PrivateRoute role="admin"><AddService /></PrivateRoute>} />
          <Route path='/updateService/:id' element={<PrivateRoute role="admin"><UpdateServices  /></PrivateRoute>} />
          <Route path='/UtilisateurAdd' element={<PrivateRoute role="admin"><AddUser /></PrivateRoute>} />
          <Route path='/UtilisateurUpdate/:id' element={<PrivateRoute role="admin"><UtilisateurUpdate /></PrivateRoute>} />
          <Route path='/UtilisateurDetail/:id' element={<PrivateRoute role="admin"><DetailUtilisateur /></PrivateRoute>} />

          <Route path='/AccueilClient' element={<PrivateRoute role="client"><AccueilClient /></PrivateRoute>} />
          <Route path='/CalendrierClient' element={<PrivateRoute role="client"><CalendrierClient /></PrivateRoute>} />
          <Route path='/ServicesClient' element={<PrivateRoute role="client"><ServicesClient /></PrivateRoute>} />
          <Route path='/AboutClient' element={<PrivateRoute role="client"><AboutusClient /></PrivateRoute>} />

          <Route path='/AccueilMoniteur' element={<PrivateRoute role="moniteur"><AccueilMoniteur /></PrivateRoute>} />
          <Route path='/CalendrierMoniteur' element={<PrivateRoute role="moniteur"><CalendrierM /></PrivateRoute>} />
          <Route path='/ListReservation' element={<PrivateRoute role="moniteur"><ListReservation /></PrivateRoute>} />
          <Route path='/ListReservation/:indexT' element={<PrivateRoute role="moniteur"><ListReservation /></PrivateRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
