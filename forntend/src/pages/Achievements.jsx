import Footer from '../components/Footer';
import styles from './Achievements.module.css';
import achievementBg from '../assets/Achivements_main.jpeg';
import cooperImg1 from '../assets/cooper_hospital/Achivement_copper_hospital.jpeg';
import cooperImg2 from '../assets/cooper_hospital/Achivement_copper_hospital1.jpeg';
import cooperImg3 from '../assets/cooper_hospital/Achivement_copper_hospital2.jpeg';
import cooperImg4 from '../assets/cooper_hospital/Achivement_copper_hospital3.jpeg';
import cooperImg5 from '../assets/cooper_hospital/Achivement_copper_hospital4.jpeg';
import cooperImg6 from '../assets/cooper_hospital/Achivement_copper_hospital5.jpeg';

const projects = [
    {
        id: 1,
        title: 'Cooper Hospital — CSSD Project',
        location: 'Andheri West, Mumbai, Maharashtra',
        type: 'Government Hospital',
        images: [
            cooperImg1,
            cooperImg2,
            cooperImg3,
            cooperImg4,
            cooperImg5,
            cooperImg6,
        ],
        description: [
            'Solutechh successfully designed, supplied, and commissioned a complete Central Sterile Supply Department (CSSD) at Cooper Hospital — one of Mumbai\'s major government hospitals. The project covered full-scale decontamination zones, sterilization equipment, sterile storage, and distribution systems, all built to NABH and WHO standards.',
            'This project highlights our ability to execute large-scale government hospital infrastructure with precision, on time, and within compliance.',
        ],
    },
];

export default function Achievements() {
    return (
        <>
            {/* HERO */}
            <section className={styles.hero} style={{ backgroundImage: `linear-gradient(135deg, rgba(29, 185, 174, 0.7), rgba(18, 123, 115, 0.7)), url(${achievementBg})` }}>
                <div className={styles.heroContent}>
                    <h1>Our Achievements</h1>
                </div>
            </section>

            {/* INTRO */}
            <section className={styles.introSection}>
                <div className={styles.introContent}>
                    <h2>Our Work in Hospitals</h2>
                    <p>
                        Solutechh has successfully delivered healthcare infrastructure projects
                        across multiple hospitals, ensuring quality, safety, and advanced solutions.
                    </p>
                </div>
            </section>

            {/* PROJECTS */}
            <section className={styles.projectsSection}>
                {projects.map((project, index) => (
                    <div key={project.id}>
                        <div className={styles.projectBlock}>
                            <h2 className={styles.projectTitle}>{project.title}</h2>

                            <div className={styles.projectMeta}>
                                <span>
                                    <strong>Location:</strong> {project.location}
                                </span>
                                <span>
                                    <strong>Type:</strong> {project.type}
                                </span>
                            </div>

                            {/* PHOTO GALLERY */}
                            <div className={styles.photoGallery}>
                                {project.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${project.title} ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* PROJECT INFO */}
                            <div className={styles.projectInfo}>
                                {project.description.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {index < projects.length - 1 && (
                            <hr className={styles.projectDivider} />
                        )}
                    </div>
                ))}
            </section>

            <Footer />
        </>
    );
}
