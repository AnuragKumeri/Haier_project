const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const fromSuggestions = document.getElementById("from-suggestions");
const toSuggestions = document.getElementById("to-suggestions");

// Replace this with a real API call to aviationstack or airlabs later
async function fetchAirportSuggestions(query) {
  const sampleAirports = [
    "Indira Gandhi International Airport (DEL)",
    "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "Kempegowda International Airport (BLR)",
    "Rajiv Gandhi International Airport (HYD)",
    "Netaji Subhas Chandra Bose International Airport (CCU)"
  ];
  return sampleAirports.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );
}

function showSuggestions(inputElement, suggestionsElement, query) {
  fetchAirportSuggestions(query).then(suggestions => {
    suggestionsElement.innerHTML = "";
    suggestions.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.addEventListener("click", () => {
        inputElement.value = suggestion;
        suggestionsElement.innerHTML = "";
      });
      suggestionsElement.appendChild(li);
    });
  });
}

fromInput.addEventListener("input", () => {
  showSuggestions(fromInput, fromSuggestions, fromInput.value);
});

toInput.addEventListener("input", () => {
  showSuggestions(toInput, toSuggestions, toInput.value);
});

document.getElementById("flight-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const from = fromInput.value.trim();
  const to = toInput.value.trim();
  const date = document.getElementById("departure-date").value;
  const passengers = document.getElementById("passengers").value;

  if (from && to && date && passengers) {
    const searchParams = new URLSearchParams({
      from,
      to,
      date,
      passengers
    });

    window.location.href = `result.html?${searchParams.toString()}`;
  }
});
