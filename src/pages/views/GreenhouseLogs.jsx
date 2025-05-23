import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAction } from "@/hooks/api/useAction";
import DateRangePicker from "@/components/ui/DateRangePicker"; 
import "@/styles/pages/greenhouse-logs.css";

const GreenhouseLogs = () => {
  const { id } = useParams();
  const { getPastActions, isLoading, error } = useAction();
  const [logs, setLogs] = useState([]);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });

  const fetchLogs = async () => {
    const greenhouseId = Number(id);
    if (isNaN(greenhouseId)) {
      console.warn("Invalid greenhouse ID:", id);
      return;
    }

    try {
      const data = await getPastActions(greenhouseId, {
        startDate: new Date(dateRange.startDate).toISOString(),
        endDate: new Date(dateRange.endDate).toISOString(),
      });
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;
    fetchLogs(); // initial load
  }, [id]);

  useEffect(() => {
    if (!id || isNaN(Number(id))) return;
    fetchLogs(); // refetch on date change
  }, [dateRange]);
 
  useEffect(() => {
    console.log("Initial ID check:", id);
    if (!id || isNaN(Number(id))) return;
    fetchLogs();
  }, [id]);
  
  useEffect(() => {
    console.log("Date changed, refetching logs");
    if (!id || isNaN(Number(id))) return;
    fetchLogs();
  }, [dateRange]);
  
  const handleDateChange = (key, value) => {
    setDateRange((prev) => ({ ...prev, [key]: value }));
  };

  const greenhouseName = `Greenhouse ${id}`;

  return (
    <main className="logs-page">
      <h2>{greenhouseName}’s Logs</h2>

      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onChange={handleDateChange}
      />

      {isLoading && <p>Loading logs...</p>}
      {error && <p style={{ color: "red" }}>Error loading logs.</p>}

      <div className="log-list">
        {logs.length === 0 && !isLoading ? (
          <p>No logs found for the selected date range.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-entry">
              <div className="log-type">{log.type}</div>
              <div className="log-desc">Status: {log.status}</div>
              <div className="log-date">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default GreenhouseLogs;
