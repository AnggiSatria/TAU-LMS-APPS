// app/kelas/page.tsx
"use client";

import { IResponseClassDetail } from "@/shared/lib/interfaces/classes.interface";
import { useReadClassMemberByUserId } from "@/shared/lib/services/classMembers/hooks";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";
import Sidebar from "@/shared/ui/components/organism";
import { CreateClassForm } from "@/shared/ui/components/template/CreateClassForm";
import { useModal } from "@/shared/ui/context/ModalContext";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { ClockLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function KelasPage() {
  const router = useRouter();
  const { showModal } = useModal();
  const activeFilter = {
    search: "",
  };

  const { data: profile } = useReadUserProfile({
    activeFilter: activeFilter,
  });

  const userProfile = profile?.data;

  const role = userProfile?.role;

  const {
    data: classesData,
    refetch,
    isLoading: loading,
  } = useReadClassMemberByUserId({
    activeFilter: { search: "" },
    userId: userProfile?.id,
  });

  const handleCreateClass = () => {
    showModal(<CreateClassForm refetch={refetch} profile={userProfile} />);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Classes</h1>
          {role === "teacher" && (
            <button
              onClick={handleCreateClass}
              className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              + Create Classes
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classesData?.data?.map(
              (res: IResponseClassDetail, idx: number) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2
                    className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
                    onClick={() => {
                      router.push(`/classes/${res?.id}`);
                    }}
                  >
                    {res?.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Deskripsi singkat kelas {res?.name}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
