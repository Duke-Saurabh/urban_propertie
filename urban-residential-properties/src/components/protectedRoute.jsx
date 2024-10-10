import PropTypes from 'prop-types';
// import Spinner from "./Spinner";
// import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../context/authContext';
// import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
 

//   const location = useLocation();
 const {isAuthenticated} =  useAuth();

 
//   useEffect(()=>{
     
    //  console.log('token',token)
    //  localStorage.setItem('accessToken', accessToken);
//     if(token){
//         setIsAuthenticated(true);
//     } 
//    },[isAuthenticated])
  useEffect(() => {
   const loadProtectedPage=async ()=>{
    // const token=localStorage.get(accessToken);
    if (!isAuthenticated) {

      console.log("location in protected route")
      
    }
   };

   loadProtectedPage();

  }, [isAuthenticated]);

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-100">
//           Loading...
//       </div>
//     );
//   }

console.log("isAuthenticated",isAuthenticated);

  if (isAuthenticated) {
     
    console.log("abc")

    return children;
}

  return null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;