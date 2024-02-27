"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
      >
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionEffect;
