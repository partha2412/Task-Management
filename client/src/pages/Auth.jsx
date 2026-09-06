import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CheckSquare,
    Mail,
    Lock,
    User,
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    ShieldCheck,
} from "lucide-react";

import {
    login,
    signup,
    forgotPassword,
} from "../api/auth";

import { useAuth } from "../context/AuthContext";

const Auth = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] =
        useState(false);

    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // Input Change
    // =========================

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // =========================
    // Login / Signup
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            if (isLogin) {
                // =========================
                // LOGIN
                // =========================

                const response = await login({
                    email: formData.email,
                    password: formData.password,
                });

                console.log("Login response:", response);

                if (response.success) {
                    setUser(response.data);
                    window.location.href = "/dashboard";
                } else {
                    setError(
                        response.message ||
                        "Login failed. Please try again."
                    );
                }
            } else {
                // =========================
                // SIGNUP
                // =========================

                const response = await signup({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                console.log("Signup response:", response);

                // Signup does not automatically log in
                setIsLogin(true);

                setFormData({
                    name: "",
                    email: formData.email,
                    password: "",
                });

                setSuccessMessage(
                    "Account created successfully. Please login to continue."
                );
            }
        } catch (error) {
            console.error("Authentication error:", error);

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Forgot Password
    // =========================

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        setError("");
        setForgotMessage("");

        if (!forgotEmail.trim()) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await forgotPassword(forgotEmail);

            setForgotMessage(
                response?.message ||
                "If an account exists with this email, a reset link has been sent."
            );
        } catch (error) {
            console.error(
                "Forgot password error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to send password reset email."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Switch Login / Signup
    // =========================

    const switchAuthMode = () => {
        setIsLogin((prev) => !prev);

        setError("");
        setSuccessMessage("");
        setForgotMessage("");
        setShowPassword(false);

        setFormData({
            name: "",
            email: "",
            password: "",
        });
    };

    // =========================
    // Forgot Password Screen
    // =========================

    const openForgotPassword = () => {
        setShowForgotPassword(true);

        setError("");
        setSuccessMessage("");
        setForgotMessage("");
        setForgotEmail("");
    };

    const backToLogin = () => {
        setShowForgotPassword(false);

        setError("");
        setForgotMessage("");
        setForgotEmail("");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fc] px-4 py-8 sm:px-6">

            {/* Background */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">

                {/* Logo */}

                <Link
                    to="/"
                    className="mb-7 flex items-center justify-center gap-3 sm:mb-9"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-300">
                        <CheckSquare
                            size={23}
                            strokeWidth={2.4}
                        />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-slate-950">
                        Task
                        <span className="text-indigo-600">
                            Flow
                        </span>
                    </span>
                </Link>

                {/* Auth Card */}

                <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60">

                    {/* Top accent */}

                    <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500" />

                    <div className="p-6 sm:p-8">

                        {showForgotPassword ? (
                            <ForgotPasswordForm
                                email={forgotEmail}
                                setEmail={setForgotEmail}
                                loading={loading}
                                error={error}
                                message={forgotMessage}
                                onSubmit={handleForgotPassword}
                                onBack={backToLogin}
                            />
                        ) : (
                            <>

                                {/* Heading */}

                                <div className="mb-7 text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        {isLogin ? (
                                            <Lock size={22} />
                                        ) : (
                                            <User size={22} />
                                        )}
                                    </div>

                                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                        {isLogin
                                            ? "Welcome back"
                                            : "Create your account"}
                                    </h1>

                                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                        {isLogin
                                            ? "Sign in to continue managing your tasks."
                                            : "Create your account and start getting things done."}
                                    </p>
                                </div>

                                {/* Success Message */}

                                {successMessage && (
                                    <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-600">
                                        {successMessage}
                                    </div>
                                )}

                                {/* Error */}

                                {error && (
                                    <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                                        {error}
                                    </div>
                                )}

                                {/* Form */}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >

                                    {/* Name */}

                                    {!isLogin && (
                                        <InputField
                                            label="Full name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            icon={
                                                <User size={17} />
                                            }
                                        />
                                    )}

                                    {/* Email */}

                                    <InputField
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        icon={
                                            <Mail size={17} />
                                        }
                                    />

                                    {/* Password */}

                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="text-sm font-semibold text-slate-700">
                                                Password
                                            </label>

                                            {isLogin && (
                                                <button
                                                    type="button"
                                                    onClick={
                                                        openForgotPassword
                                                    }
                                                    className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                                                >
                                                    Forgot password?
                                                </button>
                                            )}
                                        </div>

                                        <div className="relative">

                                            <Lock
                                                size={17}
                                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                value={
                                                    formData.password
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                placeholder="Enter your password"
                                                required
                                                minLength={6}
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) =>
                                                            !prev
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={17} />
                                                ) : (
                                                    <Eye size={17} />
                                                )}
                                            </button>
                                        </div>

                                        {!isLogin && (
                                            <p className="mt-2 text-xs text-slate-400">
                                                Password must be at least
                                                6 characters.
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Please wait...
                                            </>
                                        ) : (
                                            <>
                                                {isLogin
                                                    ? "Sign in"
                                                    : "Create account"}

                                                <ArrowRight
                                                    size={17}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}

                                <div className="my-6 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-100" />

                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                        or
                                    </span>

                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                {/* Switch Auth */}

                                <div className="text-center text-sm text-slate-500">
                                    {isLogin
                                        ? "Don't have an account?"
                                        : "Already have an account?"}

                                    <button
                                        type="button"
                                        onClick={switchAuthMode}
                                        className="ml-1 font-bold text-indigo-600 transition hover:text-indigo-700"
                                    >
                                        {isLogin
                                            ? "Sign up"
                                            : "Sign in"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Security Footer */}

                    <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 text-[11px] font-medium text-slate-400">
                        <ShieldCheck size={14} />
                        Your information is securely protected
                    </div>
                </div>

                {/* Footer */}

                <p className="mx-auto mt-5 max-w-sm text-center text-[11px] leading-5 text-slate-400">
                    By continuing, you agree to our Terms of Service
                    and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

// =====================================================
// Input Field
// =====================================================

const InputField = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    icon,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </div>

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
            </div>
        </div>
    );
};

// =====================================================
// Forgot Password Form
// =====================================================

const ForgotPasswordForm = ({
    email,
    setEmail,
    loading,
    error,
    message,
    onSubmit,
    onBack,
}) => {
    return (
        <>
            {/* Back */}

            <button
                type="button"
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
                <ArrowLeft size={16} />
                Back to sign in
            </button>

            {/* Heading */}

            <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Mail size={22} />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Forgot password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your email address and we'll send you a
                    secure link to reset your password.
                </p>
            </div>

            {/* Error */}

            {error && (
                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                    {error}
                </div>
            )}

            {/* Success */}

            {message && (
                <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-600">
                    {message}
                </div>
            )}

            {/* Form */}

            <form
                onSubmit={onSubmit}
                className="space-y-5"
            >
                <InputField
                    label="Email address"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    icon={<Mail size={17} />}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-indigo-600 hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Send reset link

                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </>
                    )}
                </button>
            </form>
        </>
    );
};

export default Auth;