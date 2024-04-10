const bounceTransition = ({
  yInitial = "20%",
  opacityInitial = 0,
  stiffness = 100,
  damping = 10,
  delay = 0.3
} = {}) => ({
  hidden: { y: yInitial, opacity: opacityInitial },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: stiffness,
      damping: damping,
      delay: delay
    }
  }
});

const bounceTransitionItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const popOut = {
  initial: { scale: 0 },
  animate: {
    scale: [0, 1.05, 1],
    rotate: [0, 10, 0],
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.7
    }
  }
};

const bounceAnimatePresence = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      type: "tween"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3 // Adjust the staggering time as needed
    }
  }
};

export {
  bounceAnimatePresence,
  bounceTransition,
  bounceTransitionItem,
  containerVariants,
  popOut
};
