import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import PriceUpdate from './components/PriceUpdate';
import ValidationResults from './components/ValidationResults';
import ProductTable from './components/ProductTable';
import './App.css';

function App() {
  const [validationData, setValidationData] = useState<Product[]>([]);
  const [updatedData, setUpdatedData] = useState<string[]>([]);
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(true);
  const [message, setMessage] = useState<string>(''); // Adicione o estado para a mensagem

  return (
    <div className="App">
      <h1>Shopper.com.br - Atualização de Preços</h1>
      <div className="App-container">
        <FileUpload
          setValidationData={setValidationData}
          setUpdatedData={setUpdatedData}
          setIsUpdateButtonDisabled={setIsUpdateButtonDisabled}
          setMessage={setMessage}
        />

        <PriceUpdate validationData={validationData} setUpdatedData={setUpdatedData} setIsUpdateButtonDisabled={setIsUpdateButtonDisabled} />
      </div>
      {updatedData !== null ? ( // Verifique se updatedData não é nulo
        <ValidationResults errors={updatedData} />
      ) : null}
      <ProductTable data={validationData} />
      <p>{message}</p>
    </div>
  );
}

export default App;
