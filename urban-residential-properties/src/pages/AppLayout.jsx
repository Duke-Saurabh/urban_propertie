

import { Outlet } from "react-router-dom";

// import ChatRoom from "../components/ChatRoom";


const AppLayout = () => {

  

  // const isPopUp=true;

  return (
    <div className="">
      
        <Outlet/>

      </div>
     

  );
};

export default AppLayout;