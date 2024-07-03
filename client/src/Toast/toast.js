
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message) => {
  toast.success(message, {
    position: "top-center",
    theme: "colored",
    autoClose: 2000,
    style: {
      minWidth: '450px',
      backgroundColor: '#009dff',
      color: 'white', 
    },
  });
};
