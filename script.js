const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");
const citySelect = document.getElementById("cityFilter");

let allMembers = [];
let currentRole = "All";
let currentCity = "All";

// Load Data
async function loadMembers() {
  try {
    const res = await fetch(api);
    allMembers = await res.json();
    
    // Data aate hi sabse pehle dropdown mein dynamic cities bharenge
    populateCityDropdown(allMembers);
    
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

// Roles se spaces aur special characters hata kar CSS-friendly name banane ke liye
function getClassFriendlyRole(role) {
  return role.toLowerCase()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-+/g, '-');
}

// Dropdown ko dynamic banane ka function
function populateCityDropdown(data) {
  // Saari unique aur proper-cased cities nikalna
  const cities = data.map(user => get(user, "City").trim())
                     .filter(city => city !== "") // Khali fields hatao
                     .map(city => city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()); // Sabhi ka format ek jaisa (e.g., Delhi, Mumbai)
  
  const uniqueCities = [...new Set(cities)].sort(); // Duplicates delete karke alphabetical sort karein

  // Dropdown clear karke base option set karna
  citySelect.innerHTML = '<option value="All">🔍 All Cities</option>';

  // Loop chala kar har city ko dropdown mein add karna
  uniqueCities.forEach(city => {
    citySelect.innerHTML += `<option value="${city}">${city}</option>`;
  });
}

// Render Cards
function render(data) {
  membersContainer.innerHTML = "";

  if (data.length === 0) {
    membersContainer.innerHTML = "<h2>No members found.</h2>";
    return;
  }

  data.forEach(user => {
    const rawRole = get(user, "Role");
    const roleClass = getClassFriendlyRole(rawRole);

    membersContainer.innerHTML += `
      <div class="card card-${roleClass}">
        <h2>${get(user, "Name")}</h2>
        
        <span class="role-badge badge-${roleClass}">${rawRole}</span>
        <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">

        <p><b>Experience:</b> ${get(user, "Experience")}</p>
        <p><b>City:</b> 📍 ${get(user, "City")}</p>
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

// Search + Role + City Filter Combo
function applyFilters() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = allMembers.filter(user => {
    // 1. Search Bar Filter
    const matchSearch =
      get(user, "Name").toLowerCase().includes(search) ||
      get(user, "Role").toLowerCase().includes(search) ||
      get(user, "City").toLowerCase().includes(search) ||
      get(user, "Genre").toLowerCase().includes(search);

    // 2. Role Buttons Filter
    const matchRole =
      currentRole === "All" ||
      get(user, "Role").toLowerCase() === currentRole.toLowerCase();

    // 3. City Dropdown Filter
    const matchCity =
      currentCity === "All" ||
      get(user, "City").toLowerCase() === currentCity.toLowerCase();

    return matchSearch && matchRole && matchCity;
  });

  render(filtered);
}

// Input and Select Listeners
searchInput.addEventListener("input", applyFilters);

function filterRole(role) {
  currentRole = role;
  applyFilters();
}

function filterCity() {
  currentCity = citySelect.value;
  applyFilters();
}

// Run Everything
loadMembers();
