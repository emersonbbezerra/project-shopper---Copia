import React, { useState } from 'react';

function PriceUpdate() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleUpdateClick = () => {
        // Implementar a atualização de preços no backend
    };

    return (
        <div>
            <button onClick={handleUpdateClick} disabled={isButtonDisabled}>
                ATUALIZAR
            </button>
        </div>
    );
}

export default PriceUpdate;
