import React from "react";
import Layout from "../component/Layout/Layout";
const Guide = () => {
  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    textAlign: 'center', // Center-align the content
    background: '#f7f7f7',
    border: '1px solid #e1e1e1',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom:"10px",
    
  };

  const headingStyle = {
    fontSize: '40px',
    marginBottom: '20px',
    color: 'orange',
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
  };

  const listItemStyle = {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#444',
    lineHeight: '1.4',
    textAlign: 'left', // Align the list items to the left
  };

  const buttonContainerStyle = {
    textAlign: 'center', // Center-align the button
    marginTop: '20px', // Add margin to separate the button from the list
  };

  const kbutton = {
    backgroundColor: 'orange',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
  };

  return (
   <Layout>
     <div className="voting-guidelines" style={containerStyle}>
      <h2 style={headingStyle}>Guidelines for Voting</h2>
      <ul style={{ listStyleType: 'circle', paddingLeft: '20px', textAlign: 'left' }}>
        <li style={listItemStyle}>
          <strong>1. </strong>Bring your valid Aadhar ID card for identification.
        </li>
        <li style={listItemStyle}>
          <strong>2. </strong>Make sure that you are voting within the time period given.
        </li>
        <li style={listItemStyle}>
          <strong>3. </strong>Take a moment to review and familiarize yourself with the candidates and issues.
        </li>
        <li style={listItemStyle}>
          <strong>4. </strong>Be cautious of the two-minute time token; you have to cast your vote within that two minutes.
        </li>
        <li style={listItemStyle}>
          <strong>5. </strong>After marking your choices, carefully review your ballot to ensure your selections are accurate.
        </li>
        <li style={listItemStyle}>
          <strong>6. </strong>If you require any kind of assistance, you have Votebot to guide you.
        </li>
        <li style={listItemStyle}>
          <strong>7. </strong>Follow the instructions carefully to ensure a smooth voting process.
        </li>
      </ul>

      {/* <div style={buttonContainerStyle}>
        <button style={kbutton} to="/verify" className="inline-flex items-center justify-center px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus:bg-orange-600">
          I Agree
        </button>
      </div> */}
    </div>
   </Layout>
  );
}

export default Guide;