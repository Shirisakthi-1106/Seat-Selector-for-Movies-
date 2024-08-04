const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.seat-sold)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Function to update the count and total
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const ticketPrice = parseInt(movieSelect.value.split('Rs. ')[1], 10); // Handle the space after Rs.

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Function to save the selected seats to local storage
function saveSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));
}

// Function to store the movie data in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Function to populate the UI with saved data
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
  const savedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (savedMovieIndex !== null) {
    movieSelect.selectedIndex = savedMovieIndex;
  }
}

// Function to update ticket price
function updateTicketPrice() {
  // Adjusted split method to account for no space between the movie name and the bracket
  const ticketPrice = parseInt(movieSelect.value.split('Rs. ')[1], 10); // Handle the space after Rs.
  setMovieData(movieSelect.selectedIndex, ticketPrice);
  updateSelectedCountAndTotal();
}

// Event listener for seat click
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('seat-sold')) {
    e.target.classList.toggle('selected');
    updateSelectedCountAndTotal();
    saveSelectedSeats();
  }
});

movieSelect.addEventListener('change', updateTicketPrice);

// Initial setup
populateUI();
updateSelectedCountAndTotal();
