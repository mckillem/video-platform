import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
	params: {
		// regionCode: 'US',
		maxResults: 25,
	},
	headers: {
		// 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Key': 'acb46d36c7mshe6f696027da19fcp1852aajsnabd64d858926',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
	},
};

export const fetchFromAPI = async (url) => {
	const { data } = await axios.get(`${BASE_URL}/${url}`, options);

	return data;
};