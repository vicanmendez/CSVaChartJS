/*Código sacado del sample de ChartJS */
//Gráfica sencilla de barras usando Chart.JS
//

/* Copiamos toda la configuración para modificar a gusto en el JS
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var color = Chart.helpers.color;
		var barChartData = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
				borderColor: window.chartColors.red,
				borderWidth: 1,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}, {
				label: 'Dataset 2',
				backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
				borderColor: window.chartColors.blue,
				borderWidth: 1,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				]
			}]

		};
*/

//Copiamos la funcion onliad para nuestra función ready de JQuery, ya que vamos a ejecutar estas instrucciones en el bloque principal
		/*
		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Chart.js Bar Chart'
					}
				}
			});

		};
	

	//Funciones para los botones por default
		document.getElementById('randomizeData').addEventListener('click', function() {
			var zero = Math.random() < 0.2 ? true : false;
			barChartData.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return zero ? 0.0 : randomScalingFactor();
				});

			});
			window.myBar.update();
		});

		var colorNames = Object.keys(window.chartColors);
		document.getElementById('addDataset').addEventListener('click', function() {
			var colorName = colorNames[barChartData.datasets.length % colorNames.length];
			var dsColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Dataset ' + (barChartData.datasets.length + 1),
				backgroundColor: color(dsColor).alpha(0.5).rgbString(),
				borderColor: dsColor,
				borderWidth: 1,
				data: []
			};

			for (var index = 0; index < barChartData.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			barChartData.datasets.push(newDataset);
			window.myBar.update();
		});

		document.getElementById('addData').addEventListener('click', function() {
			if (barChartData.datasets.length > 0) {
				var month = MONTHS[barChartData.labels.length % MONTHS.length];
				barChartData.labels.push(month);

				for (var index = 0; index < barChartData.datasets.length; ++index) {
					// window.myBar.addData(randomScalingFactor(), index);
					barChartData.datasets[index].data.push(randomScalingFactor());
				}

				window.myBar.update();
			}
		});

		document.getElementById('removeDataset').addEventListener('click', function() {
			barChartData.datasets.pop();
			window.myBar.update();
		});

		document.getElementById('removeData').addEventListener('click', function() {
			barChartData.labels.splice(-1, 1); // remove the label first

			barChartData.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});

			window.myBar.update();
		});

*/


$(document).ready(function() {

var datosGlobal = [];
var tipo = "";

//Leer el archivo CSV y guardar como AJAX
//El archivo se llama datos.csv y se encuentra en el directorio inmediato superior.

$.ajax({
	url: './datos.csv',
	dataType: 'text',
	contentType: 'charset=utf-8',
}).done(cargarDatos);

//Leer el típo de gráfico deseado y guardarlo en una variable global
var selectTipo = $("#tipo");
var tipo = selectTipo.val();
selectTipo.on("change", () => {
	tipo = selectTipo.val();
	console.log(tipo);
	//Recargamos la grática en caso de cambiar el tipo de gráfico
	cargarDatos(datosGlobal);
});


//PRECONDICIÓN: debe estar cargada la variable datosGlobal como un array con todas las filas del CSV
function agregarDataSet(n, datos) {
	console.log(datos)
	var color = Chart.helpers.color;
	var colorNames = Object.keys(window.chartColors);
	var colorName = colorNames[barChartData.datasets.length % colorNames.length];
			var dsColor = window.chartColors[colorName];
			var newDataset = {
				//El título será el valor que haya en la primer fila de la columna correspondiente al dataset
				label: datos[0][(barChartData.datasets.length + 1)],
				backgroundColor: color(dsColor).alpha(0.5).rgbString(),
				borderColor: dsColor,
				borderWidth: 1,
				data: []
			};

			for (var index = 1; index < datos.length; index++) {
				//Referenciamos al dato contenido en la columna n+1, donde "n" es el número de dataSet
				newDataset.data.push(datos[index][n+1]);
			}

			barChartData.datasets.push(newDataset);
			window.myBar.update();
}


function cargarDatos(data) {
	datosGlobal = data;
	console.log("Datos obtenidos: ");
	console.log(data);
	//Objeto JSON de ChartJS, que redifinimos como global
	var barChartData = {};
	//array global con los datos del csv
	var arrayDatos = [];
	//Creamos un array con los datos leídos, quitando las comas, los espacios y caracteres separadores
	arrayDatos = data.split(/\r?\n|\r/);
	//Como el csv es un fichero con datos separamos con comas, creamos un nuevo array donde se quiten las comas
	var datos = [];
	//cramos un array para cada fila del csv
	for(let i = 0; i<arrayDatos.length; i++) {
	/*
	Str.Split(separador) retorna un array a partir de un String usando como separador el parámetro
	Array.Join(separador) retorna un String a partir de un array, separando cada elemento con un separador indicado
	Por eso jugando con ambos métodos, podemos partiendo de un string separado por , o ; (dependiendo del tipo de CSV) retornar un array de elementos
	*/
	 datos[i] = arrayDatos[i].split(",").join(";").split(";");	

	}
	//El método array.pop() elimina el último elemento del array, que por alguna razón viene un elemento vacío en el csv
	datos.pop();
	console.log(datos);
	graficar(datos);
	
}

	function graficar(datos) {
	/* COMO LA PRIMER CELDA DEL ARRAY DE DATOS VA A CONTENER LOS TÍTULOS, TAMBIÉN VA A DERERMINAR LA CANTIDAD DE DATASETS A GRAFICAR
	Por ejemplo, si tiene 2 títulos, sólo tenemos 1 dataset (la segunda columna del CSV), pero si tiene 3 títulos, tendrá 2 (las dos columnas con valores) */
	//console.log("Cantidad de valores: "+datos[0].length);
	var dataSets = datos[0].length-1;

	//Config del gráfico
	var TITULOS = [];
	var VALORES = [];
		//De todo el array de datos, sacamos su PRIMER ELEMENTO para los títulos (que deberían tener las celdas de la primer columna del CSV)
		//El segundo elemento del vector debería contener la celda ubicada en la segunda columna del CSV (los valores)
		for(let i in datos) {
			//Excluímos el primer elemento del array, ya que sólo tiene el título de la columna
			if (i != 0) {
			TITULOS.push(datos[i][0]);
			VALORES.push(datos[i][1]);
		
			}
		}

		
		var color = Chart.helpers.color;
		barChartData = {
			labels: TITULOS,
			datasets: [

			{
				//La prmer fila de todo el array debería tener el título de la 2da columna del CSV, por lo que lo usamos para el dataset
				label: datos[0][1],
				//config de color
				backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
				borderColor: window.chartColors.red,
				borderWidth: 1,
				//cargamos los datos a graficar con los valores del array
				data: VALORES
			}, 
			
			]};

		//Gráfico de barras sencillo con ChartJS
		
		var ctx = document.getElementById('canvas').getContext('2d');
				window.myBar = new Chart(ctx, {
				//type: 'bar',
					type: tipo,
					data: barChartData,
					options: {
						responsive: true,
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Chart.js Bar Chart'
						}
					}
				});

	//Si tenemos más de un dataSet para graficar
	if(dataSets > 1) {
		for(let n=1; n < dataSets; n++) {
			//Creamos una función para agregar un nuevo dataSet, con un parámetro entero que referenciará a la columna del CSV a leer
			//Adicionalmente, pasamos todo el array de datos
			agregarDataSet(n, datos);
		}
	}
}

	





});