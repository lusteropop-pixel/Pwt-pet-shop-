import { useEffect, useState } from 'react'
import itemsData from '../data/items.json'

export default function Admin() {
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '' })

  useEffect(() => {
    const saved = localStorage.getItem('pwt_items')
    if (saved) setItems(JSON.parse(saved))
    else {
      localStorage.setItem('pwt_items', JSON.stringify(itemsData))
      setItems(itemsData)
    }
    const savedOrders = localStorage.getItem('pwt_orders')
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  const saveItem = () => {
    const next = [...items, { id: Date.now(), name: form.name, description: form.description, price: Number(form.price) }]
    setItems(next)
    localStorage.setItem('pwt_items', JSON.stringify(next))
    setForm({ name: '', description: '', price: '' })
  }

  const updateOrderStatus = (id, status) => {
    const next = orders.map(o => o.id === id ? { ...o, status } : o)
    setOrders(next)
    localStorage.setItem('pwt_orders', JSON.stringify(next))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <section className="mb-6">
        <h3 className="font-semibold">Add Item</h3>
        <div className="space-y-2 mt-2">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
          <input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
          <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Price" className="w-full p-2 border rounded" />
          <button onClick={saveItem} className="px-3 py-1 border rounded">Save Item</button>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold">Items</h3>
        <ul className="mt-2">
          {items.map(it => <li key={it.id} className="mb-2">{it.name} — ₹{it.price}</li>)}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold">Orders</h3>
        {orders.length === 0 ? <p className="mt-2">No orders yet</p> : (
          <div className="mt-2 space-y-3">
            {orders.map(o => (
              <div key={o.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-800">
                <div>Order ID: {o.id}</div>
                <div>Items: {o.items.map(i=>i.name).join(', ')}</div>
                <div>Status: {o.status}</div>
                <div className="mt-2 space-x-2">
                  <button onClick={()=>updateOrderStatus(o.id,'processing')} className="px-2 py-1 border rounded">Processing</button>
                  <button onClick={()=>updateOrderStatus(o.id,'shipped')} className="px-2 py-1 border rounded">Shipped</button>
                  <button onClick={()=>updateOrderStatus(o.id,'delivered')} className="px-2 py-1 border rounded">Delivered</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
