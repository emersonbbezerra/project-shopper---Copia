import React, { useState } from 'react';

interface FileUploadProps {
    setValidationData: (data: Product[]) => void;
    setUpdatedData: (data: string[]) => void;
    setIsUpdateButtonDisabled: (value: boolean) => void;
    setMessage: (message: string) => void;
}

function FileUpload({ setValidationData, setUpdatedData, setIsUpdateButtonDisabled, setMessage }: FileUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
        setIsButtonDisabled(!file);
    };

    const handleValidateClick = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Arquivo validado com sucesso!');
            } else {
                setMessage('Erro na validação do arquivo.');
                console.error('Erro na validação do arquivo.');
            }
        } catch (error) {
            setMessage('Erro ao fazer a solicitação: ' + error.message);
            console.error('Erro ao fazer a solicitação:', error);
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleValidateClick} disabled={isButtonDisabled}>
                VALIDAR
            </button>
        </div>
    );
}

export default FileUpload;
