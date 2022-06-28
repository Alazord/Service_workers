import { Link } from '@chakra-ui/react';
import React from 'react';

const fallback = () => (
  <div style={{backgroundColor:"white"}}>
    <h1 >Sorry, you are offline. You cannot make new searches. However, you can still make old searches again.</h1>
    <Link href="/">Click to go back to home.</Link>
  </div>
);

export default fallback;