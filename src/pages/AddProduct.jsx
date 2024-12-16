import React from 'react';

import {CreateProduct } from '../components/Admin/CreateProduct.jsx';
export const AddProduct = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-blue-500 mb-6">Add Products</h1>
            <CreateProduct />
        </div>
      
    );
    }