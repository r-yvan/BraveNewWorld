import { AppLayout } from "../components/AppLayout";
import { useEffect, useState } from "react";
import api from "../lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function Entries() {
  const [entries, setEntries] = useState<any[]>([]);
  const [parkings, setParkings] = useState<any[]>([]);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    plateNumber: "",
    parkingCode: "",
  });

  const fetchEntries = async () => {
    try {
      const res = await api.get("/entries"); // showing all entries for admin/attendant
      setEntries(res.data.data);
    } catch (error) {
      toast.error("Failed to load entries");
    }
  };

  const fetchParkings = async () => {
    try {
      const res = await api.get("/parkings");
      setParkings(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchParkings();
  }, []);

  const handleEntrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/entries", formData);
      toast.success("Car entered successfully. Ticket generated!");
      alert(`Ticket Number: ${res.data.ticket.ticketNumber}\nPlate: ${res.data.ticket.plateNumber}`);
      setShowEntryModal(false);
      setFormData({ plateNumber: "", parkingCode: "" });
      fetchEntries();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register entry");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExitClick = (entry: any) => {
    setSelectedEntry(entry);
    setShowBillModal(true);
  };

  const handleExitSubmit = async () => {
    if (!selectedEntry) return;
    setIsLoading(true);
    try {
      const parking = parkings.find(p => p.code === selectedEntry.parkingCode);
      const fee = parking ? parking.chargingFeePerHour : 0;
      
      const res = await api.put(`/entries/${selectedEntry.id}/exit`, { chargingFeePerHour: fee });
      toast.success("Car exited successfully");
      alert(`BILL GENERATED\nDuration: ${res.data.durationHours} hours\nTotal Amount: ${res.data.bill.totalAmount} RWF`);
      setShowBillModal(false);
      fetchEntries();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register exit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Car Entries & Exits</h2>
        <button
          onClick={() => setShowEntryModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Register Entry
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parking Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.ticketNumber.substring(0,8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.plateNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.parkingCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.entryDateTime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {entry.exitDateTime ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Exited
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Parked
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {!entry.exitDateTime && (
                    <button onClick={() => handleExitClick(entry)} className="text-blue-600 hover:text-blue-900">
                      Register Exit
                    </button>
                  )}
                  {entry.exitDateTime && (
                    <span className="text-gray-500">{entry.chargedAmount} RWF</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEntryModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Register Car Entry</h3>
            <form onSubmit={handleEntrySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                <input required type="text" value={formData.plateNumber} onChange={(e) => setFormData({...formData, plateNumber: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parking Location</label>
                <select required value={formData.parkingCode} onChange={(e) => setFormData({...formData, parkingCode: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Select a parking...</option>
                  {parkings.map(p => (
                    <option key={p.id} value={p.code}>{p.name} ({p.code})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowEntryModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Generate Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBillModal && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Process Exit & Billing</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to register exit for car <strong>{selectedEntry.plateNumber}</strong>?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowBillModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleExitSubmit} disabled={isLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">Process & Print Bill</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
