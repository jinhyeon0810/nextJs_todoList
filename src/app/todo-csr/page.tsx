"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
const TodoCSR = () => {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/todos");
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const result = response.json();
      return result;
    },
    onSuccess: (result) => {
      if (result) {
        setTodoList((prevTodoList) => [...prevTodoList, result.todo]);
        setTodoText("");
      }
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: async (Todo: Todo[]) => {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Todo),
      });
      const result = response.json();
      return result;
    },
    onSuccess: (result) => {
      if (result) {
        setTodoList([]);
        setTodoText("");
      }
    },
  });

  const handleAddTodos = () => {
    if (todoText.trim().length > 0)
      addTodoMutation({ contents: todoText, isDone: true });
  };

  const handleDeleteAllTodos = () => {
    if (todoList.length > 0) {
      deleteTodoMutation(todoList);
    }
  };

  useEffect(() => {
    if (todos) setTodoList(todos?.todos);
  }, [todos]);

  return (
    <div className="flex flex-col justify-center items-center w-3/5 mx-auto mt-16 py-16 border border-solid border-orange-500">
      <section className="flex flex-col gap-10 w-3/5">
        <h1 className="font-bold text-5xl">Todo APP</h1>

        <div className="flex w-full gap-1 items-center">
          <input
            className="w-full h-12 rounded-sm  border border-solid border-black-300"
            value={todoText}
            onChange={(e: any) => setTodoText(e.target.value)}
          />
          <button
            className="rounded-sm px-6 bg-indigo-400 h-12 text-2xl text-neutral-50"
            onClick={handleAddTodos}
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {todoList.map((todo: Todo, idx: number) => {
            return (
              <section
                key={idx}
                className="flex flex-col justify-center  px-3 py-5 border border-solid border-orange-100 bg-slate-100"
              >
                <p className="text-xl">{todo.contents}</p>
              </section>
            );
          })}
        </div>
        {todoList.length > 0 && (
          <section className="flex w-full justify-between">
            <p>You have {todoList.length} pending tasks</p>
            <button onClick={handleDeleteAllTodos}>Clear All</button>
          </section>
        )}
      </section>
    </div>
  );
};

export default TodoCSR;
