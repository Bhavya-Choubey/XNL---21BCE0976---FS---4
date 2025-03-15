import { motion } from "framer-motion";

export default function JobCard({ job }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 transition-all"
    >
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
      <div className="flex justify-between mt-3">
        <span className="text-blue-500 font-bold">${job.budget}</span>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">Apply</button>
      </div>
    </motion.div>
  );
}
