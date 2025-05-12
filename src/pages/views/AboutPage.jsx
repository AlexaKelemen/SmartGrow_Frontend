/**
 * @file AboutPage.jsx
 * @description The about page of the project that displays the logo and some information about the project and the people making it.
 * @author SophiaJustin
 */

import React from 'react';
import "@/styles/pages/about.css";
import logo from "../../../assets/smartgrow-logo.png";

const AboutPage = () => {
    return(
        <div className="about-container">
            <img src={logo} alt='Smart Greenhouse Logo' className='about-logo'></img>
            <h1>About SmartGrow</h1>
            <p>
                SmartGrow is an innovative system designed by SEP4 to automate and monitor essential aspects
                of greenhouse farming including lighting, fertilization, temperature and humidity. Our mission
                is to make agriculture smarter, easier and more efficient.  
            </p>
            <div className='about-features'>
                <h2>Key Features</h2>
                <ul>
                    <li>Real-time monitoring of environmental conditions in the greenhouse.</li>
                    <li>Automated and Scheduled control of watering and lighting.</li>
                    <li>Easy pairing and management of multiple greenhouses.</li>
                    <li>User-friendly interface.</li>
                </ul>
            </div>
            <p className='footer-text'>Built with creativity by 
                <li>Sophia</li>
                <li>Salomeea</li>
                <li>Alexa</li>
                <li>Sergiu</li>
            </p>
        </div>
    );
};
export default AboutPage