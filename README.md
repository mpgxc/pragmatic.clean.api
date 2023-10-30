## Por hora é isso! 🚀

```bash
src/
├── common
│   ├── commands.ts
│   ├── events.ts
│   └── helpers.ts
├── domain
│   ├── buyer
│   │   ├── buyer.ts
│   │   └── payment-method.ts
│   ├── events
│   ├── notification
│   │   └── notification.ts
│   └── ordering
│       ├── address.ts
│       ├── ordem-item.ts
│       └── order.ts
├── infra
│   ├── controllers
│   │   ├── controllers.module.ts
│   │   ├── create-notification.controller.ts
│   │   ├── list-notifications.controller.ts
│   │   └── validators
│   ├── database
│   │   └── repositories
│   ├── infra.module.ts
│   ├── main.ts
│   └── providers
└── usecases

14 directories, 14 files
```

# Modelo de Domínio - E-commerce Delivery Shop

## Entidades:

1. **Shipment (Envio):**

   - Representa o processo de envio de produtos aos clientes.
   - Atributos: data de entrega, status do envio, método de entrega.

2. **Shipment Addresses (Endereços de Envio):**

   - Armazena os endereços de entrega associados a cada envio.
   - Relacionado a: Shipment
   - Atributos: rua, cidade, estado, CEP.

3. **Orders (Pedidos):**

   - Representa os pedidos feitos pelos clientes.
   - Atributos: número do pedido, data do pedido, status do pedido.

4. **Order Items (Itens do Pedido):**

   - Representa os produtos individuais incluídos em um pedido.
   - Relacionado a: Orders, Products
   - Atributos: quantidade, preço unitário.

5. **Customers (Clientes):**

   - Representa os clientes que fazem pedidos.
   - Atributos: nome, endereço, informações de contato.

6. **Payments (Pagamentos):**

   - Registra informações de pagamento associadas a um pedido.
   - Relacionado a: Orders
   - Atributos: método de pagamento, valor, status do pagamento.

7. **Products (Produtos):**

   - Representa os produtos disponíveis para compra.
   - Atributos: nome, descrição, preço, disponibilidade.

8. **Baskets (Cestas):**

   - Representa os carrinhos de compras dos clientes.
   - Relacionado a: Customers, Products
   - Atributos: produtos adicionados, quantidade.

9. **Checkout (Finalização da Compra):**
   - Registra informações relacionadas ao processo de finalização da compra.
   - Relacionado a: Customers, Orders, Payments
   - Atributos: informações de entrega, método de pagamento, custos adicionais.

Isso representa um modelo de domínio simples para um e-commerce de delivery. Lembre-se de que a estrutura e os relacionamentos podem variar com base nos requisitos específicos do sistema.

<br>
<br>

# Este projeto tem como objetivo a modelagem de um domínio, adotando uma abordagem pragmática e baseada em conceitos funcionais

### Referências:

- https://www.thoughtworks.com/insights/blog/microservices/domain-modeling-algebraic-data-types-pt1
- https://www.thoughtworks.com/insights/blog/architecture/domain-driven-design-in-functional-programming
- https://www.thoughtworks.com/insights/blog/microservices/ddd-implemented-fp
- https://doc.rust-lang.org/std/result/enum.Result.html
