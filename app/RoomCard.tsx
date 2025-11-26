"use client";
import React from 'react';
import { Users, MapPin, CheckCircle, XCircle } from 'lucide-react';

export interface Room {
  id: number;
  name: string;
  capacity: number;
  available: boolean;
  location: string;
  amenities: string[];
}

// Component for a single room card
export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  const statusColor = room.available
    ? 'bg-green-100 text-green-700 border-green-300'
    : 'bg-red-100 text-red-700 border-red-300';
  const statusIcon = room.available ? CheckCircle : XCircle;

  return (
    <div
      className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 border-t-4 ${
        room.available ? 'border-indigo-500 bg-white' : 'border-gray-300 bg-gray-50'
      }`}
    >
      {/* Availability Status Badge */}
      <div
        className={`absolute top-0 right-0 m-3 px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${statusColor}`}
      >
        {React.createElement(statusIcon, { className: 'w-3 h-3' })}
        <span>{room.available ? 'Available' : 'Occupied'}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
        {room.name}
      </h3>

      <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-indigo-500" />
          <span className="font-medium">Capacity: {room.capacity}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span className="text-sm">{room.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          Amenities
        </p>
        <div className="flex flex-wrap gap-2">
          {room.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};