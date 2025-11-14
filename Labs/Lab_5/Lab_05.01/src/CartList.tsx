import { nanoid } from "nanoid"
import { useState } from "react"

export default function CartList() {

  const [items, setItems] = useState([
    {id: nanoid(), name: "hat", quantity: 2},
    {id: nanoid(), name: "tie", quantity: 2},
    {id: nanoid(), name: "belt", quantity: 1},
  ])

  let itemCount = 0;
  for (const item of items) {
    if (item && item.quantity) {
      itemCount += item.quantity
    }
  }

  function onNameChange(evt, item) {
    const newItems =  [...items];
    const index = items.indexOf(item);
    newItems[index].name = evt.target.value;
    setItems(newItems);
  }

  function onAddQuantity(evt, item) {
    const newQuantity = item.quantity + 1;
    if (newQuantity <= 10) {
      const newItems = [...items];
      const index = items.indexOf(item);
      newItems[index].quantity++;
      setItems(newItems)
    }
    
  }

  function onSubtractQuantity(evt, item) {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      const newItems = [...items];
      const index = items.indexOf(item);
      newItems[index].quantity--;
      setItems(newItems)
    }
    else {
      setItems(items.filter(i => i.id !== item.id))
    }
    
  }

  return(
    <>
      <div className={items.length < 8 ? "bg-teal-100 p-8 pb-96" : "bg-teal-100 p-8 pb-32"}>
        <div className="flex items-center mb-5">
          <span className="text-3xl font-bold mr-4">Shopping Cart</span>
          <span className="py-1 px-3 rounded-full text-lg bg-blue-500 border-2 border-black">{itemCount > 0 ? itemCount : "Add items to cart"}</span>
        </div>
        <div className="flex mb-8">
          <button className="p-1 bg-blue-500 rounded-sm hover:bg-blue-700 border-black border-r-4 border-b-4 border-l-2 border-t-2 border font-bold text-white cursor-pointer transition" onClick={() => setItems([...items, {id: nanoid(), name: "", quantity: 1}])}>Add item</button>
        </div>
        {items.map(item => 
          <div className="grid grid-cols-12 my-2 mx-8">
            <div className="col-span-3 col-start-1">
              <input type="text" className={item.name.length > 0 ? "border-2 border-green-400 rounded-sm px-1 bg-green-50" : "border-4 border-red-400 rounded-sm px-1 bg-red-50"} value={item.name} onChange={evt => onNameChange(evt, item)} />
            </div>
            <div className="">
              <span>{item.quantity}</span>
            </div>
            <div className="">
              <button className={item.quantity == 0 ? "py-1 px-3 bg-red-800 rounded-full" : "py-1 px-3 bg-red-500 hover:bg-red-600 transition rounded-full cursor-pointer"} onClick={evt => onSubtractQuantity(evt, item)}>-</button>
              <button className={item.quantity == 10 ? "py-1 px-3 bg-green-800 rounded-full" : "py-1 px-3 bg-green-500 hover:bg-green-600 transition rounded-full cursor-pointer"} onClick={evt => onAddQuantity(evt, item)}>+</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}