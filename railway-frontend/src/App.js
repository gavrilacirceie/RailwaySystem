import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrenList from './components/TrenList';
// import RutaList from './components/Ruta/RutaList';
// import StatieList from './components/Statie/StatieList';
import BiletList from './components/BiletList';
// import Incasari from './components/Bilet/Incasari';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/trenuri">Trenuri</Link> |
                {/*<Link to="/rute">Rute</Link> |*/}
                {/*<Link to="/statii">Stații</Link> |*/}
                <Link to="/bilete">Bilete</Link> |
                {/*<Link to="/incasari">Încasări</Link>*/}
            </nav>
            <Routes>
                <Route path="/trenuri" element={<TrenList />} />
                {/*<Route path="/rute" element={<RutaList />} />*/}
                {/*<Route path="/statii" element={<StatieList />} />*/}
                <Route path="/bilete" element={<BiletList />} />
                {/*<Route path="/incasari" element={<Incasari />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
