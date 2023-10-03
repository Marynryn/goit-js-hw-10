import axios from "axios";
import {fetchBreeds, fetchCat} from "./cat-api";
import SlimSelect from "slim-select"
import "slim-select/dist/slimselect.css";

axios.defaults.headers.common["x-api-key"] = "live_6DBiWVL9DHfF5BZnITX5cCuCapUWVEpbp0P2bYTHVfPtiSsFF5soMqmHIGMOautM";



 const refs = {
    info: document.querySelector(".cat-info"),
    selectB: document.querySelector(".breed-select"),
    errorMes: document.querySelector(".error"),
    loadMes:document.querySelector(".loader")
};

refs.loadMes.classList.replace('loader', 'is-hidden');
refs.errorMes.classList.add('is-hidden');
refs.info.classList.add('is-hidden');


let arrBreeds = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreeds.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: refs.selectB,
        data: arrBreeds,
    });
    })
.catch(onFetchError);

let firstBreed = true
refs.selectB.addEventListener("change", onSelectBreed);

function onSelectBreed(event){
    refs.loadMes.classList.replace('is-hidden', 'loader');
    refs.selectB.classList.add('is-hidden');
    refs.info.classList.add('is-hidden');
if(!firstBreed){
    infoCat();}
else {
    firstBreed = false;
}
}
function infoCat(){
    const breedId = refs.selectB.value;

    fetchCat(breedId)
    .then(data =>{
        refs.info.insertAdjacentHTML("beforeend", createMarkup(data));
        refs.info.classList.remove('is-hidden');}
    )
    .catch(onFetchError);

}

function onFetchError(error) {
    refs.selectB.classList.remove('is-hidden');
    refs.loadMes.classList.replace('loader', 'is-hidden');}

function createMarkup(arr) {
    return  arr.map(({url, breeds}) =>`
      <li class="cat-card">
        <img src="${url}" alt="${breeds[0].name}">
        <div class="about-cat">
          <h2>${breeds[0].name}</h2>
          <p>Description: ${breeds[0].description}</p>
          <p>Temperament: ${breeds[0].temperament}</p>
        </div>
      </li>
      `)
      .join("");
  }

