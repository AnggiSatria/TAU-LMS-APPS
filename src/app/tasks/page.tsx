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

  console.log(taskByUserId);

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

        {!loading && (
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
      </main>
    </div>
  );
}
