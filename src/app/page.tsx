import Hero from '@/components/Hero';
import Offer from '@/components/Offer';
import ProblemSolution from '@/components/ProblemSolution';
import Comparison from '@/components/Comparison';
import USP from '@/components/USP';
import SocialProof from '@/components/SocialProof';
import VisionPortfolio from '@/components/VisionPortfolio';
import ProcessFAQ from '@/components/ProcessFAQ';
import SectionManager from '@/components/SectionManager';

export default function Home() {
    return (
        <main>
            <SectionManager>
                <Hero videoSrc="/movie/background.mp4" />
                <Offer />
                <ProblemSolution />
                <Comparison />
                <USP />
                <SocialProof />
                <VisionPortfolio />
                <ProcessFAQ />
            </SectionManager>
        </main>
    );
}
