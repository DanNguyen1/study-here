"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Room, RoomCard } from './RoomCard';

type AvailabilityFilter = 'all' | 'available' | 'occupied';

// --- MOCK DATA ---
const MOCK_ROOMS: Room[] = [
  { id: 101, name: "Quiet Study Pod A", capacity: 2, available: true, location: "Main Library, 2F", amenities: ["Power Outlet", "WiFi"] },
  { id: 102, name: "Collaborative Lab 310", capacity: 8, available: false, location: "Science Hall, 3F", amenities: ["Projector", "Whiteboard", "WiFi"] },
  { id: 103, name: "East Wing Meeting Room", capacity: 4, available: true, location: "Union Building, 1F", amenities: ["Power Outlet", "Whiteboard"] },
  { id: 104, name: "Zen Zone Study Booth", capacity: 1, available: true, location: "Main Library, 4F", amenities: ["Quiet Zone", "Power Outlet"] },
  { id: 105, name: "The Big Think Tank", capacity: 12, available: false, location: "Business School, BMT", amenities: ["Projector", "Video Conferencing"] },
  { id: 106, name: "North Hall Annex 201", capacity: 6, available: true, location: "North Hall, 2F", amenities: ["Whiteboard", "Power Outlet"] },
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [filter, setFilter] = useState<AvailabilityFilter>('all');
  const [minCapacity, setMinCapacity] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term

  // Handler for search input change
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  // Handler for capacity input change
  const handleCapacityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setMinCapacity(value > 0 ? value : 1);
  }, []);

  // Memoized filtered list of rooms
  const filteredRooms = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return rooms.filter(room => {
      // 1. Filter by search term (case-insensitive)
      if (searchTerm && !room.name.toLowerCase().includes(lowerCaseSearchTerm)) {
        return false;
      }

      // 2. Filter by availability
      if (filter === 'available' && !room.available) return false;
      if (filter === 'occupied' && room.available) return false;

      // 3. Filter by capacity (Show rooms that meet or exceed the minimum capacity)
      if (room.capacity < minCapacity) return false;

      return true;
    }).sort((a, b) => {
      // Sort: Available first, then by capacity (desc)
      if (a.available !== b.available) {
        return a.available ? -1 : 1; // Available rooms come first
      }
      return b.capacity - a.capacity; // Higher capacity comes first
    });
  }, [rooms, filter, minCapacity, searchTerm]); // Added searchTerm dependency

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Study Here
        </h1>
        <p className="text-gray-600">
          Real-time status of study spaces across campus.
        </p>
      </header>

      {/* --- Filter Controls --- */}
      <section className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Rooms</h3>

        {/* Search Bar Input (NEW) */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by room name (e.g., 'Collaborative Lab')"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base transition-shadow duration-200"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">

          {/* Availability Filter Buttons */}
          <div className="flex space-x-3 flex-wrap">
            {(['all', 'available', 'occupied'] as AvailabilityFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 capitalize ${
                  filter === f
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>


          {/* Capacity Filter Input */}
          <div className="flex items-center space-x-3 md:ml-auto mt-4 md:mt-0">
            <label htmlFor="capacity" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Min. Capacity:
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              value={minCapacity}
              onChange={handleCapacityChange}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* --- Room Grid --- */}
      <main className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {filteredRooms.length} Room{filteredRooms.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}

          {filteredRooms.length === 0 && (
            <div className="lg:col-span-3 text-center py-12 bg-white rounded-xl shadow-inner text-gray-500">
              <p className="text-lg">No rooms match the current filters.</p>
              <p className="text-sm mt-1">Try adjusting the capacity, availability, or search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}