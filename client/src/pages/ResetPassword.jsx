import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    CheckSquare,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";

import { resetPassword } from "../api/auth";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!token) {
            setError("Invalid password reset link.");
            return;
        }

        try {
            setLoading(true);

            const response = await resetPassword(
                token,
                password
            );

            setSuccess(
                response?.message ||
                "Password reset successfully."
            );

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/auth");
            }, 2000);
        } catch (error) {
            console.error(
                "Reset password error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "The reset link is invalid or has expired."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fc] px-4 py-8 sm:px-6">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <Link
                    to="/"
                    className="mb-8 flex items-center justify-center gap-3"
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

                {/* Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60">
                    {/* Accent */}
                    <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500" />

                    <div className="p-6 sm:p-8">
                        {/* Icon */}
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            {success ? (
                                <CheckCircle2 size={24} />
                            ) : (
                                <Lock size={22} />
                            )}
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                            {success
                                ? "Password updated"
                                : "Reset your password"}
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {success
                                ? "Your password has been updated successfully. Redirecting you to login..."
                                : "Create a new password for your TaskFlow account."}
                        </p>

                        {/* Error */}
                        {error && (
                            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-600">
                                {success}
                            </div>
                        )}

                        {!success && (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-7 space-y-5"
                            >
                                {/* New Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        New password
                                    </label>

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
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Enter new password"
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
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={17}
                                                />
                                            ) : (
                                                <Eye
                                                    size={17}
                                                />
                                            )}
                                        </button>
                                    </div>

                                    <p className="mt-2 text-xs text-slate-400">
                                        Password must be at least
                                        6 characters.
                                    </p>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={17}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="Confirm new password"
                                            required
                                            minLength={6}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff
                                                    size={17}
                                                />
                                            ) : (
                                                <Eye
                                                    size={17}
                                                />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Updating password...
                                        </>
                                    ) : (
                                        <>
                                            Update password
                                            <ArrowRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Back to login */}
                        {success && (
                            <Link
                                to="/auth"
                                className="mt-5 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                                Go to login
                            </Link>
                        )}
                    </div>

                    {/* Security footer */}
                    <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 text-[11px] font-medium text-slate-400">
                        <ShieldCheck size={14} />
                        Your password is securely encrypted
                    </div>
                </div>

                <p className="mt-5 text-center text-[11px] text-slate-400">
                    © {new Date().getFullYear()} TaskFlow
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;