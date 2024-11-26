// src/api/apiLinks.js

const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/register',
        LOGIN: '/login',
        LOGOUT: '/logout',
    },
    PROBLEMS: {
        GET_ALL: '/problem/page',
        GET_DETAIL: '/problem',
        SUBMIT: (problemId) => `/problem/${problemId}/submit`,
        CREATE: '/problem',
    },
    USERS: {
        GET_INFO: (userId) => `/user/${userId}`,
        GET_SUBMISSIONS: (userId) => `/user/${userId}/submissions`,
    },
    SUBMISSIONS: {
        GET_DETAIL: (submissionId) => `/submission/${submissionId}`,
    },
    // Add more categories and endpoints as needed
};

export default API_ENDPOINTS;