import { RiDeleteBin3Fill, RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

export default function CartContent({ cart, userId, guestId }) {
  const dispatch = useDispatch();

  // Handle adding or subtracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    // console.log(productId);
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-b py-4"
        >
          <div className="flex items-start">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-20 sm:w-20 sm:h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{item.name}</h3>
              <p className="text-sm text-gray-500">
                size: {item.size} | color: {item.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => {
                    handleAddToCart(
                      item.productId,
                      -1,
                      item.quantity,
                      item.size,
                      item.color
                    );
                  }}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{item.quantity}</span>
                <button
                  onClick={() => {
                    handleAddToCart(
                      item.productId,
                      1,
                      item.quantity,
                      item.size,
                      item.color
                    );
                  }}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium">&#8377; {item.price.toLocaleString()}</p>
            <button
              onClick={() => {
                handleRemoveFromCart(item.productId, item.size, item.color);
              }}
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
