import ComicPanel from './ComicPanel';

const OriginStory = () => {
    return (
        <section className="py-20 px-4 max-w-6xl mx-auto space-y-20">

            {/* Panel 1: Moodrip */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <ComicPanel className="w-full md:w-1/2 min-h-[300px] bg-secondary">
                    <span className="absolute -top-6 -left-6 bg-white border-4 border-black px-4 py-2 font-comic text-2xl transform -rotate-6 shadow-[4px_4px_0px_#000]">
                        ORIGIN
                    </span>
                    <h2 className="font-comic text-5xl text-white mb-4 text-shadow-comic">THE MERCH HEADACHE</h2>
                    <p className="font-mono text-white text-lg bg-black/20 p-4 rounded border-2 border-dashed border-white/30">
                        Campus fests had a problem. Merch was chaos.<br /><br />
                        So I built <strong className="text-primary">Moodrip</strong> in 36 hours.
                    </p>
                </ComicPanel>
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="font-comic text-6xl text-primary text-shadow-comic transform rotate-2">17+ ORDERS</h3>
                    <p className="font-mono text-gray-400 mt-2">// SCALE ACHIEVED THROUGH WORD OF MOUTH</p>
                </div>
            </div>

            {/* Panel 2: Portfolio Sprint */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <ComicPanel className="w-full md:w-1/2 min-h-[300px] bg-primary">
                    <h2 className="font-comic text-5xl text-black mb-4 text-shadow-comic text-white">THE MENTOR</h2>
                    <p className="font-mono text-black text-lg font-bold bg-white/20 p-4 rounded border-2 border-black">
                        Why build alone?<br /><br />
                        I helped <strong className="text-white bg-black px-1">38 peers</strong> ship their first portfolios in a single weekend sprint.
                    </p>
                </ComicPanel>
                <div className="w-full md:w-1/2 p-4 text-right">
                    <h3 className="font-comic text-6xl text-white text-shadow-comic transform -rotate-2">COMMUNITY LEADER</h3>
                    <p className="font-mono text-gray-400 mt-2">// BRIDGING LEARNING & LAUNCHING</p>
                </div>
            </div>

        </section>
    );
};

export default OriginStory;
