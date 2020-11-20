namespace general {
    export class Auto extends Vehiculo {
        private cantidadPuertas : number;

        constructor(id:number,marca:string,modelo:string,precio:number, cantidadPuertas:number) {
            super(id,marca,modelo,precio);
            this.cantidadPuertas = cantidadPuertas;
        }

        public getPuertas() {
            return this.cantidadPuertas;   
        }

        public static guardarAuto(id:number,marca:string,modelo:string,precio:number, cantidadPuertas:number) {
            var nuevoAuto:Auto = new Auto(id,marca,modelo,precio,cantidadPuertas);
            listaVehiculos.push(nuevoAuto);
            crearTabla(listaVehiculos);
        }
    }
}
