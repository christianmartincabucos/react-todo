"use client"

import Image from 'next/image'
import { useState } from 'react';

interface Todo {
  id: number;
  done: boolean;
  task: string;
}

const initialTodos: Todo[] = [
  {
    id: 1,
    done: true,
    task: 'Task 1'
  },
  {
    id: 2,
    done: true,
    task: 'Task 2'
  },
  {
    id: 3,
    done: true,
    task: 'Task 3'
  },
  {
    id: 4,
    done: true,
    task: 'Task 4'
  },
  {
    id: 5,
    done: true,
    task: 'Task 5'
  },
]

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [task, setTask] = useState('')
  const handleCheckboxChange = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }
  const addTask = () => {
    if (task) {
      setTodos([...todos, {id: todos.length+1, done: false, task: task}]);
      setTask('');
      return;
    }
    alert('Task is required')
  }
  const removeTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex justify-start mt-3">
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-2 py-2 ml-5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 w-[450px] focus:outline-none focus:border-sky-100 focus:ring-sky-500 block rounded-0 sm:text-sm focus:ring-1"
          placeholder="Add TODO"
        />
        <button
          type="button"
          className="rounded-0 py-1 px-3 bg-indigo-500 text-white text-sm font-semibold shadow focus:outline-none"
          onClick={() => addTask()}
        >
          Add
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <li key={todo.id} className="flex-col w-[500px] py-5 text-xl">
            <div className="flex min-w-0 gap-x-4">
              <input
                type="checkbox"
                name={todo.task}
                id={todo.task}
                className="rounded-full flex-none w-14"
                checked={todo.done}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <div className={`grow ${todo.done ? 'line-through': ''}`}>{todo.task}</div>
              <button
                type="button"
                className="flex-none rounded-0 py-1 px-3 bg-red-500 text-white text-sm font-semibold shadow focus:outline-none"
                onClick={() => removeTask(todo.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
