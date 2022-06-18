import React from 'react';
import { renderIf } from '../../../lib/util.js';
import caretUp from "./../assets/icons/caret-up.icon.svg";

// let caretUp = require('./../assets/icons/caret-up.icon.svg');
const Tooltip = props => (
  <div className='tooltip'>
    {renderIf(props.message && props.show,
      <section>
        <img className='caret-up' src={caretUp} alt="caret up icon" />
        <p> {props.message} </p>
      </section>
    )}
  </div>
);

export default Tooltip;