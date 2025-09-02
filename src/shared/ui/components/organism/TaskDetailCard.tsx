"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useModal } from "../../context/ModalContext";
import { CreateSubmissionForm } from "../template/CreateSubmissionTask";
import { useReadTaskSubmissionByUserId } from "@/shared/lib/services/task_submissions/hooks";
import { IUser } from "@/shared/lib/interfaces/users.interfaces";

interface TaskDetailProps {
  task: {
    id: string;
    name: string;
    description: string;
    media_url: string;
    due_date: string;
    created_at: string;
    updated_at: string;
    class: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
    };
  };
  role: string;
  classId: string;
  profile: IUser;
}

const TaskDetailCard: React.FC<TaskDetailProps> = ({
  task,
  role,
  classId,
  profile,
}) => {
  const { data: dataTaskSubmissionByUserId, refetch } =
    useReadTaskSubmissionByUserId({
      activeFilter: { search: "" },
      userId: profile?.id,
    });

  const taskSubmmisionByUserId =
    dataTaskSubmissionByUserId && dataTaskSubmissionByUserId?.data;

  const router = useRouter();
  const handleNavigation = () => {
    switch (role) {
      case "teacher":
        router.push(`/classes/${classId}?task=${task?.id}&list=submission`);
        break;
      case "student":
        router.push(`/classes/${classId}?task=${task?.id}&list=assignment`);
    }
  };

  const { showModal } = useModal();

  const handleSubmitTask = () => {
    showModal(
      <CreateSubmissionForm
        refetch={refetch}
        userId={profile?.id}
        taskId={task?.id}
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {task?.name}
          </h2>
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
            {task?.class?.name}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base">
          {task?.description}
        </p>

        {/* Media */}
        {task?.media_url && (
          <div className="border rounded-lg p-3 bg-gray-50">
            <p className="text-gray-700 text-sm mb-2">Attachment:</p>
            <a
              href={task?.media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {task?.media_url.split("/").pop()}
            </a>
          </div>
        )}

        {/* Due Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-gray-500 text-sm">
            <span className="font-medium text-gray-700">Due Date:</span>{" "}
            {new Date(task?.due_date).toLocaleString()}
          </p>
          {role === "teacher" ? (
            <button
              onClick={handleNavigation}
              className="w-full font-semibold cursor-pointer sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              {role === "teacher"
                ? "View Submissions"
                : "View Score Assignment"}
            </button>
          ) : (
            <div className="flex w-1/2 justify-end gap-5">
              <button
                onClick={handleNavigation}
                className="w-full font-semibold cursor-pointer sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                {role === "teacher"
                  ? "View Submissions"
                  : "View Score Assignment"}
              </button>

              <button
                onClick={handleSubmitTask}
                className="w-full font-semibold cursor-pointer sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                Submit Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailCard;
