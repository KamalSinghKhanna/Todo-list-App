import React, { useEffect, useState } from 'react'
import "./Style.css"
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    } else{
        return[];
    }
}
const Todo = () =>{
    const [inputData, setInputData] = useState(" ");
    const [items, setItems] = useState(getLocalData());
    const [iseditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    // add the items functions
    const addItem = () => {
        if (!inputData) {
            alert('please fill the data')
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id === iseditItem){
                        return{...curElem, name: inputData };
                    } return curElem;
                   
                })
            );
            setInputData("")
            setIsEditItem(null);
            setToggleButton(false);
        }

         else {
                const myNewInputData = {
                    id:new Date().getTime().toString(),
                    name: inputData,
                }; 
            setItems([...items, myNewInputData]);
            setInputData("");
        }  
    }

    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) =>{
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true);
    };

    // how to delete section
    const deleteItem = (index) =>{
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index;
        });
         setItems(updatedItems);
    };

    // remove all
    const removeAll =()=>{
        setItems([]);
    };
// adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])

    return (
   <>
       <div className="main-div">
           <div className="child_div">
               <figure>
                   <img src="./images/todo.svg" alt="todologo" />
                   <figcaption>Add your list Here ✌</figcaption>
               </figure>
               <div className='addItems'>
                   <input type="text" placeholder='✍ Add Item' className='form-control' value={inputData} onChange={(event)=> setInputData(event.target.value)}/>
                   {toggleButton ? (
                    <i className="far fa-edit " onClick={addItem}></i>
                   ) : (
                    <i className="fa fa-plus  " onClick={addItem}></i>
                   )}
                   
               </div>
               {/* show our Items */}
               <div className="showItems">
                        {items.map((curElem, index)=>{
                            return(
                                <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                    <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                                </div>
                                </div>
                            );
                        })}
                 
               </div>
               <div className="showItems"><button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                  <span> CHECK LIST</span>
               </button></div>
           </div>
       </div>

   </>
  )
}

export default Todo