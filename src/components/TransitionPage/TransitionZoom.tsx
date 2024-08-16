import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ITransitionZoom{
    children: ReactNode;
}

const animation = {
    initial: {opacity: 0, height: 0, with: 0},
    animate: {opacity: 1, height: '200px', with: '200px'},
    exit:{ opacity: 0, height: 0, with: 0 },

}

const TransitionZoom: React.FC<ITransitionZoom> = ({ children }) => {
    return (      
        <motion.div
            variants={animation}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{duration: 0.5}}
            style={{ overflow: 'hidden' }}
        >
            {children}
        </motion.div>      
    );
}

export default TransitionZoom