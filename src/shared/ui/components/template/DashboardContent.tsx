"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useReadClasses } from "@/shared/lib/services/class/hooks";
import { useSearchStore } from "@/shared/store/useSearchStore";
import React, { CSSProperties, useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function DashboardContent() {
  const { keyword } = useSearchStore();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  const activeFilter = {
    search: keyword,
    per_page: "12",
    page: page.toString(),
  };

  const { data: getClassess, isLoading } = useReadClasses({ activeFilter });

  const classesData = getClassess?.data;

  useEffect(() => {
    if (!isLoading && classesData) {
      setPagination({
        current_page: classesData.current_page,
        last_page: classesData.last_page,
        next_page_url: classesData.next_page_url,
        prev_page_url: classesData.prev_page_url,
      });
    }
  }, [isLoading, classesData]);

  return (
    <div className="flex flex-col gap-3">
      <ClockLoader
        color={"#0a0a0a"}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {!isLoading && classesData?.data?.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classesData?.data?.map((kelas: any) => (
            <div
              key={kelas.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {kelas.name}
              </h2>
              <p className="text-sm text-gray-600">Kelas {kelas.name}</p>
            </div>
          ))}
        </div>
      )}

      {!isLoading && classesData?.data?.length === 0 && (
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
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
            (p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === pagination.current_page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

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
  );
}
