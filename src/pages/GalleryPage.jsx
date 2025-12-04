import { Link } from "react-router-dom"

function GalleryPage({ photos }) {
  return (
    <section className="page">
      <h1>Photo Gallery</h1>

      {photos.length === 0 && (
        <p style={{ fontSize: "1.15rem", marginTop: "16px" }}>
          No photos uploaded yet. Start by uploading your first masterpiece! ✨
        </p>
      )}

      <div className="gallery-grid">
        {photos.map((p) => (
          <Link to={`/photos/${p.id}`} key={p.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="photo-card">
              <img src={p.url || "/placeholder.svg"} className="thumb" alt={p.title} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default GalleryPage
