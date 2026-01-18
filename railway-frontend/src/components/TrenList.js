import React, { useState, useEffect } from 'react';
import api from '../api/api';
import TrenForm from './TrenForm';

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
                console.log('Trains data:', res.data);
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);

                // Extract unique departure stations as objects
                const statiiMap = new Map();
                res.data.forEach(t => {
                    if (t.ruta?.statieStart) {
                        statiiMap.set(t.ruta.statieStart.id, t.ruta.statieStart);
                    }
                });
                const uniqueStatii = Array.from(statiiMap.values());
                setStatii(uniqueStatii);
            })
            .catch(err => console.error('Error fetching trains:', err));
    };

    const fetchTrenuriByDate = (date) => {
        api.get(`/trenuri/dataPlecare/${date}`)
            .then(res => {
                console.log('Trains by date:', res.data);
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);
            })
            .catch(err => console.error('Error fetching trains by date:', err));
    };
    const fetchTrenuriByDateSosire = (date) => {
        api.get(`/trenuri/dataSosire/${date}`)
            .then(res => {
                console.log('Trains by date:', res.data);
                setTrenuri(res.data);
                setTrenuriFiltrate(res.data);
            })
            .catch(err => console.error('Error fetching trains by date:', err));
    };
    const handleDateChangeSosire = (date) => {
        setSelectedDateSosire(date);
        if (date) {
            fetchTrenuriByDateSosire(date);
        } else {
            fetchTrenuri();
        }
        setSelectedCategorie('');
        setSelectedTren('');
        setSelectedStatieStart('');
        setSelectedDate(''); // Reset data plecare
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            fetchTrenuriByDate(date);
        } else {
            fetchTrenuri();
        }
        // Reset other filters
        setSelectedCategorie('');
        setSelectedTren('');
        setSelectedStatieStart('');
    };
    const fetchCategorii = () => {
        api.get('/categorii-tren')
            .then(res => {
                console.log('Categories data:', res.data);
                setCategorii(res.data);
            })
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

        if (categorieId !== '') {
            filtered = filtered.filter(tren =>
                tren.categorieTren?.id === parseInt(categorieId)
            );
        }

        if (trenId !== '') {
            filtered = filtered.filter(tren =>
                tren.id === parseInt(trenId)
            );
        }

        if (statieStartId !== '') {
            filtered = filtered.filter(tren =>
                tren.ruta?.statieStart?.id === parseInt(statieStartId)
            );
        }

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
        <div>
            <h2>Lista Trenuri</h2>
            <TrenForm fetchTrenuri={fetchTrenuri} />

            <div style={{ margin: '20px 0' }}>
                <label>Filtreaza dupa data plecarii: </label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                />
                {selectedDate && (
                    <button onClick={() => handleDateChange('')}>Resetează data</button>
                )}
            </div>
            <div style={{ margin: '20px 0' }}>
                <label>Filtreaza dupa data sosirii: </label>
                <input
                    type="date"
                    value={selectedDateSosire}
                    onChange={(e) => handleDateChangeSosire(e.target.value)}
                />
                {selectedDateSosire && (
                    <button onClick={() => handleDateChangeSosire('')}>Resetează data</button>
                )}
            </div>

            <div style={{ margin: '20px 0' }}>
                <label>Filtreaza după categorie: </label>
                <select
                    value={selectedCategorie}
                    onChange={(e) => handleFilterByCategorie(e.target.value)}
                >
                    <option value="">Toate categoriile</option>
                    {categorii.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nume}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label>Filtreaza dupa tren: </label>
                <select
                    value={selectedTren}
                    onChange={(e) => handleFilterByTren(e.target.value)}
                >
                    <option value="">Toate trenurile</option>
                    {trenuri.map(tren => (
                        <option key={tren.id} value={tren.id}>
                            {tren.nume}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ margin: '20px 0' }}>
                <label>Filtreaza dupa statie plecare: </label>
                <select
                    value={selectedStatieStart}
                    onChange={(e) => handleFilterByRutaPlecare(e.target.value)}
                >
                    <option value="">Toate statiile</option>
                    {statii.map(statie => (
                        <option key={statie.id} value={statie.id}>
                            {statie.nume}
                        </option>
                    ))}
                </select>
            </div>

            <table>
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
                        <td>{tren.categorieTren?.nume || 'N/A'}</td>
                        <td>
                            {tren.ruta?.statieStart?.nume || 'N/A'} - {tren.ruta?.statieEnd?.nume || 'N/A'}
                        </td>
                        <td>
                            {tren.ruta?.distantaKm && tren.ruta?.categorieTren?.tarifPerKm
                                ? `${(tren.ruta.distantaKm * tren.ruta.categorieTren.tarifPerKm).toFixed(1)} RON`
                                : 'N/A'}
                        </td>

                        <td>
                            <button onClick={() => handleDelete(tren.id)}>Șterge</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TrenList;
