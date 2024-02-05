var mi_diccionario={};


    function loadDoc() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let f = JSON.parse(this.responseText);
            console.log(f[0].municipi)
            for (let i=0; i<=f.length-1; i++) {
                let localidad = f[i].municipi;

                if (!(mi_diccionario.hasOwnProperty(localidad))) {
                    mi_diccionario[localidad] = 1; // inicio key con contador 1
                } else {
                    mi_diccionario[localidad] = mi_diccionario[localidad]+1;
                }
            }

            console.log(mi_diccionario);
            CrearGraf(mi_diccionario);
        }
        xhttp.open("GET", "https://catalegdades.caib.cat/resource/euss-d827.json");
        xhttp.send();
    }
    
    function CrearGraf(diccionario) {
            var ctx = document.getElementById('myChart').getContext('2d');

            var data = {
                labels: [],
                datasets: [{
                    label: 'My First Dataset',
                    data: [],
                    backgroundColor: [],
                    borderWidth: 1
                }]
            };
            console.log(data)
        
            for (let key in diccionario) {
                data.labels.push(key);
                data.datasets[0].data.push(diccionario[key]);
                data.datasets[0].backgroundColor.push(`rgba(${Math.random()*(255-0)+1}, ${Math.random()*(255-0)+1}, ${Math.random()*(255-0)+1}, 0.2)`)
            }
        
            var options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
    }
