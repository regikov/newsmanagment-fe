"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import Header from "../components/Header";
import "./styles/homepage.css";
import "./styles/activitylog.css";

// Define the type for activity logs
interface ActivityLog {
  id: number;
  type: string;
  entity_id: number;
  entity_name: string;
  action: string;
  timestamp: string;
}

export default function Home() {
  const [totalArticles, setTotalArticles] = useState<number | null>(null);
  const [activeTopics, setActiveTopics] = useState<number | null>(null);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityLog[]>([]);
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const activitiesPerPage = 10; 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

        // Fetch articles
        const articlesRes = await fetch(`${API_URL}/articles`);
        if (!articlesRes.ok) throw new Error("Failed to fetch articles");
        const articles = await articlesRes.json();
        setTotalArticles(articles.length);

        // Fetch topics
        const topicsRes = await fetch(`${API_URL}/topics`);
        if (!topicsRes.ok) throw new Error("Failed to fetch topics");
        const topics = await topicsRes.json();
        setActiveTopics(topics.length);

        // Fetch recent activities
        const activitiesRes = await fetch(`${API_URL}/activity`);
        if (!activitiesRes.ok) throw new Error("Failed to fetch activities");
        const activities = await activitiesRes.json();
        setRecentActivities(activities);
        setFilteredActivities(activities);

        setError(null);
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Handle filters
  useEffect(() => {
    let filtered = recentActivities;

    if (actionFilter !== "all") {
      filtered = filtered.filter((activity) => activity.action === actionFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(
        (activity) =>
          new Date(activity.timestamp).toDateString() === dateFilter.toDateString()
      );
    }

    setFilteredActivities(filtered);
    setCurrentPage(1); 
  }, [actionFilter, dateFilter, recentActivities]);

  // Pagination logic
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Main Content with Scaling */}
      <div className="scale-container">
        <div className="container mt-5">
          {/* Welcome Heading */}
          <div className="welcome-heading">Welcome to AxelNews Admin Portal</div>

          {/* Analytics Section */}
          <div className="analytics-grid">
            <div className="analytics-card">
              <h5>Total Articles</h5>
              <p>{totalArticles !== null ? totalArticles : "Loading..."}</p>
            </div>
            <div className="analytics-card">
              <h5>Total Topics</h5>
              <p>{activeTopics !== null ? activeTopics : "Loading..."}</p>
            </div>
            <div className="analytics-card">
              <h5>Total Authors</h5>
              <p>-</p>
            </div>
          </div>

          {/* Recent Activity */}
          <section className="activities-container">
            <div className="recent-activity-title-container">
              <h4 className="recent-activity-title">Activity Log</h4>
            </div>

            {/* Filters */}
            <div className="filters-container">
              <select
                className="filter-select"
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
              </select>

              <DatePicker
                selected={dateFilter}
                onChange={(date: Date | null) => setDateFilter(date)}
                className="filter-date-picker"
                placeholderText="Select a date"
              />
            </div>

            <ul className="list-group">
              {currentActivities.length > 0 ? (
                currentActivities.map((activity) => (
                  <li key={activity.id} className="list-group-item">
                    <p>
                      <strong>{activity.action}</strong> - {activity.type}{" "}
                      <em>{activity.entity_name}</em> at{" "}
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No recent activities</li>
              )}
            </ul>

            {/* Pagination Controls */}
            {filteredActivities.length > activitiesPerPage && (
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </section>

          {/* Error Handling */}
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}
