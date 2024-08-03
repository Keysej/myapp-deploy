'use client'
import React, {useState, useEffect } from "react";
import { collection, addDoc, getDoc, onSnapshot, query, deleteDoc, doc,} from "firebase/firestore"; 
import { QuerySnapshot } from "firebase/firestore";
import {db} from './firebase'

//define the type for an item

interface Item {
  id:string;
  name:string;
  price:string;
}




export default function Home() {

  const [items, setItems]= useState<Item[]>([]);
  const [newItem, setNewItem]= useState({name:'', price:''});
  const [total, setTotal]=useState(0);
  const [searchQuery, setSearchQuery] = useState ('');


// add items to database

const addItem = async (e: React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
if (newItem.name !=='' && newItem.price !==''){
  //setItems([...items, newItem]);
  await addDoc (collection(db, 'items'),{
    name: newItem.name.trim(),
    price: newItem.price,
  });
  setNewItem({name:'', price:''});
}};



// read items from database
useEffect(()=>{
  const q= query(collection(db,'items'));
  const unsubscribe = onSnapshot(q,(querySnapshot) =>
  {
    let itemsArr: Item [] = [];
    querySnapshot.forEach((doc)=>
  {
    itemsArr.push({...doc.data(), id: doc.id}as Item);
  });
  setItems(itemsArr);

  // Read total from itemsArr
  const calculateTotal = ()  =>{
    const totalPrice= itemsArr.reduce(
      (sum, item) => sum + parseFloat(item.price),0);
    setTotal(totalPrice);
    
  };
  calculateTotal();
  return()=> unsubscribe();


  });
}, []);




// delete items from database
const deleteItem = async (id:string) =>{
  await deleteDoc(doc(db, 'items', id));
};

//filter based on search query

const filteredItems = items.filter(item=>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);




  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-gradient-to-r from-blue-200 to purple-300">
      <div className=" w-full max-w-5xl items-center justify-between font-mono text-sm bg-white shadow-md rounded-lg p-6 border-gray-300">
       <h1 className=" text-4xlp-4 text-center text-black">Expense Tracker</h1>
       <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black mb-4" onSubmit={addItem}>
          <input
          value={newItem.name}
          onChange={(e)=> setNewItem({...newItem, name: e.target.value})}
          className="col-span-2 p-3 border-gray-300 rounded-md" type="text" placeholder="Enter item" />


          <input 
          value={newItem.price}
          onChange={(e)=> setNewItem({...newItem, price: e.target.value})}
          className="col-span-2 p-3 border-gray-300 rounded-md
                mx-3" type="number"
                placeholder="Enter $"/>


          <button 
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-400 rounded-md border-blue-600 text-xl">
            +
           
            </button>
        </form>
        <div className="mb-4">
          <input 
          type="text"
          placeholder="Search items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full text-black"
          ></input>
        </div>

         <ul>
          {filteredItems.map((item)=>(
            <li key={item.id} className="my-4 w-full flex justify-between bg-gray-200 border-gray-300 rounded-md text-black">
              <div className="p-4 w-full flex justify-between">
                <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
              </div>
              <button
              onClick={()=> deleteItem(item.id)}
              className="ml-4 p-2 bg-red-500 hover: text-white rounded-md hover:bg-red-400 border-red-600">X</button>
            </li>

          ))}
         </ul>
         {items.length > 0 && (
          <div className="flex justify-between p-3 bg-gray-200 border-gray-300 rounded-md">
            <span className="font-bold text-black">Total</span>
            <span className=" font-bold text-black">${total}</span>

          </div>
         )}
       </div>
      </div>
    </main>
  );
}
