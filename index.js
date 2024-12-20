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

     // Add patient to the array
     patients.push(newPatient);

     // Update the patient list
    renderPatientList();

    // Reset the form
    patientForm.reset();
}