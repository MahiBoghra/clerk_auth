// Path: frontend\vite-project\src\App.jsx
import { SignIn } from "@clerk/clerk-react";
import {useAuth} from "@clerk/clerk-react";

//comments are for knowing internals



function App() {
    const { getToken} = useAuth();


  
// const handleClick = async () => {
//   const token = await getToken();
//   await fetch("http://localhost:7000/me", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

  return (
  
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <SignIn />
      {/* <button onClick={handleClick}>Get Token</button> */}
    </div>
  );
}




export default App


