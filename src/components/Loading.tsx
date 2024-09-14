import { AnimatePresence, motion } from "framer-motion";

export const LoadingIndicator: React.FC<{ loading: boolean }> = ({
  loading,
}) => (
  <AnimatePresence>
    {loading && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex justify-center items-center mb-8"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </motion.div>
    )}
  </AnimatePresence>
);
