import React from 'react';

interface ProductTableProps {
    data: Product[]; // Substitua "YourProductDataType" pelo tipo correto, que é "Product"
}

function ProductTable({ data }: ProductTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço Atual</th>
                    <th>Novo Preço</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product, index) => (
                    <tr key={index}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.currentPrice}</td>
                        <td>{product.newPrice}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
