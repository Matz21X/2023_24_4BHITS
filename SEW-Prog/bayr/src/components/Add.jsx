import React, { useState } from 'react';
import axios from 'axios';

const AddPerson = () => {
    const [newPerson, setNewPerson] = useState({"vorname": '', "nachname": '', "geschlecht": '', "groesse": 0, "gewicht": 0, "geburtsdatum": ''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPerson({ ...newPerson, [name]: value });
    };

    const handleAddPerson = async () => {
        try {
            const response = await axios.post('http://localhost:8080/database/personen', newPerson);
            setNewPerson({
                "vorname": '',
                "nachname": '',
                "geschlecht": '',
                "groesse": 0,
                "gewicht": 0,
                "geburtsdatum": ''
            });
            console.log('Neue Person hinzugefügt:', response.data);
        } catch (error) {
            console.error('Fehler beim Hinzufügen der Person:', error);
        }
    };


    return (
        <>
            <h2 className="text-center">Neue Person hinzufügen</h2>
            <div className="container">
                <a href="/" className="btn btn-secondary" role="button">Zurück</a>
                <div className="mb-3">
                    <br></br>
                    <label htmlFor="vorname" className="form-label">Vorname:</label>
                    <input type="text" className="form-control " id="vorname" name="vorname" value={newPerson.vorname}
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="nachname" className="form-label">Nachname:</label>
                    <input type="text" className="form-control" id="nachname" name="nachname" value={newPerson.nachname}
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="geschlecht" className="form-label">Geschlecht:</label>
                    <select className="form-select" id="geschlecht" name="geschlecht" value={newPerson.geschlecht} onChange={handleInputChange}>
                        <option value="">Bitte wählen</option>
                        <option value="m">Männlich</option>
                        <option value="w">Weiblich</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="groesse" className="form-label">Größe (cm):</label>
                    <input type="text" className="form-control" id="groesse" name="groesse" value={newPerson.groesse}
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="gewicht" className="form-label">Gewicht (kg):</label>
                    <input type="text" className="form-control" id="gewicht" name="gewicht" value={newPerson.gewicht}
                           onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="geburtsdatum" className="form-label">Geburtsdatum:</label>
                    <input type="text" className="form-control" id="geburtsdatum" name="geburtsdatum"
                           value={newPerson.geburtsdatum} onChange={handleInputChange}/>
                </div>
                <button onClick={handleAddPerson} className="btn btn-primary">Person hinzufügen</button>
            </div>
        </>
    );
};

export default AddPerson;