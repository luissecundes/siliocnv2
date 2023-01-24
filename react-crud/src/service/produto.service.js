import http from "../http-common";

class ProdutoDataService {
  getAll() {
    return http.get("product/all");
  }

  get(id) {
    return http.get(`/product/${id}`);
  }

  create(data) {
    return http.post("/product", data);
  }

  update(id, data) {
    return http.put(`/product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product/${id}`);
  }



  findByName(name) {
    return http.get(`/product?name=${name}`);
  }
}

export default new ProdutoDataService();