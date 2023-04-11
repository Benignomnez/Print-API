import { useState } from 'react';

interface OrderItem {
  id: number;
  printDetails: string;
  paymentInfo: string;
  deliveryInfo: string;
  status: string;
  pictureSize: string;
}

const pictureSizes = ['4x6', '5x7', '8x10']; // replace with your own list of available sizes

const initialOrder: OrderItem = {
  id: 0,
  printDetails: '',
  paymentInfo: '',
  deliveryInfo: '',
  status: '',
  pictureSize: '',
};

const OrderForm = () => {
  const [order, setOrder] = useState<OrderItem>(initialOrder);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [orderId, setOrderId] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder(prevState => ({ ...prevState, [name]: value }));
  };

  const createOrder = () => {
    if (order.printDetails && order.paymentInfo && order.deliveryInfo && order.pictureSize) {
      const newOrder: OrderItem = { ...order, id: orders.length + 1 };
      setOrders(prevState => [...prevState, newOrder]);
      setOrder(initialOrder);
    }
  };

  const updateOrderStatus = () => {
    const updatedOrders = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: order.status };
      }
      return o;
    });
    setOrders(updatedOrders);
    setOrderId(0);
    setOrder(initialOrder);
  };

  return (
    <div>
      <h2>Create an Order</h2>
      <div className="container">
        <label>
          Print Details:
          <input type="text" name="printDetails" value={order.printDetails} onChange={handleChange} />
        </label>
        <label>
          Payment Information:
          <input type="text" name="paymentInfo" value={order.paymentInfo} onChange={handleChange} />
        </label>
        <label>
          Delivery Information:
          <input type="text" name="deliveryInfo" value={order.deliveryInfo} onChange={handleChange} />
        </label>
        <label>
          Picture Size:
          <select name="pictureSize" value={order.pictureSize} onChange={handleChange}>
            <option value="">Select size</option>
            {pictureSizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <button onClick={createOrder}>Create Order</button>
      </div>
      <h2>Order Status</h2>
      <div className="container">
        <label>
          Order ID:
          <input type="number" value={orderId} onChange={e => setOrderId(parseInt(e.target.value))} />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={order.status} onChange={handleChange} />
        </label>
        <button onClick={updateOrderStatus}>Update Status</button>
      </div>
    </div>
  );
};

export default OrderForm;



