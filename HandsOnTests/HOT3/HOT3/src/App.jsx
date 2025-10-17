import './App.css'
import './index.css'

function App() {

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Not a Front</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="api/products">Products</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Nothing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-6 my-3">
              <div class="card text-center">
                <div class="card-header">
                  <h2><a href="api/products/name/apple">Apple</a></h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Fresh Red Apple</h5>
                  <p class="card-text">$1.00 each</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 my-3">
              <div class="card text-center">
                <div class="card-header">
                  <h2><a href="api/products/name/bananas">Bananas</a></h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title">A bunch of 4-8 bananas</h5>
                  <p class="card-text">$4.00 a bundle</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 my-3">
              <div class="card text-center">
                <div class="card-header">
                  <h2><a href="api/products/name/potato">Potatoes</a></h2>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Another filler item</h5>
                  <p class="card-text">$2.00 each</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div class="text-center bg-dark text-white py-3">
          <p>&copy;2025 Michael Rhoades</p>
        </div>
      </footer>
    </>
  )
}

export default App
