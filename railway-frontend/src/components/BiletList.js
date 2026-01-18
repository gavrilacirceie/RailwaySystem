import React, { useState, useEffect } from 'react';
import api from '../api/api';

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
        api.get('/bilete')
            .then(res => {
                console.log('Tickets data:', res.data);
                setBilete(res.data);
            })
            .catch(err => console.error('Error fetching tickets:', err));
    };

    const fetchCategorii = () => {
        api.get('/categorii-tren')
            .then(res => setCategorii(res.data))
            .catch(err => console.error('Error fetching categories:', err));
    };

    const handleIncasariZi = () => {
        if (!dataZi || !selectedCategorie) {
            alert('Selectează data și categoria');
            return;
        }
        api.get('/bilete/incasari/zi', {
            params: { data: dataZi, categorieId: selectedCategorie }
        })
            .then(res => setIncasariZi(res.data))
            .catch(err => console.error('Error fetching daily revenue:', err));
    };

    const handleIncasariLuna = () => {
        if (!luna || !an || !selectedCategorie) {
            alert('Completează luna, anul și categoria');
            return;
        }
        api.get('/bilete/incasari/luna', {
            params: { luna: parseInt(luna), an: parseInt(an), categorieId: selectedCategorie }
        })
            .then(res => setIncasariLuna(res.data))
            .catch(err => console.error('Error fetching monthly revenue:', err));
    };

    const handleDelete = (id) => {
        api.delete(`/bilete/${id}`)
            .then(() => fetchBilete())
            .catch(err => console.error('Error deleting ticket:', err));
    };

    return (
        <div>
            <h2>Lista Bilete</h2>

            <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
                <h3>Evidență Încasări</h3>

                <div style={{ marginBottom: '15px' }}>
                    <label>Categorie Tren: </label>
                    <select value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                        <option value="">Selectează categoria</option>
                        {categorii.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nume}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <h4>Încasări pe zi</h4>
                    <input
                        type="date"
                        value={dataZi}
                        onChange={(e) => setDataZi(e.target.value)}
                    />
                    <button onClick={handleIncasariZi}>Calculează încasări zi</button>
                    {incasariZi !== null && (
                        <p><strong>Încasări: {incasariZi} RON</strong></p>
                    )}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <h4>Încasări pe lună</h4>
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
                    <button onClick={handleIncasariLuna}>Calculează încasări lună</button>
                    {incasariLuna !== null && (
                        <p><strong>Încasări: {incasariLuna} RON</strong></p>
                    )}
                </div>
            </div>

            <table>
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
                {bilete.map(bilet => (
                    <tr key={bilet.id}>
                        <td>{bilet.id}</td>
                        <td>{bilet.tren?.nume || 'N/A'}</td>
                        <td>{bilet.date}</td>
                        <td>{bilet.pretTotal}</td>
                        <td>
                            <button onClick={() => handleDelete(bilet.id)}>Șterge</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BiletList;
