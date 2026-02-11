import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);

  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses] = useState(dummyAddress);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Build cart array safely
  const getCart = () => {
    const tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  const placeorder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    if (paymentOption === "COD") {
      toast.success("Order placed successfully (COD)");
      // alert("Order placed successfully (COD)");
    } else {
      navigate("/checkout");
    }
  };

  // Guard render
  if (!products.length || !cartItems) return null;

  const cartAmount = getCartAmount();
  const tax = cartAmount * 0.02;
  const totalAmount = cartAmount + tax;

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-3 text-sm md:text-base"
          >
            <div className="flex gap-4 items-center">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 border rounded overflow-hidden"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold hidden md:block">{product.name}</p>

                <p className="text-gray-500">
                  Weight: {product.weight || "N/A"}
                </p>

                <div className="flex items-center gap-2">
                  <p>Qty:</p>
                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    className="outline-none"
                  >
                    {Array(
                      cartItems[product._id] > 9 ? cartItems[product._id] : 9,
                    )
                      .fill("")
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="mx-auto cursor-pointer "
            >
              <img src={assets.remove_icon} alt="remove" className="w-6 h-6" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mt-8 flex items-center gap-2 text-primary font-medium"
        >
          <img src={assets.arrow_right_icon_colored} alt="arrow" />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="bg-gray-100/40 p-5 border max-md:mt-16">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-5" />

        <p className="text-sm font-medium uppercase">Delivery Address</p>

        <div className="relative mt-2">
          <div className="flex justify-between">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary"
            >
              Change
            </button>
          </div>

          {showAddress && (
            <div className="absolute top-10 bg-white border w-full">
              {addresses.map((address, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/addaddress")}
                className="p-2 text-center text-primary cursor-pointer"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border px-3 py-2 mt-2"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="my-4" />

        <div className="text-gray-500 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {cartAmount}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {tax}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>
              {currency}
              {totalAmount}
            </span>
          </p>
        </div>

        <button
          onClick={placeorder}
          className="w-full py-3 mt-6 bg-primary text-white"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
