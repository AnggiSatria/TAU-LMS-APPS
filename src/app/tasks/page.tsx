"use client";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
// app/tugas/page.tsx
import Sidebar from "@/shared/ui/components/organism";

export default function TaskPage() {
  const activeFilter = {
    search: "",
  };

  const { data: profile } = useReadUserProfile({
    activeFilter: activeFilter,
  });

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const handleCreateClass = () => {
    alert("Redirect ke form pembuatan kelas");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">List Task</h1>
          {role === "teacher" && (
            <button
              onClick={handleCreateClass}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer"
            >
              + Create Task
            </button>
          )}
        </div>

        <ul className="space-y-4">
          {[
            { title: "Tugas 1 - Matematika", due: "10 Juli 2025" },
            { title: "Tugas 2 - Biologi", due: "12 Juli 2025" },
            { title: "Tugas 3 - Sejarah", due: "15 Juli 2025" },
          ].map((task, idx) => (
            <li key={idx} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-blue-600">
                {task.title}
              </h2>
              <p className="text-sm text-gray-600">Deadline: {task.due}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
