export async function fetchJobs(page = 1, pageSize = 10, skillMatch = false) {
    const cacheKey = `jobs-page-${page}-match-${skillMatch}`;
  
    // Check sessionStorage for cached jobs
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      console.log("Loaded jobs from cache");
      return JSON.parse(cachedData);
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs?page=${page}&pageSize=${pageSize}&skillMatch=${skillMatch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching jobs: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Cache the results for performance optimization
      sessionStorage.setItem(cacheKey, JSON.stringify(data.jobs));
  
      return data.jobs;
    } catch (error) {
      console.error("Fetch Jobs Error:", error);
  
      // Fallback: Try real-time WebSocket if API fails
      return new Promise((resolve) => {
        import("./websocket").then((module) => {
          module.default.onmessage = (event) => {
            const newJob = JSON.parse(event.data);
            resolve([newJob]);
          };
        });
      });
    }
  }
  