const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const firstParagraph = document.querySelector('#message-one');
const secondParagraph = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchInput.value;
  firstParagraph.textContent = 'Loading...';
  secondParagraph.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          firstParagraph.textContent = data.error;
        } else {
          firstParagraph.textContent = data.location;
          secondParagraph.textContent = data.forecast;
        }
      });
    }
  );
  searchInput.value = '';
});
