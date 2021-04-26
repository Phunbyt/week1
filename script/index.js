// selecting already loaded html elements
let cardSection = document.querySelector('.sections')
let loader = document.querySelector(".lds-hourglass")

// using the async function to fetch data from the api
async function fetchApi() {
    const dataFetch = await fetch("https://swapi.dev/api/people/", {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        })
        // parsing the response from the api
    const data = await dataFetch.json()
    data.results.forEach(result => {
        // with the result from the api created a new div with all other elements
        let imgSrc = data.results.indexOf(result) + 1
        const starCard = document.createElement('div');
        starCard.classList.add("card");
        starCard.innerHTML = `
    <div class="card_img">
        <img src="./assets/${imgSrc}.jpeg" alt="default avatar" srcset="">
    </div>
    <div class="card_details">
        <h2>${result.name}</h2>
    </div>
    <div class="card_slide">
        <h3>Name: ${result.name}</h3>
        <h3>Height: ${result.height}</h3>
        <h3>Gender: ${result.gender}</h3>
    </div>`;
        // disable the loader
        loader.style.display = "none"
        cardSection.appendChild(starCard)

        // add functionalities to the button and sliding in details
        function displayDetails(e) {
            e.target.parentElement.parentElement.children[2].classList.add("active")
        }
        let cardDetails = document.querySelectorAll(".card_slide");
        let nameBtn = document.querySelectorAll(".card_details");

        nameBtn.forEach(btn => {
            btn.addEventListener('click', function(e) {
                displayDetails(e)
            })
        })

        cardDetails.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.remove("active")
            })
        })
    })
}

fetchApi()