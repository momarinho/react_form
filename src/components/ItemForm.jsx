import { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { useValidation } from "../hooks/useValidation";
import FormInput from "./FormInput";
import Spinner from "./Spinner";

const ItemForm = () => {
  const { formData, setFormData, handleChange } = useForm({
    title: "",
    description: "",
    price: "",
  });
  const { errors, validateForm, validateField } = useValidation(formData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });

  useEffect(() => {
    fetch("/api/default-data")
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [setFormData]);

  const handleInputChange = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro na requisição");

      setSubmitStatus({
        success: true,
        message: "Item salvo com sucesso!"
      });

    } catch {
      setSubmitStatus({ 
        success: false,
        message: "Erro ao salvar item. Tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      {submitStatus.message && (
        <div className={`p-3 rounded-lg ${
          submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <FormInput
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        error={errors.title}
      />

      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <FormInput
        label="Preço"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        error={errors.price}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default ItemForm;
