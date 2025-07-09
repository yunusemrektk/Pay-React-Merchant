import React, { useState } from 'react';
import CategoryMenuDashboard from './TestDashboard';

function App() {
    const [categories, setCategories] = useState([
        { id: 1, label: 'Kahve' },
        { id: 2, label: 'Sandviç' },
        // ...
    ]);
    const [products, setProducts] = useState([
        { id: 101, category_id: 1, name: 'Espresso', description: 'Güçlü siyah kahve', price: 15.0 },
        { id: 101, category_id: 1, name: 'Espresso', description: 'Güçlü siyah kahve', price: 15.0 },
        { id: 101, category_id: 1, name: 'Espresso', description: 'Güçlü siyah kahve', price: 15.0 },
        { id: 101, category_id: 1, name: 'Espresso', description: 'Güçlü siyah kahve', price: 15.0 },
    ]);

    // Basit handler örnekleri:
    const handleAddCategory = () => { /* open modal vs. */ };
    const handleEditCategory = cat => { /* ... */ };
    const handleDeleteCategory = cat => { /* ... */ };

    const handleAddProduct = cat => { /* ... */ };
    const handleEditProduct = prod => { /* ... */ };
    const handleDeleteProduct = prod => { /* ... */ };

    return (
        <CategoryMenuDashboard
            categories={categories}
            products={products}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
        />
    );
}

export default App;
