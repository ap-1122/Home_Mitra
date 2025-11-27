import React, { useEffect, useState } from "react";

const Profile = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });

  // Fetch addresses from backend
  const fetchAddresses = () => {
    setLoading(true);
    fetch("http://localhost:3001/addresses")
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch addresses");
        return res.json();
      })
      .then(data => {
        setAddresses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Form input change handler
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit new address
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to save address");

      setFormData({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: ""
      });
      fetchAddresses();
      alert("Address saved successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading addresses...</div>;
  if (error) return <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">My Profile - Addresses</h1>

      {/* Existing addresses list */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses saved yet.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map(addr => (
              <li key={addr.id} className="border rounded p-4 shadow-sm">
                <p><strong>Name:</strong> {addr.name}</p>
                <p><strong>Phone:</strong> {addr.phone}</p>
                <p><strong>Address:</strong> {addr.street}, {addr.city}, {addr.state} - {addr.zipcode}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* New address form */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full py-2 bg-pink-600 hover:bg-pink-800 text-white font-semibold rounded">
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
