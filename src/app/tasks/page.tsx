"use client";
import { IResponseTaskDetail } from "@/shared/lib/interfaces/tasks.interfaces";
import { useReadTaskByUserId } from "@/shared/lib/services/tasks/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
import Button from "@/shared/ui/components/atoms/Button";
import Sidebar from "@/shared/ui/components/organism";
import { CreateTaskForm } from "@/shared/ui/components/template/CreateTaskForm";
import { UpdatedTaskForm } from "@/shared/ui/components/template/UpdatedTaskFrom";
import { useModal } from "@/shared/ui/context/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { CSSProperties, useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { GlobalSearch } from "@/shared/ui/components/organism/GlobalSearch";
import { useSearchStore } from "@/shared/store/useSearchStore";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function TaskPage() {
  const { keyword } = useSearchStore();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const { showModal } = useModal();

  const { data: profile } = useReadUserProfile({});

  const [active, setActive] = useState<string>("active");

  const {
    data: dataTaskByUserId,
    refetch,
    isLoading: loading,
  } = useReadTaskByUserId({
    activeFilter: {
      search: keyword,
      status: active,
      per_page: "12",
      page: page.toString(),
    },
    userId: profile?.data?.id,
  });

  const taskByUserId = dataTaskByUserId?.data;

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const handleCreateTask = () => {
    showModal(<CreateTaskForm refetch={refetch} profile={userProfile} />);
  };

  const handleUpdatedTask = (id: string) => {
    showModal(
      <UpdatedTaskForm id={id} refetch={refetch} profile={userProfile} />
    );
  };

  useEffect(() => {
    if (!loading && taskByUserId) {
      setPagination({
        current_page: taskByUserId.current_page,
        last_page: taskByUserId.last_page,
        next_page_url: taskByUserId.next_page_url,
        prev_page_url: taskByUserId.prev_page_url,
      });
    }
  }, [loading, taskByUserId]);

  const router = useRouter();

  const renderData = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Expired",
      value: "expired",
    },
  ];

  const renderActive = (value: string) => {
    switch (active) {
      case "active":
        setActive(value);
      case "expired":
        setActive(value);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">List Task</h1>

          <div className="flex gap-3">
            <div
              className={`flex ${role === "teacher" ? `w-[53.5%]` : `w-full`}`}
            >
              <GlobalSearch placeHolder="Search Task..." />
            </div>
            {role === "teacher" && (
              <Button
                onClick={handleCreateTask}
                styles="bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                + Create Task
              </Button>
            )}
          </div>
        </div>

        <ClockLoader
          color={"#0a0a0a"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        <div className="flex w-full flex-col gap-3">
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

          {!loading && taskByUserId?.data?.length !== 0 && (
            <ul className="space-y-4 mt-6">
              {taskByUserId?.data?.map(
                (task: IResponseTaskDetail, idx: number) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg flex"
                  >
                    <div className="flex w-11/12 flex-col">
                      <h2
                        onClick={() =>
                          router.push(
                            `/classes/${task?.class_id}?task=${task?.id}`
                          )
                        }
                        className="w-fit text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                      >
                        {task?.name} - {task?.class?.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Deadline: {dayjs(task?.due_date).format(`DD MMMM YYYY`)}
                      </p>
                    </div>
                    {role === "teacher" && (
                      <div className="flex w-1/12">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="hover:text-blue-600 transition cursor-pointer"
                          onClick={() => handleUpdatedTask(task?.id)}
                        />
                      </div>
                    )}
                  </div>
                )
              )}
            </ul>
          )}

          {!loading && taskByUserId?.data?.length === 0 && (
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

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    pagination.prev_page_url && setPage((prev) => prev - 1)
                  }
                />
              </PaginationItem>

              {/* Render halaman dinamis */}
              {Array.from(
                { length: pagination.last_page },
                (_, i) => i + 1
              ).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === pagination.current_page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {pagination.current_page < pagination.last_page && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      pagination.next_page_url && setPage((prev) => prev + 1)
                    }
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
