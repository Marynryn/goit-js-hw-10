import axios from "axios";
const api_key = "live_6DBiWVL9DHfF5BZnITX5cCuCapUWVEpbp0P2bYTHVfPtiSsFF5soMqmHIGMOautM";
const url = 'https://api.thecatapi.com/v1';

  


export async function fetchBreeds() {
  try {
    const response = await axios.get(`${url}/breeds`, {
      headers: {
        'x-api-key': api_key,
      },
    });
    const breeds = response.data;
    return breeds;
  } catch (error) {
    throw error;
  }
}

 
export async function fetchCat(breedId) {
  try {
    const response = await axios.get(
      `${url}/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': api_key,
        },
      }
    );
    const catData = response.data[0];
    return catData;
  } catch (error) {
    throw error;
  }
}

