import ServiceDetail from './ServiceDetail';

export function CSSD() {
  return (
    <ServiceDetail
      title="CSSD Solutions"
      subtitle="Ensuring Sterility, Safety & Efficiency in Healthcare"
      heroBg="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
      about="The Central Sterile Supply Department (CSSD) is a vital unit in hospitals responsible for cleaning, sterilizing, and distributing medical instruments. It ensures all equipment used in patient care is safe, sterile, and infection-free."
      images={[
        'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
        'https://cdn11.bigcommerce.com/s-hrfl0y0lrh/images/stencil/1280w/products/737/5156/instrument-color-coding-bands-50-pack-surgical123__65733.1713032744.jpg?c=2',
        'https://www.steelcogroup.com/app/uploads/2023/04/Building-a-new-CSSD-in-Bolzano.jpg',
      ]}
      features={[
        { title: 'Decontamination', desc: 'Cleaning and disinfecting used instruments to remove harmful contaminants.' },
        { title: 'Assembly & Packaging', desc: 'Inspecting and preparing instruments for sterilization using proper packaging.' },
        { title: 'Sterilization', desc: 'Using advanced methods like steam, gas, and plasma to eliminate microorganisms.' },
        { title: 'Storage & Distribution', desc: 'Safe storage and timely supply of sterile instruments across departments.' },
      ]}
      benefits={[
        'Ensures infection control and patient safety',
        'Supports smooth hospital operations',
        'Maintains high sterilization standards',
        'Reduces risk of contamination',
      ]}
    />
  );
}

export function ModularOT() {
  return (
    <ServiceDetail
      title="Modular Operation Theatre"
      subtitle="Advanced Surgical Infrastructure for Modern Healthcare"
      heroBg="https://tse1.mm.bing.net/th/id/OIP.mse9UUjGFdvDUAQk4rbUdwHaEK?pid=Api&P=0&h=180"
      about="Modular Operation Theatres are modern surgical environments designed for safety, efficiency, and flexibility. They allow quick installation, easy maintenance, and future upgrades with minimal disruption."
      images={[
        'https://5.imimg.com/data5/FI/IF/MY-2921492/modular-ot-500x500.jpg',
        'https://badralsamaahospitals.com/public/uploads/services/temp/2019/May/surgical-team-working-in-operating-theatre-PS3F5ER%20(1)1558278731595.jpg',
        'https://cdn11.bigcommerce.com/s-hrfl0y0lrh/images/stencil/1280w/products/737/5156/instrument-color-coding-bands-50-pack-surgical123__65733.1713032744.jpg?c=2',
        'https://res.cloudinary.com/apexsuratgarhhospital/image/upload/meet6514-1565439022.jpg',
      ]}
      features={[
        { title: 'Antimicrobial Panels', desc: 'Walls and ceilings designed to maintain sterile conditions.' },
        { title: 'Laminar Air Flow', desc: 'Ensures contamination control and clean airflow.' },
        { title: 'Integrated Systems', desc: 'Efficient equipment management for better workflow.' },
        { title: 'Advanced Lighting & HVAC', desc: 'Improves surgical precision and comfort.' },
      ]}
      benefits={[
        'Meets international healthcare standards',
        'Ensures patient safety',
        'High efficiency and durability',
        'Future-ready and scalable design',
      ]}
    />
  );
}

export function SkillLabs() {
  return (
    <ServiceDetail
      title="Skill Labs"
      subtitle="Advanced Training & Simulation for Healthcare Professionals"
      heroBg="http://ncrinstituteofmedicalsciences.com/assets/images/skill-lab.png"
      about="Skill Labs are specialized training environments designed for medical students and professionals. They provide hands-on experience using advanced simulators and equipment, improving clinical skills without risk to patients."
      images={[
        'http://medical.navodaya.edu.in/wp-content/uploads/2020/01/995A9993_Copy.jpg',
        'https://www.kgmc.edu.pk/assets/slider/Skills-Lab-KGMC.jpg',
        'https://health.osu.edu/-/media/health/images/stories/2023/01/skills-lab/skills-lab-01.jpg',
        'http://ncrinstituteofmedicalsciences.com/assets/images/skill-lab.png',
      ]}
      features={[
        { title: 'Simulation-Based Training', desc: 'Real-life medical scenarios using advanced simulators.' },
        { title: 'Modern Equipment', desc: 'Latest tools and technology for effective learning.' },
        { title: 'Safe Learning Environment', desc: 'Practice procedures without risk to patients.' },
        { title: 'Skill Development', desc: 'Enhances confidence and clinical expertise.' },
      ]}
      benefits={[
        'Improves practical knowledge',
        'Supports medical education',
        'Enhances patient safety',
        'Future-ready training solutions',
      ]}
    />
  );
}

export function PneumaticSystem() {
  return (
    <ServiceDetail
      title="Pneumatic Tube System"
      subtitle="Fast & Efficient Transport System for Hospitals"
      heroBg="https://www.swisslog-healthcare.com/-/media/swisslog-healthcare/images/products-and-services/transport/transponet/header-images/transponet-pneumatic-tube-system.jpg"
      about="Pneumatic Tube Systems are used in hospitals to quickly transport samples, medicines, and documents between departments. This system improves efficiency, reduces manual workload, and saves critical time."
      images={[
        'https://i.ytimg.com/vi/d1ogS5EQpV0/maxresdefault.jpg',
        'https://tse2.mm.bing.net/th/id/OIP.XgQYTkeOsYwqzwzuLJrUxgHaEK?pid=Api&P=0&h=180',
        'https://www.pesinstallations.com/images/PneumaticTube/1.jpg',
        'https://tse1.mm.bing.net/th/id/OIP.VaiUrheurS2eJkxM07AUKwHaEJ?pid=Api&P=0&h=180',
      ]}
      features={[
        { title: 'High-Speed Transport', desc: 'Quick delivery of samples and reports across departments.' },
        { title: 'Secure System', desc: 'Ensures safe and contamination-free transfer.' },
        { title: 'Automation', desc: 'Reduces manual handling and human error.' },
        { title: 'Efficient Workflow', desc: 'Improves hospital operations and time management.' },
      ]}
      benefits={[
        'Saves time and increases efficiency',
        'Reduces manpower requirements',
        'Improves patient care speed',
        'Reliable and scalable system',
      ]}
    />
  );
}
