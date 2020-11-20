var general;
(function (general) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        Vehiculo.prototype.getId = function () {
            return this.id;
        };
        Vehiculo.prototype.getMarca = function () {
            return this.marca;
        };
        Vehiculo.prototype.getModelo = function () {
            return this.modelo;
        };
        Vehiculo.prototype.getPrecio = function () {
            return this.precio;
        };
        return Vehiculo;
    }());
    general.Vehiculo = Vehiculo;
})(general || (general = {}));
