import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Favorites from "./pages/Favorites";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./components/Profile";


function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Header />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/createRecipe" element={<CreateRecipe />} />
            <Route path="/register" element={<CreateRecipe />} />
            <Route path="/account" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
