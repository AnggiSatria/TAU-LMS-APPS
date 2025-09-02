"use client";

import TaskList from "../organism/TaskList";
import { useReadTaskByClassId } from "@/shared/lib/services/tasks/hooks";
import { useReadClassesById } from "@/shared/lib/services/class/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";

interface Props {
  classId: string;
}

export default function TaskDetailClientPage({ classId }: Props) {
  const { data: profile } = useReadUserProfile({});
  const userProfile = profile?.data;

  const role = userProfile?.role;

  const { data: classDetail } = useReadClassesById({
    activeFilter: { search: "" },
    id: classId,
  });

  const { data: tasks } = useReadTaskByClassId({
    activeFilter: { search: "" },
    classId,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{classDetail?.data?.name}</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <TaskList tasks={tasks?.data || []} role={role} />
      </div>
    </div>
  );
}
