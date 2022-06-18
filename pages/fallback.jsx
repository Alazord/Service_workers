import { color } from '@chakra-ui/react';
import React from 'react';

const fallback = () => (
  <div className='fallback'>
    <h1>This is fallback page when device is offline </h1>
    <h3>Route will fallback to this page</h3>
  </div>
);

export default fallback;