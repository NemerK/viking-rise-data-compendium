'use client';

import { useState } from 'react';
import Link from 'next/link';

const events = [
  {
    id: 1,
    name: 'Hero Training Event',
    type: 'Training',
    status: 'Active',
    description: 'Double XP for hero training activities',
    startDate: '2025-10-10',
    endDate: '2025-10-17',
    rewards: ['Double XP', 'Training Speed Boost', 'Resource Bonus']
  },
  {
    id: 2,
    name: 'Resource Gathering',
    type: 'Resource',
    status: 'Upcoming',
    description: 'Increased resource collection rates',
    startDate: '2025-10-15',
    endDate: '2025-10-22',
    rewards: ['2x Resource Collection', 'Gathering Speed Boost']
  },
  {
    id: 3,
    name: 'Alliance War',
    type: 'PvP',
    status: 'Active',
    description: 'Weekly alliance battles for supremacy',
    startDate: '2025-10-13',
    endDate: '2025-10-20',
    rewards: ['War Rewards', 'Alliance Points', 'Exclusive Items']
  },
  {
    id: 4,
    name: 'Monster Hunt',
    type: 'PvE',
    status: 'Ended',
    description: 'Hunt powerful monsters for rare rewards',
    startDate: '2025-10-01',
    endDate: '2025-10-08',
    rewards: ['Monster Materials', 'Equipment Parts', 'Gold']
  },
  {
    id: 5,
    name: 'Building Boost',
    type: 'Construction',
    status: 'Upcoming',
    description: 'Faster building and research times',
    startDate: '2025-10-20',
    endDate: '2025-10-27',
    rewards: ['Building Speed Boost', 'Research Acceleration']
  }
];

const eventTypes = ['All', 'Training', 'Resource', 'PvP', 'PvE', 'Construction'];
const eventStatuses = ['All', 'Active', 'Upcoming', 'Ended'];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md border-b border-gray-700/50 py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
              <span className="mr-2">←</span>
              Back to Home
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-gray-200 mb-2 tracking-wide drop-shadow-lg">
            Events
          </h1>
          <p className="text-sm text-gray-400 font-light drop-shadow-md">
            Current and upcoming events in Viking Rise
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dark-card rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Event Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full dark-select px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="dark-card rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{event.name}</h3>
                <span className={`px-3 py-1 text-white text-sm rounded ${
                  event.status === 'Active' ? 'bg-green-600' :
                  event.status === 'Upcoming' ? 'bg-yellow-600' :
                  event.status === 'Ended' ? 'bg-gray-600' :
                  'bg-blue-600'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{event.description}</p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Duration:</p>
                <p className="text-gray-300">{event.startDate} - {event.endDate}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Rewards:</p>
                <div className="flex flex-wrap gap-1">
                  {event.rewards.map((reward, index) => (
                    <span key={index} className="px-2 py-1 ability-badge rounded text-xs">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
