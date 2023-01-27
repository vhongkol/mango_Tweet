import React, { useState, useEffect } from 'react';

const YesNoModal = ({

    showModal, 
    handleClose, 
    handleShow, 
    handleYes,
    title,
    message,
    buttonName,

}) => {

    
    const testing = () => {
        const res = handleYes();
        console.log("YESNO");
        console.log(res);
      }
    

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
            handleClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose]);

  return (
      <>
          <button onClick={handleShow}
              style={{
              width: "100%",                    
              }}
              >{buttonName}
          </button>
  
          {showModal && (
              <div style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "0.5rem"
              }}>
                  <h3>{title}</h3>
                  <p>{message}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <button onClick={handleClose}>No</button>
                      <button onClick={handleYes}>Yes</button>
                  </div>
              </div>
          )}
      </>
  );
}

export default YesNoModal;