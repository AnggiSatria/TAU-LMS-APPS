import { IAssignment } from "@/shared/lib/interfaces/assignments.interface";
import { IUser } from "@/shared/lib/interfaces/users.interfaces";
import { useReadAssignmentByTaskId } from "@/shared/lib/services/assignments/hooks";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FileText } from "lucide-react"; // ikon lucide-react

interface Props {
  role: string;
  profile: IUser;
}

export default function AssignmentList({ profile }: Props) {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");

  const { data: dataAssignmentByTaskAndUserId, isLoading } =
    useReadAssignmentByTaskId({
      activeFilter: { search: "" },
      taskId: task,
    });

  const assignmentByTaskAndUserId =
    dataAssignmentByTaskAndUserId && dataAssignmentByTaskAndUserId?.data;

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!assignmentByTaskAndUserId || assignmentByTaskAndUserId.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
        <FileText className="w-12 h-12 mb-3" />
        <p className="text-lg font-medium">No assignments found</p>
        <p className="text-sm">There are no submissions for this task yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {assignmentByTaskAndUserId.map((item: IAssignment) => (
        <div
          key={item?.id}
          className="rounded-2xl border border-gray-200 shadow-md p-5 bg-white hover:shadow-lg transition"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {item?.task?.name}
            </h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              Score: {item?.score}
            </span>
          </div>

          {/* User Info */}
          <div className="text-sm text-gray-600 mb-2">
            Submitted by:{" "}
            <span className="font-medium text-gray-800">
              {item?.user?.first_name} {item?.user?.last_name}
            </span>{" "}
            ({item?.user?.email})
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-3">
            {item?.task?.description}
          </p>

          {/* Links & Dates */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <a
              href={item?.task?.media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              📎 View Task File
            </a>
            <div>
              <span className="mr-3">
                Due: {dayjs(item?.task?.due_date).format("DD MMM YYYY HH:mm")}
              </span>
              <span>
                Submitted:{" "}
                {dayjs(item?.submitted_at).format("DD MMM YYYY HH:mm")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
