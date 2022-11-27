import axios from 'axios';
import * as Config from './Config';

async function apiClient(method = 'get', endpoint = '', params = {}) {
	const api = axios.create({
		baseURL: Config.baseURL,
		params: {
			ts: 1,
			apikey: Config.apiKey,
			hash: Config.apiHash,
		},
	});
	const result = await api[method](endpoint, { params });

	if (result) {
		return {
			code: result.data.code,
			payload: result.data.data,
		};
	}
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function formatDate(date) {

    const currDate = new Date(date)
	return [padTo2Digits(currDate.getDate()), padTo2Digits(currDate.getMonth() + 1), currDate.getFullYear()].join('/');
}

export { apiClient, formatDate };
