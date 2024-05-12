"use server";

import React from "react";

const TodoSSR = async () => {
  const response = await fetch("http://localhost:3000/api/todos", {
    cache: "no-cache",
  });
  const todoList = await response.json();
  return (
    <div className="flex flex-col justify-center items-center w-3/5 mx-auto mt-16 py-16">
      <section className="flex flex-col gap-10 w-3/5">
        <h1 className="font-bold text-5xl">Todo APP</h1>

        <div className="flex flex-col gap-4">
          {todoList?.todos.map((todo: Todo, idx: number) => {
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
      </section>
    </div>
  );
};

export default TodoSSR;
