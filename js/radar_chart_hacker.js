document.addEventListener('DOMContentLoaded', () => {

    const ctx = document.getElementById('certificationsRadarHacker').getContext('2d');

    // Dati per il radar
    const data = {
        labels: [
            'Penetration Testing',
            'IoT Security',
            'Cryptography',
            'Digital Forensics',
            'Threat Hunting',
            'Network Security',
        ],
        datasets: [
            {
                label: 'Skills acquired',
                data: [80, 73, 60, 65, 50, 70], // Esempio di valori
                fill: true,
                backgroundColor: 'rgba(166, 25, 66, 0.2)',
                borderColor: 'rgba(166, 25, 66, 1)',
                pointBackgroundColor: 'rgba(166, 25, 66, 1)',
                pointBorderColor: '#fff',
                pointRadius: 5, // Dimensione dei puntini
                pointHoverRadius: 8 // Dimensione dei puntini al passaggio del mouse
            }
        ]
    };


    // Configura il radar chart
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Adatta il grafico al contenitore
        /*layout: {
            padding: 5 // Margini interni al canvas
        },*/
        plugins: {
            legend: {
                display: false
                // position: 'top',
                /*labels: {
                    color: '#fff', // Imposta il testo della legenda in bianco
                    padding: 0,
                    font: {
                        size: 14
                    }
                }*/
            }
        },
        scales: {
            r: {
                min:0,
                max: 100,
                beginAtZero: true,
                grid: {
                    circular: false, // Mantiene il layout poligonale
                    color: 'rgba(213, 213, 213, 0.2)', // Colore delle linee di griglia

                },
                angleLines: {
                    color: 'rgba(213, 213, 213, 0.3)', // Colore delle linee degli angoli
                },
                pointLabels: {
                    color: 'rgba(213, 213, 213, 0.8)', // Colore delle etichette sui punti
                    font: {
                        size: 14 // Dimensione del font delle etichette sui punti
                    }
                },
                ticks: {
                    stepSize: 20, // Modifica l'intervallo tra i valori (maggiore intervallo = meno ragnatele)
                    max: 100, // Valore massimo del grafico (personalizzabile)
                    min: 0, // Valore minimo (personalizzabile)
                    display: false // Mostra i valori numerici sulle ticks
                    //color: 'rgba(0, 0, 0, 0.8)', // Colore dei valori sulle scale
                    //backdropColor: 'rgba(213, 213, 213, 0.7)', // Sfondo dei valori
                }
            }
        },
        bands: {
            yValue: 40,
            baseColorGradientColor: [
                'rgb(255, 100, 100)'
            ],
            bandLine: {
                stroke: 2,
                colour: 'rgba(100, 100, 255, 1)',
                type: 'solid',
            },
        }
    };

    // Crea il grafico
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options,
    });
});


