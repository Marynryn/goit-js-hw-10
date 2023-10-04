
import {fetchBreeds, fetchCat} from "./cat-api";
import SlimSelect from "slim-select"
import "slim-select/dist/slimselect.css";

  const selectB = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');
  
  catInfo.style.display = 'none'
  error.style.display = 'none';
  selectB.style.display = 'none';
  
  window.addEventListener('load', () => {
    fetchBreeds()
      .then(breeds => {
        
        selectB.style.display = 'block';
        loader.style.display = 'none';
  
       
        breeds.forEach(breed => {
            
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
          });
       
      })
      .catch(error => {
      
        showError();
        loader.hidden = true;
        error.hidden = false;
      });
  });
  
  selectB.addEventListener('change', () => {
    const selectedBreedId = selectB.value;
    
  
    fetchCat(selectedBreedId)
      .then(catData => {
        catInfo.style.display = 'block'
        catInfo.innerHTML = `
        
                  <h1>${catData.breeds[0].name}</h1>
                  <h2>Description:</h2>
                  <p> ${catData.breeds[0].description}</p>
                  <h2>Temperament:</h2>
                  <p>${catData.breeds[0].temperament}</p>
                  <img src="${catData.url}" alt="${catData.breeds[0].name}" width="400" />
                  
              `;
      })
      .catch(error => {
       
        showError();
      })
      .finally(() => {
        loader.style.display = 'none'; 
      });
  });
  
 
  function showError() {
    error.style.display = 'block';
  }
