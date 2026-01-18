import React, { useState, useEffect } from 'react';
import api from '../api/api';

function TrenForm({ fetchTrenuri }) {
    const [nume, setNume] = useState('');
    const [oraPlecare, setOraPlecare] = useState('');
    const [oraSosire, setOraSosire] = useState('');
    const [categorieTrenId, setCategorieTrenId] = useState('');
    const [rutaId, setRutaId] = useState('');
    const [rute, setRute] = useState([]);
    const [categorii, setCategorii] = useState([]);
    const [dataPlecare, setDataPlecare] = useState('');
    const [dataSosire, setDataSosire] = useState('');

    useEffect(() => {
        api.get('/rute')
            .then(res => setRute(res.data))
            .catch(err => console.error('Error fetching routes:', err));

        // Fetch categories (you need to create this endpoint)
        api.get('/categorii-tren')
            .then(res => {
                console.log('Categories data:', res.data); // Check for duplicates here
                setCategorii(res.data);
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/trenuri', {
            nume,
            dataPlecare,
            dataSosire,
            oraPlecare,
            oraSosire,
            categorieTren: { id: parseInt(categorieTrenId) },
            ruta: { id: parseInt(rutaId) }
        })
            .then(() => {
                setNume('');
                setDataPlecare('');
                setOraPlecare('');
                setOraSosire('');
                setCategorieTrenId('');
                setRutaId('');
                fetchTrenuri();
            })
            .catch(err => console.error('Error creating train:', err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Adauga Tren</h3>
            <input
                placeholder="Nume Tren"
                value={nume}
                onChange={e => setNume(e.target.value)}
                required
            />
            <label>Data plecare:</label>
            <input
                type="date"
                placeholder="data plecare"
                value={dataPlecare}
                onChange={e => setDataPlecare(e.target.value)}
                required
            />
            <label>Data sosire:</label>
            <input
                type="date"
                value={dataSosire}
                onChange={e => setDataSosire(e.target.value)}
                required
            />
            <label>Ora Plecare:</label>
            <input
                type="time"
                value={oraPlecare}
                onChange={e => setOraPlecare(e.target.value)}
                required
            />
            <label>Ora sosire:</label>
            <input
                type="time"
                value={oraSosire}
                onChange={e => setOraSosire(e.target.value)}
                required
            />
            <label>Categorie Tren:</label>
            <select
                value={categorieTrenId}
                onChange={e => setCategorieTrenId(e.target.value)}
                required
            >
                <option value="">Selectează Categoria</option>
                {categorii.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nume}
                    </option>
                ))}
            </select>
            <label>Ruta:</label>
            <select
                value={rutaId}
                onChange={e => setRutaId(e.target.value)}
                required
            >
                <option value="">Selectează Ruta</option>
                {rute.map(r => (
                    <option key={r.id} value={r.id}>
                        {(r.statieStart && r.statieStart.nume) || 'N/A'} - {(r.statieEnd && r.statieEnd.nume) || 'N/A'}
                    </option>
                ))}
            </select>
            <button type="submit">Adaugă</button>
        </form>
    );
}

export default TrenForm;
