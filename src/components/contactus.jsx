import React from "react";
import "./contactus.css";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="overlay"></div>
      <div className="contact-box">
        <h2>CONTACT</h2>
        <p>
        Need Help?
        If you encounter any software-related issues or need technical support, 
        feel free to reach out to us through this Contact Us page. Our team is here to assist you and ensure smooth functionality. 
        Your feedback and queries are important to us!
        </p>
      
        <div className="contact-info">
          <h3>Contact Details</h3>
          <p>
            📞 <a href="tel:8177889407">+91 8177889407</a>
          </p>
          <p>
            📧 <a href="mailto:madhurapawar520@gmail.com">madhurapawar520@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
