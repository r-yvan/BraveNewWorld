import { AppLayout } from "../components/AppLayout";
import { useEffect, useState } from "react";
import api from "../lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function Parkings() {
  const [parkings, setParkings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    totalSpaces: "",
    location: "",
    chargingFeePerHour: "",
  });

  const role = localStorage.getItem("role");

  const fetchParkings = async () => {
    try {
      const res = await api.get("/parkings");
      setParkings(res.data.data);
    } catch (error) {
      toast.error("Failed to load parkings");
    }
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/parkings", {
        ...formData,
        totalSpaces: parseInt(formData.totalSpaces),
        chargingFeePerHour: parseFloat(formData.chargingFeePerHour),
      });
      toast.success("Parking registered successfully");
      setShowModal(false);
      fetchParkings();
      setFormData({ code: "", name: "", totalSpaces: "", location: "", chargingFeePerHour: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register parking");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this parking?")) {
      try {
        await api.delete(`/parkings/${id}`);
        toast.success("Parking deleted");
        fetchParkings();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <AppLayout>
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Parkings</h2>
        {role === "ADMIN" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Register Parking
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available / Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee/Hour</th>
              {role === "ADMIN" && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parkings.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`font-bold ${p.availableSpaces > 0 ? "text-green-600" : "text-red-600"}`}>
                    {p.availableSpaces}
                  </span> / {p.totalSpaces}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.chargingFeePerHour} RWF</td>
                {role === "ADMIN" && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                )}
              </tr>
            ))}
            {parkings.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No parkings found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Register New Parking</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parking Code</label>
                <input required type="text" name="code" value={formData.code} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spaces</label>
                  <input required type="number" min="1" name="totalSpaces" value={formData.totalSpaces} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fee per Hour</label>
                  <input required type="number" min="0" step="0.01" name="chargingFeePerHour" value={formData.chargingFeePerHour} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
