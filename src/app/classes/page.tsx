// app/kelas/page.tsx
"use client";

import { IResponseClassDetail } from "@/shared/lib/interfaces/classes.interface";
import { useReadClassMemberByUserId } from "@/shared/lib/services/classMembers/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
import Sidebar from "@/shared/ui/components/organism";
import { CreateClassForm } from "@/shared/ui/components/template/CreateClassForm";
import { useModal } from "@/shared/ui/context/ModalContext";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { UpdatedClassForm } from "@/shared/ui/components/template/UpdatedClassForm";
import dayjs from "dayjs";
import Button from "@/shared/ui/components/atoms/Button";
import { useSearchStore } from "@/shared/store/useSearchStore";
import { GlobalSearch } from "@/shared/ui/components/organism/GlobalSearch";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ClassesPage() {
  const router = useRouter();
  const { keyword } = useSearchStore();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const { showModal } = useModal();

  const { data: profile } = useReadUserProfile({
    activeFilter: {
      search: "",
    },
  });

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const {
    data: classesData,
    refetch,
    isLoading: loading,
  } = useReadClassMemberByUserId({
    activeFilter: { search: keyword, per_page: "12", page: page.toString() },
    userId: userProfile?.id,
  });

  const classes = classesData?.data;

  useEffect(() => {
    if (!loading && classes) {
      setPagination({
        current_page: classes.current_page,
        last_page: classes.last_page,
        next_page_url: classes.next_page_url,
        prev_page_url: classes.prev_page_url,
      });
    }
  }, [loading, classes]);

  const handleCreateClass = () => {
    showModal(<CreateClassForm refetch={refetch} profile={userProfile} />);
  };

  const handleUpdatedClass = (id: string) => {
    showModal(<UpdatedClassForm id={id} refetch={refetch} />);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Classes</h1>

          <div className="flex gap-3">
            <div
              className={`flex ${role === "teacher" ? `w-[53.5%]` : `w-full`}`}
            >
              <GlobalSearch />
            </div>
            {role === "teacher" && (
              <Button
                type="button"
                onClick={handleCreateClass}
                styles="bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
              >
                + Create Classes
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
          {!loading && classes?.data?.length !== 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes?.data?.map((res: IResponseClassDetail, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex"
                >
                  <div className="flex w-11/12 flex-col">
                    <h2
                      className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
                      onClick={() => {
                        router.push(`/classes/${res?.id}`);
                      }}
                    >
                      {res?.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Created : {dayjs(res?.created_at).format("DD MMMM YYYY")}
                    </p>
                  </div>
                  {role === "teacher" && (
                    <div className="flex w-1/12">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="hover:text-blue-600 transition cursor-pointer"
                        onClick={() => handleUpdatedClass(res?.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && classes?.data?.length === 0 && (
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
