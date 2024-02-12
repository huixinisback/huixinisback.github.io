import React from 'react';
import Navbar from '../Navbar/Navbar';

const AboutPage = () => {
  const paragraphs = [
    "Welcome to Wearify, the innovative platform designed to revolutionize the way you engage with your wardrobe. At the heart of our mission is a simple yet powerful idea: to make managing and styling your clothes as seamless and enjoyable as possible. Wearify is more than just a digital closet; it's a dynamic fashion assistant that helps you store, organize, and generate daily outfit ideas tailored to your personal style and preferences.",
    "With Wearify, you can effortlessly catalog your clothing items, allowing for easy access and organization. But we don't stop there. Our cutting-edge outfit generator takes into account the weather, occasion, and your fashion preferences to suggest the perfect ensemble for every day. Say goodbye to morning dilemmas and hello to confidence in your look!",
    "But what makes Wearify truly unique is its community-driven approach. Share your favorite outfits and fashion creations with a like-minded community ready to inspire and be inspired. Receive feedback, exchange ideas, and engage in fashion-forward discussions. Whether you're seeking advice on your next look or offering your style insights, Wearify is your go-to destination.",
    "Join us on this stylish journey and transform the way you think about your wardrobe. With Wearify, discover the joy of dressing up every day, explore endless fashion possibilities, and connect with a community that shares your passion for style. Welcome to the future of wardrobe management and outfit inspiration – welcome to Wearify."
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", paddingTop: '60px' }}>
      <Navbar />
      <h1 style={{
        textAlign: 'center',
        margin: '0 0 20px 0',
        fontSize: '60px',
        fontWeight: 'bold',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BEC7B4',
        letterSpacing: '2px',
      }}>About Wearify</h1>
      {paragraphs.map((paragraph, index) => (
        <div key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: index % 2 === 0 ? '#E4DCD2' : '#BEC7B4',
          color: '#333',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            fontSize: '24px',
            lineHeight: '1.8',
            letterSpacing: '1px', // Ensuring paragraphs match the header's letter spacing
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontWeight: 'bold', // Match the header's font weight if desired
          }}>
            <p>{paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
