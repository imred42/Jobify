import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    console.error("Failed to load user data:", error);
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(
    isDarkThemeEnabled || checkDefaultTheme()
  );

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
    } else {
      navigate("/login"); // Redirect to login if no user data
    }
    setIsLoading(false);
  }, [data, navigate]);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar showSidebar={showSidebar} />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
