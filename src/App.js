
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Footer from './layout/Footer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";

import Suppliers from './pages/Suppliers';
import AddSupplier from './suppliers/AddSupplier';
import EditSupplier from './suppliers/EditSupplier';

import Items from './pages/Items';
import AddItem from './items/AddItem';
import EditItem from './items/EditItem';

import Nomenclature from './pages/Nomenclature';
import AddNomenclature from './nomenclature/AddNomenclature';
import EditNomenclature from './nomenclature/EditNomenclature';

import PriceRequest from './pages/PriceRequest';
import AddPriceRequest from './prices/AddPriceRequest';
import OpenPriceRequest from './prices/OpenPriceRequest';
import EditPriceRequest from './prices/EditPriceRequest';

import Documents from './pages/Document';
import AddDocument from './documents/AddDocument';
import EditDocument from './documents/EditDocument';
import OpenDocument from './documents/OpenDocument';
import  SNomenclature from './pages/SNomenclature';

import  NeedAndHave from './pages/NeedAndHave';
import  AddNeed from './pages/AddNeed';

import  NeedDoc from './pages/NeedDoc';
import  OpenNeedDoc from './needDoc/OpenNeedDoc';

import Register from './pages/Register';
import MainMenu from "./menu/MainMenu";

import AddSNomenclature from './snomenclatures/AddSNomenclature';
import EditSNomenclature from './snomenclatures/EditSNomenclature';

function App() {
  return (
    <div className="App">
    
    <Router>

    <Navbar/>
    
    <Routes>
    <Route exact path="/" element= {<Login className="login-background"/>}/>
    <Route exact path="/main" element= {<Main/>}/>
    <Route exact path="/register" element= {<Register className="login-background"/>}/>

    <Route exact path="/documents" element= {<Documents/>}/>
    <Route exact path="/adddocument" element= {<AddDocument/>}/>
    <Route exact path="/editdocument/:id" element ={<EditDocument/>}/>
    <Route exact path="/opendocument/:id" element ={<OpenDocument/>}/>

    <Route exact path="/items" element= {<Items/>}/>
    <Route exact path="/additem" element= {<AddItem/>}/>
    <Route exact path="/edititem/:id" element ={<EditItem/>}/>

    <Route exact path="/suppliers" element= {<Suppliers/>}/>
    <Route exact path="/addsupplier" element= {<AddSupplier/>}/>
    <Route exact path="/editsupplier/:id" element ={<EditSupplier/>}/>

    <Route exact path="/suppliernomenclature" element= {<SNomenclature/>}/>
    <Route exact path="/addsuppliernomenclature" element= {<AddSNomenclature/>}/>
    <Route exact path="/editsuppliernomenclature/:id" element ={<EditSNomenclature/>}/>


    <Route exact path="/need/:id" element= {<NeedAndHave/>}/>
    <Route exact path="/addneed" element= {<AddNeed/>}/>

    <Route exact path="/needDoc" element= {<NeedDoc/>}/>
    <Route exact path="/openNeedDoc/:id" element= {<OpenNeedDoc/>}/>

    <Route exact path="/priceRequest" element= {<PriceRequest/>}/>
    <Route exact path="/addpricerequest" element= {<AddPriceRequest/>}/>
    <Route exact path="/editpricerequest/:id" element ={<EditPriceRequest/>}/>
    <Route exact path="/openpricerequest/:id" element ={<OpenPriceRequest/>}/>

    <Route exact path="/nomenclature" element= {<Nomenclature/>}/>
    <Route exact path="/addnomenclature" element= {<AddNomenclature/>}/>
    <Route exact path="/editnomenclature/:id" element ={<EditNomenclature/>}/>

    <Route exact path="/home" element= {<Home/>}/>
    
    <Route exact path="/adduser" element= {<AddUser/>}/>
    <Route exact path="/edituser/:id" element ={<EditUser/>}/>
    <Route exact path="/viewuser/:id" element={<ViewUser />} />

    </Routes>
  
    <Footer/>
    </Router>
      
    </div>
  );
}

export default App;
