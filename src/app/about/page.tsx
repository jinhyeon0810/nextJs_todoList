import React from "react";

const About = async () => {
  const response = await fetch("http://localhost:3000/api/user");
  const result = await response.json();
  const { name, description } = result.userInfo;

  return (
    <main>
      <section className="flex flex-col items-center gap-7 justify-center mt-10 pt-10">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p>{description}</p>
        <p>Here is SSG rendering</p>
      </section>
    </main>
  );
};

export default About;
