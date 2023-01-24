import React, { Component } from "react";
import ProdutoDataService from "../service/produto.service";

export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExpiration = this.onChangeExpiration.bind(this);
    this.onChangeAcquisition = this.onChangeAcquisition.bind(this);
    this.onChangeConsumption = this.onChangeConsumption.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 
      expiration: "",
      acquisition: "",
      consumption: "",

      published: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeExpiration(e) {
    this.setState({
      expiration: e.target.value
    });
  }

  onChangeAcquisition(e) {
    this.setState({
      acquisition: e.target.value
    });
  }

  onChangeConsumption(e) {
    this.setState({
      consumption: e.target.value
    });
  }


  saveProduto() {
    var data = {
      name: this.state.name,
      description: this.state.description,
      expiration: this.state.expiration,
      acquisition: this.state.acquisition,
      consumption: this.state.consumption,
    };

    ProdutoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          expiration: response.data.expiration,
          acquisition: response.data.acquisition,
          consumption: response.data.consumption,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      id: null,
      name: "",
      description: "",
      expiration: "",
      acquisition: "",
      consumption: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Produto adicionado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newProduto}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="expiration">Data de Expiração</label>
              <input
                type="date"
                className="form-control"
                id="expiration"
                required
                value={this.state.expiration}
                onChange={this.onChangeExpiration}
                name="expiration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="acquisition">Data de Aquisição</label>
              <input
                type="date"
                className="form-control"
                id="acquisition"
                required
                value={this.state.acquisition}
                onChange={this.onChangeAcquisition}
                name="acquisition"
              />
            </div>

            <div className="form-group">
              <label htmlFor="consumption">Data de Consumo</label>
              <input
                type="date"
                className="form-control"
                id="consumption"
                required
                value={this.state.consumption}
                onChange={this.onChangeConsumption}
                name="consumption"
              />
            </div>

            <button onClick={this.saveProduto} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}