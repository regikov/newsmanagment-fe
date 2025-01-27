import { fetchActivityLogs } from "@/app/api/activitylog";
import { useEffect, useState } from "react";

// Define the type of activity log
interface ActivityLog {
  id: number;
  type: string; 
  entity_id: number;
  entity_name: string;
  action: string; 
  timestamp: string; 
}

export default function ActivitySection() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const loadLogs = async () => {
      const logs = await fetchActivityLogs();
      setActivityLogs(logs);
    };

    loadLogs();
  }, []);

  return (
    <div className="activity-section">
      <h2>Recent Activity</h2>
      <ul>
        {activityLogs.map((log) => (
          <li key={log.id}>
            <p>
              <strong>{log.action}</strong> - {log.type} <em>{log.entity_name}</em> at {new Date(log.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
