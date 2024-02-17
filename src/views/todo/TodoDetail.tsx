import { deleteTodo, updateTodo } from '@/services/handlers/todo.handlers';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiPencil, BiTrash } from 'react-icons/bi';

const TodoDetails = ({ todo }:any) => {
    const [update, setupdate] = useState(false)
    const [value, setValue] = useState(todo?.todo || '');

    const handleUpdate = async () => {
        if(!value){
            toast.error('description is required')
            return
        }

        let dataToUpdate = {
            todo: value
        }

        //update Todo
        try {
            await updateTodo(todo.id, dataToUpdate)
            toast.success('Item updated Successfully')
            setupdate(false)
        } catch (error:any) {
            let msg = error?.response?.data?.message || "Something went wrong"
            toast.error(msg)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id)
            toast.success("deleted successfully")
        } catch (error:any) {
            let msg = error?.response?.data?.message || "Something went wrong"
            toast.error(msg)
        }
    }

  return (
    <div className='w-full bg-gray-800 my-2 p-4 rounded-lg shadow-md shadow-blue-500 flex gap-2'>
        <div className='flex-1'>
            <p className='underline font-bold mb-3'>Description:</p>
            {update ? (
                <div className='flex flex-col items-start gap-y-2'>
                    <input className='w-full text-white bg-transparent shadow-sm shadow-blue-500 focus:outline-none p-1 rounded-lg' value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={handleUpdate} className='btn-effect py-1 px-2'>Update</button>
                </div>
            ) : <p>{value}</p>}

        </div>
        <div className='flex gap-3 items-center'>
            <BiPencil className='cursor-pointer' onClick={()=>setupdate(!update)} color='white'/>
            <BiTrash className='cursor-pointer' onClick={handleDelete} color='red'/>
        </div>
    </div>
  );
};

export default TodoDetails;