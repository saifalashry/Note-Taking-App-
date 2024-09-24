const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteTag = document.getElementById('note-tag');
const notesContainer = document.getElementById('notes-container');
const toggleThemeButton = document.getElementById('toggle-theme');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render notes
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        
        noteElement.innerHTML = `
            <div class="note-header">
                <span>${note.text}</span>
                <div>
                    <button onclick="editNote(${index})">Edit</button>
                    <button onclick="deleteNote(${index})">Delete</button>
                </div>
            </div>
            ${note.tag ? `<div class="note-tags">Tag: ${note.tag}</div>` : ''}
        `;
        
        notesContainer.appendChild(noteElement);
    });
}

// Save note
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNote = {
        text: noteInput.value,
        tag: noteTag.value,
    };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    noteTag.value = '';
    renderNotes();
});

// Edit note
function editNote(index) {
    const note = notes[index];
    noteInput.value = note.text;
    noteTag.value = note.tag;
    deleteNote(index);
}

// Delete note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

// Toggle dark mode
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Initial rendering of notes
renderNotes();
