import { AnimatePresence, motion } from "framer-motion";

export const ErrorMessage: React.FC<{ error: string | null }> = ({ error }) => (
  <AnimatePresence>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-red-500 bg-opacity-80 backdrop-filter backdrop-blur-lg text-white p-4 rounded-lg shadow-lg mb-8"
      >
        {error}
      </motion.div>
    )}
  </AnimatePresence>
);
