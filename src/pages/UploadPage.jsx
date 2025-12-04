"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function UploadPage({ onAddPhoto }) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    if (!file) return setError("Please select a photo.")
    if (!title.trim()) return setError("Title is required.")

    setError("")
    setLoading(true)

    // ---- Cloudinary Config ----
    const cloudName = "draspoorw"
    const uploadPreset = "unsigned_preset"

    // FormData for Cloudinary Upload
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadPreset)
    formData.append("folder", "react-app")

    try {
      // ---- Cloudinary REST API Upload ----
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!data.secure_url) {
        setError("Cloudinary upload failed. Please try again.")
        setLoading(false)
        return
      }

      const newPhoto = {
        id: Date.now().toString(),
        title: title.trim(),
        description: desc.trim(),
        url: data.secure_url,
      }

      onAddPhoto(newPhoto)
      setLoading(false)
      navigate("/")
    } catch (err) {
      console.error(err)
      setError("Upload error. Try again.")
      setLoading(false)
    }
  }

  return (
    <section className="page">
      <h1>Upload a New Photo</h1>

      <form className="upload-form" onSubmit={submit}>
        <label htmlFor="file-input">Photo File</label>
        <input id="file-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />

        <label htmlFor="title-input">Title</label>
        <input
          id="title-input"
          type="text"
          placeholder="Enter photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="desc-input">Description</label>
        <textarea
          id="desc-input"
          placeholder="Add a beautiful description for your photo"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows="4"
        />

        {error && <p>{error}</p>}

        <button disabled={loading}>{loading ? "Uploading..." : "Upload Photo"}</button>
      </form>
    </section>
  )
}

export default UploadPage
