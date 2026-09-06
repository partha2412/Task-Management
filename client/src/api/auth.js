import api from "./api";

// Signup
export const signup = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
};

// Login
export const login = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

// Logout
export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

// Get current authenticated user
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// Forgot password
export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        email,
    });

    return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
    const response = await api.post(
        `/auth/reset-password/${token}`,
        {
            password,
        }
    );

    return response.data;
};