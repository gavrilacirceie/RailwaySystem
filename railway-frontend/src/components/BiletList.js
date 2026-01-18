// `railway-frontend/src/components/BiletList.js`
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/lists.css';

function BiletList() {
    const [bilete, setBilete] = useState([]);
    const [categorii, setCategorii] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [dataZi, setDataZi] = useState('');
    const [luna, setLuna] = useState('');
    const [an, setAn] = useState('');
    const [incasariZi, setIncasariZi] = useState(null);
    const [incasariLuna, setIncasariLuna] = useState(null);

    useEffect(() => {
        fetchBilete();
        fetchCategorii();
    }, []);

    const fetchBilete = () => {
        api
            .get('/bilete')
            .then((res) => setBilete(res.data))
            .catch((err) => console.error('Error fetching tickets:', err));
    };

    const fetchCategorii = () => {
        api
            .get('/categorii-tren')
            .then((res) => setCategorii(res.data))
            .catch((err) => console.error('Error fetching categories:', err));
    };

    const handleIncasariZi = () => {
        if (!dataZi || !selectedCategorie) {
            alert('Selectează data și categoria');
            return;
        }
        api
            .get('/bilete/incasari/zi', {
                params: { data: dataZi, categorieId: selectedCategorie },
            })
            .then((res) => setIncasariZi(res.data))
            .catch((err) => console.error('Error fetching daily revenue:', err));
    };

    const handleIncasariLuna = () => {
        if (!luna || !an || !selectedCategorie) {
            alert('Completează luna, anul și categoria');
            return;
        }
        api
            .get('/bilete/incasari/luna', {
                params: { luna: parseInt(luna), an: parseInt(an), categorieId: selectedCategorie },
            })
            .then((res) => setIncasariLuna(res.data))
            .catch((err) => console.error('Error fetching monthly revenue:', err));
    };

    const handleDelete = (id) => {
        api
            .delete(`/bilete/${id}`)
            .then(() => fetchBilete())
            .catch((err) => console.error('Error deleting ticket:', err));
    };

    return (
        <div className="page">
            <h2 className="page__title">Lista Bilete</h2>

            <div className="card">
                <h3 style={{ marginTop: 0 }}>Evidență Încasări</h3>

                <div className="filters">
                    <div className="field">
                        <label>Categorie Tren</label>
                        <select value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                            <option value="">Selectează categoria</option>
                            {categorii.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nume}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Încasări pe zi</label>
                        <input type="date" value={dataZi} onChange={(e) => setDataZi(e.target.value)} />
                        <div className="actions" style={{ marginTop: 8 }}>
                            <button className="btn btn--primary" onClick={handleIncasariZi}>
                                Calculează încasări zi
                            </button>
                        </div>
                        {incasariZi !== null && (
                            <div style={{ marginTop: 8 }}>
                                <strong>Încasări: {incasariZi} RON</strong>
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <label>Încasări pe lună</label>
                        <div className="actions">
                            <input
                                type="number"
                                placeholder="Luna (1-12)"
                                value={luna}
                                onChange={(e) => setLuna(e.target.value)}
                                min="1"
                                max="12"
                            />
                            <input
                                type="number"
                                placeholder="An"
                                value={an}
                                onChange={(e) => setAn(e.target.value)}
                            />
                        </div>

                        <div className="actions" style={{ marginTop: 8 }}>
                            <button className="btn btn--primary" onClick={handleIncasariLuna}>
                                Calculează încasări lună
                            </button>
                        </div>

                        {incasariLuna !== null && (
                            <div style={{ marginTop: 8 }}>
                                <strong>Încasări: {incasariLuna} RON</strong>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="tableWrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tren</th>
                        <th>Data</th>
                        <th>Pret Total</th>
                        <th>Acțiuni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bilete.map((bilet) => (
                        <tr key={bilet.id}>
                            <td>{bilet.id}</td>
                            <td>{bilet.tren?.nume || <span className="muted">N/A</span>}</td>
                            <td>{bilet.date}</td>
                            <td>{bilet.pretTotal}</td>
                            <td>
                                <button className="btn btn--danger" onClick={() => handleDelete(bilet.id)}>
                                    Șterge
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BiletList;
