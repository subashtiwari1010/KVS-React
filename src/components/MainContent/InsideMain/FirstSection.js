import React from 'react';
import MaterialIcon from 'material-icons-react';
import Flood from '../../../img/Flood.png'

import Emblem from '../../../img/Emblem_of_Nepal.png';

function FirstSection(props) {
  return (
    // <section className='banner' style={{ backgroundImage: `url(${Flood})`}}>
      <section className='banner' >
      <div className='container height-100'>
        <div className='banner-wrap-center'>
          <div className='banner-content'>
            <figure>
              <img src={Emblem} alt='' />
            </figure>
            <h2 className='heading2'>
              A <span>Household Data Visualization System</span> for Disaster
              Risk Reduction and early assistance.
            </h2>
            <span className='icon-wrap pdt-140'>
              <MaterialIcon style={{ display: 'none' }} />
              <figure>
                <i className='material-icons' onClick={props.intro}>
                  arrow_downward
                </i>
              </figure>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FirstSection;
