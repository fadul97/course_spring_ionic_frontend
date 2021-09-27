import { OrderItemDTO } from "./order-item-dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export interface PedidoDTO {
    client: RefDTO;
    deliveryAddress: RefDTO;
    payment: PaymentDTO;
    items: OrderItemDTO[];
}