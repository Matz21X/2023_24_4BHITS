import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tabelle() {

    const [personen, setPersonen] = useState([]);

    useEffect(() => {
        fetchPersonen();
    }, []);

    async function fetchPersonen() {
        try {
            const response = await axios.get('http://localhost:8080/database/personen'); // anpassen Sie die URL entsprechend Ihrer API-Endpunkte
            setPersonen(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    }



    return (
        <>
            <h2 className="text-center">Personenverwaltung</h2>
            <br></br>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>PersonID</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Geschlecht</th>
                    <th>Größe (cm)</th>
                    <th>Gewicht (kg)</th>
                    <th>Geburtsdatum</th>
                </tr>
                </thead>
                <tbody>
                {personen.map(person => (
                    <tr key={person.personID}>
                        <td>{person.personID}</td>
                        <td>{person.vorname}</td>
                        <td>{person.nachname}</td>
                        <td>{person.geschlecht === 'm' ? 'Männlich' : 'Weiblich'}</td>
                        <td>{person.groesse}</td>
                        <td>{person.gewicht}</td>
                        <td>{person.geburtsdatum}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default Tabelle;
