/**
 * @file HomePage.jsx
 * @description The welcome home page of the project that displays the logo and some details about the smart plant system
 * @author SophiaJustin
 */

import React from 'react';
import "@/styles/pages/home.css";
import logo from "../../../assets/smartgrow-logo.png";

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="info-section">
                <img src={logo} alt="SmartGrow Logo" className="smart-logo" />
                <h1>Welcome to SmartGrow</h1>
                <p>Your intelligent assistant for your modern greenhouse!</p>
            </div>
            <div className="quick-links">
                <div className="card">
                    <h2>Monitor conditions</h2>
                    <p>Check live data from you greenhouse sensors!</p>
                </div>
                <div className="card">
                    <h2>Manage Automations</h2>
                    <p>Configure watering, fertilization and lighting schedules!</p>
                </div>
                <div className="card">
                    <h2>Get Insights</h2>
                    <p>Analyze and optimize your plant growth!</p>
                </div>
            </div>
        </div>
    );
};
export default HomePage;