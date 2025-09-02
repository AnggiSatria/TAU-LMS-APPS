import Link from "next/link";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
}

interface Props {
  tasks: Task[];
  role: "student" | "teacher";
}

export default function TaskList({ tasks, role }: Props) {
  const params = useParams();
  const classId = params.id;

  if (tasks.length === 0)
    return <p className="text-gray-500">No tasks available.</p>;

  return (
    <div className="grid gap-4 mt-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded shadow">
          <h3 className="font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {task.due_date}</p>

          <Link
            href={
              role === "teacher"
                ? `/classes/${classId}?task=${task.id}`
                : `/classes/${classId}?task=${task.id}`
              // &list=submission &list=assignment
            }
            className="mt-2 inline-block text-blue-500 hover:underline"
          >
            View Task Detail
          </Link>
        </div>
      ))}
    </div>
  );
}
