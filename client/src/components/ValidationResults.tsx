import React from 'react';

interface ValidationResultsProps {
    errors: string[] | null;
}

function ValidationResults({ errors }: ValidationResultsProps) {
    return (
        <div>
            {errors !== null && errors.length > 0 && (
                <div>
                    <h2>Erros de Validação</h2>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ValidationResults;
