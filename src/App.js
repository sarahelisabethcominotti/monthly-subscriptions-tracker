import "./App.css";
import React, { useEffect, useState } from "react";
import Main from "./components/Main.js";
import Navigation from "./components/Navigation.js";
import { SubscriptionProvider } from "./SubscriptionContext.js";
// import Subscriptions from "./components/Subscriptions.js";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const [authConfig, setAuthConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Auth0 configuration on mount
    fetch("/api/secure")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Auth0 configuration");
        }
        return response.json();
      })
      .then((config) => {
        setAuthConfig(config);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load Auth0 configuration");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <SubscriptionProvider>
        <div className="App">
          <Navigation />
          <Main />
        </div>
      </SubscriptionProvider>
    </Auth0Provider>
  );
}

export default App;
