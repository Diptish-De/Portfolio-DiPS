import { motion } from 'framer-motion';

const skills = [
    "HTML5", "CSS3", "JavaScript", "Framer", "UI/UX", "Graphic Design",
    "React", "Three.js", "Tailwind", "Next.js"
];

const SkillsMarquee = () => {
    return (
        <section className="py-20 overflow-hidden bg-background border-y border-white/5">
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap py-12 flex gap-8">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/60 mx-4 uppercase tracking-tighter hover:text-primary transition-colors cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {skills.map((skill, index) => (
                        <span
                            key={`dup-${index}`}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/60 mx-4 uppercase tracking-tighter hover:text-primary transition-colors cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-12 flex gap-8" aria-hidden="true">
                    {skills.map((skill, index) => (
                        <span
                            key={`dup2-${index}`}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/60 mx-4 uppercase tracking-tighter hover:text-primary transition-colors cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                    {skills.map((skill, index) => (
                        <span
                            key={`dup3-${index}`}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/60 mx-4 uppercase tracking-tighter hover:text-primary transition-colors cursor-default"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsMarquee;
