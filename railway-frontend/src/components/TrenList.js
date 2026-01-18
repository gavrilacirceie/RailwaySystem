// `railway-frontend/src/components/TrenList.js`

import React, { useState, useEffect } from 'react';
import api from '../api/api';
import TrenForm from './TrenForm';
import '../styles/lists.css';

function TrenList() {
    const [trenuri, setTrenuri] = useState([]);
    const [trenuriFiltrate, setTrenuriFiltrate] = useState([]);
    const [categorii, setCategorii] = useState([]);
    const [statii, setStatii] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [selectedTren, setSelectedTren] = useState('');
    const [selectedStatieStart, setSelectedStatieStart] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateSosire, setSelectedDateSosire] = useState('');

    const fetchTrenuri = () => {
        api.get('/trenuri')
            .then(res => {
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);

                const statiiMap = new Map();
                res.data.forEach(t => {
                    if (t.ruta?.statieStart) statiiMap.set(t.ruta.statieStart.id, t.ruta.statieStart);
                });
                setStatii(Array.from(statiiMap.values()));
            })
            .catch(err => console.error('Error fetching trains:', err));
    };

    const fetchTrenuriByDate = (date) => {
        api.get(`/trenuri/dataPlecare/${date}`)
            .then(res => {
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);
            })
            .catch(err => console.error('Error fetching trains by date:', err));
    };

    const fetchTrenuriByDateSosire = (date) => {
        api.get(`/trenuri/dataSosire/${date}`)
            .then(res => {
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);
            })
            .catch(err => console.error('Error fetching trains by date:', err));
    };

    const handleDateChangeSosire = (date) => {
        setSelectedDateSosire(date);
        if (date) fetchTrenuriByDateSosire(date);
        else fetchTrenuri();

        setSelectedCategorie('');
        setSelectedTren('');
        setSelectedStatieStart('');
        setSelectedDate('');
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) fetchTrenuriByDate(date);
        else fetchTrenuri();

        setSelectedCategorie('');
        setSelectedTren('');
        setSelectedStatieStart('');
    };

    const fetchCategorii = () => {
        api.get('/categorii-tren')
            .then(res => setCategorii(res.data))
            .catch(err => console.error('Error fetching categories:', err));
    };

    useEffect(() => {
        fetchTrenuri();
        fetchCategorii();
    }, []);

    const handleDelete = (id) => {
        api.delete(`/trenuri/${id}`)
            .then(() => fetchTrenuri())
            .catch(err => console.error('Error deleting train:', err));
    };

    const applyFilters = (categorieId, trenId, statieStartId) => {
        let filtered = trenuri;

        if (categorieId !== '') filtered = filtered.filter(tren => tren.categorieTren?.id === parseInt(categorieId));
        if (trenId !== '') filtered = filtered.filter(tren => tren.id === parseInt(trenId));
        if (statieStartId !== '') filtered = filtered.filter(tren => tren.ruta?.statieStart?.id === parseInt(statieStartId));

        setTrenuriFiltrate(filtered);
    };

    const handleFilterByCategorie = (categorieId) => {
        setSelectedCategorie(categorieId);
        applyFilters(categorieId, selectedTren, selectedStatieStart);
    };

    const handleFilterByTren = (trenId) => {
        setSelectedTren(trenId);
        applyFilters(selectedCategorie, trenId, selectedStatieStart);
    };

    const handleFilterByRutaPlecare = (statieStartId) => {
        setSelectedStatieStart(statieStartId);
        applyFilters(selectedCategorie, selectedTren, statieStartId);
    };

    return (
        <div className="page">
            <h2 className="page__title">Lista Trenuri</h2>

            <div className="card">
                <TrenForm fetchTrenuri={fetchTrenuri} />
            </div>

            <div className="card">
                <div className="filters">
                    <div className="field">
                        <label>Filtreaza dupa data plecarii</label>
                        <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                        {selectedDate && (
                            <div className="actions" style={{ marginTop: 8 }}>
                                <button className="btn" onClick={() => handleDateChange('')}>Resetează data</button>
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <label>Filtreaza dupa data sosirii</label>
                        <input type="date" value={selectedDateSosire} onChange={(e) => handleDateChangeSosire(e.target.value)} />
                        {selectedDateSosire && (
                            <div className="actions" style={{ marginTop: 8 }}>
                                <button className="btn" onClick={() => handleDateChangeSosire('')}>Resetează data</button>
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <label>Filtreaza după categorie</label>
                        <select value={selectedCategorie} onChange={(e) => handleFilterByCategorie(e.target.value)}>
                            <option value="">Toate categoriile</option>
                            {categorii.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nume}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Filtreaza dupa tren</label>
                        <select value={selectedTren} onChange={(e) => handleFilterByTren(e.target.value)}>
                            <option value="">Toate trenurile</option>
                            {trenuri.map(tren => (
                                <option key={tren.id} value={tren.id}>{tren.nume}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Filtreaza dupa statie plecare</label>
                        <select value={selectedStatieStart} onChange={(e) => handleFilterByRutaPlecare(e.target.value)}>
                            <option value="">Toate statiile</option>
                            {statii.map(statie => (
                                <option key={statie.id} value={statie.id}>{statie.nume}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="tableWrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Data plecare</th>
                        <th>Data sosire</th>
                        <th>Ora Plecare</th>
                        <th>Ora Sosire</th>
                        <th>Categorie</th>
                        <th>Ruta</th>
                        <th>Pret bilet</th>
                        <th>Actiuni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trenuriFiltrate.map(tren => (
                        <tr key={tren.id}>
                            <td>{tren.id}</td>
                            <td>{tren.nume}</td>
                            <td>{tren.dataPlecare}</td>
                            <td>{tren.dataSosire}</td>
                            <td>{tren.oraPlecare}</td>
                            <td>{tren.oraSosire}</td>
                            <td>{tren.categorieTren?.nume || <span className="muted">N/A</span>}</td>
                            <td>
                                {tren.ruta?.statieStart?.nume || 'N/A'} - {tren.ruta?.statieEnd?.nume || 'N/A'}
                            </td>
                            <td>
                                {tren.ruta?.distantaKm && tren.ruta?.categorieTren?.tarifPerKm
                                    ? `${(tren.ruta.distantaKm * tren.ruta.categorieTren.tarifPerKm).toFixed(1)} RON`
                                    : 'N/A'}
                            </td>
                            <td>
                                <button className="btn btn--danger" onClick={() => handleDelete(tren.id)}>Șterge</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TrenList;
