import React  from 'react';
import Menu from '../../components/header/Menu';
import Toast from '../../components/toast/Toast';
import './App.css';

const App = (props) => (
  <div id="root-content" className="body-scrolled">
    <Toast/>
    <Menu/>
    {props.children}
  </div>
);

export default App;
