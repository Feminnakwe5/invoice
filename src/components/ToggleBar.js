import React from 'react';
import { BiCircleThreeQuarter } from 'react-icons/bi';
import { FiMoon } from 'react-icons/fi';
import profile from '../assests/profile.jpg';

const ToggleBar = () => {
  return (
    <div className='toggle-bar'>
      <div>
        <BiCircleThreeQuarter />
      </div>
      <div>
        <div className='profile'>
          <FiMoon />
          <img src={profile} alt='man with red hat' />
        </div>
      </div>
    </div>
  );
};

export default ToggleBar;
