"use client";

import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { fetchJobs } from "../utils/fetchJob";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, [page]);

  const loadJobs = async () => {
    setLoading(true);
    const newJobs = await fetchJobs(page);
    setJobs((prev) => [...prev, ...newJobs]);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {loading && <p className="text-center mt-5">Loading more jobs...</p>}
      <button onClick={() => setPage(page + 1)} className="w-full mt-5 bg-blue-500 text-white p-2 rounded">
        Load More
      </button>
    </div>
  );
}
