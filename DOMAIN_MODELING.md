**Domínio de Envio:**

- Shipment (Envio)
  - Atributos: data de entrega, status do envio, método de entrega.
- Shipment Addresses (Endereços de Envio)
  - Atributos: rua, cidade, estado, CEP.
  - Relacionado a: Shipment

**Domínio de Pedidos:**

- Orders (Pedidos)
  - Atributos: número do pedido, data do pedido, status do pedido.
- Order Items (Itens do Pedido)
  - Atributos: quantidade, preço unitário.
  - Relacionado a: Orders, Products

**Domínio de Clientes:**

- Customers (Clientes)
  - Atributos: nome, endereço, informações de contato.
- Baskets (Cestas)
  - Atributos: produtos adicionados, quantidade.
  - Relacionado a: Customers, Products
- Checkout (Finalização da Compra)
  - Atributos: informações de entrega, método de pagamento, custos adicionais.
  - Relacionado a: Customers, Orders, Payments

**Domínio de Produtos:**

- Products (Produtos)
  - Atributos: nome, descrição, preço, disponibilidade.

**Domínio de Pagamentos:**

- Payments (Pagamentos)
  - Atributos: método de pagamento, valor, status do pagamento.
  - Relacionado a: Orders
