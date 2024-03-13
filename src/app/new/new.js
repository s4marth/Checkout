
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <section aria-labelledby="order-summary-heading">
        <h2 className="text-xl font-semibold mb-4" id="order-summary-heading">
          Order Summary
        </h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="text-gray-500">No items in your cart.</p>
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tax</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">$0.00</span>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full">Proceed to Payment</Button>
          </div>
        </div>
      </section>
      <section aria-labelledby="payment-options-heading">
        <h2 className="text-xl font-semibold mb-4" id="payment-options-heading">
          Payment Options
        </h2>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="text-gray-500">No payment methods available.</p>
        </div>
      </section>
      <section aria-labelledby="order-confirmation-heading">
        <h2 className="text-xl font-semibold mb-4" id="order-confirmation-heading">
          Order Confirmation
        </h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-green-600 font-medium">Thank you for your order!</p>
          <p className="mt-2">
            Your order number is #000000. You will receive an order confirmation email with details of your order and a
            link to track its progress.
          </p>
          <div className="mt-6">
            <Button className="w-full">Continue Shopping</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

