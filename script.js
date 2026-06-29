const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];

// LOAD DATA
async function loadMembers() {
  try {
    const res = await fetch(api);
    allMembers = await res.json();
    render(allMembers);
  } catch (err) {
    console.log(err);
    membersContainer.innerHTML = "<p>Data load failed</p>";
  }
}

// SAFE GET FUNCTION
function get(user, key) {
  return (user[key] || "").toString().trim();
}

// LIST RENDER
function render(data) {
  membersContainer.innerHTML = "";

  data.forEach((user) => {

    const encodedUser = encodeURIComponent(JSON.stringify(user));

    membersContainer.innerHTML += `
      <div class="card">

        <h2>${get(user, "Name")}</h2>

        <p><b>Role:</b> ${get(user, "Role")}</p>
        <p><b>City:</b> ${get(user, "City")}</p>
        <p><b>Genre:</b> ${get(user, "Genre")}</p>

        <button onclick="openProfile('${encodedUser}')">
          View Profile
        </button>

      </div>
    `;
  });
}

// PROFILE OPEN FUNCTION
function openProfile(userData) {
  localStorage.setItem("selectedUser", userData);
  window.location.href = "profile.html";
}

// SEARCH FUNCTION
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  const filtered = allMembers.filter(user =>
    get(user, "Name").toLowerCase().includes(value) ||
    get(user, "Role").toLowerCase().includes(value) ||
    get(user, "City").toLowerCase().includes(value) ||
    get(user, "Genre").toLowerCase().includes(value) ||
    get(user, "Experience").toLowerCase().includes(value)
  );

  render(filtered);
});

// START APP
loadMembers();
