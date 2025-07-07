import Sidebar from "@/shared/ui/components/organism";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card kelas */}
          {["Matematika", "Biologi", "Sejarah"].map((kelas, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-600">{kelas}</h2>
              <p className="text-sm text-gray-600">
                Kelas {kelas} semester ganjil
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
