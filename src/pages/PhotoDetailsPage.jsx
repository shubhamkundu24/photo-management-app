"use client"

import { useParams, Link } from "react-router-dom"

function PhotoDetailsPage({ photos }) {
  const { id } = useParams()
  const photo = photos.find((p) => p.id === id)

  if (!photo) {
    return (
      <section className="page">
        <h2>Photo Not Found</h2>
        <Link to="/" className="back-btn">
          ← Back to Gallery
        </Link>
        <p style={{ marginTop: "24px" }}>This photo doesn't exist or has been removed.</p>
      </section>
    )
  }

  return (
    <section className="page">
      <Link to="/" className="back-btn">
        ← Back to Gallery
      </Link>

      <div className="details-layout">
        <img src={photo.url || "/placeholder.svg"} className="details-img" alt={photo.title} />

        <div className="details-text">
          <h1>{photo.title}</h1>
          <p>{photo.description}</p>
        </div>
      </div>
    </section>
  )
}

export default PhotoDetailsPage
