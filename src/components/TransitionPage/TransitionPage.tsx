import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ITransitionPageProps{
    children: ReactNode;
}


const animation = {
    initial: {opacity: 0, x: -400, height: 'auto' },
    animate: { opacity: 1, x: 0, height: 'auto' },
    exit:{ opacity: 0, x: 400, height: 'auto' },

}


const TransitionPage: React.FC<ITransitionPageProps> = ({ children }) => {
    return (      
        <motion.div
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            style={{overflow: 'hidden'}}
            transition={{duration: 0.5}}
        >
            {children}
        </motion.div>      
    );
};

export default TransitionPage;