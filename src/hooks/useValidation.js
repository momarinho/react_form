import { useState } from 'react';

export const useValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Título é obrigatório";
        break;
      case "price":
        if (!value || Number(value) <= 0) error = "Preço deve ser maior que 0";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Preço deve ser maior que 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateField, validateForm };
};
