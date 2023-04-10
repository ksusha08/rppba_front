import React from "react";
import Menu from "./Menu"; 

export default function Main() {
  return (
    <div>
      <Menu /> 
      <div className="container">
        <div className="py-4">
          <h1>Добро пожаловать на главную страницу</h1>
        </div>
      </div>
    </div>
  );
}