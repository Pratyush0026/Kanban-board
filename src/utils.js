/**
 * Groups tickets based on the given criteria (status, user, or priority).
 * @param {Array} tickets - Array of ticket objects.
 * @param {String} criteria - The criteria by which to group tickets: "status", "user", or "priority".
 * @param {Array} users - Array of user objects for mapping user IDs to names when grouping by user.
 * @returns {Object} An object with grouped tickets based on the specified criteria.
 */
export function groupTickets(tickets, criteria, users = []) {
    let grouped = {};

    if (criteria === "status") {
        // Predefine status groups for common statuses
        grouped = { "Todo": [], "In Progress": [], "Done": [], "Backlog": [] };
    } else if (criteria === "user") {
        // Create an empty array for each user ID and for "Unknown" tickets
        grouped = users.reduce((acc, user) => {
            if (user && user.id) acc[user.id] = [];
            return acc;
        }, {});
        grouped["Unknown"] = []; // Group for tickets without matching user IDs

        // Assign tickets to user groups based on `userId`
        tickets.forEach((ticket) => {
            if (ticket.userId && grouped.hasOwnProperty(ticket.userId)) {
                grouped[ticket.userId].push(ticket); // Assign to matching user group
            } else {
                grouped["Unknown"].push(ticket); // Assign to "Unknown" if no match found
            }
        });
    } else if (criteria === "priority") {
        // Initialize priority groups
        grouped = {
            "Urgent": [],
            "High": [],
            "Medium": [],
            "Low": [],
            "No Priority": []
        };
    }

    // Process tickets for status and priority grouping
    tickets.forEach((ticket) => {
        if (criteria === "status") {
            const status = ticket.status || "Todo"; // Default to "Todo" if no status
            const normalizedStatus =
                status.toLowerCase() === "in progress" ? "In Progress" :
                status.toLowerCase() === "backlog" ? "Backlog" :
                status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

            if (grouped[normalizedStatus]) {
                grouped[normalizedStatus].push(ticket);
            } else {
                grouped["Todo"].push(ticket); // Default to "Todo" for unrecognized statuses
            }
        } else if (criteria === "priority") {
            // Map priority level index to label; default to "No Priority" if out of bounds
            const priorityLabel = ["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority] || "No Priority";
            grouped[priorityLabel].push(ticket);
        }
    });

    return grouped;
}

/**
 * Sorts tickets within each group based on the specified criteria.
 * @param {Array} tickets - Array of ticket objects to sort.
 * @param {String} criteria - The sorting criteria: "priority" or "title".
 * @returns {Array} A sorted array of tickets based on the specified criteria.
 */
export function sortTickets(tickets, criteria) {
    return tickets.sort((a, b) => {
        if (criteria === 'priority') return b.priority - a.priority; // Higher priority first
        if (criteria === 'title') return a.title.localeCompare(b.title); // Alphabetical by title
        return 0;
    });
}
