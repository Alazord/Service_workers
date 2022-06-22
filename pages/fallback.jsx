import { Link } from '@chakra-ui/react';
import React from 'react';

const fallback = () => (
  <div style={{backgroundColor:"white"}}>
    <h1 >This is fallback page when device is offline </h1>
    <Link href="/">Click to go back to home.</Link>
  </div>
);

export default fallback;