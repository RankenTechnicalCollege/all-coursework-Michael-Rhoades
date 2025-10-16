import express from "express";

const router = express.Router();

import debug from 'debug';
const debugProducts = debug('app:Products');

import { GetProducts, GetProductById, GetProductByName, AddProduct, UpdateProduct, DeleteProduct } from "../../database.js";

import { validate, validId } from '../../Middleware/validator.js';
import { schemaAddProduct, schemaUpdateProduct } from "../../validation/schemaProducts.js";

router.get("", async (req, res) => {
  try {
    const products = await GetProducts();
    if (!products) {
      res.status(404).json({message: 'Products not found'});
      return;
    }
    else {
      res.status(200).json(products);
    }
  }
  catch {
      res.status(500).json({message: 'Error getting products'})
  }
});

router.get("/name/:name", async (req, res) => {
  try {
    const product = await GetProductByName(req.params.name);
    if (!product) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    else {
      res.status(200).json(product);
    }
  }
  catch {
    res.status(500).json({message: 'Error getting product'})
  }
});

router.get("/:productId", validId('productId'), async (req, res) => {
  try {
    const product = await GetProductById(req.productId);
    if (!product) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    else {
      res.status(200).json(product);
    }
  }
  catch {
    res.status(500).json({message: 'Error getting product'})
  }
});

router.post("", validate(schemaAddProduct), async (req, res) => {
  try {
    const productToAdd = req.body;
    productToAdd.createdOn = new Date(Date.now());
    productToAdd.lastUpdatedOn = new Date(Date.now());
    const newProduct = await AddProduct(productToAdd);
    if (!newProduct) {
      res.status(500).json({message: 'Error adding product'});
      return;
    }
    else {
      res.status(201).json(newProduct);
    }
  }
  catch {
    res.status(500).json({message: 'Error adding product'});
  }
});

router.patch("/:productId", validId('productId'), validate(schemaUpdateProduct), async (req, res) => {
  try {
    const productToUpdate = req.body;
    const productId = req.productId;
    const oldProduct = await GetProductById(productId);
    if (!oldProduct) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    const name = productToUpdate.name ? productToUpdate.name : oldProduct.name;
    const description = productToUpdate.description ? productToUpdate.description : oldProduct.description;
    const category = productToUpdate.category ? productToUpdate.category : oldProduct.category;
    const price = productToUpdate.price ? productToUpdate.price : oldProduct.price;
    const updatedProduct = await UpdateProduct(productId, name, description, category, price);
    if (!updatedProduct) {
      res.status(500).json({message: 'Error updating product'});
      return;
    }
    else {
      res.status(200).json({message: `Product ${productId}updated successfully`});
    }
  }
  catch {
    res.status(500).json({message: 'Error updating product'});
  }
});

router.delete("/:productId", validId('productId'), async (req, res) => {
  try {
    const productId = req.productId;
    const deletedProduct = await DeleteProduct(productId);
    if (deletedProduct.deletedCount === 0) {
      res.status(404).json({message: 'Product not found'});
      return;
    }
    else {
      res.status(200).json({message: `Product ${productId} deleted successfully`});
    }
  }
  catch {
    res.status(500).json({message: 'Error deleting product'});
  }
});

export { router as productRouter };