import Sidebar from "@/shared/ui/components/organism";
import { GlobalSearch } from "@/shared/ui/components/organism/GlobalSearch";
import DashboardContent from "@/shared/ui/components/template/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 w-1/2">
            Dashboard
          </h1>
          <div className="flex w-1/2">
            <GlobalSearch />
          </div>
        </div>

        <DashboardContent />
      </main>
    </div>
  );
}
