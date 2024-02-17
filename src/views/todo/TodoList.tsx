import React from 'react';
import TodoDetails from './TodoDetail';

const TodoList = ({ todos, onPrevPage, onNextPage, onSelectTodo }:any) => {
  return (
    <div className="my-8 w-full">
        <h1 className='text-2xl font-bold'>My Todos</h1>
      {/* Todo list rendering */}
      {
        todos.length > 0 ? (
            todos.map((todo:any) => (
                <div key={todo.id}>
                    <TodoDetails todo={todo}/>
                </div>
            ))
        ) : (
            <p>No Todos exists</p>
        )
      }
      {/* Each todo item should have a button to view details (onSelectTodo) */}

      {/* Pagination buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevPage}
          className=" btn-effect"
        >
          Prev
        </button>
        <button
          onClick={onNextPage}
          className=" btn-effect"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
