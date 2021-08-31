import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_API_URL_BASE;
//axios.defaults.baseURL = 'http://localhost:4000/api';

axios.interceptors.response.use(
	async function(response) {
		return response;
	},
	async function(err) {
		try {
			console.log('entramos')
			if (err?.response?.data && err?.response?.data?.message) {
				console.log('dentro')
				console.log(err.response.data)
				return err.response
			}
			return {
				data: {
					success: false,
					message: err,
					values: {}
				}
			}
		} catch (e) {
			return {
				data: {
					success: false,
					message: e.toString(),
					values: {}
				}
			}
		}
	}
);

axios.defaults.params = {};

/*axios.interceptors.request.use(async function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});*/

export default axios;