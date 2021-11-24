import React from 'react';

const StatusIcon = ({ value }) => {
  const status = {
    pendent: {
      color: 'yellow',
      message: 'Pendente',
    },
    canceled: {
      color: 'red',
      message: 'Cancelado',
    },
    started: {
      color: 'blue',
      message: 'Iniciado',
    },
    paused: {
      color: 'orange',
      message: 'Pausado',
    },
    abandoned: {
      color: 'pink',
      message: 'Abandonado',
    },
    finalized: {
      color: 'green',
      message: 'Finalizado',
    },
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${status[value].color}-100 text-${status[value].color}-800`}
    >
      {status[value].message}
    </span>
  );
};

export default StatusIcon;
