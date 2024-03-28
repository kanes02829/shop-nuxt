interface RequestParams {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    url: string
    messages?: {
        success?: string
        fail?: string
    }
    body?: object
    query?: object
    extras?: object
    headers?: object
    toastErrorResponse?: boolean
    throwError?: boolean
    timeout?: number
}

class HttpFactory {
    private readonly API_URL: string;

    constructor(apiUrl: string) {
        this.API_URL = apiUrl;
    }

    async call<T>(params: RequestParams): Promise<T> {
        const {
            method,
            url,
            body = null,
            query = {},
            extras = {},
            headers = null,
            // messages = null,
            // toastErrorResponse = false,
            throwError = false,
            timeout = 30000,
        } = params;

        const options = {
            baseURL: this.API_URL,
            method,
            ...extras,
            timeout,
            query: {
                ...query,
            }
        };

        if (body) {
            // @ts-ignore
            options.body = body;
        }

        if (headers) {
            // @ts-ignore
            options.headers = headers;
        }

        // @ts-ignore
        const {data, error} = await useFetch<T>(url, options);

        if (error.value && throwError) {
            throw error.value;
        }

        return data.value as T;
    }
}

export default HttpFactory;