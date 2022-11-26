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

export { apiClient };
