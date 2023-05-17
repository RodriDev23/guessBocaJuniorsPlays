import React from 'react';

interface VideoProps {
  src: string;
  type: string;
}

const Video: React.FC<VideoProps> = ({ src, type }) => {
  return (
    <video controls className='mt-2' width='100%' height='0'>
      <source src={src} type={type} />
    </video>
  );
};

export default Video;
