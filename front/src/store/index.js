import { createStore } from 'vuex';
import router from "@/router/router";
import axios from "axios";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            // Define your state here
            userLogin: localStorage.getItem('token') || false,
        };
    },
    mutations: {
        // Methods to update state
        setUserLogin(state, payload) {
            state.userLogin = payload;
            if (!payload) {
                localStorage.removeItem('token');
            } else {
                localStorage.setItem('token', payload);
            }
            router.push('/');
        }
    },
    actions: {
        // Methods to perform async operations and update state
        setUserLogin({ commit }, payload) {
            commit('setUserLogin', payload);
        },

        removeUserLogin({ commit }) {
            commit('setUserLogin', false);
        },

        async getPresignedUrl(context, fileName, fileType) {
            const apiEndpoint = 'https://y0i5knkev8.execute-api.eu-west-1.amazonaws.com/getURL';
            try {
                const response = await axios.post(apiEndpoint, {
                    fileName: fileName,
                    fileType: fileType
                });
                return response.data; // This should return the data to where this action is called
            } catch (error) {
                console.error('Failed to get pre-signed URL:', error);
                throw error; // Properly handle errors
            }
        }
    },
    getters: {
        // Methods to get state
        getUserLogin(state) {
            return state.userLogin;
        },
    }
});

export default store;
