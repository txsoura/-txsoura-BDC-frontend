import React, {useEffect, useRef} from 'react';
import {Chart, Filler, LinearScale, LineController, LineElement, PointElement, TimeScale, Tooltip,} from 'chart.js';
import 'chartjs-adapter-moment';

import {currencyFormatter} from "/utils/currencyFormatter";

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function Index({
                   data,
                   width,
                   height
               }) {

    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current;
        // eslint-disable-next-line no-unused-vars
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                chartArea: {
                    backgroundColor: '#F9FAFB',
                },
                layout: {
                    padding: 20,
                },
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true,
                    },
                    x: {
                        type: 'time',
                        time: {
                            parser: 'MM-DD-YYYY',
                            unit: 'month',
                        },
                        display: false,
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => false, // Disable tooltip title
                            label: (context) => currencyFormatter(context.parsed.y),
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest',
                },
                maintainAspectRatio: false,
            },
        });
        return () => chart.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas ref={canvas} width={width} height={height}></canvas>
    );
}

export default Index;
