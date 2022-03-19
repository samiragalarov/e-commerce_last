import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export  const AppContext = createContext();

const { Provider } = AppContext;

export const  AppProvider = (props) => {

    const [user ,setuser] = useState(null)
    const [admin ,setadmin] = useState(false)
  
    

    useEffect(()=>{
     
      const username = localStorage.getItem('username')
      setuser(username)

      
    },[])
    


return(

   <Provider value={{currentUser :[user ,setuser], checkuser: [admin ,setadmin]}}>

      {props.children}

   </Provider>

 );

}