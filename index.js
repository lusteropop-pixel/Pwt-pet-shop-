import { useEffect, useState } from 'react'
import itemsData from '../data/items.json'

export default function Home() {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    // load items from bundled data (admin can modify localStorage in this template)
    const saved = localStorage.getItem('pwt_items')
    if (saved) setItems(JSON.parse(saved))
    else {
      setItems(itemsData)
      localStorage.setItem('pwt_items', JSON.stringify(itemsData))
    }
    const savedCart = localStorage.getItem('pwt_cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const addToCart = (it) => {
    const next = [...cart, it]
    setCart(next)
    localStorage.setItem('pwt_cart', JSON.stringify(next))
    alert('Added to cart')
  }

  const placeOrder = () => {
    if (cart.length === 0) { alert('Cart empty'); return }
    const orders = JSON.parse(localStorage.getItem('pwt_orders') || '[]')
    orders.push({ id: Date.now(), items: cart, createdAt: new Date().toISOString(), status: 'pending' })
    localStorage.setItem('pwt_orders', JSON.stringify(orders))
    localStorage.removeItem('pwt_cart')
    setCart([])
    alert('Order placed (mock). Implement payments server-side for real payments.')
  }

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold">Welcome to PWT Pet Shop</h2>
        <p className="mt-2">English only. Toggle theme from top-right. This is a ready-to-deploy template — payment buttons are placeholders.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Featured Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(it => (
            <div key={it.id} className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
              <h4 className="font-semibold">{it.name}</h4>
              <p className="text-sm">{it.description}</p>
              <p className="mt-2 font-bold">₹{it.price}</p>
              <div className="mt-3 space-x-2">
                <button onClick={() => addToCart(it)} className="px-3 py-1 border rounded">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Cart</h3>
        <div>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            <div>
              <ul className="mb-4">
                {cart.map((c, i) => <li key={i}>{c.name} — ₹{c.price}</li>)}
              </ul>
              <button onClick={placeOrder} className="px-4 py-2 border rounded">Place Order (Mock)</button>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">Payments (placeholders)</h3>
        <p className="text-sm">Buttons below are UI placeholders only. Integrate official SDKs or server endpoints for GPay, Paytm, PhonePe, Fampay, and card payments.</p>
        <div className="mt-3 space-x-2">
          <button className="px-3 py-1 border rounded">GPay</button>
          <button className="px-3 py-1 border rounded">Paytm</button>
          <button className="px-3 py-1 border rounded">PhonePe</button>
          <button className="px-3 py-1 border rounded">Fampay</button>
          <button className="px-3 py-1 border rounded">Card (Stripe/PayU)</button>
        </div>
      </section>
    </div>
  )
}
