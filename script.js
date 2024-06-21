const inputValue = document.getElementById('inputBox')
const submitButton = document.getElementById('submitButton')
const container = document.getElementById('cardContainer')
const error = document.getElementById('error')
let popup = document.querySelector('.popup')
let popupContainer = document.querySelector('.popupContainer')
let popupContent = document.querySelector('.popupContent')
let closePopup = document.querySelector('#closePopup')


closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none'
})


const fetchIngreadents = (meal) => {

    let ingredentList = "";
    for (let i = 0; i <= 20; i++) {
        const ingredents = meal[`strIngredient${i}`]
        if (ingredents) {
            const measure = meal[`strMeasure${i}`]
            ingredentList += `<li>${measure} ${ingredents}</li>`
        }
    }
    return ingredentList;
}

const openPopUP = (values) => {

    popupContent.innerHTML = ''
    let popup = document.createElement('div')
    popup.classList.add('popup')
    popup.innerHTML = ` <h2>${values.strMeal}</h2>
                
                <div class="ingredents">
                    <p>Ingredents:</p>
                    <ul>${fetchIngreadents(values)}</ul>
                </div>
                <p class="instruction"><span>Instructions:- </span>${values.strInstructions}</p>
    `
    popupContent.appendChild(popup)
    popupContainer.style.display = 'block'

}


const displayReceipe = (data) => {

    try {
        container.innerHTML = ""
        error.innerHTML = ""

        data.map((meal) => {

            let card = document.createElement('div')
            card.classList.add('card')

            let img = document.createElement('img')
            img.src = meal.strMealThumb

            let content = document.createElement('div')
            content.classList.add('content')

            let h3 = document.createElement('h3')
            h3.innerHTML = meal.strMeal

            let h4 = document.createElement('h4')
            h4.innerHTML = `${meal.strArea} Dish`

            let p = document.createElement('p')
            p.innerHTML = `Belong to ${meal.strCategory} category`

            let btn = document.createElement('button')
            btn.type = 'submit'
            btn.innerHTML = 'View Receipe'
            btn.addEventListener('click', () => {
                openPopUP(meal)
            })

            content.appendChild(h3)
            content.appendChild(h4)
            content.appendChild(p)
            content.appendChild(btn)

            card.appendChild(img)
            card.appendChild(content)

            container.appendChild(card)
        })
        inputValue.value = ""
    } catch (error) {
        document.getElementById("error").innerHTML = '<h2>Sorry, No such meal found.</h2>'
    }
}

const fetchApi = async (value) => {
    container.innerHTML = "<h2>Fetching...</h2>"

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        .then((res) => res.json())
        .then((data) => displayReceipe(data.meals))

}

submitButton.addEventListener('click', (e) => {

    e.preventDefault()
    let value = inputValue.value.trim()
    if (!value) {
        container.innerHTML = ""
        error.innerHTML = "<h2>Please Enter Some Meal</h2>"
        error.style.color = 'red'
        return;
    }
    else {
        fetchApi(value)
    }

})