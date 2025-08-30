// --- 1. ESTADO DA APLICAÇÃO ---
let participants = [];
let selectedParticipantIndex = null; 

// --- 2. REFERÊNCIAS AOS ELEMENTOS DO DOM ---
const nameInput = document.getElementById('name-input');
const addButton = document.getElementById('add-button');
const removeButton = document.getElementById('remove-button');
const participantsList = document.getElementById('participants-list');
const raffleButton = document.getElementById('raffle-button');
const winnerModal = document.getElementById('winner-modal');
const closeModalButton = document.getElementById('close-modal-button');
const raffleAnimationElement = document.getElementById('raffle-animation');

// --- 3. FUNÇÕES ---

function renderParticipants() {
    participantsList.innerHTML = '';
    participants.forEach((participant, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = participant;
        listItem.addEventListener('click', () => {
            selectedParticipantIndex = index;
            renderParticipants(); 
        });
        if (index === selectedParticipantIndex) {
            listItem.classList.add('selected');
        }
        participantsList.appendChild(listItem);
    });
    updateRemoveButtonState();
}

function addParticipant() {
    const name = nameInput.value.trim();
    if (name) {
        participants.push(name);
        nameInput.value = '';
        nameInput.focus();
        selectedParticipantIndex = null; 
        renderParticipants();
    } else {
        alert("Por favor, digite um nome válido.");
    }
}

function removeParticipant() {
    if (selectedParticipantIndex !== null) {
        participants.splice(selectedParticipantIndex, 1);
        selectedParticipantIndex = null;
        renderParticipants();
    }
}

function updateRemoveButtonState() {
    removeButton.disabled = selectedParticipantIndex === null;
}

function startRaffle() {
    if (participants.length < 2) {
        alert('É preciso ter pelo menos 2 participantes para realizar um sorteio.');
        return;
    }

    winnerModal.style.display = 'flex';

    const winnerIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[winnerIndex];

    raffleAnimationElement.innerHTML = '';
    raffleAnimationElement.classList.remove('winner-reveal');
    
    const animationDuration = 3000; // 3 segundos

    const shuffleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        raffleAnimationElement.textContent = participants[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        raffleAnimationElement.textContent = winner;
        raffleAnimationElement.classList.add('winner-reveal');
    }, animationDuration);
}

function closeModal() {
    winnerModal.style.display = 'none';
}

// --- 4. EVENT LISTENERS ---
addButton.addEventListener('click', addParticipant);
nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addParticipant();
});
removeButton.addEventListener('click', removeParticipant);
raffleButton.addEventListener('click', startRaffle);
closeModalButton.addEventListener('click', closeModal);
