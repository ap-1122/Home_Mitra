 import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For update modal
  const [editingBooking, setEditingBooking] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    locationType: "Home",
    addressId: "",
    street: "",
    city: "",
    state: "",
    zipcode: ""
  });

  // Fetch bookings from backend
  const fetchBookings = () => {
    setLoading(true);
    fetch("http://localhost:3001/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Fetch addresses from backend for dropdown
  const fetchAddresses = () => {
    fetch("http://localhost:3001/addresses")
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(() => setAddresses([]));
  }

  useEffect(() => {
    fetchBookings();
    fetchAddresses();
  }, []);

  // Delete booking function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`http://localhost:3001/bookings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");

      fetchBookings(); // Refresh list
    } catch (error) {
      alert("Error deleting booking: " + error.message);
    }
  };

  // Open update modal and prefill form data + address selection
  const openUpdateForm = (booking) => {
    setEditingBooking(booking);

    // Find addressId from booking.address object by matching addresses
    let matchedAddressId = "";
    if (booking.address && addresses.length > 0) {
      const match = addresses.find(addr =>
        addr.street === booking.address.street &&
        addr.city === booking.address.city &&
        addr.state === booking.address.state &&
        addr.zipcode === booking.address.zipcode
      );
      matchedAddressId = match ? String(match.id) : "";
    }

    setFormData({
      date: booking.date,
      time: booking.time,
      locationType: booking.locationType,
      addressId: matchedAddressId,
      street: booking.address?.street || "",
      city: booking.address?.city || "",
      state: booking.address?.state || "",
      zipcode: booking.address?.zipcode || ""
    });
  };

  const closeUpdateForm = () => {
    setEditingBooking(null);
  };

  // Handle form input change + address dropdown change with autofill
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If address dropdown changed, autofill address fields
    if(name === "addressId") {
      const selected = addresses.find(addr => String(addr.id) === value);
      setFormData(prev => ({
        ...prev,
        addressId: value,
        street: selected ? selected.street : "",
        city: selected ? selected.city : "",
        state: selected ? selected.state : "",
        zipcode: selected ? selected.zipcode : ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Update booking PUT request
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/bookings/${editingBooking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingBooking,
          date: formData.date,
          time: formData.time,
          locationType: formData.locationType,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode
          }
        }),
      });
      if (!res.ok) throw new Error("Failed to update booking");

      fetchBookings(); // Refresh bookings
      closeUpdateForm();
      alert("Booking updated successfully!");
    } catch (error) {
      alert("Error updating booking: " + error.message);
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading bookings...</div>;
  if (error) return <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-pink-600 mb-2">{booking.service}</h2>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.locationType}</p>
              <p>
                <strong>Address:</strong> {booking.address?.street}, {booking.address?.city}, {booking.address?.state} - {booking.address?.zipcode}
              </p>
              <p className="text-gray-500 text-sm mt-3">
                <em>Booked on: {new Date(booking.bookedAt).toLocaleString()}</em>
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => openUpdateForm(booking)}
                  className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded"
                >
                  Cancel Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Update Booking for {editingBooking.service}
            </h2>

            <label className="block mb-2 font-semibold text-gray-700">Select Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 font-semibold text-gray-700">Select Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 font-semibold text-gray-700">Location Type</label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            >
              <option>Home</option>
              <option>Office</option>
            </select>

            <label className="block mb-2 font-semibold text-gray-700">Select Address</label>
            <select
              name="addressId"
              value={formData.addressId}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">-- Choose Saved Address --</option>
              {addresses.length > 0 ? (
                addresses.map(addr => (
                  <option key={addr.id} value={addr.id}>
                    {addr.street}, {addr.city}
                  </option>
                ))
              ) : (
                <option disabled>No saved addresses</option>
              )}
            </select>

            <label className="block mb-2 font-semibold text-gray-700">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 font-semibold text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 font-semibold text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 border rounded"
            />

            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-800 text-white py-2 px-4 rounded transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={closeUpdateForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
