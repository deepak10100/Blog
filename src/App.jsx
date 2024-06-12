import Home from "./components/Home"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogview from "./components/Blogview";
import Update from "./components/Update";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:id" element={<Blogview/>} />
        <Route path="/editblog/:id" element={<Update/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </>
  )
}

export default App
