import axios from "axios";
import {
    log
} from "three";

export default {
    namespaced: true,
    state: () => ({
        inquiry: [],
    }),
    mutations: {
        setInquiry(state, inquiryData) {
            state.inquiries.push(inquiryData);
        },
    },
    actions: {
        async addInquiry({
            commit,
            state
        }, formData) {
            try {
                const res = await axios.post("/en/inquiries/inquiry", formData);
                commit("setInquiry", res.data);

                return res.data;

            } catch (error) {
                    console.error("Error adding inquiry:", error);
                    throw error;

            }

        },



    },
    getters: {
        inquiry(state) {
            return state.inquiry;
        },
    },
};