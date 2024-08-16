import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ITransitionPageAdminProps{
    children: ReactNode;
}


const animation = {
    initial: {opacity: 0, y: 100},
    animate: { opacity: 1, y: 0},
    exit:{ opacity: 0, y: -100 },

}


const TransitionPageAdmin: React.FC<ITransitionPageAdminProps> = ({ children }) => {
    return (      
        <motion.div
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{duration: 0.5}}
        >
            {children}
        </motion.div>      
    );
};

export default TransitionPageAdmin;