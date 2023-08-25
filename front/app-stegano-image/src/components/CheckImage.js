import React, { useContext} from 'react';
import { AuthContext, DataContext } from '../contexts/AuthContext';
import Navbar from './Navbar';
import Copyright from './Copyright';


export default function CheckImage(props) {
  const authContext = useContext(AuthContext)
  const dataContext = useContext(AuthContext)


  return (
      <div>
        <Navbar />
        <p> This is CheckImage React Functional Componant</p>
        <Copyright />
      </div>
  );
}