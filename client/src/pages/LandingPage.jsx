import { useEffect } from "react"; 
import { Link } from "react-router-dom";

const LandingPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Hero Section */}
            <main>
                <section className="relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

                    <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
                        {/* Hero Content */}
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                                Simple task management
                            </div>

                            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                                Get things done.
                                <span className="block text-indigo-400">
                                    Stay organized.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
                                Manage your tasks, track your progress, and
                                stay focused on what matters. Everything you
                                need to organize your work in one place.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    to="/dashboard"
                                    className="rounded-xl bg-indigo-500 px-7 py-3.5 text-center font-semibold transition hover:bg-indigo-400"
                                >
                                    Start Managing Tasks
                                </Link>

                                <a
                                    href="#features"
                                    className="rounded-xl border border-white/10 px-7 py-3.5 text-center font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Explore Features
                                </a>
                            </div>

                            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                                <span>✓ Easy to use</span>
                                <span>✓ Secure</span>
                                <span>✓ Responsive</span>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="relative">
                            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-indigo-950/30 backdrop-blur">
                                {/* Window Header */}
                                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-400/80" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                                        <div className="h-3 w-3 rounded-full bg-green-400/80" />
                                    </div>

                                    <div className="h-2 w-24 rounded bg-white/10" />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {/* Sidebar */}
                                    <div className="hidden rounded-xl bg-slate-800/60 p-4 sm:block">
                                        <div className="mb-6 h-3 w-20 rounded bg-white/10" />

                                        <div className="space-y-3">
                                            <div className="rounded-lg bg-indigo-500/20 p-3">
                                                <div className="h-2 w-16 rounded bg-indigo-400/60" />
                                            </div>

                                            <div className="p-3">
                                                <div className="h-2 w-20 rounded bg-white/10" />
                                            </div>

                                            <div className="p-3">
                                                <div className="h-2 w-14 rounded bg-white/10" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tasks */}
                                    <div className="sm:col-span-2">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <div className="h-4 w-28 rounded bg-white/20" />
                                                <div className="mt-2 h-2 w-36 rounded bg-white/10" />
                                            </div>

                                            <div className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold">
                                                + Task
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Task 1 */}
                                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-4">
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-indigo-400">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-400" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="h-3 w-40 rounded bg-white/20" />
                                                    <div className="mt-2 h-2 w-24 rounded bg-white/10" />
                                                </div>

                                                <span className="rounded-full bg-red-400/10 px-2 py-1 text-[10px] text-red-400">
                                                    High
                                                </span>
                                            </div>

                                            {/* Task 2 */}
                                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-4">
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-indigo-400">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-400" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="h-3 w-32 rounded bg-white/20" />
                                                    <div className="mt-2 h-2 w-20 rounded bg-white/10" />
                                                </div>

                                                <span className="rounded-full bg-yellow-400/10 px-2 py-1 text-[10px] text-yellow-400">
                                                    Medium
                                                </span>
                                            </div>

                                            {/* Task 3 */}
                                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/50 p-4">
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-green-400 bg-green-400/10">
                                                    <span className="text-[10px] text-green-400">
                                                        ✓
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="h-3 w-36 rounded bg-white/20" />
                                                    <div className="mt-2 h-2 w-20 rounded bg-white/10" />
                                                </div>

                                                <span className="rounded-full bg-green-400/10 px-2 py-1 text-[10px] text-green-400">
                                                    Done
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl sm:block">
                                <p className="text-xs text-slate-500">
                                    Completed
                                </p>
                                <p className="mt-1 text-xl font-bold">
                                    24 tasks
                                </p>
                            </div>

                            <div className="absolute -right-5 -top-6 hidden rounded-xl border border-white/10 bg-slate-900 p-4 shadow-xl sm:block">
                                <p className="text-xs text-slate-500">
                                    Productivity
                                </p>
                                <p className="mt-1 text-xl font-bold text-indigo-400">
                                    87%
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="border-t border-white/10 bg-slate-900/40"
                >
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                                Features
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything you need to manage your work
                            </h2>

                            <p className="mt-4 text-slate-400">
                                Keep your tasks organized without unnecessary
                                complexity.
                            </p>
                        </div>

                        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {/* Feature 1 */}
                            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-400/30">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    ✓
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Task Management
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Create, update, complete, and delete tasks
                                    from a single dashboard.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-400/30">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    ⚡
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Track Progress
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Track pending, in-progress, and completed
                                    tasks at a glance.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-400/30">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    🔒
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Secure
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Authentication and ownership checks keep
                                    your tasks private and protected.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-indigo-400/30">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    📱
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Responsive
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Manage your tasks comfortably on desktop,
                                    tablet, and mobile devices.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section id="how-it-works">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                                How it works
                            </p>

                            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                                Simple from start to finish
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold">
                                    1
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Create an account
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Sign up and securely access your personal
                                    task dashboard.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold">
                                    2
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Add your tasks
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Create tasks with descriptions, priorities,
                                    statuses, and due dates.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500 text-lg font-bold">
                                    3
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    Get things done
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Update your progress and keep everything
                                    organized in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-white/10">
                    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Ready to organize your tasks?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Stop keeping track of everything in your head.
                            Create your workspace and start managing your tasks
                            today.
                        </p>

                        <Link
                            to="/register"
                            className="mt-8 inline-block rounded-xl bg-indigo-500 px-8 py-3.5 font-semibold transition hover:bg-indigo-400"
                        >
                            Create Free Account
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
                            T
                        </div>

                        <span className="font-semibold">
                            TaskFlow
                        </span>
                    </div>

                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} TaskFlow. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;