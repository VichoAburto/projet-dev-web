import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ShotPutScene = ({ distance, onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  const throwBallVariants = {
    hidden: { x: 0, y: 0 },
    visible: {
      x: distance * 15,
      y: distance === 0 ? 0 : [-50, -150, -100, -50, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
      },
    },
  };

  const backgroundStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, #87CEEB, #3CB371)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "hidden",
  };

  const groundStyles = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50px",
    backgroundColor: "#3CB371",
  };

  const personStyles = {
    position: "absolute",
    bottom: "50px",
    left: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headStyles = {
    width: "30px",
    height: "30px",
    backgroundColor: "#FFD700",
    borderRadius: "50%",
  };

  const bodyStyles = {
    width: "10px",
    height: "50px",
    backgroundColor: "#000",
    borderRadius: "5px",
  };

  const armStyles = (isRight) => ({
    width: "40px",
    height: "5px",
    backgroundColor: "#000",
    borderRadius: "5px",
    position: "absolute",
    top: "15px",
    [isRight ? "right" : "left"]: "-40px",
    transform: isRight ? "rotate(-45deg)" : "rotate(45deg)",
    transformOrigin: isRight ? "100% 50%" : "0% 50%",
  });

  const legStyles = (isRight) => ({
    width: "10px",
    height: "30px",
    backgroundColor: "#000",
    borderRadius: "5px",
    position: "absolute",
    bottom: "0px",
    [isRight ? "right" : "left"]: "-10px",
    transform: isRight ? "rotate(20deg)" : "rotate(-20deg)",
  });

  const ballStyles = {
    position: "absolute",
    bottom: "90px",
    left: "70px",
    width: "15px",
    height: "15px",
    backgroundColor: distance === 0 ? "red" : "black",
    borderRadius: "50%",
  };

  const xMarkStyles = {
    position: "absolute",
    top: "40%",
    left: "45%",
    fontSize: "50px",
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div style={backgroundStyles}>
      <div style={groundStyles}></div>
      <div style={personStyles}>
        <div style={headStyles}></div>
        <div style={bodyStyles}></div>
        <motion.div
          style={armStyles(false)}
          initial={{ rotate: 45 }}
          animate={{ rotate: 20 }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        ></motion.div>
        <motion.div
          style={armStyles(true)}
          initial={{ rotate: -45 }}
          animate={{ rotate: -20 }}
          transition={{ duration: 0.5, yoyo: Infinity }}
        ></motion.div>
        {/* Beine */}
        <div style={legStyles(false)}></div>
        <div style={legStyles(true)}></div>
      </div>
      {distance === 0 ? (
        <div style={xMarkStyles}>X</div>
      ) : (
        <motion.div
          style={ballStyles}
          variants={throwBallVariants}
          initial="hidden"
          animate="visible"
        ></motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "20px",
          left: `${distance * 15}px`,
          fontSize: "20px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {distance}m
      </motion.div>
    </div>
  );
};

export default ShotPutScene;
