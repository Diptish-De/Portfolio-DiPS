import { motion } from 'framer-motion';

const experiences = [
    {
        company: "DropoutHacks",
        role: "Organizer",
        duration: "Jan 2026 - Present",
        desc: "Organizing high-energy hackathons."
    },
    {
        company: "Moodrip",
        role: "Co-Founder & Exec. Director",
        duration: "Mar 2025 - Present",
        desc: "Solving the 'merch headache' for campus fests. Built in 36h."
    },
    {
        company: "IgniteX Club RCCIIT",
        role: "Graphic Illustrator",
        duration: "Aug 2024 - Jul 2025",
        desc: "Designed official brand identity & merchandise."
    },
    {
        company: "Techtrix & Regalia",
        role: "Sponsorship & Logistics",
        duration: "2025",
        desc: "Coordinated logistics and secured funding."
    }
];

const ExperienceItem = ({ exp, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 gap-8 group"
    >
        {/* Connector Line (Mobile) */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 md:hidden">
            <div className="absolute top-2 left-[-3px] w-1.5 h-1.5 bg-primary rounded-full" />
        </div>

        {/* Date (Left Side Desktop) */}
        <div className="md:col-span-1 md:text-right text-sm font-mono text-gray-500 py-2">
            {exp.duration}
        </div>

        {/* Content (Right Side) */}
        <div className="md:col-span-4 border-l border-white/10 md:pl-8 pb-12 relative">
            {/* Connector Dot (Desktop) */}
            <div className="hidden md:block absolute top-3 left-[-3px] w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />

            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.company}</h3>
            <p className="text-lg text-gray-300 mb-2">{exp.role}</p>
            <p className="text-gray-400 text-sm">{exp.desc}</p>
        </div>
    </motion.div>
);

const ExperienceTimeline = () => {
    return (
        <section id="experience" className="py-20 px-4 md:px-20 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold mb-16 text-center md:text-left"
            >
                <span className="text-primary">&lt;</span> Experience <span className="text-primary">/&gt;</span>
            </motion.h2>

            <div className="space-y-2">
                {experiences.map((exp, index) => (
                    <ExperienceItem key={index} exp={exp} index={index} />
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
