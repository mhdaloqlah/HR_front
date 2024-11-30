import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// p: pattern, h: height, req: required
function Toastsuccess({ message  }) {
    const notify = () => toast({message});
  return (
    <><button onClick={notify}>Notify!</button>
        <ToastContainer /></>
    
  );
}

export default Toastsuccess;
