// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

fetch(imgUrl)
    .then(res => res.json())
    .then(data => addImages(data.message));

function addImages(images) {
    let imageContainer = document.getElementById("dog-image-container");
    images.forEach(image => {
        let newImg = document.createElement("img");
        newImg.src = image;
        imageContainer.appendChild(newImg);
    });
}

let breedArr = [];

fetch(breedUrl)
    .then(res => res.json())
    .then(data => addBreeds(data.message));

function addBreeds(breeds) {
    let newBreed;
    let breedList = document.getElementById("dog-breeds");
    for (const breed in breeds) {
        let subBreeds = breeds[breed]
        if (subBreeds.length == 0) {
            newBreed = document.createElement("li");
            newBreed.textContent = breed;
            newBreed.setAttribute("id", breed)
            newBreed.addEventListener("click", () => document.getElementById(breed).style.color = "blue");
            breedList.appendChild(newBreed);
            breedArr.push(breed)
        }
        else {
            subBreeds.forEach(subBreed => {
                newBreed = document.createElement("li");
                newBreed.textContent = `${subBreed} ${breed}`;
                newBreed.setAttribute("id", `${subBreed} ${breed}`)
                newBreed.addEventListener("click", () => document.getElementById(`${subBreed} ${breed}`).style.color = "blue");
                breedList.appendChild(newBreed);
                breedArr.push(`${subBreed} ${breed}`)
            });
        }
    }
}

let selection = document.getElementById("breed-dropdown");

document.getElementById("submit-button").addEventListener("click", (e) => {
    e.preventDefault();
    if (selection.value != "all") {
        filteredBreeds = breedArr.filter(word => word.startsWith(selection.value));
    }
    breedArr.forEach(breed => {
        currBreedElement = document.getElementById(breed)
        currBreed = currBreedElement.id;
        if (selection.value == "all") {
            currBreedElement.removeAttribute("hidden");
        }
        else {
            if (!filteredBreeds.includes(currBreed)) {
                currBreedElement.setAttribute("hidden", "");
            }
            if (filteredBreeds.includes(currBreed)) {
                currBreedElement.removeAttribute("hidden");
            }
        }
    })
})