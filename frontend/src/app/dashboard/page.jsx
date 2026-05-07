'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher('/api/meetings')
      .then(setMeetings)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Meetings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <Link href={`/meetings/${meeting.id}`} key={meeting.id}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <h2 className="text-xl font-semibold mb-2">{meeting.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(meeting.createdAt).toLocaleDateString()}
              </p>
              <div className="text-gray-600 line-clamp-3 text-sm">
                {meeting.transcript.substring(0, 150)}...
              </div>
            </div>
          </Link>
        ))}
      </div>
      {meetings.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No meetings found. Start recording from the extension!
        </div>
      )}
    </div>
  );
}
