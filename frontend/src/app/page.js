"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import socket from "../utils/websocket";
import { fetchJobs } from "../utils/fetchJob";
import "../styles/styles.css"; // Importing custom CSS

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // For search filtering
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); // Initialize filtered jobs
      })
      .catch((error) => console.error("Error fetching jobs:", error))
      .finally(() => setLoading(false));

    // WebSocket for real-time job updates
    socket.onmessage = (event) => {
      const newJob = JSON.parse(event.data);
      setJobs((prevJobs) => [newJob, ...prevJobs]);
      setFilteredJobs((prevJobs) => [newJob, ...prevJobs]); // Update filtered jobs as well
    };

    return () => socket.close(); // Cleanup WebSocket on unmount
  }, []);

  // Function to filter jobs based on search input
  const handleSearch = (query) => {
    if (!query) {
      setFilteredJobs(jobs);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const results = jobs.filter((job) =>
        job.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredJobs(results);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      <Navbar />
      <div className="content">
        <h1 className="heading">Find Your Next Freelance Job</h1>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : (
          <div className="job-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="job-item"
                >
                  <JobCard job={job} />
                </motion.div>
              ))
            ) : (
              <p className="no-jobs">No matching jobs found.</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
