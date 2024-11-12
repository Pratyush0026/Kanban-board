/**
 * Groups tickets based on the selected criteria (status, user, or priority).
 * @param {Array} tickets - A list of ticket objects that need to be grouped.
 * @param {String} criteria - The criteria to group the tickets by. Can be: "status", "user", or "priority".
 * @param {Array} users - A list of users used when grouping tickets by user (to map user IDs to names).
 * @returns {Object} An object with tickets grouped by the specified criteria.
 */
export function groupTickets(tickets, criteria, users = []) {
    let grouped = {};

    // Group tickets by their status
    if (criteria === "status") {
        grouped = { "Todo": [], "In Progress": [], "Done": [], "Backlog": [] };
    } 
    // Group tickets by user, including an "Unknown" group for tickets without a user assigned
    else if (criteria === "user") {
        // Create an empty group for each user
        grouped = users.reduce((acc, user) => {
            if (user && user.id) acc[user.id] = [];
            return acc;
        }, {});
        
        grouped["Unknown"] = []; // Group for tickets without a matching user

        // Assign tickets to the correct user group based on `userId`
        tickets.forEach((ticket) => {
            if (ticket.userId && grouped[ticket.userId]) {
                grouped[ticket.userId].push(ticket); // Add to the user's group
            } else {
                grouped["Unknown"].push(ticket); // Add to "Unknown" if no matching user
            }
        });
    } 
    // Group tickets by their priority
    else if (criteria === "priority") {
        grouped = {
            "Urgent": [],
            "High": [],
            "Medium": [],
            "Low": [],
            "No Priority": []
        };
    }

    // Group tickets based on their status or priority
    tickets.forEach((ticket) => {
        if (criteria === "status") {
            const status = ticket.status || "Todo"; // Default to "Todo" if status is missing
            const normalizedStatus =
                status.toLowerCase() === "in progress" ? "In Progress" :
                status.toLowerCase() === "backlog" ? "Backlog" :
                status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

            grouped[normalizedStatus] ? grouped[normalizedStatus].push(ticket) : grouped["Todo"].push(ticket);
        } 
        else if (criteria === "priority") {
            // Map the priority level index to a label, default to "No Priority" if index is invalid
            const priorityLabel = ["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority] || "No Priority";
            grouped[priorityLabel].push(ticket);
        }
    });

    return grouped;
}

/**
 * Sorts tickets within each group based on a specific criteria (priority or title).
 * @param {Array} tickets - The list of tickets that need to be sorted.
 * @param {String} criteria - The sorting criteria: either "priority" or "title".
 * @returns {Array} A sorted list of tickets based on the given criteria.
 */
export function sortTickets(tickets, criteria) {
    return tickets.sort((a, b) => {
        if (criteria === 'priority') return b.priority - a.priority; // Sort by priority, higher first
        if (criteria === 'title') return a.title.localeCompare(b.title); // Sort alphabetically by title
        return 0; // Return original order if criteria is unrecognized
    });
}
