
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;
window.addEventListener("load", getBreeds);

divCatInfo.classList.add('is-hidden');
error.style.display = "none"


onLoad()


function getBreeds (){
      
  
fetchBreeds()
.then(data => createScroll(data))
.catch(onFetchError)
.finally( onLoad)

}
let arrBreedsId =[]
 function createScroll (data)
{ 
 data.map(({name, id})=> (arrBreedsId.push({ text:name, value:id})));
 scroll(arrBreedsId)
 onLoad()
}

function scroll (arrBreedsId){
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    }


selector.addEventListener('change', onSelectBreed);
let firstChange = true;
function onSelectBreed(event) {
    
if (!firstChange){
    createInfo();
} else {
    firstChange = false;
}}

   function createInfo(){
   
    const breedId = selector.value;
   
    fetchCatByBreed(breedId)
    .then(data => {
       
        
        divCatInfo.innerHTML  = createMarkup(data);
       
        
    })
    .catch(onFetchError)
    .finally( onLoad)
};
 function createMarkup(arr){
    loader.classList.toggle('is-hidden');
    divCatInfo.classList.remove('is-hidden');
    return arr.map(({url, breeds}) =>
    `<div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="360"/>
        </div>
        <div class="box"><h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
    )  
  
 
 }
function onFetchError(error) {
    selector.classList.add('is-hidden');
    loader.classList.add('is-hidden');
   divCatInfo.classList.add('is-hidden');
   
    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    });
};
   function onLoad(){
    loader.classList.toggle('is-hidden');
  

   }

