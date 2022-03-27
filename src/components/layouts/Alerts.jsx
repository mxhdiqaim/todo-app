import React, { useContext } from 'react';
import './style.scss';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div className={`alerts alert-${alerts.type}`}>
      {alerts && <p className='alert'>{alerts.msg}</p>}
    </div>
  );
};

export default Alerts;
