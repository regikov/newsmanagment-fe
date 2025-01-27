"use client";

import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Header from "@/components/Header";
import "../styles/analytics.css";
import "../globals.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

        const articlesRes = await fetch(`${API_URL}/articles`);
        const topicsRes = await fetch(`${API_URL}/topics`);

        if (!articlesRes.ok || !topicsRes.ok) {
          throw new Error("Failed to fetch data from APIs");
        }

        const articlesData = await articlesRes.json();
        const topicsData = await topicsRes.json();

        setArticles(articlesData);
        setTopics(topicsData);
        setError("");
      } catch (err) {
        setError("Failed to load analytics data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const totalArticles = articles.length;
  const totalTopics = topics.length;
  const totalViews = articles.reduce((acc, article: any) => acc + (article.views || 0), 0);

  const topicDistribution = topics.map((topic: any) => ({
    label: topic.title,
    count: articles.filter((article: any) => article.topic_id === topic.id).length,
    views: articles
      .filter((article: any) => article.topic_id === topic.id)
      .reduce((acc, article: any) => acc + (article.views || 0), 0),
  }));

  const totalViewsPerTopicData = {
    labels: topicDistribution.map((t) => t.label),
    datasets: [
      {
        label: "Total Views Per Topic",
        data: topicDistribution.map((t) => t.views),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: topicDistribution.map((t) => t.label),
    datasets: [
      {
        label: "Number of Articles",
        data: topicDistribution.map((t) => t.count),
        backgroundColor: "rgba(54, 12, 235, 0.7)",
        borderColor: "rgba(54, 12, 235, 0.9)",
        borderWidth: 1,
      },
    ],
  };

  const avgViewsChartData = {
    labels: topicDistribution.map((t) => t.label),
    datasets: [
      {
        label: "Average Views Per Topic",
        data: topicDistribution.map((t) => (t.count > 0 ? (t.views / t.count).toFixed(2) : 0)),
        backgroundColor: "rgba(153, 102, 255, 0.3)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  


  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Ensure it's a valid value
        align: 'center',
        labels: {
          boxWidth: 15,
          font: {
            size: 14,
          },
        },
      },
    },
    aspectRatio: 0.1,
  };
  
  
  const pieChartData = {
    labels: topicDistribution.map((t) => t.label),
    datasets: [
      {
        label: "Topic Distribution",
        data: topicDistribution.map((t) => t.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  

  if (error) {
    return (
      <>
        <Header />
        <div className="scale-container">
          <div className="container mt-5">
            <h1>Analytics Dashboard</h1>
            <p className="text-danger">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="scale-container">
        <div className="container mt-5">
          <h1>Analytics Dashboard</h1>

          <div className="summary-metrics">
            <div className="metric-card">
              <h2>Total Articles</h2>
              <p>{totalArticles}</p>
            </div>
            <div className="metric-card">
              <h2>Total Topics</h2>
              <p>{totalTopics}</p>
            </div>
            <div className="metric-card">
              <h2>Total Authors</h2>
              <p>-</p>
            </div>
            <div className="metric-card">
              <h2>Total Views</h2>
              <p>{totalViews}</p>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-container">
              <h2>Articles by Topic</h2>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
            <div className="chart-container">
              <h2>Average Views Per Topic</h2>
              <Line data={avgViewsChartData} options={{ responsive: true }} />
            </div>
            <div className="chart-container">
              <h2>Total Views Per Topic</h2>
              <Bar data={totalViewsPerTopicData} options={{ responsive: true }} />
            </div>
            <div className="chart-container">
              <h2>Topic Distribution</h2>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
