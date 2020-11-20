namespace general {
    export class Camioneta extends Vehiculo {
        private cuatroXcuatro : boolean;

        constructor(id:number,marca:string,modelo:string,precio:number, cuatroXcuatro:boolean) {
            super(id,marca,modelo,precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }

        public get4x4() {
            return this.cuatroXcuatro;   
        }

        public static guardarCamioneta(id:number,marca:string,modelo:string,precio:number, cuatroXcuatro:boolean) {
            var nuevoCamioneta:Camioneta = new Camioneta(id,marca,modelo,precio,cuatroXcuatro);
            listaVehiculos.push(nuevoCamioneta);
            crearTabla(listaVehiculos);
        }

        
    }
}