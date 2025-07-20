"use client";
import { IResponseTaskDetail } from "@/shared/lib/interfaces/tasks.interfaces";
import { useReadTaskByUserId } from "@/shared/lib/services/tasks/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
// app/tugas/page.tsx
import Sidebar from "@/shared/ui/components/organism";
import { CreateTaskForm } from "@/shared/ui/components/template/CreateTaskForm";
import { useModal } from "@/shared/ui/context/ModalContext";
import dayjs from "dayjs";
import { CSSProperties } from "react";
import { ClockLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function TaskPage() {
  const { showModal } = useModal();
  const activeFilter = {
    search: "",
  };

  const { data: profile } = useReadUserProfile({
    activeFilter: activeFilter,
  });

  const {
    data: dataTaskByUserId,
    refetch,
    isLoading: loading,
  } = useReadTaskByUserId({
    activeFilter: { search: "" },
    userId: profile?.data?.id,
  });

  const taskByUserId = dataTaskByUserId?.data;

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const handleCreateClass = () => {
    showModal(<CreateTaskForm refetch={refetch} profile={userProfile} />);
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

        <ClockLoader
          color={"#0a0a0a"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        {!loading && taskByUserId?.length !== 0 && (
          <ul className="space-y-4">
            {taskByUserId?.map((task: IResponseTaskDetail, idx: number) => (
              <li key={idx} className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-blue-600">
                  {task?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Deadline: {dayjs(task?.due_date).format(`DD MMMM YYYY`)}
                </p>
              </li>
            ))}
          </ul>
        )}

        {!loading && taskByUserId?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM4.5 15a7.5 7.5 0 0115 0v0a3.75 3.75 0 01-7.5 0m-7.5 0a7.5 7.5 0 0115 0v0m-15 0a3.75 3.75 0 017.5 0"
              />
            </svg>
            <p className="text-lg font-medium">No data found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your filter or add new data.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
