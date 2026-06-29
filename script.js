const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];

async function loadMembers() {
  try {
    const response = await fetch(api);
    allMembers = await response.json();
    displayMembers(allMembers);
  } catch (error) {
    membersContainer.innerHTML = "<p>Failed to load members.</p>";
    console.error(error);
  }
}

function displayMembers(list) {
  membersContainer.innerHTML = "";

  list.forEach(user => {
    membersContainer.innerHTML += `
      <div class="card">
        <h2>${user["Full Name"] || ""}</h2>

        <p><b>Role:</b> ${user["Role"] || ""}</p>
        <p><b>City:</b> ${user["City"] || ""}</p>
        <p><b>Experience:</b> ${user["Experience"] || user["Experience "] || ""}</p>
        <p><b>Genre:</b> ${user["Genre"] || ""}</p>
        <p><b>Looking For:</b> ${user["Looking For"] || ""}</p>
        <p><b>${user["Free / Paid"] || ""}</b></p>

        <button>View Profile</button>
      </div>
    `;
  });
}

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = allMembers.filter(user =>
    (user["Full Name"] || "").toLowerCase().includes(value) ||
    (user["Role"] || "").toLowerCase().includes(value) ||
    (user["City"] || "").toLowerCase().includes(value) ||
    (user["Genre"] || "").toLowerCase().includes(value)
  );

  displayMembers(filtered);
});

loadMembers();
