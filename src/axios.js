import axios from 'axios'

const baseURL = 'https://api.vobolio.com/api/'
// const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access') ? "Bearer " + localStorage.getItem('access') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

// const axiosServiceRefresh = axios.create({
//     headers: {
//       'Content-Type': 'application/json',
//       'accept': 'application/json'
//     },
//   });

// const handleRefresh = async token => {
//     // set header for axios refresh
//     axiosServiceRefresh.defaults.headers.common.Authorization = `Bearer ${token}`;
//     return new Promise((resolve, reject) => {
//       axiosServiceRefresh
//         .post(yourRefreshTokenPath, param)
//         .then(response => {
//           resolve(response);
//         })
//         .catch(error => console.log("refresh-error",error));
//     });
//   };



// const refreshToken = async (store) => {
//     if(store.state.auth.isRef)
// }



axiosInstance.interceptors.response.use(
    response =>  response,
    error => {
        const originalRequest = error.config;
        console.log('error.response', error.response)
        if(error.response.status === 401){
            
            const refreshToken = localStorage.getItem("refresh");
            if(refreshToken && !originalRequest._retry){
                originalRequest._retry = true
                console.log("refreshing")
                return new Promise((resolve,reject) => {
                    axiosInstance.post("/token/refresh/",{refresh:refreshToken}).then((response)=>{
                        localStorage.setItem("access",response.data.access);
                        localStorage.setItem("refresh",response.data.refresh);
    
                        axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                        // return axiosInstance.request(originalRequest)
                        resolve(axiosInstance(originalRequest))
                        
                    }).catch(err=>{
                        console.log('err', err)
                        reject(err)
                    })
                });
                
            }
        }
        return Promise.reject(error)
        
    }
)

// axiosInstance.interceptors.response.use(
//     response => {
//         console.log("RETURNING RESPONSE",response)
//         return response
//     },
//     error => {
//         const originalRequest = error.config;
//         console.log('error.response', error.response)
//         if(error.response.status === 401){
            
//             const refreshToken = localStorage.getItem("refresh");
//             if(refreshToken && !originalRequest._retry){
//                 originalRequest._retry = true
//                 console.log("refreshing")

//                 axiosInstance.post("/token/refresh/",{refresh:refreshToken}).then((response)=>{
//                     localStorage.setItem("access",response.data.access);
//                     localStorage.setItem("refresh",response.data.refresh);

//                     axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;
//                     originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
//                     // return axiosInstance.request(originalRequest)
//                     return new Promise((resolve) => {
//                           resolve(axiosInstance(originalRequest));
//                       });
//                 }).catch(err=>{
//                     console.log('err', err)
//                 })
//             }
//         }
//         return Promise.reject(error)
        
//     }
// )




export default axiosInstance;