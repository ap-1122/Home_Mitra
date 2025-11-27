 import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    id: 1,
    title: "Electrician",
    description: "Professional electrical wiring, repairs, and appliance installation.",
    image:
      "https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=612x612&w=0&k=20&c=stdWozouV2XsrHk2xXD3C31nT90BG7ydZvcpAn1Fx7I=",
  },
  {
    id: 2,
    title: "Plumbing",
    description: "Fixing leaky pipes, clogged drains, and installing new fixtures.",
    image:
      "https://thumbs.dreamstime.com/b/plumber-work-bathroom-plumbing-repair-service-assemble-install-concept-plumber-work-bathroom-plumbing-repair-113995223.jpg",
  },
  {
    id: 3,
    title: "Carpentry",
    description: "Custom furniture, cabinet repairs, and professional woodwork.",
    image:
      "https://media.istockphoto.com/id/481628382/photo/carpenter-taking-measurement.jpg?s=612x612&w=0&k=20&c=l2cAPfJL2bGltBasmnqUlsz2OHv6H6bUzjzhx0feOJg=",
  },
  {
    id: 4,
    title: "House Cleaning",
    description: "Deep cleaning, regular maintenance, and specialized cleaning services.",
    image:
      "https://media.istockphoto.com/id/1365606525/photo/shot-of-a-bucket-of-cleaning-supplies.jpg?s=612x612&w=0&k=20&c=_Xz3e-_WGlQC2zXstHaK_AI9N76LNag_KbRioNlM1hQ=",
  },
  {
    id: 5,
    title: "Painting services",
    description: "Professional interior and exterior painting services for homes and offices.",
    image:
      "https://cloudfrontgharpediabucket.gharpedia.com/uploads/2024/04/Interior-Painting-Services-01-0308020026.jpg",
  },
  {
    id: 6,
    title: "Pest control services",
    description: "Pest control services for homes and offices.",
    image:
      "https://palpestcontrol.com/wp-content/uploads/2025/03/Pal-pest-website-assets-2-1024x1024.png",
  },
];

const BookingForm = ({ service, onClose, addresses }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    locationType: "Home",
    addressId: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // Autofill address when address selected
  useEffect(() => {
    if (formData.addressId) {
      const selected = addresses.find((addr) => String(addr.id) === formData.addressId);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          street: selected.street,
          city: selected.city,
          state: selected.state,
          zipcode: selected.zipcode,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        street: "",
        city: "",
        state: "",
        zipcode: "",
      }));
    }
  }, [formData.addressId, addresses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      service: service.title,
      date: formData.date,
      time: formData.time,
      locationType: formData.locationType,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      },
      bookedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Failed to save booking");
      }

      alert(
        `Booking Confirmed for ${bookingData.service}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nLocation: ${bookingData.locationType}\nAddress: ${bookingData.address.street}, ${bookingData.address.city}`
      );
      onClose();
    } catch (error) {
      alert("Error saving booking data: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Book {service.title}</h2>

        <label className="block mb-2 font-semibold text-gray-700">Select Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
          min={new Date().toISOString().split("T")[0]} // Past dates disabled
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
          {addresses && addresses.length > 0 ? (
            addresses.map((addr) => (
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
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Select State --</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Delhi">Delhi</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Gujarat">Gujarat</option>
          {/* Additional states add kar sakte hain */}
        </select>

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
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const Services = () => {
  const [bookingService, setBookingService] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/addresses")
      .then((res) => res.json())
      .then((data) => setAddresses(data))
      .catch(() => setAddresses([]));
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-10">
        Our Professional Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service} onBook={setBookingService} />
        ))}
      </div>

      {bookingService && (
        <BookingForm
          service={bookingService}
          onClose={() => setBookingService(null)}
          addresses={addresses}
        />
      )}
    </div>
  );
};

export default Services;
