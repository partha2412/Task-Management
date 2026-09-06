import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    LayoutDashboard,
    LogOut,
    ChevronDown,
    CheckSquare,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { getCurrentUser, logout } from "../api/auth";

const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();

                if (response?.data) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            }
        };

        checkAuth();
    }, [setUser]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Logout
    const handleLogout = async () => {
        try {
            await logout();

            setUser(null);
            setIsOpen(false);

            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Default profile image
    const profileImage =
        user?.profilePic ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=4f46e5&color=fff&bold=true`;

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        });
                    }}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                        <CheckSquare size={22} strokeWidth={2.5} />
                    </div>

                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Task<span className="text-indigo-600">Flow</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-8 md:flex">
                    
                </div>

                {/* Right Section */}
                <div className="flex items-center">

                    {/* Not Authenticated */}
                    {!user ? (
                        <Link
                            to="/auth"
                            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                        >
                            Login
                        </Link>
                    ) : (
                        /* Authenticated */
                        <div
                            ref={dropdownRef}
                            className="relative"
                        >
                            {/* Profile Button */}
                            <button
                                type="button"
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100"
                            >
                                <img
                                    src={profileImage}
                                    alt={`${user.name || "User"} profile`}
                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-200"
                                />

                                <span className="hidden max-w-32 truncate text-sm font-semibold text-slate-700 sm:block">
                                    {user.name || "User"}
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown */}
                            {isOpen && (
                                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                                    {/* User Information */}
                                    <div className="border-b border-slate-100 px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="h-10 w-10 rounded-full object-cover"
                                            />

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {user.name || "User"}
                                                </p>

                                                <p className="truncate text-xs text-slate-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard */}
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600"
                                    >
                                        <LayoutDashboard size={18} />
                                        Dashboard
                                    </Link>

                                    {/* Profile */}
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600"
                                    >
                                        <User size={18} />
                                        Profile
                                    </Link>

                                    {/* Logout */}
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;