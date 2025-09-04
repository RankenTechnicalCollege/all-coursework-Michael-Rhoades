
import './App.css'

function App() {

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">My Issue Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#">Users</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Bugs</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div class="container">
          <div class="row">
            <div class="col-5 border border-2">
              <h1 class="text-center">Users</h1>
              <ul>
                <li><a href='#'>Michael Rhoades</a></li>
                <li><a href='#'>Firstname Lastname</a></li>
                <li><a href='#'>Real Human</a></li>
              </ul>
            </div>
            <div class="col-2"></div>
            <div class="col-5 border border-2">
              <h1 class="text-center">Bugs</h1>
              <ul>
                <li><a href='#'>Crash on Startup</a></li>
                <li><a href='#'>Logic Error</a></li>
                <li><a href='#'>Not Loading</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div class="container mt-5">
          <div class="row bg-dark text-white">
            <div class="col text-center">
              <p>&copy;2025 Michael Rhoades</p>
            </div>
          </div>
        </div>
      </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </>
  )
}

export default App
