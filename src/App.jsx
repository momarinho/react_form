import { useState, useEffect } from "react";

const ItemForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
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
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

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

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validação em tempo real
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
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

      // Resetar formulário se necessário
      // setFormData({ title: "", description: "", price: "" });
    } catch {
      setSubmitStatus({ 
        success: false,
        message: "Erro ao salvar item. Tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      {/* Mensagem de status do submit */}
      {submitStatus.message && (
        <div className={`p-3 rounded-lg ${
          submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {/* Campo Título */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Título *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic mt-2">{errors.title}</p>
        )}
      </div>

      {/* Campo Descrição */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo Preço */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Preço *
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.price ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.price && (
          <p className="text-red-500 text-xs italic mt-2">{errors.price}</p>
        )}
      </div>

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
