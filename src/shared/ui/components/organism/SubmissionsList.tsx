import { ITaskSubmission } from "@/shared/lib/interfaces/task-submissions.interface";
import { IUser } from "@/shared/lib/interfaces/users.interfaces";
import { useReadAssignmentByTaskAndUserId } from "@/shared/lib/services/assignments/hooks";
import { useReadTaskSubmissionByTaskId } from "@/shared/lib/services/task_submissions/hooks";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useModal } from "../../context/ModalContext";
import { CreateAssignmentForm } from "../template/CreateAssignmentTask";
import { ISubmissionWithAssignment } from "@/shared/lib/interfaces/assignments.interface";
import { FileText } from "lucide-react";
import dayjs from "dayjs";

interface Props {
  role: string;
  profile: IUser;
}

export default function SubmissionList({ profile }: Props) {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");

  const { data: dataAssignmentByTaskAndUserId, isLoading: loadingAssignment } =
    useReadAssignmentByTaskAndUserId({
      activeFilter: { search: "" },
      taskId: task,
      userId: profile?.id,
    });

  const {
    data: dataTaskSubmissionByTaskId,
    isLoading: loadingSubmission,
    refetch,
  } = useReadTaskSubmissionByTaskId({
    activeFilter: { search: "" },
    taskId: task,
  });

  const assignmentByTaskAndUserId =
    dataAssignmentByTaskAndUserId && dataAssignmentByTaskAndUserId?.data;

  const taskSubmissionByTaskId =
    dataTaskSubmissionByTaskId && dataTaskSubmissionByTaskId?.data;

  const combinedData: ISubmissionWithAssignment[] =
    taskSubmissionByTaskId?.map((submission: ITaskSubmission) => {
      const relatedAssignment = assignmentByTaskAndUserId?.find(
        (a: any) => a.task_id === submission.task_id
      );

      return {
        ...submission,
        assignment: relatedAssignment || null,
      };
    }) || [];

  const { showModal } = useModal();

  const handleSubmitAssignment = () => {
    showModal(
      <CreateAssignmentForm
        refetch={refetch}
        taskId={task}
        userId={profile?.id}
      />
    );
  };

  if (loadingSubmission || loadingAssignment) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!combinedData || combinedData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
        <FileText className="w-12 h-12 mb-3" />
        <p className="text-lg font-medium">No submissions found</p>
        <p className="text-sm">There are no task submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-4 space-y-4">
      {combinedData?.map((submission: ISubmissionWithAssignment) => {
        const isDisabledBtn = submission?.assignment !== null;

        return (
          <div
            key={submission.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h2 className="text-lg font-semibold">
                  {submission?.user?.first_name} {submission?.user?.last_name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {submission?.user?.email}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-medium">Task:</span>{" "}
                  {submission?.task?.name}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Submitted at:</span>{" "}
                  {dayjs(submission?.submitted_at).format("DD MMM YYYY HH:mm")}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 flex gap-2">
                <a
                  href={submission?.task?.media_url}
                  target="_blank"
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Lihat Soal
                </a>
                <a
                  href={submission?.answer_file_url || `/`}
                  target="_blank"
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  Lihat Jawaban
                </a>
              </div>
            </div>
            <p className="mt-3 text-gray-700 text-sm">
              <span className="font-medium">Answer Text:</span>{" "}
              {submission?.answer_text}
            </p>

            <div className="flex mt-3 justify-end">
              <button
                disabled={isDisabledBtn}
                onClick={handleSubmitAssignment}
                className="mt-3 w-full font-semibold cursor-pointer sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition disabled:bg-gray-300"
              >
                Assign
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
