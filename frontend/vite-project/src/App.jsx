// Path: frontend\vite-project\src\App.jsx
import { useState, useEffect } from "react";
// Import prebuilt components and the useAuth hook from Clerk React SDK
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useAuth 
} from "@clerk/clerk-react";

function App() {
  // 1. Destructure the getToken helper and isSignedIn flag from Clerk
  const { getToken, isSignedIn } = useAuth();
  
  // 2. React state to store the user profile information loaded from the backend
  const [profile, setProfile] = useState(null);

  // 3. useEffect hook that runs when the component mounts or when isSignedIn/getToken changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      // If the user is logged in, fetch their details from the backend API
      if (isSignedIn) {
        try {
          // A. Fetch the unique session JWT token from Clerk show user's authenticity ( which google already has! so getToken from google if the user also has been signedIn in google , so we don't have to add him/her)
          const token = await getToken();
          
          // B. Call the backend's /me route
          const response = await fetch("http://localhost:7000/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // We pass the JWT token in the Authorization header to authenticate
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // C. Save the backend profile details (name and userId) to state
            setProfile(data);
          } else {
            console.error("Failed to load user profile from backend.");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        // If the user logs out, clear the profile state
        setProfile(null);
      }
    };

    fetchUserProfile();
  }, [isSignedIn, getToken]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f3f4f6",
      color: "#1f2937",
      padding: "20px"
    }}>
      {/* 4. Banner text indicating Clerk is used for authentication */}
      <h1 style={{ textAlign: "center", color: "#4f46e5", marginBottom: "30px" }}>
        Used clerk as 3rd party Authentication :)
      </h1>

      {/* 5. Shown only when the user is NOT signed in */}
      <SignedOut>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <p style={{ fontSize: "18px", marginBottom: "24px" }}>
            Welcome! Please sign in or sign up to see your dashboard profile details.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            {/* Clerk's prebuilt component that wraps a button to trigger the sign in modal */}
            <SignInButton mode="modal">
              <button style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#ffffff",
                backgroundColor: "#4f46e5",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}>
                Sign In
              </button>
            </SignInButton>

            {/* Clerk's prebuilt component that wraps a button to trigger the sign up modal */}
            <SignUpButton mode="modal">
              <button style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#4f46e5",
                backgroundColor: "#ffffff",
                border: "2px solid #4f46e5",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}>
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      {/* 6. Shown only when the user IS signed in */}
      <SignedIn>
        <div style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "450px",
          width: "100%"
        }}>
          <h2 style={{ color: "#10b981", margin: "0 0 20px 0" }}>Dashboard</h2>
          
          {/* Show the profile data if it has successfully loaded from backend */}
          {profile ? (
            <div style={{ margin: "20px 0", fontSize: "18px", lineHeight: "1.6" }}>
              <p>Welcome back, <strong>{profile.name}</strong>!</p>
              <p style={{ fontSize: "14px", color: "#6b7280" }}>
                <strong>User ID (from backend):</strong> {profile.userId}
              </p>
            </div>
          ) : (
            <p>Loading profile from backend...</p>
          )}

          {/* Clerk's user profile button which also allows signing out */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <UserButton showName={true} />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;






