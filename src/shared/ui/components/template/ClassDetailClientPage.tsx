"use client";

import TaskList from "../organism/TaskList";
import {
  useReadTaskByClassId,
  useReadTaskById,
} from "@/shared/lib/services/tasks/hooks";
import { useReadClassesById } from "@/shared/lib/services/class/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
import { useSearchParams } from "next/navigation";
import SubmissionList from "../organism/SubmissionsList";
import TaskDetailCard from "../organism/TaskDetailCard";
import { useModal } from "../../context/ModalContext";
import { AddClassMemberForm } from "./AddClassMember";
import { useReadClassMemberByClassId } from "@/shared/lib/services/classMembers/hooks";
import { useState } from "react";
import ClassMembersList from "./ClassMemberList";
import { useReadAssignmentByTaskAndUserId } from "@/shared/lib/services/assignments/hooks";
import AssignmentList from "../organism/AssignmentList";

interface Props {
  classId: string;
}

export default function ClassDetailClientPage({ classId }: Props) {
  const { data: profile } = useReadUserProfile({});

  const searchParams = useSearchParams();
  const task = searchParams.get("task");
  const list = searchParams.get("list");

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const { data: classDetail } = useReadClassesById({
    activeFilter: { search: "" },
    id: classId,
  });

  const { data: dataClassMembers, refetch } = useReadClassMemberByClassId({
    activeFilter: { search: "" },
    classId: classId,
  });

  const classMembers = dataClassMembers && dataClassMembers?.data;

  const { data: tasks } = useReadTaskByClassId({
    activeFilter: { search: "" },
    classId,
  });

  const { data: getTaskById } = useReadTaskById({
    activeFilter: { search: "" },
    id: task,
  });

  const taskById = getTaskById && getTaskById?.data;

  const { showModal } = useModal();

  const handleAddClassMember = () => {
    showModal(
      <AddClassMemberForm refetch={refetch} classId={classId} role={role} />
    );
  };

  const renderData = [
    {
      label: "Task",
      value: "task",
    },
    {
      label: "Members",
      value: "member",
    },
  ];

  const [active, setActive] = useState<string>("task");

  const renderActive = (value: string) => {
    switch (active) {
      case "task":
        setActive(value);
      case "member":
        setActive(value);
    }
  };

  return (
    <div className="p-6">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">{classDetail?.data?.name}</h1>
        {role === "teacher" && task === null && list === null && (
          <div className="flex cursor-pointer" onClick={handleAddClassMember}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#0a0a0a"
                d="M19 17v2H7v-2s0-4 6-4s6 4 6 4m-3-9a3 3 0 1 0-3 3a3 3 0 0 0 3-3m3.2 5.06A5.6 5.6 0 0 1 21 17v2h3v-2s0-3.45-4.8-3.94M18 5a2.9 2.9 0 0 0-.89.14a5 5 0 0 1 0 5.72A2.9 2.9 0 0 0 18 11a3 3 0 0 0 0-6M8 10H5V7H3v3H0v2h3v3h2v-3h3Z"
              />
            </svg>
          </div>
        )}
      </div>

      {task === null && (
        <div className="inline-flex w-full justify-between grid-cols-2 mt-6 gap-1.5">
          {renderData?.flatMap((res, idx) => {
            return (
              <div
                onClick={() => renderActive(res?.value)}
                key={idx}
                className={`flex w-full justify-center items-center font-semibold text-[#0a0a0a] cursor-pointer ${
                  active === res?.value ? "border-b-2 border-[#0a0a0a]" : ""
                }`}
              >
                {res?.label}
              </div>
            );
          })}
        </div>
      )}

      {task === null && (
        <div className="mt-6">
          {active === "task" ? (
            <>
              <h2 className="text-xl font-semibold">Tasks</h2>
              <TaskList tasks={tasks?.data || []} role={role} />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Class Members</h2>
              <ClassMembersList members={classMembers} />
            </>
          )}
        </div>
      )}

      {task !== null && list === null && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Task Detail</h2>
          <TaskDetailCard
            profile={userProfile}
            task={taskById}
            role={role}
            classId={classId}
          />
        </div>
      )}

      {task !== null && list === "submission" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Submission From Task</h2>
          <SubmissionList profile={userProfile} role={role} />
        </div>
      )}

      {task !== null && list === "assignment" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Assignment {taskById?.name}</h2>
          <AssignmentList profile={userProfile} role={role} />
        </div>
      )}
    </div>
  );
}
