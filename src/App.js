import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [data, setData] = useState({ tickets: [], users: [] });

  useEffect(() => {
    // Fetch data from API on component mount
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data to inspect structure
        setData({
          tickets: data.tickets || [], // Default to empty array if no tickets found
          users: data.users || []      // Default to empty array if no users found
        });
      } catch (error) {
        console.error('Error fetching data:', error); // Catch and log any error during fetch
      }
    };

    fetchData(); 
  }, []);

  return (
    <div className="App">
      {/* Render KanbanBoard with tickets and users data passed as props */}
      <KanbanBoard tickets={data.tickets} users={data.users} />
    </div>
  );
}

export default App;
