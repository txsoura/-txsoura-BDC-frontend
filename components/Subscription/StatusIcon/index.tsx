import React from 'react';


const StatusIcon = ({value}) => {
    const status = {
        pendent: {
            color: 'yellow',
            message: 'Pendente',
        },
        deactivated: {
            color: 'red',
            message: 'Desativa',
        },
        active: {
            color: 'green',
            message: 'Ativa',
        },
    };

    return (
        <span
            className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-" + status[value].color + "-100 text-" + status[value].color + "-800"}>
                        {status[value].message}
        </span>
    );
};

export default StatusIcon;
