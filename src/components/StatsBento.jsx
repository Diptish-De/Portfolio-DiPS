import { motion } from 'framer-motion';

const BentoCard = ({ label, value, delay, colSpan = 1 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
        className={`bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-colors group ${colSpan === 2 ? 'md:col-span-2' : ''}`}
    >
        <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest">{label}</h3>
        <p className="text-3xl md:text-5xl font-bold mt-2 text-white group-hover:text-primary transition-colors">{value}</p>
    </motion.div>
);

const StatsBento = () => {
    return (
        <section id="stats" className="min-h-[50vh] py-20 px-4 md:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <BentoCard label="Moodrip Growth" value="17+ Orders" delay={0.1} colSpan={2} />
                <BentoCard label="Portfolio Sprint" value="38 Shipped" delay={0.2} />
                <BentoCard label="Sponsorships" value="₹1L+" delay={0.3} />
                <BentoCard label="Event Support" value="15+ Events" delay={0.4} />
                <BentoCard label="Total Impact" value="Startup" delay={0.5} colSpan={1} />
                <BentoCard label="Current Status" value="Building" delay={0.6} colSpan={2} />
            </div>
        </section>
    );
};

export default StatsBento;
