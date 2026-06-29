const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];

// Fetch data
async function loadMembers() {
  try {
    const res = await fetch(api);
    const data = await res.json();

    allMembers = data || [];
    render(allMembers);

  } catch (err) {
    console.log(err);
    membersContainer.innerHTML = "<p>Data load failed</p>";
  }
}

// Safe getter (MOST IMPORTANT)
function get(user, key) {
  return (user[key] || "").toString().trim();
}

// Render UI
function render(data) {
  membersContainer.innerHTML = "";

  data.forEach(user => {
    membersContainer.innerHTML += `
      <div class="card">
        <h2>${get(user, "Name")}</h2>

        <p><b>Role:</b> ${get(user, "Role")}</p>
        <p><b>Experience:</b> ${get(user, "Experience")}</p>
        <p><b>City:</b> ${get(user, "City")}</p>
        <p><b>Genre:</b> ${get(user, "Genre")}</p>
        <p><b>Looking For:</b> ${get(user, "Looking For")}</p>
        <p><b>Type:</b> ${get(user, "Free/paid")}</p>

        <p><b>Instagram:</b> ${get(user, "Instagram Link")}</p>

        <p>${get(user, "About")}</p>

        <button>View Profile</button>
      </div>
    `;
  });
}

// Search
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  const filtered = allMembers.filter(user => {
    return (
      get(user, "Name").toLowerCase().includes(value) ||
      get(user, "Role").toLowerCase().includes(value) ||
      get(user, "City").toLowerCase().includes(value) ||
      get(user, "Genre").toLowerCase().includes(value) ||
      get(user, "Experience").toLowerCase().includes(value)
    );
  });

  render(filtered);
});

// Start app
loadMembers();
