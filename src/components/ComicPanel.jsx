import { motion } from 'framer-motion';

const ComicPanel = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay
            }}
            className={`relative bg-surface border-4 border-black box-shadow-comic p-6 ${className}`}
        >
            {/* Corner Flap Effect */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-background border-r-transparent" />

            {children}
        </motion.div>
    );
};

export default ComicPanel;
