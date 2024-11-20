export async function fetchApi(setTickets, setUsers) {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setTickets(data.tickets);
    setUsers(data.users);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
