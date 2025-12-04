import { StarBackground } from "@/components/StarBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navbar } from "../components/Navbar";
import {HeroSection} from "../components/HeroSection";
import {AboutMe} from "../components/AboutMe";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home=()=>{
    return (
        <div className="min-h-screen bg-backgroud text-foreground overflow-x-hidden">
            {/* Theme Toggle */}
            <ThemeToggle/>

            {/* Background Effects */}
            <StarBackground/>

             {/* Navbar */}
             <Navbar/>

            {/* Main Content*/}
            <main>
                <HeroSection/>
                <AboutMe/>
                <SkillsSection/>
                <ProjectsSection/>
                <ContactSection/>
            </main>

            {/* Footer */}

            <Footer/>

        </div>
    );
}