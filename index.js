// DOM Elements
const patientForm = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');
const historyList = document.getElementById('historyList');

// Add a patient to the system
function addPatient(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('patientName').value.trim();
    const age = document.getElementById('patientAge').value.trim();
    const condition = document.getElementById('patientCondition').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const roomNumber = document.getElementById('roomNumber').value.trim();
    const category = document.getElementById('roomCategory').value;

    // Check if any field is empty
    if (!name || !age || !condition || !paymentMethod || !roomNumber || !category) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new patient object with a random numeric ID
    const newPatient = {
        id: Math.floor(Math.random() * 1000000),  // Random numeric ID
        name,
        age: parseInt(age, 10),
        condition,
        roomNumber: parseInt(roomNumber, 10),
        category,
        paymentMethod
    };

    console.log(newPatient);

    // POST request to JSON Server
    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
    })
        .then(response => response.json())
        .then(() => {
            addPatientToHistory(newPatient);
            renderPatientList(); // Re-fetch and display updated list
            patientForm.reset(); // Clear the form

            // Show a success alert after adding the patient
            alert('Patient successfully added to the system!');
        })
        .catch(error => console.error('Error adding patient:', error));
}

// Add patient to the history
function addPatientToHistory(patient) {
    const historyEntry = {
        patientId: patient.id,
        condition: patient.condition
    };

    fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyEntry)
    })
        .then(() => renderPatientHistory())
        .catch(error => console.error('Error adding patient to history:', error));
}

// Remove a patient from the system
function removePatient(patientId) {
    console.log('Attempting to remove patient with ID:', patientId);  // Debugging log

    // Ensure patientId is treated as a string (to match db.json format)
    const patientIdStr = patientId.toString();

    fetch(`http://localhost:3000/patients/${patientIdStr}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to remove patient');
            }
            renderPatientList(); // Re-render after successful deletion
        })
        .catch(error => console.error('Error removing patient:', error));
}

// Render patient details in the list
function renderPatientList() {
    patientList.innerHTML = '';  // Clear the current list

    fetch('http://localhost:3000/patients')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch patients');
            }
            return response.json();  // Return parsed JSON response
        })
        .then(data => {
            data.forEach(patient => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${patient.name}</strong>, Age: ${patient.age}, 
                    Condition: ${patient.condition}, Room: ${patient.roomNumber}, 
                    Category: ${patient.category}, Payment: ${patient.paymentMethod}
                    <button onclick="removePatient(${patient.id})" class="remove-button">Remove</button>
                `;
                patientList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching patients:', error));
}

// Render patient history
function renderPatientHistory() {
    historyList.innerHTML = '';

    fetch('http://localhost:3000/history')
        .then(response => response.json())
        .then(historyData => {
            historyData.forEach(historyItem => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Patient ID: ${historyItem.patientId} - Condition: ${historyItem.condition}
                `;
                historyList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching patient history:', error));
}

// Search patients based on input query
function searchPatients() {
    const query = searchInput.value.toLowerCase();

    fetch('http://localhost:3000/patients')
        .then(response => response.json())
        .then(data => {
            const filteredPatients = data.filter(patient =>
                patient.name.toLowerCase().includes(query) ||
                patient.condition.toLowerCase().includes(query) ||
                patient.category.toLowerCase().includes(query) ||
                patient.roomNumber.toString().includes(query)
            );
            renderFilteredPatientList(filteredPatients);
        })
        .catch(error => console.error('Error searching patients:', error));
}

// Render the filtered list based on search
function renderFilteredPatientList(filteredPatients) {
    patientList.innerHTML = '';
    filteredPatients.forEach(patient => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${patient.name}</strong>, Age: ${patient.age}, 
            Condition: ${patient.condition}, Room: ${patient.roomNumber}, 
            Category: ${patient.category}, Payment: ${patient.paymentMethod}
            <button onclick="removePatient(${patient.id})" class="remove-button">Remove</button>
        `;
        patientList.appendChild(li);
    });
}

// Clear patient list
function clearPatientList() {
    fetch('http://localhost:3000/patients', {
        method: 'DELETE'
    })
        .then(() => renderPatientList())
        .catch(error => console.error('Error clearing patient list:', error));
}

// Event Listeners
patientForm.addEventListener('submit', addPatient);
searchInput.addEventListener('input', searchPatients);
clearButton.addEventListener('click', clearPatientList);

// Initial Render
renderPatientList();
renderPatientHistory();
