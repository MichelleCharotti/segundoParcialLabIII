namespace general {

    window.addEventListener("load", function () {
        (<HTMLInputElement>document.getElementById("tipo"))?.addEventListener("change", mostrarInput);
        (<HTMLInputElement>document.getElementById("agregar"))?.addEventListener("click", abrirAgregar);
        (<HTMLInputElement>document.getElementById("btnCerrar"))?.addEventListener("click", cerrarAgregar);
        (<HTMLInputElement>document.getElementById("btnCancelar"))?.addEventListener("click", cerrarAgregar);
        (<HTMLInputElement>document.getElementById("btnAgregar"))?.addEventListener("click", guardar);
        (<HTMLInputElement>document.getElementById("search"))?.addEventListener("keyup", filter);
        (<HTMLInputElement>document.getElementById("idOcultar")).addEventListener("change", filtradoColumna);
        (<HTMLInputElement>document.getElementById("marcaOcultar")).addEventListener("change", filtradoColumna);
        (<HTMLInputElement>document.getElementById("modeloOcultar")).addEventListener("change", filtradoColumna);
        (<HTMLInputElement>document.getElementById("precioOcultar")).addEventListener("change", filtradoColumna);
        (<HTMLInputElement>document.getElementById("btnPromedio")).addEventListener("click", promedio);
        (<HTMLInputElement>document.getElementById("filtro-vehiculos"))?.addEventListener("change", filter);
    })

    export var listaVehiculos: Array<Vehiculo> = new Array<Vehiculo>();

    export function mostrarInput() {
        var seleccionado = (<HTMLInputElement>document.getElementById('tipo')).value;
        if (seleccionado == 'Auto') {
            const auto = document.querySelector('#selectAuto');
            (<HTMLElement>auto).style.display = "block";

            const camioneta = document.querySelector('#selectCamioneta');
            (<HTMLElement>camioneta).style.display = "none";

        } else if (seleccionado == 'Camioneta') {
            const auto = document.querySelector('#selectAuto');
            (<HTMLElement>auto).style.display = "none";

            const camioneta = document.querySelector('#selectCamioneta');
            (<HTMLElement>camioneta).style.display = "block";
        }
    }

    export function abrirAgregar() {
        var contAgregar = document.getElementById("backdrop");
        (<HTMLElement>contAgregar).style.display = "flex";
    }

    export function cerrarAgregar() {
        var contAgregar = document.getElementById("backdrop");
        resetForm();
        (<HTMLElement>contAgregar).style.display = "none";
    }

    function resetForm() {
        (<HTMLInputElement>document.getElementById("id")).value = "";
        (<HTMLInputElement>document.getElementById('marca')).value = "";
        (<HTMLInputElement>document.getElementById('modelo')).value = "";
        (<HTMLInputElement>document.getElementById('precio')).value = "";
        (<HTMLInputElement>document.getElementById('tipo')).value = "";
        (<HTMLInputElement>document.getElementById('puertas')).value = "";

        const perro = document.querySelector('#selectAuto');
        (<HTMLElement>perro).style.display = "none";

        const gato = document.querySelector('#selectCamioneta');
        (<HTMLElement>gato).style.display = "none";
    }

    function resetErrores() {
        (<HTMLInputElement>document.getElementById("id")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("marca")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("modelo")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("precio")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("tipo")).classList.remove("error");
        (<HTMLInputElement>document.getElementById("puertas")).classList.remove("error");
    }

    export function crearTabla(lista: Array<Vehiculo>) {
        var tCuerpo = (<HTMLTableElement>document.getElementById("tCuerpo"));

        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }

        lista.forEach(vehiculo => {
            var id: any = vehiculo.getId();
            var marca: string = vehiculo.getMarca();
            var modelo: string = vehiculo.getModelo();
            var precio: any = vehiculo.getPrecio();
            var dato: any;

            if (vehiculo instanceof Auto) {
                var tipo = "Auto";
                dato = "Puertas: " + vehiculo.getPuertas();
            } else if (vehiculo instanceof Camioneta) {
                var tipo = "Camioneta";
                var esCuatroxCuatro: Boolean = vehiculo.get4x4();
                if (esCuatroxCuatro) {
                    dato = "Es 4x4";
                } else {
                    dato = "No es 4x4";
                }
            }

            var tr = document.createElement("tr");
            var tdId = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            tdId.appendChild(nodoTexto);
            tdId.setAttribute("name", "idTabla");
            tr.appendChild(tdId);

            var tdMarca = document.createElement("td");
            var nodoTexto = document.createTextNode(marca);
            tdMarca.appendChild(nodoTexto);
            tdMarca.setAttribute("name", "marcaTabla");
            tr.appendChild(tdMarca);

            var tdModelo = document.createElement("td");
            var nodoTexto = document.createTextNode(modelo);
            tdModelo.appendChild(nodoTexto);
            tdModelo.setAttribute("name", "modeloTabla");
            tr.appendChild(tdModelo);

            var tdPrecio = document.createElement("td");
            var nodoTexto = document.createTextNode(precio);
            tdPrecio.appendChild(nodoTexto);
            tdPrecio.setAttribute("name", "precioTabla");
            tr.appendChild(tdPrecio);

            //
            var tdTipo = document.createElement("td");
            var nodoTexto = document.createTextNode(tipo);
            tdTipo.appendChild(nodoTexto);
            tdTipo.setAttribute("name", "tipoTabla");
            tr.appendChild(tdTipo);
            //

            var tdDato = document.createElement("td");
            var nodoTexto = document.createTextNode(dato);
            tdDato.appendChild(nodoTexto);
            tdDato.setAttribute("name", "datoTabla");
            tr.appendChild(tdDato);

            var tdAccion = document.createElement("td");
            var btnEliminar = document.createElement("input");
            btnEliminar.type = "button";
            btnEliminar.className = "eliminar"
            btnEliminar.id = "eliminar" + id;
            btnEliminar.value = "Eliminar";
            btnEliminar.addEventListener("click", getPosition)
            btnEliminar.onclick = function () { eliminar(lista.indexOf(vehiculo)) };
            tdAccion.appendChild(btnEliminar);
            tr.appendChild(tdAccion);

            (<HTMLElement>tCuerpo).appendChild(tr);
        })
    }

    function getPosition(event: any) {
        var position = event.target.parentNode.parentNode.rowIndex;
        console.log(position);
    }

    export function eliminar(position: any) 
    {
        listaVehiculos.splice(position, 1);
        crearTabla(listaVehiculos);
    }

    export function guardar() {
        resetErrores();
        var inputMarca = (<HTMLInputElement>document.getElementById("marca")).value;
        var marcaMayus = inputMarca.charAt(0).toUpperCase() + inputMarca.slice(1);

        var inputModelo = (<HTMLInputElement>document.getElementById("modelo")).value;
        var inputPrecio: number = parseInt((<HTMLInputElement>document.getElementById("precio")).value);
        var inputTipo = (<HTMLInputElement>document.getElementById("tipo")).value;
        var inputPuertas = parseInt((<HTMLInputElement>document.getElementById("puertas")).value);
        var inputCuatroxCuatro = (<HTMLInputElement>document.getElementById("cuatroXcuatro")).checked;
        var id: number;

        if (listaVehiculos.length == 0) {
            id = 1;
        }
        else {
            var listaVehiculosAux = listaVehiculos;
            id = listaVehiculosAux.reduce(function (maximo, vehiculo) {
                if (vehiculo.getId() >= maximo) {
                    return vehiculo.getId() + 1;
                }
                return maximo;
            }, 0);
        }

        if (inputMarca.length > 0) {
            if (inputModelo.length > 0) {
                if (inputPrecio > 0) {
                    if (inputTipo.length > 0) {
                        if (inputTipo == "Auto") {
                            if (inputPuertas >= 2 && inputPuertas <= 6) {
                                Auto.guardarAuto(id, marcaMayus, inputModelo, inputPrecio, inputPuertas);
                                cerrarAgregar();
                            } else {
                                (<HTMLInputElement>document.getElementById("puertas")).classList.add("error");
                            }
                        } else if (inputTipo == "Camioneta") {
                            Camioneta.guardarCamioneta(id, marcaMayus, inputModelo, inputPrecio, inputCuatroxCuatro);
                            cerrarAgregar();
                        }
                    } else {
                        (<HTMLInputElement>document.getElementById("tipo")).classList.add("error");
                    }
                } else {
                    (<HTMLInputElement>document.getElementById("precio")).classList.add("error");
                }
            } else {
                (<HTMLInputElement>document.getElementById("modelo")).classList.add("error");
            }
        } else {
            (<HTMLInputElement>document.getElementById("marca")).classList.add("error");
        }
    }

    export function filter() {
        var listaFiltrada = listaVehiculos.filter(function (vehiculo) {
            if ((<HTMLInputElement>document.getElementById("tipo")).value == "Auto") {
                return vehiculo instanceof Auto;
            } else {
                return vehiculo instanceof Camioneta;
            }
        });
        crearTabla(listaFiltrada);
    }

    export function filtradoColumna() {
        var id = (<HTMLInputElement>document.getElementById("idOcultar"));
        var marca = (<HTMLInputElement>document.getElementById("marcaOcultar"));
        var modelo = (<HTMLInputElement>document.getElementById("modeloOcultar"));
        var precio = (<HTMLInputElement>document.getElementById("precioOcultar"));

        if (id.checked) {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(x => {
                x.hidden = false;
            })
        } else {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(x => {
                x.hidden = true;
            })
        }
        if (marca.checked) {
            var tablasMarcas = document.getElementsByName("marcaTabla");
            tablasMarcas.forEach(x => {
                x.hidden = false;
            })
        } else {
            var tablasMarcas = document.getElementsByName("marcaTabla");
            tablasMarcas.forEach(x => {
                x.hidden = true;
            })
        }
        if (modelo.checked) {
            var tablasModelos = document.getElementsByName("modeloTabla");
            tablasModelos.forEach(x => {
                x.hidden = false;
            })
        } else {
            var tablasModelos = document.getElementsByName("modeloTabla");
            tablasModelos.forEach(x => {
                x.hidden = true;
            })
        }
        if (precio.checked) {
            var tablasPrecios = document.getElementsByName("precioTabla");
            tablasPrecios.forEach(x => {
                x.hidden = false;
            })
        } else {
            var tablasPrecios = document.getElementsByName("precioTabla");
            tablasPrecios.forEach(x => {
                x.hidden = true;
            })
        }
    }

    var listaFiltradaGlobal: Array<Vehiculo> = new Array<Vehiculo>();
    export function promedio() {
        var listaPrecio: Array<number>;
        var promedio: number;
        if (listaFiltradaGlobal.length > 0) {
            listaPrecio = listaFiltradaGlobal.map(x => (<Vehiculo>x).precio);
            promedio = listaPrecio.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        } else {
            listaPrecio = listaVehiculos.map(x => (<Vehiculo>x).precio);
            promedio = listaPrecio.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        (<HTMLInputElement>document.getElementById("promedio")).value = (promedio / listaPrecio.length).toString();
    }
}