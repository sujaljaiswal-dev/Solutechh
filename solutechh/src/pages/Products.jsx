import Footer from '../components/Footer';
import styles from './Products.module.css';

const products = [
  { img: 'https://techgada.com/wp-content/uploads/2023/11/Empowering-Effective-Deep-Vein-Thrombosis-Treatment-300x225.png', title: 'IPC DVT Pump', desc: 'Intermittent Pneumatic Compression (IPC) device that helps prevent Deep Vein Thrombosis (DVT) by promoting blood circulation in the lower limbs. Ideal for post-surgical and immobile patients.' },
  { img: 'https://images.squarespace-cdn.com/content/v1/6705cf49b6343e5e4e090fd2/610943f5-b67e-42dc-b4be-f5a6ea3464d0/Cocoon+Patient+Warming+System.png', title: 'Patient Warmer', desc: 'Ensures optimal patient body temperature during surgery or recovery. The system delivers consistent, controlled warming through advanced air-flow technology.' },
  { img: 'https://image.made-in-china.com/2f0j00fSqaTlIEsycV/Mt-01-02medical-Air-Mattress-Bubble-Mattress-for-Hospital-Bed.jpg', title: 'Air Mattress', desc: 'Alternating Pressure Air Mattress System prevents bedsores and pressure ulcers in bedridden patients. The alternating air cells distribute pressure evenly, enhancing comfort and healing.' },
  { img: 'https://i.ytimg.com/vi/YaNbT43MG8E/maxresdefault.jpg', title: 'Fluid Warmer', desc: 'A fluid warmer is a medical device used in healthcare facilities for warming fluids before being administered to prevent hypothermia in physically traumatized or surgical patients.' },
  { img: 'https://image.made-in-china.com/2f0j00itBMaIUDHncS/Portable-Medical-Enteral-Eternal-Feeding-Pump.jpg', title: 'Feed Pump', desc: 'A feeding pump (also called an enteral feeding pump) is a medical device used to deliver liquid nutrition directly into a patient\'s stomach or intestine through a feeding tube.' },
  { img: 'https://static.wixstatic.com/media/2324e2_b832f47b6c7a43f6a8cdc0aa1d0fd97d~mv2.png/v1/crop/x_0,y_6,w_431,h_498/fill/w_225,h_259,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MAN-6s.png', title: 'Surgical Helmet', desc: 'A surgical helmet system is a special protective headgear used by surgeons — mainly in orthopedic surgeries — to prevent infection and protect from body fluids and particles.' },
  { img: 'https://tse4.mm.bing.net/th/id/OIP.iHwP1DGF97JQ8D8MjBB2zwHaHa?pid=Api&P=0&h=180', title: 'Lithotomy Stirrups', desc: 'Designed for patient stability and surgeon convenience, these adjustable stirrups provide smooth positioning and support during gynecological and urological procedures.' },
  { img: 'https://tse1.mm.bing.net/th/id/OIP.UP0kqevPDwXytqxvLznkKwHaHa?pid=Api&P=0&h=180', title: 'Airway Clearance System', desc: 'An Airway Clearance System is a medical device used to help remove mucus from the lungs and airways, making it easier for patients to breathe.' },
  { img: 'https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laparoscopic-products/endoscope-camera-system/hypixel-u1/20201109093213_1338.png', title: 'Video Endoscopy Camera System', desc: 'A Video Endoscopy Camera System is a medical imaging system used to view the inside of the human body in real-time using a camera attached to an endoscope.' },
  { img: 'https://tse4.mm.bing.net/th/id/OIP.IC4BW1o2bTzrAxRvXVPsbgHaEY?pid=Api&P=0&h=180', title: 'MCPR', desc: 'An MCPR device stands for Mechanical Cardiopulmonary Resuscitation device. It is a machine that automatically performs CPR (chest compressions) on a patient whose heart has stopped.' },
  { img: 'https://tse1.mm.bing.net/th/id/OIP.8PKL4-Gf7bdZ0Znf2ZHDwwHaEh?pid=Api&P=0&h=180', title: 'Syringe Pump', desc: 'Delivers precise and controlled medication dosages for critical care and infusion therapy. Features intuitive controls, alarm systems, and reliable flow accuracy.' },
  { img: 'https://amismedical.com/wp-content/uploads/2018/06/AM-eB12-1.jpg', title: 'Infusion Pump', desc: 'An Infusion Pump is a medical device used to deliver fluids, medications, or nutrients into a patient\'s body in a controlled and precise manner.' },
  { img: 'https://smartwellness.com.au/wp-content/uploads/2022/08/Heart-Sure-Bluetooth-Pulse-Oximeter-Out-Of-Packaging-Screen-On-Low-bpmPR-3D-1.jpg', title: 'Pulse Oximeter', desc: 'A Pulse Oximeter is a small medical device used to measure the oxygen level in your blood (SpO₂) and your pulse rate.' },
];

export default function Products() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroContent}>
          <h1>Our Products</h1>
          <p>Medical Equipment &amp; Devices We Supply</p>
        </div>
      </div>
      <section className={styles.pageSection}>
        <div className={styles.sectionHeader}><h2>Our Products</h2></div>
        <div className={styles.grid}>
          {products.map((p) => (
            <div className={styles.card} key={p.title}>
              <div className={styles.cardImageContainer}>
                <img src={p.img} alt={p.title} />
              </div>
              <div className={styles.cardContent}>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
