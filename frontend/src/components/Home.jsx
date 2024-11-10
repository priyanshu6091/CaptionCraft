import React from 'react';
import styles from '../styles.module.css'; // Ensure you add styles for the Navbar in your CSS file.
import projLogoVideo from '../videos/proj_logo.mp4';
import projectLogoVideo from '../videos/project_logo.mp4';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.topContainer}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>
          <h1 className={styles.brandName}>CaptionCraft</h1>
        </div>
        <div className={styles.navAuth}>
          <Link className={styles.signIn} to="/login">Sign in</Link>
          <Link className={styles.register} to="/register">Register</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className={styles.mainContent}>
        <div className={styles.info}>
          <h1>The Next-Gen Image Insight Generation</h1>
          <div className={styles.description}>
            <h3>Let our AI do the talking! Generate captions for your images in seconds....</h3>
            <h3>So come, upload your images and listen to them come to life</h3>
          </div>
          <div className={styles.getStarted}>
            <Link className={styles.btn} to="/upload">Get Started!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
