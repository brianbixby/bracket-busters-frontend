import React from 'react';
import { renderIf } from '../../../lib/util.js';

const Tooltip = props => (
  <div className='tooltip'>
    {renderIf(props.message && props.show,
      <section>
        <i className='fa fa-caret-up' />
        <p> {props.message} </p>
      </section>
    )}
  </div>
);

export default Tooltip;