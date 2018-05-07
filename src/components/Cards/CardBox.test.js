import React from 'react';
import ReactDOM from 'react-dom';
import CardBox from './CardBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
