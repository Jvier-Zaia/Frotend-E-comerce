import "../styles/components/Footer.css"

const Footer = () => {
  return (
    <footer className="custom-footer bg-custom py-4 mt-auto border-top shadow-sm">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="Text text-center">
              <p className="mb-0 fs-6 fw-medium">
              Sitio desarrollado por=
                  <a 
                  href="https://github.com/Jvier-Zaia" 
                  target="_blank" 
                  className="custom-link text-decoration-none fw-bold ms-2 position-relative d-inline-block"
                >
                   Javier Zaia
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }