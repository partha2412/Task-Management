import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Shield,
    CalendarDays,
    Pencil,
    Save,
    X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, setUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        profileImage: user?.profileImage || "",
    });

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Please login to view your profile
                    </h2>

                    <Link
                        to="/auth"
                        className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            profileImage: user.profileImage || "",
        });

        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            profileImage: user.profileImage || "",
        });

        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Connect this to your update-profile API later.
        setUser({
            ...user,
            ...formData,
        });

        setIsEditing(false);
    };

    const profileImage =
        user.profileImage ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || "User"
        )}&background=4f46e5&color=fff&bold=true`;

    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        )
        : "N/A";

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your account information.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600" />

                    {/* Profile Header */}
                    <div className="px-6 pb-6 sm:px-8">
                        <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex items-end gap-4">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                                />

                                <div className="pb-1">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {user.name}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    <Pencil size={16} />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="border-t border-slate-100 px-6 py-7 sm:px-8">

                        <h3 className="mb-6 text-lg font-semibold text-slate-900">
                            Account Information
                        </h3>

                        {isEditing ? (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Email
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                        />
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Profile Image URL
                                    </label>

                                    <input
                                        type="url"
                                        name="profileImage"
                                        value={formData.profileImage}
                                        onChange={handleChange}
                                        placeholder="https://example.com/profile.jpg"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        <Save size={16} />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Name */}
                                <InfoItem
                                    icon={<User size={18} />}
                                    label="Full Name"
                                    value={user.name}
                                />

                                {/* Email */}
                                <InfoItem
                                    icon={<Mail size={18} />}
                                    label="Email Address"
                                    value={user.email}
                                />

                                {/* Role */}
                                <InfoItem
                                    icon={<Shield size={18} />}
                                    label="Role"
                                    value={
                                        user.role
                                            ? user.role
                                                .charAt(0)
                                                .toUpperCase() +
                                            user.role.slice(1)
                                            : "User"
                                    }
                                />

                                {/* Joined */}
                                <InfoItem
                                    icon={
                                        <CalendarDays size={18} />
                                    }
                                    label="Joined"
                                    value={joinedDate}
                                />
                            </div>
                        )}
                    </div>

                    {/* Account Status */}
                    <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Account Status
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Current status of your TaskFlow account.
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {user.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">
                        {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;