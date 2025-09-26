import axios from 'axios'


const createApiFunction = (baseURL: string, baseHeaders?: object) => {
    const instance = axios.create({
        baseURL: baseURL,
    });

    instance.interceptors.request.use(
        (config: any) => {
            config.headers = {
                ...(config.headers || {}), // existing headers
                ...(baseHeaders || {}),        // default headers passed in
            };

            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    return {
        Get: (endPoint: string, id?: any, params?: any) => {
            return new Promise((resolve, reject) => {
                instance.get(`${endPoint}/${id ? id : ''}`, {
                    params: { ...params }
                })
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        Post: (endPoint: string, body: any, id?: any, params?: any, publicAPI?: boolean) => {
            return new Promise((resolve, reject) => {
                instance.post(`${endPoint}/${id ? id : ''}`, body, {
                    params: params
                })
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        Put: (endPoint: string, body: any, id: any) => {
            return new Promise((resolve, reject) => {
                instance.put(`${endPoint}/${id ? id : ''}`, body)
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        Patch: (endPoint: string, body: any, id: any, params?: any) => {
            return new Promise((resolve, reject) => {
                instance.patch(`${endPoint}/${id ? id : ''}`, body, { params: params })
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        Delete: (endPoint: string, id: any) => {
            return new Promise((resolve, reject) => {
                instance.delete(`${endPoint}/${id ? id : ''}`)
                    .then(res => {
                        resolve(res.data)
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    }
}




export default createApiFunction