var general;
(function (general) {
    window.addEventListener("load", function () {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = document.getElementById("tipo")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", mostrarInput);
        (_b = document.getElementById("agregar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", abrirAgregar);
        (_c = document.getElementById("btnCerrar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", cerrarAgregar);
        (_d = document.getElementById("btnCancelar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", cerrarAgregar);
        (_e = document.getElementById("btnAgregar")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", guardar);
        (_f = document.getElementById("search")) === null || _f === void 0 ? void 0 : _f.addEventListener("keyup", filter);
        document.getElementById("idOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("marcaOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("modeloOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("precioOcultar").addEventListener("change", filtradoColumna);
        document.getElementById("btnPromedio").addEventListener("click", promedio);
        (_g = document.getElementById("filtro-vehiculos")) === null || _g === void 0 ? void 0 : _g.addEventListener("change", filter);
    });
    general.listaVehiculos = new Array();
    function mostrarInput() {
        var seleccionado = document.getElementById('tipo').value;
        if (seleccionado == 'Auto') {
            var auto = document.querySelector('#selectAuto');
            auto.style.display = "block";
            var camioneta = document.querySelector('#selectCamioneta');
            camioneta.style.display = "none";
        }
        else if (seleccionado == 'Camioneta') {
            var auto = document.querySelector('#selectAuto');
            auto.style.display = "none";
            var camioneta = document.querySelector('#selectCamioneta');
            camioneta.style.display = "block";
        }
    }
    general.mostrarInput = mostrarInput;
    function abrirAgregar() {
        var contAgregar = document.getElementById("backdrop");
        contAgregar.style.display = "flex";
    }
    general.abrirAgregar = abrirAgregar;
    function cerrarAgregar() {
        var contAgregar = document.getElementById("backdrop");
        resetForm();
        contAgregar.style.display = "none";
    }
    general.cerrarAgregar = cerrarAgregar;
    function resetForm() {
        document.getElementById("id").value = "";
        document.getElementById('marca').value = "";
        document.getElementById('modelo').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('tipo').value = "";
        document.getElementById('puertas').value = "";
        var perro = document.querySelector('#selectAuto');
        perro.style.display = "none";
        var gato = document.querySelector('#selectCamioneta');
        gato.style.display = "none";
    }
    function resetErrores() {
        document.getElementById("id").classList.remove("error");
        document.getElementById("marca").classList.remove("error");
        document.getElementById("modelo").classList.remove("error");
        document.getElementById("precio").classList.remove("error");
        document.getElementById("tipo").classList.remove("error");
        document.getElementById("puertas").classList.remove("error");
    }
    function crearTabla(lista) {
        var tCuerpo = document.getElementById("tCuerpo");
        while (tCuerpo.rows.length > 0) {
            tCuerpo.removeChild(tCuerpo.childNodes[0]);
        }
        lista.forEach(function (vehiculo) {
            var id = vehiculo.getId();
            var marca = vehiculo.getMarca();
            var modelo = vehiculo.getModelo();
            var precio = vehiculo.getPrecio();
            var dato;
            if (vehiculo instanceof general.Auto) {
                var tipo = "Auto";
                dato = "Puertas: " + vehiculo.getPuertas();
            }
            else if (vehiculo instanceof general.Camioneta) {
                var tipo = "Camioneta";
                var esCuatroxCuatro = vehiculo.get4x4();
                if (esCuatroxCuatro) {
                    dato = "Es 4x4";
                }
                else {
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
            btnEliminar.className = "eliminar";
            btnEliminar.id = "eliminar" + id;
            btnEliminar.value = "Eliminar";
            btnEliminar.addEventListener("click", getPosition);
            btnEliminar.onclick = function () { eliminar(lista.indexOf(vehiculo)); };
            tdAccion.appendChild(btnEliminar);
            tr.appendChild(tdAccion);
            tCuerpo.appendChild(tr);
        });
    }
    general.crearTabla = crearTabla;
    function getPosition(event) {
        var position = event.target.parentNode.parentNode.rowIndex;
        console.log(position);
    }
    function eliminar(position) {
        general.listaVehiculos.splice(position, 1);
        crearTabla(general.listaVehiculos);
    }
    general.eliminar = eliminar;
    function guardar() {
        resetErrores();
        var inputMarca = document.getElementById("marca").value;
        var marcaMayus = inputMarca.charAt(0).toUpperCase() + inputMarca.slice(1);
        var inputModelo = document.getElementById("modelo").value;
        var inputPrecio = parseInt(document.getElementById("precio").value);
        var inputTipo = document.getElementById("tipo").value;
        var inputPuertas = parseInt(document.getElementById("puertas").value);
        var inputCuatroxCuatro = document.getElementById("cuatroXcuatro").checked;
        var id;
        if (general.listaVehiculos.length == 0) {
            id = 1;
        }
        else {
            var listaVehiculosAux = general.listaVehiculos;
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
                                general.Auto.guardarAuto(id, marcaMayus, inputModelo, inputPrecio, inputPuertas);
                                cerrarAgregar();
                            }
                            else {
                                document.getElementById("puertas").classList.add("error");
                            }
                        }
                        else if (inputTipo == "Camioneta") {
                            general.Camioneta.guardarCamioneta(id, marcaMayus, inputModelo, inputPrecio, inputCuatroxCuatro);
                            cerrarAgregar();
                        }
                    }
                    else {
                        document.getElementById("tipo").classList.add("error");
                    }
                }
                else {
                    document.getElementById("precio").classList.add("error");
                }
            }
            else {
                document.getElementById("modelo").classList.add("error");
            }
        }
        else {
            document.getElementById("marca").classList.add("error");
        }
    }
    general.guardar = guardar;
    function filter() {
        var listaFiltrada = general.listaVehiculos.filter(function (vehiculo) {
            if (document.getElementById("tipo").value == "Auto") {
                return vehiculo instanceof general.Auto;
            }
            else {
                return vehiculo instanceof general.Camioneta;
            }
        });
        crearTabla(listaFiltrada);
    }
    general.filter = filter;
    function filtradoColumna() {
        var id = document.getElementById("idOcultar");
        var marca = document.getElementById("marcaOcultar");
        var modelo = document.getElementById("modeloOcultar");
        var precio = document.getElementById("precioOcultar");
        if (id.checked) {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasIds = document.getElementsByName("idTabla");
            tablasIds.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (marca.checked) {
            var tablasMarcas = document.getElementsByName("marcaTabla");
            tablasMarcas.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasMarcas = document.getElementsByName("marcaTabla");
            tablasMarcas.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (modelo.checked) {
            var tablasModelos = document.getElementsByName("modeloTabla");
            tablasModelos.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasModelos = document.getElementsByName("modeloTabla");
            tablasModelos.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (precio.checked) {
            var tablasPrecios = document.getElementsByName("precioTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablasPrecios = document.getElementsByName("precioTabla");
            tablasPrecios.forEach(function (x) {
                x.hidden = true;
            });
        }
    }
    general.filtradoColumna = filtradoColumna;
    var listaFiltradaGlobal = new Array();
    function promedio() {
        var listaPrecio;
        var promedio;
        if (listaFiltradaGlobal.length > 0) {
            listaPrecio = listaFiltradaGlobal.map(function (x) { return x.precio; });
            promedio = listaPrecio.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        else {
            listaPrecio = general.listaVehiculos.map(function (x) { return x.precio; });
            promedio = listaPrecio.reduce(function (total, num) {
                total += num;
                return total;
            }, 0);
        }
        document.getElementById("promedio").value = (promedio / listaPrecio.length).toString();
    }
    general.promedio = promedio;
})(general || (general = {}));
