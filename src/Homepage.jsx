import { useState } from 'react'
import Navbar from './Navbar'
import './Homepage.css'
import useRefreshToken from './hooks/useRefreshToken';
import useAxiosPrivate from './hooks/useAxiosPrivate';

// TODO: when refresh it forgets the logged in name

function Homepage() {
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  return (
    <div>
      <Navbar />
      {/* <button onClick={() => refresh()}>refresh</button> */}
    </div>
  );
}

export default Homepage;