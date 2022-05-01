import { Usuario } from './sharedUser';
import { Juguete } from './sharedJuguete';

export type Pedido = {
    id:number;
    precioGastosDeEnvio: number;
    precioFinal: number;
    juguetes: [{_id:Juguete, cantidad: number}];
    usuario: Usuario;
}