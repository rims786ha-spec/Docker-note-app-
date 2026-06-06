async function loadNotes() {

    const res = await fetch("/api/notes");
    const notes = await res.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach(note => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${note.text}
            <button onclick="deleteNote(${note.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

async function addNote() {

    const text =
        document.getElementById("noteInput").value;

    await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    document.getElementById("noteInput").value = "";

    loadNotes();
}

async function deleteNote(id) {

    await fetch(`/api/notes/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

loadNotes();