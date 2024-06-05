document.getElementById("connect-strava").addEventListener("click", () => {
    window.location.href = "/api/auth/connect";
});

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        showUserInfo(token);
    } else {
        showLogin();
    }
});

async function showUserInfo(token) {
    try {
        const response = await fetch("/api/account/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = await response.json();
        if (response.ok) {
            document.getElementById("user-info").innerHTML = `
                <p>Connected to Strava as: ${user.displayName}</p>
                <button onclick="disconnectStrava()">Disconnect from Strava</button>
            `;
        } else {
            showLogin();
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
        showLogin();
    }
}

function showLogin() {
    document.getElementById("user-info").innerHTML = `
        <a href="/api/auth/connect">Connect to Strava</a>
    `;
}
