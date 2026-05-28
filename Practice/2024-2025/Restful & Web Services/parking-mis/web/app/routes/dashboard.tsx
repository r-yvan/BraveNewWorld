import { AppLayout } from "../components/AppLayout";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Car, ParkingCircle, FileText, Activity } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeParkings: 0,
    totalEntries: 0,
  });
  
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const parkingsRes = await api.get("/parkings");
        const entriesRes = await api.get("/entries/active");
        
        setStats({
          activeParkings: parkingsRes.data.data.length,
          totalEntries: entriesRes.data.pagination.total,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <ParkingCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Parkings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeParkings}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <Car size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Cars Parked</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalEntries}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Activity size={20} className="mr-2" /> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/entries" className="p-4 border rounded-lg hover:bg-gray-50 transition flex items-center text-blue-600">
             <Car className="mr-2" size={20} /> Register Entry/Exit
          </a>
          {role === "ADMIN" && (
            <>
              <a href="/parkings" className="p-4 border rounded-lg hover:bg-gray-50 transition flex items-center text-blue-600">
                 <ParkingCircle className="mr-2" size={20} /> Manage Parkings
              </a>
              <a href="/reports" className="p-4 border rounded-lg hover:bg-gray-50 transition flex items-center text-blue-600">
                 <FileText className="mr-2" size={20} /> View Reports
              </a>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
