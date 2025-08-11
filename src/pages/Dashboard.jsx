import { useState } from "react"
import { Layout } from "../components/Layout"


const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const productData = {
      id: editingProduct ? editingProduct.id : crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      image: image || "https://via.placeholder.com/200x200?text=Sin+Imagen",
      category: ""
    }

    if (editingProduct) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? productData : p
      )
      setProducts(updatedProducts)
      setEditingProduct(null)
    } else {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      })
      
      const data = await response.json()
      setProducts(prev => [...prev, { ...productData, id: data.id || productData.id }])
    }

    setName("")
    setPrice("")
    setDescription("")
    setImage("")
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setName(product.title)
    setPrice(product.price)
    setDescription(product.description)
    setImage(product.image)
  }

  const handleDelete = (productId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(prev => prev.filter(p => p.id !== productId))
    }
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setName("")
    setPrice("")
    setDescription("")
    setImage("")
    setError(null)
  }

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    form: {
      background: 'linear-gradient(135deg, #4a9999 0%, #5a8a6b 100%)',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '30px',
      border: '1px solid #3a7a7a',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
    },
    formTitle: {
      color: 'white',
      marginBottom: '20px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '2px solid #5a8a6b',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'rgba(255,255,255,0.95)',
      transition: 'border-color 0.3s ease'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '2px solid #5a8a6b',
      borderRadius: '6px',
      fontSize: '14px',
      resize: 'vertical',
      backgroundColor: 'rgba(255,255,255,0.95)',
      transition: 'border-color 0.3s ease'
    },
    button: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #2d7a7a 0%, #3d6a4d 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginRight: '10px',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    },
    buttonWarning: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #b8860b 0%, #9a7c0a 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginRight: '10px',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    },
    buttonSecondary: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    },
    error: {
      color: '#721c24',
      background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
      border: '2px solid #f5c6cb',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '15px',
      fontWeight: 'bold'
    },
    productsSection: {
      background: 'linear-gradient(135deg, #4a9999 0%, #5a8a6b 100%)',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
    },
    productsTitle: {
      color: 'white',
      marginBottom: '20px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    productCard: {
      border: '2px solid #3a7a7a',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    productContent: {
      padding: '20px'
    },
    productTitle: {
      margin: '0 0 10px 0',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2d3e50'
    },
    productPrice: {
      background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0 0 10px 0',
      padding: '5px 10px',
      borderRadius: '15px',
      display: 'inline-block',
      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
    },
    productDescription: {
      margin: '0 0 15px 0',
      color: '#566573',
      lineHeight: '1.4'
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px'
    },
    buttonEdit: {
      padding: '8px 16px',
      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    },
    buttonDelete: {
      padding: '8px 16px',
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease'
    }
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1>Panel de Administración</h1>
        
        <section>
          <div style={styles.form}>
            <h2 style={styles.formTitle}>{editingProduct ? "Editar producto" : "Cargar nuevo producto"}</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nombre del producto:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  style={styles.input}
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Precio:</label>
                <input 
                  type="number" 
                  name="precio" 
                  style={styles.input}
                  onChange={(e) => setPrice(e.target.value)} 
                  value={price} 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Descripción:</label>
                <textarea 
                  name="descripcion" 
                  rows="4" 
                  style={styles.textarea}
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description} 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Imagen (URL):</label>
                <input 
                  type="url" 
                  name="imagen" 
                  style={styles.input}
                  onChange={(e) => setImage(e.target.value)} 
                  value={image}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <div>
                <button 
                  type="submit" 
                  style={editingProduct ? styles.buttonWarning : styles.button}
                >
                  {editingProduct ? "Actualizar producto" : "Guardar producto"}
                </button>
                
                {editingProduct && (
                  <button 
                    type="button" 
                    style={styles.buttonSecondary} 
                    onClick={cancelEdit}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista de productos */}
          {products.length > 0 && (
            <div style={styles.productsSection}>
              <h3 style={styles.productsTitle}>Productos registrados:</h3>
              <div style={styles.productsGrid}>
                {products.map((product) => (
                  <div key={product.id} style={styles.productCard}>
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.title}
                        style={styles.productImage}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen"
                        }}
                      />
                    )}
                    <div style={styles.productContent}>
                      <h4 style={styles.productTitle}>{product.title}</h4>
                      <p style={styles.productPrice}>${product.price}</p>
                      <p style={styles.productDescription}>{product.description}</p>
                      <div style={styles.buttonGroup}>
                        <button 
                          style={styles.buttonEdit}
                          onClick={() => handleEdit(product)}
                        >
                          Editar
                        </button>
                        <button 
                          style={styles.buttonDelete}
                          onClick={() => handleDelete(product.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export { Dashboard }