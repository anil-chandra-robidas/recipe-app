
const searchBtn = document.querySelector('.searchBtn');
const modalDetail = document.querySelector('.modal');

const mealList = document.querySelector(".list");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if ( e.target.id === 'searchBtn'){
    const searchItem = document.querySelector('.searchItem').value;

    
        if ( searchItem !== '') {
            fetchData(searchItem);
         }
     
         else {
             alert('Please enter meal name');
         }
    }

});

async function fetchData(data) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);

    let resdata = await response.json();

    let html = '';

    if (resdata.meals) {

        resdata.meals.forEach(value => {

            html += `<div class="col-item">
            <img src="${value.strMealThumb}" alt="">
            <h4>${value.strMeal}</h4>
            <button class="mealId" id="mealId" data-id="${value.idMeal}">Explore</button>
            </div>`;

        });

        mealList.innerHTML = html;
     
    }

    else {
        document.querySelector(".error").classList.add('errorDisplay');
        document.querySelector(".error").innerHTML = 'Fetching data failed';
        setTimeout(function() {
            document.querySelector(".error").classList.remove('errorDisplay');
        }, 3000);
    }


}



mealList.addEventListener("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    const mealId = e.target.getAttribute('data-id');
    getData(mealId);
    
    if (e.target.id === 'mealId'){
        e.target.addEventListener("click", showPopModal);
    }

});


let output = '';
async function getData(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let getData = await response.json();
    
    getData.meals.forEach(value => {
         output = `<div class="popup-details"><img src="${value.strMealThumb}" alt="">
         <h3 class="pop-meal__name">${value.strMeal}</h3>
         <p class="pop-meal_description">${value.strInstructions.slice(0, 200)+'...'}</p>
         <a class="pop-meal__yuotube" href="${value.strYoutube}">See Video</a>
         <span class="pop-close">X</span></div>`;
    });

    modalDetail.innerHTML = output;

}

const showPopModal = () => {
    modalDetail.style.display = 'block';

}


modalDetail.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const closebtn = e.target;
    closebtn.addEventListener('click', modalClose);
});

const modalClose = (e) => {
        modalDetail.style.display = 'none';
}

