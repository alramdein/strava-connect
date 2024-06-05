document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
        localStorage.setItem("token", token);
        fetchUserInfo(token);
    } else {
        alert("No token found. Please log in again.");
        window.location.href = "/";
    }

    document
        .getElementById("disconnect-strava")
        .addEventListener("click", disconnectStrava);
});

async function fetchUserInfo(token) {
    try {
        const response = await fetch("/api/accounts/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = await response.json();
        if (response.ok) {
            document.getElementById("user-info").innerHTML = `
                <p> ${user.name}</p>
                <p><a href="https://www.strava.com/athletes/${user.stravaId}" target="_blank">View Strava Profile</a></p>
            `;
        } else {
            alert("Failed to fetch user info");
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Error fetching user info");
        window.location.href = "/";
    }
}

async function disconnectStrava() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/auth/disconnect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        alert(result.message);

        // Clear the token from localStorage
        localStorage.removeItem("token");
        window.location.href = "/";
    } catch (error) {
        console.error("Error disconnecting Strava:", error);
        alert("Error disconnecting Strava");
    }
}

// Fetch activities from the server
async function fetchActivities() {
    try {
        const response = await fetch("/api/activities"); // Assuming this endpoint exists
        if (!response.ok) {
            throw new Error("Failed to fetch activities");
        }
        const activities = await response.json();
        return activities;
    } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
    }
}

// Function to display activities in the UI
async function displayActivities() {
    const activitiesContainer = document.getElementById("activities-container");
    const activities = await fetchActivities();

    // Clear previous content
    activitiesContainer.innerHTML = "";

    if (activities.length === 0) {
        activitiesContainer.innerHTML = "<p>No activities found.</p>";
    } else {
        activities.forEach((activity) => {
            const activityElement = document.createElement("div");
            activityElement.classList.add("activity");

            const nameElement = document.createElement("h2");
            nameElement.textContent = activity.name;

            const typeElement = document.createElement("p");
            typeElement.textContent = `Type: ${activity.type}`;

            const startDateElement = document.createElement("p");
            date = new Date(activity.startDate);
            startDateElement.textContent = `Start Date: ${date.toLocaleString(
                "en-US",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                }
            )}`;

            const distanceElement = document.createElement("p");
            distanceElement.textContent = `Distance: ${activity.distance} meters`;

            activityElement.appendChild(nameElement);
            activityElement.appendChild(typeElement);
            activityElement.appendChild(startDateElement);
            activityElement.appendChild(distanceElement);

            activitiesContainer.appendChild(activityElement);
        });
    }
}

// document
//     .getElementById("show-activities")
//     .addEventListener("click", displayActivities);

// const showHideActivitiesBtn = document.getElementById("show-activities");
// const activitiesContainer = document.getElementById("activities-container");

// showHideActivitiesBtn.addEventListener("click", () => {
//     if (activitiesContainer.style.display === "none") {
//         // Show activities
//         activitiesContainer.style.display = "block";
//         showHideActivitiesBtn.textContent = "Hide Last Activity";
//     } else {
//         // Hide activities
//         activitiesContainer.style.display = "none";
//         showHideActivitiesBtn.textContent = "Show Last Activities";
//     }
// });

document
    .getElementById("show-activities")
    .addEventListener("click", function () {
        window.location.href = "activities.html";
    });
