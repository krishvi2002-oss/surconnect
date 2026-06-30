const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];
let currentRole = "All";

// Load Data
async function loadMembers() {
  try {
    const res = await fetch(api);
    allMembers = await res.json();
    render(allMembers);
  } catch (err) {
    console.error(err);
    membersContainer.innerHTML = "<h2>Failed to load members.</h2>";
  }
}

// Safe Get
function get(user, key) {
  return (user[key] || "").toString().trim();
}

// Render Cards
function render(data) {
  membersContainer.innerHTML = "";

  if (data.length === 0) {
    membersContainer.innerHTML = "<h2>No members found.</h2>";
    return;
  }

  data.forEach(user => {
    membersContainer.innerHTML += `
      <div class="card">
        <h2>${get(user, "Name")}</h2>

       <p><b>Role:</b> ${get(user, "Role")}</p>
<p><b>Experience:</b> ${get(user, "Experience")}</p>
<p><b>City:</b> ${get(user, "City")}</p>
<p><b>Genre:</b> ${get(user, "Genre")}</p>
<p><b>Looking For:</b> ${get(user, "Looking For")}</p>
<p><b>Free/Paid:</b> ${get(user, "Free/Paid")}</p>
<p><b>About:</b> ${get(user, "About")}</p>

        ${
          get(user, "Instagram Link")
            ? `<a href="${get(user, "Instagram Link")}" target="_blank">📷 Instagram</a>`
            : ""
        }
      </div>
    `;
  });
}

// Search + Role Filter
function applyFilters() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = allMembers.filter(user => {

    const matchSearch =
      get(user, "Name").toLowerCase().includes(search) ||
      get(user, "Role").toLowerCase().includes(search) ||
      get(user, "City").toLowerCase().includes(search) ||
      get(user, "Genre").toLowerCase().includes(search);

    const matchRole =
      currentRole === "All" ||
      get(user, "Role").toLowerCase() === currentRole.toLowerCase();

    return matchSearch && matchRole;
  });

  render(filtered);
}

// Search Event
searchInput.addEventListener("input", applyFilters);

// Role Filter
function filterRole(role) {
  currentRole = role;
  applyFilters();
}

// Start
loadMembers();
