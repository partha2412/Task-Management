import React, { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Search,
    CheckCircle2,
    Clock3,
    Circle,
    Pencil,
    Trash2,
    X,
    CalendarDays,
    Flag,
    ListTodo,
    LayoutList,
    Check,
    ChevronDown,
} from "lucide-react";

import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
} from "../api/tasks";

const emptyForm = {
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
};

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // =========================
    // Fetch Tasks
    // =========================

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllTasks();
            setTasks(response?.data || []);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load tasks."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // =========================
    // Form Handling
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setFormData(emptyForm);
        setError("");
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);

        setFormData({
            title: task.title || "",
            description: task.description || "",
            status: task.status || "pending",
            priority: task.priority || "medium",
            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : "",
        });

        setError("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;

        setIsModalOpen(false);
        setEditingTask(null);
        setFormData(emptyForm);
    };

    // =========================
    // Create / Update
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError("Task title is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            if (editingTask) {
                const response = await updateTask(
                    editingTask._id,
                    formData
                );

                const updatedTask = response?.data;

                setTasks((prev) =>
                    prev.map((task) =>
                        task._id === editingTask._id
                            ? updatedTask
                            : task
                    )
                );
            } else {
                const response = await createTask(formData);
                const newTask = response?.data;

                setTasks((prev) => [newTask, ...prev]);
            }

            closeModal();
        } catch (error) {
            console.error("Task save failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to save task."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // Delete
    // =========================

    const handleDelete = async (taskId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
            await deleteTask(taskId);

            setTasks((prev) =>
                prev.filter((task) => task._id !== taskId)
            );
        } catch (error) {
            console.error("Delete failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete task."
            );
        }
    };

    // =========================
    // Quick Status Update
    // =========================

    const handleStatusChange = async (task) => {
        const nextStatus =
            task.status === "completed"
                ? "pending"
                : "completed";

        try {
            const response = await updateTask(task._id, {
                status: nextStatus,
            });

            const updatedTask = response?.data;

            setTasks((prev) =>
                prev.map((item) =>
                    item._id === task._id
                        ? updatedTask
                        : item
                )
            );
        } catch (error) {
            console.error("Status update failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update task."
            );
        }
    };

    // =========================
    // Filtering
    // =========================

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const query = search.toLowerCase().trim();

            const matchesSearch =
                task.title?.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" ||
                task.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, search, statusFilter]);

    // =========================
    // Statistics
    // =========================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const completionPercentage =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

    return (
        <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
            {/* Background decoration */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
                <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl" />
            </div>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                {/* =========================
                    Header
                ========================= */}

                <section className="mb-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                Productivity Dashboard
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                My Tasks
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                                Organize your work, track progress, and
                                stay focused on what matters.
                            </p>
                        </div>

                        <button
                            onClick={openCreateModal}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-indigo-200 sm:w-auto"
                        >
                            <Plus
                                size={18}
                                className="transition-transform group-hover:rotate-90"
                            />
                            Create Task
                        </button>
                    </div>
                </section>

                {/* Error */}
                {error && !isModalOpen && (
                    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                        <span>{error}</span>

                        <button
                            onClick={() => setError("")}
                            className="rounded-lg p-1 hover:bg-red-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* =========================
                    Overview
                ========================= */}

                <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    <StatCard
                        title="Total Tasks"
                        value={totalTasks}
                        icon={<ListTodo size={20} />}
                        description="All your tasks"
                    />

                    <StatCard
                        title="Pending"
                        value={pendingTasks}
                        icon={<Clock3 size={20} />}
                        description="Waiting to start"
                    />

                    <StatCard
                        title="In Progress"
                        value={inProgressTasks}
                        icon={<LayoutList size={20} />}
                        description="Currently working"
                    />

                    <StatCard
                        title="Completed"
                        value={completedTasks}
                        icon={<CheckCircle2 size={20} />}
                        description={`${completionPercentage}% completion`}
                    />
                </section>

                {/* =========================
                    Toolbar
                ========================= */}

                <section className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative sm:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                            >
                                <option value="all">All Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">
                                    In Progress
                                </option>
                                <option value="completed">
                                    Completed
                                </option>
                            </select>

                            <ChevronDown
                                size={17}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                        <p className="text-xs text-slate-400">
                            Showing{" "}
                            <span className="font-semibold text-slate-600">
                                {filteredTasks.length}
                            </span>{" "}
                            {filteredTasks.length === 1
                                ? "task"
                                : "tasks"}
                        </p>

                        {(search || statusFilter !== "all") && (
                            <button
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter("all");
                                }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </section>

                {/* =========================
                    Tasks
                ========================= */}

                {loading ? (
                    <LoadingState />
                ) : filteredTasks.length === 0 ? (
                    <EmptyState
                        hasTasks={tasks.length > 0}
                        onCreate={openCreateModal}
                    />
                ) : (
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* =========================
                Modal
            ========================= */}

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div className="max-h-[95vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-xl sm:rounded-3xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                        {editingTask ? (
                                            <Pencil size={16} />
                                        ) : (
                                            <Plus size={18} />
                                        )}
                                    </div>

                                    <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                                        {editingTask
                                            ? "Edit Task"
                                            : "Create Task"}
                                    </h2>
                                </div>

                                <p className="text-xs text-slate-500 sm:text-sm">
                                    {editingTask
                                        ? "Update your task details."
                                        : "Add something new to your workflow."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-5 sm:p-7"
                        >
                            {error && (
                                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            {/* Title */}
                            <FormField label="Task title">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Complete project report"
                                    required
                                    maxLength={100}
                                    className="input-premium"
                                />
                            </FormField>

                            {/* Description */}
                            <FormField label="Description">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Add some details about this task..."
                                    rows={4}
                                    maxLength={1000}
                                    className="input-premium resize-none"
                                />
                            </FormField>

                            {/* Status / Priority */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <FormField label="Status">
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="input-premium appearance-none"
                                    >
                                        <option value="pending">
                                            Pending
                                        </option>
                                        <option value="in-progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>
                                </FormField>

                                <FormField label="Priority">
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="input-premium appearance-none"
                                    >
                                        <option value="low">
                                            Low
                                        </option>
                                        <option value="medium">
                                            Medium
                                        </option>
                                        <option value="high">
                                            High
                                        </option>
                                    </select>
                                </FormField>
                            </div>

                            {/* Due Date */}
                            <FormField label="Due date">
                                <div className="relative">
                                    <CalendarDays
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="input-premium pl-11"
                                    />
                                </div>
                            </FormField>

                            {/* Actions */}
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={17} />
                                            {editingTask
                                                ? "Update Task"
                                                : "Create Task"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tailwind custom utility */}
            <style>{`
                .input-premium {
                    width: 100%;
                    border-radius: 0.75rem;
                    border: 1px solid rgb(226 232 240);
                    background: rgb(248 250 252);
                    padding: 0.75rem 1rem;
                    font-size: 0.875rem;
                    color: rgb(15 23 42);
                    outline: none;
                    transition: all 0.2s ease;
                }

                .input-premium::placeholder {
                    color: rgb(148 163 184);
                }

                .input-premium:focus {
                    border-color: rgb(129 140 248);
                    background: white;
                    box-shadow: 0 0 0 4px rgb(238 242 255);
                }
            `}</style>
        </div>
    );
};

// =====================================================
// Form Field
// =====================================================

const FormField = ({ label, children }) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            {children}
        </div>
    );
};

// =====================================================
// Stat Card
// =====================================================

const StatCard = ({
    title,
    value,
    icon,
    description,
}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-indigo-50 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                        {value}
                    </p>

                    <p className="mt-1 hidden text-xs text-slate-400 sm:block">
                        {description}
                    </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10">
                    {icon}
                </div>
            </div>
        </div>
    );
};

// =====================================================
// Task Card
// =====================================================

const TaskCard = ({
    task,
    onEdit,
    onDelete,
    onStatusChange,
}) => {
    const priorityStyles = {
        low: "border-emerald-100 bg-emerald-50 text-emerald-600",
        medium: "border-amber-100 bg-amber-50 text-amber-600",
        high: "border-red-100 bg-red-50 text-red-600",
    };

    const statusStyles = {
        pending: "bg-slate-100 text-slate-600",
        "in-progress": "bg-indigo-50 text-indigo-600",
        completed: "bg-emerald-50 text-emerald-600",
    };

    const formattedDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        )
        : null;

    const isCompleted = task.status === "completed";

    return (
        <article
            className={`group rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 sm:p-5 ${isCompleted
                    ? "border-emerald-100/80"
                    : "border-slate-200/80 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg"
                }`}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                {/* Checkbox */}
                <button
                    type="button"
                    onClick={() => onStatusChange(task)}
                    className="mt-0.5 shrink-0 rounded-full transition-transform hover:scale-105"
                    title="Toggle completed"
                >
                    {isCompleted ? (
                        <CheckCircle2
                            size={24}
                            className="text-emerald-500"
                            strokeWidth={2}
                        />
                    ) : (
                        <Circle
                            size={24}
                            className="text-slate-300 transition-colors hover:text-indigo-500"
                            strokeWidth={1.8}
                        />
                    )}
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3
                            className={`min-w-0 break-words text-sm font-bold sm:text-base ${isCompleted
                                    ? "text-slate-400 line-through"
                                    : "text-slate-900"
                                }`}
                        >
                            {task.title}
                        </h3>

                        <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${statusStyles[task.status]
                                }`}
                        >
                            {task.status === "in-progress"
                                ? "In Progress"
                                : task.status
                                    .charAt(0)
                                    .toUpperCase() +
                                task.status.slice(1)}
                        </span>
                    </div>

                    {task.description && (
                        <p
                            className={`mt-2 line-clamp-2 text-xs leading-5 sm:text-sm sm:leading-6 ${isCompleted
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        >
                            {task.description}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                        {task.priority && (
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${priorityStyles[task.priority]
                                    }`}
                            >
                                <Flag size={11} />
                                {task.priority}
                            </span>
                        )}

                        {formattedDate && (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 sm:text-xs">
                                <CalendarDays size={13} />
                                {formattedDate}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-0.5 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        title="Edit task"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(task._id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete task"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </article>
    );
};

// =====================================================
// Loading
// =====================================================

const LoadingState = () => {
    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-10 shadow-sm sm:p-14">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-center text-sm font-medium text-slate-500">
                Loading your tasks...
            </p>
        </div>
    );
};

// =====================================================
// Empty State
// =====================================================

const EmptyState = ({ hasTasks, onCreate }) => {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                <CheckCircle2 size={28} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
                No tasks found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                {hasTasks
                    ? "No tasks match your current search or filter."
                    : "Create your first task and start organizing your work."}
            </p>

            {!hasTasks && (
                <button
                    onClick={onCreate}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-600"
                >
                    <Plus size={17} />
                    Create your first task
                </button>
            )}
        </div>
    );
};

export default HomePage;