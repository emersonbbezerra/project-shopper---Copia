const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

async function validateCsv(filename) {
    const results = [];
    const errors = [];

    // Lê e analisa os dados do arquivo CSV
    await new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../public/upload', filename))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', resolve)
            .on('error', reject);
    });

    // Conecta-se ao banco de dados MySQL
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shopper_prices'
    });

    // Verifica se todos os campos necessários existem
    for (const row of results) {
        if (!row.product_code || !row.new_price) {
            errors.push(`Linha ${results.indexOf(row) + 1}: Os campos "product_code" e "new_price" são obrigatórios`);
        }
    }

    // Verifica se os códigos de produtos informados existem
    for (const row of results) {
        const [product] = await connection.execute(
            'SELECT * FROM products WHERE code = ?',
            [row.product_code]
        );
        if (product.length === 0) {
            errors.push(`Linha ${results.indexOf(row) + 1}: O código do produto ${row.product_code} não existe`);
        }
    }

    // Verifica se os preços estão preenchidos e são valores numéricos válidos
    for (const row of results) {
        if (isNaN(row.new_price)) {
            errors.push(`Linha ${results.indexOf(row) + 1}: O preço deve ser um valor numérico válido`);
        }
    }

    // Verifica se o arquivo respeita as regras levantadas na seção CENARIO
    for (const row of results) {
        const [product] = await connection.execute(
            'SELECT * FROM products WHERE code = ?',
            [row.product_code]
        );
        const newPrice = parseFloat(row.new_price);
        const currentPrice = product[0].sales_price;
        const costPrice = product[0].cost_price;

        // Verifica se o preço de venda dos produtos não está abaixo do custo
        if (newPrice < costPrice) {
            errors.push(`Linha ${results.indexOf(row) + 1}: O preço de venda do produto ${row.product_code} não pode ficar abaixo do custo`);
        }

        // Verifica se o reajuste de preço é maior ou menor do que 10% do preço atual do produto
        if (newPrice > currentPrice * 1.1 || newPrice < currentPrice * 0.9) {
            errors.push(`Linha ${results.indexOf(row) + 1}: O reajuste de preço do produto ${row.product_code} não pode ser maior ou menor do que 10% do preço atual`);
        }
    }

    // Fecha a conexão com o banco de dados
    await connection.end();

    if (errors.length > 0) {
        // Se houver erros de validação, retorne os erros
        return errors;
    } else {
        // Se não houver erros de validação, retorne verdadeiro
        return true;
    }
}

module.exports = validateCsv;
