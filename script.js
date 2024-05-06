const adviceId = document.querySelector(".advice-id");
const advice = document.querySelector(".advice");
const adviceButton = document.querySelector(".random-button");
const favoriteIcon = document.querySelector(".favorite");
const favoritedIcon = document.querySelector(".favorited");
const overlay = document.querySelector(".overlay");
const advicesContainer = document.querySelector(".fav-advices-container");
const showAdvices = document.querySelector(".show-advices-button");

let curentAdvice = {};
const favoriteAdvices = [];

const getAdvice = async () => {
    const serverResponse = await fetch('https://api.adviceslip.com/advice');
    const data = await serverResponse.json();
    adviceId.innerHTML = `ADVICE #${data.slip.id}`;
    advice.innerHTML = `${data.slip.advice}`;
    curentAdvice = data.slip;
    if(favoriteAdvices.findIndex((element) => element.id === curentAdvice.id) === -1) {
        favoriteIcon.style.display = 'block';
        favoritedIcon.style.display = 'none';
    }
    else {
        favoriteIcon.style.display = 'block';
        favoritedIcon.style.display = 'none';
    }
};

const addToFav = () => {
    favoriteAdvices.push(curentAdvice);
    favoriteIcon.style.display = 'none';
    favoritedIcon.style.display = 'block';
    showFavAdvices();
}

const removeFromFav = () => {
    favoriteIcon.style.display = 'block';
    favoritedIcon.style.display = 'none';
    const indexRemover = favoriteAdvices.findIndex((element) => element.id === curentAdvice.id);
    favoriteAdvices.splice(indexRemover, 1);
    showFavAdvices();
};

const showFavAdvices = () => {
    let adviceHTML = favoriteAdvices.map((element) => {
     return `<div class='fav-advice-container'>
        <p class='fav-advice'>${element.advice}</p>
        <p class='fav-advice'>Id: ${element.id}</p>
     </div>`
    })
    advicesContainer.innerHTML = adviceHTML.join('');
};

const handleAdvices = () => {
    advicesContainer.style.transform = 'translate(0px, 0px)';
    overlay.style.display = 'block';
};

const closeAdvices = () => {
    overlay.style.display = 'none';
    advicesContainer.style.transform = 'translate(0px, -300%)';
};

adviceButton.addEventListener("click", getAdvice);
favoriteIcon.addEventListener("click", addToFav);
favoritedIcon.addEventListener("click", removeFromFav);
showAdvices.addEventListener("click", handleAdvices);
overlay.addEventListener("click", closeAdvices);