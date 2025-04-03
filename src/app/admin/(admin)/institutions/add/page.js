// components/InstitutionForm.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function InstitutionForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    established: '',
    location: '',
    category: '',
    facts: [{ label: '', value: '' }],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [imageFile, setImageFile] = useState(null); // For storing the actual file
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  // Ensure the component only renders dynamic content after mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file object for form submission
      setImageFile(file);
      
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleFactChange = (index, field, value) => {
    const newFacts = [...formData.facts];
    newFacts[index][field] = value;
    setFormData((prev) => ({ ...prev, facts: newFacts }));
  };

  const addFact = () => {
    setFormData((prev) => ({
      ...prev,
      facts: [...prev.facts, { label: '', value: '' }],
    }));
  };

  const removeFact = (index) => {
    setFormData((prev) => ({
      ...prev,
      facts: prev.facts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Create a FormData object for the multipart/form-data submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('description', formData.description);
      formDataToSubmit.append('established', formData.established);
      formDataToSubmit.append('location', formData.location);
      formDataToSubmit.append('category', formData.category);
      formDataToSubmit.append('facts', JSON.stringify(formData.facts));
      
      // Append the image file if selected
      if (imageFile) {
        formDataToSubmit.append('featuredImage', imageFile);
      }

      const response = await fetch('/api/institutions/add', {
        method: 'POST',
        body: formDataToSubmit, // No need to set Content-Type header for FormData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create institution');
      }

      setSuccess('Institution added successfully!');
      setFormData({
        name: '',
        description: '',
        established: '',
        location: '',
        category: '',
        facts: [{ label: '', value: '' }],
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Institution</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Established Year</label>
          <input
            type="text"
            name="established"
            value={formData.established}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Facts</label>
          {formData.facts.map((fact, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Label"
                value={fact.label}
                onChange={(e) => handleFactChange(index, 'label', e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={fact.value}
                onChange={(e) => handleFactChange(index, 'value', e.target.value)}
                className="w-1/2 p-2 border rounded"
                required
              />
              {formData.facts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFact(index)}
                  className="p-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFact}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Fact
          </button>
        </div>

        <div>
          <label className="block mb-1">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2"
          />
          {isMounted && imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto rounded"
                width={400} // Width in pixels
                height={200} // Height in pixels
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}