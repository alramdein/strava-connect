window.onload = function () {
    // Fetch and display activities
    fetchActivities();

    // Add event listener to back button
    document
        .getElementById("back-button")
        .addEventListener("click", function () {
            window.history.back();
        });
};

async function fetchActivities() {
    // Fetch activities from server
    try {
        const response = await fetch("/api/activities");
        if (!response.ok) {
            throw new Error("Failed to fetch activities");
        }
        const activities = await response.json();

        // Display activities in activities-container
        const activitiesContainer = document.getElementById(
            "activities-container"
        );
        activities.forEach((activity) => {
            const activityElement = document.createElement("div");
            activityElement.classList.add("activity");
            activityElement.innerHTML = `
                    <p><strong>Name:</strong> ${activity.name}</p>
                    <p><strong>Type:</strong> ${activity.type}</p>
                    <p><strong>Start Date:</strong> ${new Date(
                        activity.startDate
                    ).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                    })}</p>
                    <!-- Add other details as needed -->
                `;
            activitiesContainer.appendChild(activityElement);
        });
    } catch (error) {
        console.error("Error fetching activities:", error);
        // Handle error
    }
}
