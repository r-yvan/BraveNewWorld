import { AppLayout } from "../components/AppLayout";
import { useState } from "react";
import api from "../lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function Reports() {
  const [reportType, setReportType] = useState<"outgoing" | "entered">("outgoing");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    
    setIsLoading(true);
    try {
      // Ensure time is added for a full day range search
      const start = new Date(startDate).toISOString();
      const end = new Date(endDate + "T23:59:59").toISOString();
      
      const res = await api.get(`/reports/${reportType}?startDate=${start}&endDate=${end}`);
      setReportData(res.data);
      toast.success("Report generated");
    } catch (error) {
      toast.error("Failed to fetch report");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Toaster />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Generate Reports</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <form onSubmit={fetchReport} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value as any)}
              className="block w-full border-gray-300 rounded-md shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="outgoing">Outgoing Cars (Exited)</option>
              <option value="entered">Entered Cars (All)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              required
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              required
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </form>
      </div>

      {reportData && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold">Report Results</h3>
            <div className="flex space-x-6 text-sm">
              {reportType === "outgoing" ? (
                <>
                  <div className="text-center">
                    <span className="block text-gray-500">Total Cars</span>
                    <span className="font-bold text-xl">{reportData.summary.totalCarsExited}</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-gray-500">Total Revenue</span>
                    <span className="font-bold text-xl text-green-600">{reportData.summary.totalAmountCharged} RWF</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <span className="block text-gray-500">Total Cars</span>
                  <span className="font-bold text-xl">{reportData.summary.totalCarsEntered}</span>
                </div>
              )}
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Time</th>
                {reportType === "outgoing" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charged</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.data.map((entry: any) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.plateNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.parkingCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.entryDateTime).toLocaleString()}</td>
                  {reportType === "outgoing" && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.exitDateTime).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{entry.chargedAmount} RWF</td>
                    </>
                  )}
                </tr>
              ))}
              {reportData.data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No records found for this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AppLayout>
  );
}
