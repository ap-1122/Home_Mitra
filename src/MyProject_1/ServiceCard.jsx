  import React from "react";

const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <button
          onClick={() => onBook(service)}
          className="w-full bg-purple-500 text-white font-medium py-2 rounded-md hover:bg-emerald-500 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
