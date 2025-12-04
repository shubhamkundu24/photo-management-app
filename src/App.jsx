"use client"

import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import UploadPage from "./pages/UploadPage.jsx"
import GalleryPage from "./pages/GalleryPage.jsx"
import PhotoDetailsPage from "./pages/PhotoDetailsPage.jsx"

function App() {
  const [photos, setPhotos] = useState([])

  const handleAddPhoto = (newPhoto) => {
    setPhotos((prev) => [...prev, newPhoto])
  }

  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="logo">
          ✨ PhotoStudio
        </Link>
        <nav>
          <Link to="/">Gallery</Link>
          <Link to="/upload">Upload</Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<GalleryPage photos={photos} />} />
          <Route path="/upload" element={<UploadPage onAddPhoto={handleAddPhoto} />} />
          <Route path="/photos/:id" element={<PhotoDetailsPage photos={photos} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
