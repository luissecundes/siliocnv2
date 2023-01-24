import React, { Component } from "react";
import ProdutoDataService from "../service/produto.service";
import { withRouter } from '../common/with-router';

class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeExpiration = this.onChangeExpiration.bind(this);
    this.onChangeAcquisition = this.onChangeAcquisition.bind(this);
    this.onChangeConsumption = this.onChangeConsumption.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      currentProduto: {
        id: null,
        name: "",
        description: "",
        expiration: "",
        acquisition: "",
        consumption: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduto(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          name: name
        }
      };
    });
  }
  

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        description: description
      }
    }));
  }

  onChangeExpiration(e) {
    const expiration = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        expiration: expiration
      }
    }));
  }

  onChangeAcquisition(e) {
    const acquisition = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        acquisition: acquisition
      }
    }));
  }

  onChangeConsumption(e) {
    const consumption = e.target.value;
    
    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        consumption: consumption
      }
    }));
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          currentProduto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProduto.id,
      name: this.state.currentProduto.name, 
      description: this.state.currentProduto.description,
      expiration: this.state.currentProduto.expiration,
      acquisition: this.state.currentProduto.acquisition,
      consumption: this.state.currentProduto.consumption,

      published: status
    };

    ProdutoDataService.update(this.state.currentProduto.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduto: {
            ...prevState.currentProduto,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
    ProdutoDataService.update(
      this.state.currentProduto.id,
      this.state.currentProduto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Atualização feita com Sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduto() {    
    ProdutoDataService.delete(this.state.currentProduto.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/product');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentProduto } = this.state;

    return (
      <div>
        {currentProduto ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProduto.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduto.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiration">Data de Expiração</label>
                <input
                  type="date"
                  className="form-control"
                  id="expiration"
                  value={currentProduto.expiration}
                  onChange={this.onChangeExpiration}
                />
              </div>

              <div className="form-group">
                <label htmlFor="acquisition">Data de Aquisição</label>
                <input
                  type="date"
                  className="form-control"
                  id="acquisition"
                  value={currentProduto.acquisition}
                  onChange={this.onChangeAcquisition}
                />
              </div>

              <div className="form-group">
                <label htmlFor="consumption">Data de Consumo</label>
                <input
                  type="date"
                  className="form-control"
                  id="consumption"
                  value={currentProduto.consumption}
                  onChange={this.onChangeConsumption}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProduto.published ? "Atualizado" : "Pendente"}
              </div>
            </form>

            {currentProduto.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
               
              </button>
            )}
<div class="btn-group padding-top"
 role="group" aria-label="Basic checkbox toggle button group">
            <button
            type="checkbox"
              className="btn btn-danger rounded-pill"
              onClick={this.deleteProduto}>
              Excluir
            </button>

            <button
               type="checkbox"
              className="btn btn-warning rounded-pill "
              onClick={this.updateProduto}>
              Atualizar
            </button>
        </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor, selecione o produto...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Produto);