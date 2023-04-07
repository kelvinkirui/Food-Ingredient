const getMealDetails = mealID => {
    // Clear the Meal Details Section for every Search
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;
    
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
    .then(res => res.json())
    .then(data => showMealDetailsDiv(data));
    }
const createMealInfoDiv = (meal, mealInput) => {
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;
    const mealInfo = `<a href="#meal-details-section" style="text-decoration: none; color: black;">
        <div onclick="getMealDetails(${meal.idMeal})">
            <img src="${mealPhoto}">
            <div>
                <h5>${mealName}</h5>
            </div>
        </div>
    </a>
    `
    const mealInfoSection = document.getElementById('meal-info-section');
    const mealInfoDiv = document.createElement('div');
    mealInfoDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
    mealInfoDiv.innerHTML = mealInfo;
    mealInfoSection.appendChild(mealInfoDiv);
}

const showMealInfoDiv = (data, mealInput) => {
const meal = data.meals;

// Check If Searched Meal Is Found Or Not
if(meal){
    meal.forEach(element => {
    createMealInfoDiv(element, mealInput);
    });
}
else{
    const noMealFound = document.getElementById('not-found');
    noMealFound.innerText = `Not found for ${mealInput}!`;
}
}

const searchMeal = () =>{
const mealInput = document.getElementById('meal').value;

// Check If User Searched For Anything
if(mealInput){

    // Clear the No Meal Found Tag For Every Single New Search
    const noMealFound = document.getElementById('not-found');
    noMealFound.innerText = ``;

    // Clear the Meal Info Section For Every Single New Search
    const mealInfoSection = document.getElementById('meal-info-section');
    mealInfoSection.innerHTML = ``;

    // Clear the Meal Details Section For Every Single New Search
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showMealInfoDiv(data, mealInput);
    }
    )
}
else{
    const noMealFound = document.getElementById('not-found');
    noMealFound.innerText = `You haven't entered anything`;
}
}

document.getElementById('submit-meal').addEventListener('click',searchMeal);
// display meal detais
const showMealDetailsDiv = data => {
const meal = data.meals[0];
const mealPhoto = meal.strMealThumb;
const mealName = meal.strMeal;
// Set Meal Structure
const mealDetailsSection = document.getElementById('meal-details-section');
mealDetailsSection.innerHTML = `
    <div id="meal-details">
        <img src="${mealPhoto}">
        <div>
            <h2>${mealName}</h2>
            <hr>
            <h5>Meal Ingredients</h5>
            <div id="meal-ingredients"></div>
        </div>
    </div>
`
const mealIngredients = document.getElementById('meal-ingredients');

// Set Contents of each paragraph
for(let i = 1; meal[`strIngredient${i}`]; i++){
    const ingredients = `
    . ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
    `
    const mealDetailsP = document.createElement('p');
    mealDetailsP.className = 'card-text';
    mealDetailsP.innerText = ingredients;
    mealIngredients.appendChild(mealDetailsP);
}
}