import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_6DBiWVL9DHfF5BZnITX5cCuCapUWVEpbp0P2bYTHVfPtiSsFF5soMqmHIGMOautM";


export function fetchBreeds(){
const url = "https://api.thecatapi.com/v1/breeds";
return axios.get(url).then(res => res.data);

}

 export function fetchCat(breedId) {
    const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      return axios.get(breedUrl).then(res =>{
        console.log(res.data[0]);
        return res.data[0]
      })
       
}

