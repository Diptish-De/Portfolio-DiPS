import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Moodrip",
        desc: "Custom apparel platform for campus fests. Built & scaled to 17+ orders.",
        tech: ["React", "Framer", "Tailwind"],
        type: "Startup / Web",
        links: { live: "https://moodrip.com", github: "#" } // Placeholder if private
    },
    {
        title: "DropoutHacks",
        desc: "Official website for the Dropout Hackathon. High-energy, cinematic design.",
        tech: ["React", "Three.js", "GSAP"],
        type: "Event Site",
        links: { live: "#", github: "https://github.com/Diptish-De/hackathon-calendar-" }
    },
    {
        title: "VaxTracker",
        desc: "Web app for managing children's vaccination schedules efficiently.",
        tech: ["MERN Stack", "Tailwind"],
        type: "Web App",
        links: { live: "#", github: "https://github.com/Diptish-De/VaxTracker" }
    },
    {
        title: "Info Collector",
        desc: "Social profile collection tool with a clean, modern UI.",
        tech: ["HTML/CSS", "JS", "Fetch API"],
        type: "Tool",
        links: { live: "#", github: "https://github.com/Diptish-De/info-collector-" }
    },
    {
        title: "Path-wise Learning",
        desc: "Personalized learning path generator using AI.",
        tech: ["Python", "AI", "Streamlit"],
        type: "EdTech",
        links: { live: "#", github: "https://github.com/Diptish-De/path-wise-personalized-learning" }
    },
    {
        title: "QR Code Gen",
        desc: "A pure JS utility for generating custom QR codes instantly.",
        tech: ["JavaScript", "API"],
        type: "Utility",
        links: { live: "#", github: "https://github.com/Diptish-De/qr_code_generator" }
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <span className="text-primary text-xs font-mono tracking-widest uppercase border border-primary/20 px-2 py-1 rounded">{project.type}</span>
                <div className="flex gap-4">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">{project.desc}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded font-mono">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-4 md:px-20 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl md:text-6xl font-bold mb-16 text-right"
            >
                Selected <span className="text-primary">Works</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                    <ProjectCard key={i} project={p} index={i} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
