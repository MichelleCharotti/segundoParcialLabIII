namespace general {
    export class Vehiculo {

        private id: number;
        private marca:string;
        private modelo: string;
        // private precio: number;
        public precio: number;

        constructor(id:number,marca:string,modelo:string,precio:number) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }

        public getId() {
            return this.id;   
        }

        public getMarca() {
            return this.marca;   
        }

        public getModelo() {
            return this.modelo;   
        }
        public getPrecio() {
            return this.precio;   
        }
    }
}