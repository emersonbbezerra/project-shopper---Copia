const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

async function updateDatabase(filename) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shopper_prices'
    });

    try {
        // Lê e analisa os dados do arquivo CSV
        const results = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, '../public/upload', filename))
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        // Inicia uma transação para garantir a atomicidade das operações
        await connection.beginTransaction();

        // Loop que percorre os resultados do arquivo CSV
        for (const row of results) {
            // Atualiza o preço individual do produto conforme solicitado no arquivo CSV
            await connection.execute(
                'UPDATE products SET sales_price = ? WHERE code = ?',
                [row.new_price, row.product_code]
            );

            // Verifica se o produto faz parte de algum pacote
            const [packResult] = await connection.execute(
                'SELECT pack_id, qty FROM packs WHERE product_id = ?',
                [row.product_code]
            );

            if (packResult.length > 0) {
                const { pack_id, qty } = packResult[0];

                // Calcula o novo preço do pacote com base nos preços individuais dos componentes
                const [componentRows] = await connection.execute(
                    'SELECT product_id, qty FROM packs WHERE pack_id = ?',
                    [pack_id]
                );

                let totalPrice = 0;

                for (const componentRow of componentRows) {
                    const [component] = await connection.execute(
                        'SELECT sales_price FROM products WHERE code = ?',
                        [componentRow.product_id]
                    );

                    totalPrice += component[0].sales_price * componentRow.qty;
                }

                // Atualiza o preço do pacote
                await connection.execute(
                    'UPDATE products SET sales_price = ? WHERE code = ?',
                    [totalPrice, pack_id]
                );
            }
        }

        // Confirma a transação se tudo correu bem
        await connection.commit();
    } catch (error) {
        // Reverte a transação em caso de erro
        await connection.rollback();
        console.error(error);
    } finally {
        // Fecha a conexão com o banco de dados após a transação
        await connection.end();
    }
}

module.exports = updateDatabase;
