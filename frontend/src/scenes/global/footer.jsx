import React from 'react';
import "./footerStyle.css";
import digitellLogo from "../../images/DigiTeLL_Logo2023.png";
import GULogo from "../../images/GU-Logo-blau.jpg";
import StiftungLogo from "../../images/Logo_Stiftung_Hochschullehre_pos_klein.jpg";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="logo-container">
                    <a href="https://www.uni-frankfurt.de/digitell" target="_blank">
                        <img src={digitellLogo} alt="DigiTeLL Logo 2023"/>
                    </a>
                </div>
                <div className="logo-container">
                    <a href="https://www.uni-frankfurt.de" target="_blank">
                        <img src={GULogo} alt="Goethe University Logo"/>
                    </a>
                </div>
                <div className="logo-container">
                    <p>gefördert durch</p>
                    <a href="https://stiftung-hochschullehre.de/" target="_blank">
                        <img src={StiftungLogo} alt="Logo Stiftung Hochschullehre"/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
