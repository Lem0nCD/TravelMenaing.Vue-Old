import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.getters['user/isLogin']) {
        config.headers.Authorization = "Bearer " + getToken();
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;
        // if (res.code !== 20000) {
        //     Message({
        //         message: res.message || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     });
        //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //     if (re.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         MessageBox.confirm('You have been logged out, you can cancel to stay to stay on this page, or log in again', 'Confirm logout',{
        //             confirmButtonText:'Re-Login',
        //             cancelButtonText: 'Cancel',
        //             type:'warning'
        //         }).then(()=>{
        //             store.dispatch('user/resetToken').then(() => {
        //                 location.reload();
        //             })
        //         });
        //     }
        //     return Promise.reject(new Error(res.message || 'Error'));
        // }else{
        //     return res;
        // }
        return res;
    },
    error =>{
        console.log('err' + error);
        Message({
            message:error.message,
            type:'error',
            duration:5 * 1000
        });
        return Promise.reject(error);
    }
)
export default service;