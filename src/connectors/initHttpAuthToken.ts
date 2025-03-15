import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export default function initHttpAuthToken(http: any) {
	http.interceptors.request.use((config: AxiosRequestConfig) => {
		const token = localStorage.getItem('AUTH_TOKEN');

		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
		// TODO: Если у нас будет пара acces и refresh token, то мы здесь поймав 401 код будем запускать механику рефреш
		// TODO: и токен пересоздаем, это в целом работа с токенами  и поэтому в этой точке программы можно сделать request use на response
	});

	http.interceptors.response.use(
		(r: AxiosResponse) => r,
		(e: AxiosError) => {
			// TODO: тут типа если токен оказался просрочен то мы его удаляем, надо разобраться с CHECK в апишке Laravel
			if(e.response?.status === 401) {
				localStorage.removeItem('AUTH_TOKEN');
				if(location.pathname.replace(/^\/?\w+\//, '') !== '/login') {
					document.location = '/login'
				}
			}

			return Promise.reject(e);
		}
	)
}