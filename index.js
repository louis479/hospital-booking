// DOM Elements
const patientForm = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');

// Array to store patient details
let patients = [];

// Add a patient to the system
function addPatient(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('patientName').value.trim();
    const age = document.getElementById('patientAge').value.trim();
    const condition = document.getElementById('patientCondition').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!name || !age || !condition || !paymentMethod) {
        alert('Please fill in all fields.');
        return;
    }

    // Create a new patient object
    const newPatient = {
        id: Date.now(),
        name,
        age,
        condition,
        paymentMethod
    };

     // POST request to JSON Server
     fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatient)
    })
        .then(response => response.json())
        .then(() => {
            renderPatientList(); // Re-fetch and display updated list
            patientForm.reset(); // Clear the form
        })
        .catch(error => console.error('Error adding patient:', error));
}

     // Add patient to the array
     patients.push(newPatient);

     // Update the patient list
    renderPatientList();

    // Reset the form
    patientForm.reset();

}

// Remove a patient from the system
function removePatient(patientId) {
    patients = patients.filter(patient => patient.id !== patientId);
    renderPatientList();
}

// Render patient details in the list
function renderPatientList() {
    patientList.innerHTML = '';

    // Render each patient in the list
    patients.forEach(patient => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${patient.name}</strong>, Age: ${patient.age}, Condition: ${patient.condition}, Payment: ${patient.paymentMethod}
            <button onclick="removePatient(${patient.id})" class="remove-button">Remove</button>
        `;
        patientList.appendChild(li);
    });
}

// Search patients based on input query
function searchPatients() {
    const query = searchInput.value.toLowerCase();
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query)
    );

    renderFilteredPatientList(filteredPatients);
}

// Render the filtered list based on search
function renderFilteredPatientList(filteredPatients) {
    patientList.innerHTML = '';
    filteredPatients.forEach(patient => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${patient.name}</strong>, Age: ${patient.age}, Condition: ${patient.condition}, Payment: ${patient.paymentMethod}
            <button onclick="removePatient(${patient.id})" class="remove-button">Remove</button>
        `;
        patientList.appendChild(li);
    });
}

// Clear patient list
function clearPatientList() {
    patients = [];
    renderPatientList();
}

// Event Listeners
patientForm.addEventListener('submit', addPatient);
searchInput.addEventListener('input', searchPatients);
clearButton.addEventListener('click', clearPatientList);