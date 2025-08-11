import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { Link } from 'react-router-dom';

import "../styles/pages/Home.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategory, setSearchCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const [showPopup, setShowPopup] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
    setFilteredProducts(data)
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  // Obtener categorías únicas
  const getUniqueCategories = () => {
    const categories = [...new Set(products.map(product => product.category))]
    return categories
  }

  // Efecto para filtrar y ordenar productos
  useEffect(() => {
    let filtered = products

    // Filtrar por término de búsqueda
    if (searchTerm !== "") {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por categoría
    if (searchCategory !== "all") {
      filtered = filtered.filter(product => product.category === searchCategory)
    }

    // Ordenar productos
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // Mantener orden original
        break
    }

    setFilteredProducts(filtered)
  }, [searchTerm, searchCategory, sortBy, products])

  const handleConfirmDelete = (product) => {
    setProductToDelete(product)
    setShowConfirmDelete(true)
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    const response = await fetch(`https://fakestoreapi.com/products/${productToDelete.id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id !== productToDelete.id))
      setShowConfirmDelete(false)
      setProductToDelete(null)
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  const handleCloseEdit = () => {
    setShowPopup(false)
    setProductToEdit(null)
    setTitleEdit("")
    setPriceEdit("")
    setDescriptionEdit("")
    setCategoryEdit("")
    setImageEdit("")
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? { ...updatedProduct }
              : product
          ))
        handleCloseEdit()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSearchCategory("all")
    setSortBy("default")
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSearchCategory("all")
    setSortBy("default")
  }

  return (
    <Layout>
      <div className="home-wrapper">
        <div className="home-container">
          
          {/* Sección Hero Compacta */}
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Nuestra Tienda</h1>
              <p className="hero-subtitle">Productos de calidad al mejor precio</p>
            </div>
          </section>

          {/* Sección de características - Solo para usuarios no autenticados */}
         
            <section className="features-section">
              <div className="features-container">
                <h2 className="features-title">¿Por qué elegirnos?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-shipping-fast"></i>
                    </div>
                    <h3 className="feature-card-title">Envíos rápidos</h3>
                    <p className="feature-description">Recibí tu compra en tu casa.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <h3 className="feature-card-title">Pagos seguros</h3>
                    <p className="feature-description">Plataformas que garantizan seguridad.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h3 className="feature-card-title">Atención 24/7</h3>
                    <p className="feature-description">Estamos disponibles siempre.</p>
                    <div className="about-link">
                      <Link to="/about-us" className="about-us-link">
                        <span className="about-us-title">Sobre nosotros</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          

          {/* Sección Principal de Productos */}
          <main className="main-content">
            
            {/* Header de Productos */}
            <div className="products-header">
              <h2 className="products-title">Productos</h2>
              <p className="products-subtitle">Encuentra lo que necesitas</p>
            </div>

            {/* Buscador Centrado y Compacto */}
            <div className="search-section">
              <div className="search-container">
                
                {/* Buscador principal */}
                <div className="search-main">
                  <div className="search-input-wrapper">
                    <div className="search-icon">
                      <i className="fas fa-search"></i>
                    </div>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button 
                        className="clear-search-btn"
                        onClick={() => setSearchTerm("")}
                        type="button"
                        title="Limpiar búsqueda"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Filtros compactos */}
                <div className="search-filters">
                  <div className="filter-row">
                    {/* Filtro por categoría */}
                    <div className="filter-item">
                      <select 
                        className="filter-select"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                      >
                        <option value="all">Todas</option>
                        {getUniqueCategories().map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ordenar por */}
                    <div className="filter-item">
                      <select 
                        className="filter-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="default">Ordenar</option>
                        <option value="name-asc">A-Z</option>
                        <option value="name-desc">Z-A</option>
                        <option value="price-asc">$ Menor</option>
                        <option value="price-desc">$ Mayor</option>
                      </select>
                    </div>

                    {/* Botón limpiar filtros */}
                    {(searchTerm || searchCategory !== "all" || sortBy !== "default") && (
                      <button 
                        className="clear-all-btn"
                        onClick={clearAllFilters}
                        type="button"
                      >
                        <i className="fas fa-times"></i>
                        Limpiar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags de filtros activos compactos */}
            {(searchTerm || searchCategory !== "all" || sortBy !== "default") && (
              <div className="active-filters-section">
                <div className="results-info">
                  <span className="results-count">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="active-filters">
                  {searchTerm && (
                    <span className="filter-tag">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm("")} className="remove-filter">×</button>
                    </span>
                  )}
                  {searchCategory !== "all" && (
                    <span className="filter-tag">
                      {searchCategory}
                      <button onClick={() => setSearchCategory("all")} className="remove-filter">×</button>
                    </span>
                  )}
                  {sortBy !== "default" && (
                    <span className="filter-tag">
                      {sortBy === "price-asc" && "$ ↑"}
                      {sortBy === "price-desc" && "$ ↓"}
                      {sortBy === "name-asc" && "A-Z"}
                      {sortBy === "name-desc" && "Z-A"}
                      <button onClick={() => setSortBy("default")} className="remove-filter">×</button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Grid de Productos Compacto */}
            <div className="products-grid-container">
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="product-image"
                      />
                      <div className="product-badge">
                        <span className="category-tag">{product.category}</span>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">
                        {product.title.length > 40 ? product.title.substring(0, 40) + '...' : product.title}
                      </h3>
                      <p className="product-description">
                        {product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description}
                      </p>
                      <div className="product-price">
                        <span className="price">${product.price}</span>
                      </div>
                      
                      <div className="product-actions">
                        {user ? (
                          <div className="admin-actions">
                            <button 
                              className="btn-edit"
                              onClick={() => handleOpenEdit(product)}
                              title="Editar producto"
                              placeholder="Editar"
                            >Editar
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => handleConfirmDelete(product)}
                              title="Eliminar producto"
                              placeholder="Eliminar"
                            >Eliminar
                              <i className="fas fa-trash"></i>   
                            </button>
                          </div>
                        ) : (
                          <button className="btn-cart">
                            <i className="fas fa-cart-plus"></i>
                            Agregar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mensaje sin resultados */}
            {filteredProducts.length === 0 && (searchTerm || searchCategory !== "all") && (
              <div className="no-results">
                <div className="no-results-content">
                  <div className="no-results-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3 className="no-results-title">Sin resultados</h3>
                  <p className="no-results-text">
                    No encontramos productos con estos criterios
                  </p>
                  <button 
                    className="btn-reset"
                    onClick={clearAllFilters}
                  >
                    Ver todos
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Popup de Edición */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-container">
              <div className="popup-header">
                <h3 className="popup-title">Editar Producto</h3>
                <button 
                  className="popup-close"
                  onClick={handleCloseEdit}
                  type="button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="popup-form">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    id="title"
                    className="form-input"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">Precio</label>
                  <input
                    type="number"
                    id="price"
                    className="form-input"
                    value={priceEdit}
                    onChange={(e) => setPriceEdit(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">Categoría</label>
                  <select
                    id="category"
                    className="form-select"
                    value={categoryEdit}
                    onChange={(e) => setCategoryEdit(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {getUniqueCategories().map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="image" className="form-label">URL de Imagen</label>
                  <input
                    type="url"
                    id="image"
                    className="form-input"
                    value={imageEdit}
                    onChange={(e) => setImageEdit(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    id="description"
                    className="form-textarea"
                    value={descriptionEdit}
                    onChange={(e) => setDescriptionEdit(e.target.value)}
                    rows="4"
                    required
                  />
                </div>

                <div className="popup-actions">
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={handleCloseEdit}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-save"
                  >
                    <i className="fas fa-save"></i>
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Popup de Confirmación de Eliminación */}
        {showConfirmDelete && (
          <div className="popup-overlay">
            <div className="popup-container popup-confirm">
              <div className="popup-header">
                <h3 className="popup-title">Confirmar Eliminación</h3>
                <button 
                  className="popup-close"
                  onClick={() => setShowConfirmDelete(false)}
                  type="button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="popup-content">
                <div className="confirm-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <p className="confirm-message">
                  ¿Estás seguro de que deseas eliminar este producto?
                </p>
                <p className="confirm-product">
                  <strong>{productToDelete?.title}</strong>
                </p>
              </div>

              <div className="popup-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowConfirmDelete(false)}
                  placeholder="Cancelar"
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn-delete-confirm"
                  onClick={handleDelete}
                  placeholder="Eliminar"
                >
                  <i className="fas fa-trash"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export { Home }