import React, { useState } from 'react';
import { updateCategoryRequest } from '../../../services/Categoryapi';
import toast from 'react-hot-toast';

export const useUpdateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateCategory = async (id, category) => {
    setIsLoading(true);
    try {
      const response = await updateCategoryRequest(id, category);
      setIsLoading(false);
      toast.success('Categoría actualizada exitosamente');
      setError(false);
      return true;
    } catch (e) {
      setIsLoading(false);
      setError(true);

      const arrayErrors = e?.response?.data?.errors;
      if (arrayErrors && arrayErrors.length) {
        arrayErrors.forEach(error => toast.error(error.msg));
      } else {
        toast.error(
          e?.response?.data?.msg ||
          'Error al actualizar categoría. Intenta de nuevo'
        );
      }
      return false;
    }
  };

  return {
    updateCategory,
    isLoading,
    error,
    setError,
  };
};
