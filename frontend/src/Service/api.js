import axios from 'axios';

const url = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const userAdd = async (userData) => {
   return await axios.post(`${url}/signup`, userData);
}

export const userDisplay = async () => {
   return await axios.get(`${url}/admin`)
}

export const deletedUser = async (_id) => {
   return await axios.delete(`${url}/admin/${_id}`);
}

export const productAddition = async (prData) => {
   return await axios.post(`${url}/products`, prData)
}

export const prDisplay = async (id) => {
   id = id || "";
   return await axios.get(`${url}/products/${id}`);
}

export const deleteProduct = async (prID) => {
   return await axios.delete(`${url}/products/${prID}`)
}

export const editPr = async (id, user) => {
   try {
      return await axios.put(`${url}/products/${id}`, user)
   } catch (error) {
      console.log("Error")
   }
}

export const userLogin = async (userData) => {
   return await axios.post(`${url}/login`, userData);
}

export const productCart = async (prData) => {
   return await axios.post(`${url}/viewproduct`, prData)
}

export const prDisplayCart = async () => {
   return await axios.get(`${url}/viewproduct/`);
}

export const deleteProductCart = async (_id) => {
   return await axios.delete(`${url}/viewproduct/${_id}`);
}

export const usergetPfp = async (name) => {
   name = name || "";
   return await axios.get(`${url}/admin/${name}`);
}
