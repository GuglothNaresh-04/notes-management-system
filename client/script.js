const API = "http://localhost:3000/api";

// Get JWT Token
const token = localStorage.getItem("token");

// Route Protection
if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Load Notes when page opens
window.onload = function () {
    getNotes();
};

// =========================
// CREATE NOTE
// =========================
async function createNote() {

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const response = await fetch(`${API}/notes`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                title,
                content
            })

        });

        const data = await response.json();

        alert(data.message);

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        getNotes();

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

}

// =========================
// GET ALL NOTES
// =========================
async function getNotes() {

    document.getElementById("notesContainer").innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(`${API}/notes`, {

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const notes = await response.json();

        if (notes.length === 0) {

            document.getElementById("notesContainer").innerHTML =
                "<h2>No Notes Found</h2>";

            return;
        }

        let html = "";

        notes.forEach(note => {

            html += `
            <div class="note">

                <h2>${note.title}</h2>

                <p>${note.content}</p>

                <button onclick="editNote(${note.id}, '${note.title}', '${note.content}')">
                    Edit
                </button>

                <button onclick="deleteNote(${note.id})">
                    Delete
                </button>

            </div>
            `;

        });

        document.getElementById("notesContainer").innerHTML = html;

    } catch (error) {

        console.error(error);

        document.getElementById("notesContainer").innerHTML =
            "<h2>Unable to load notes.</h2>";

    }

}

// =========================
// DELETE NOTE
// =========================
async function deleteNote(id) {

    const confirmDelete = confirm("Delete this note?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API}/notes/${id}`, {

            method: "DELETE",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

        const data = await response.json();

        alert(data.message);

        getNotes();

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

    }

}

// =========================
// EDIT NOTE
// =========================
async function editNote(id, oldTitle, oldContent) {

    const title = prompt("Edit Title", oldTitle);

    if (title === null) return;

    const content = prompt("Edit Content", oldContent);

    if (content === null) return;

    try {

        const response = await fetch(`${API}/notes/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                title,
                content
            })

        });

        const data = await response.json();

        alert(data.message);

        getNotes();

    } catch (error) {

        console.error(error);

        alert("Update Failed");

    }

}

// =========================
// SEARCH NOTES
// =========================
function searchNotes() {

    const input = document
        .getElementById("search")
        .value
        .toLowerCase();

    const notes = document.querySelectorAll(".note");

    notes.forEach(note => {

        const text = note.innerText.toLowerCase();

        if (text.includes(input)) {

            note.style.display = "block";

        } else {

            note.style.display = "none";

        }

    });

}

// =========================
// LOGOUT
// =========================
function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    }

}