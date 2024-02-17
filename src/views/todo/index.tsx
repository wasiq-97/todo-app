'use client'
import React, { useState, useEffect } from 'react';
//Views
import { CreateTodoForm } from './CreateTodo';
import TodoList from './TodoList';
import TodoDetails from './TodoDetail';

//handlers
import {createTodo, findTodos} from '@/services/handlers/todo.handlers'
import { useSelector } from '@/store';
import toast from 'react-hot-toast';

const defaultLimit = 5

const TodoApp = () => {
  // State to manage todos
  const [todos, setTodos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [total, setTotal] = useState(0);

  //hook get User id
  const user = useSelector(state => state.user.user)

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    let params ={
        skip : (currentPage - 1) * defaultLimit,
        limit : defaultLimit
    }
    try {
        const todos:any = await findTodos(params, 5)
        setTodos(todos.todos)
        setTotal(todos.total)
    } catch (error) {
        console.log(error)
    }
  };

  // Function to handle creating a new todo
  const handleCreateTodo = async (newTodo:any) => {
    let dataToSend = {
        ...newTodo,
        completed:false,
        userId: 5//user?.id
    }

    try {
        await createTodo(dataToSend)
        toast.success('Successfully added a list')
        //fetch todos to get the latest
        fetchTodos()
    } catch (error:any) {
        let msg = error?.response?.data?.message || " Something went wrong"
        toast.error(msg)
    }
  };

  // Function to handle pagination
  const handleNextPage = () => {
    if(currentPage * defaultLimit >= total) return
    setCurrentPage(currentPage + 1)
  };

  const handlePrevPage = () => {
    if(currentPage == 1) return
    setCurrentPage(currentPage - 1)
  };

  // Effect to fetch todos on mount and whenever the page changes
  useEffect(() => {
    if(user)
        fetchTodos();
  }, [currentPage, user]);
  return (
    <div className="min-h-[90vh] max-w-[80%] m-auto flex flex-col items-center bg-black mt-5">
      <div className=" w-full p-4 bg-gray-800 rounded shadow-md shadow-blue-500">
        {/* Create Todo Form */}
        <h1 className='text-xl font-bold mb-5 text-center'>Add a new todo</h1>
        <CreateTodoForm onCreateTodo={handleCreateTodo} />
      </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onSelectTodo={(todo:any) => setSelectedTodo(todo)}
        />

        {/* Todo Details */}
        {selectedTodo && <TodoDetails todo={selectedTodo} />}
    </div>
  );
};

export default TodoApp;
