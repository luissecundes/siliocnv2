import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddProdutos from "./components/add-produto.component";
import Produto from "./components/produto.component";
import ProdutosList from "./components/produtos-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <h1 to={"/product"} className="navbar-brand">
           API de Produtos
          </h1>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Retornar do Início
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ProdutosList/>} />
            <Route path="/product" element={<ProdutosList/>} />
            <Route path="/add" element={<AddProdutos/>} />
            <Route path="/product/:id" element={<Produto/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;