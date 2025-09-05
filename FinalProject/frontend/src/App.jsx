
import './App.css'

function App() {

  return (
    <>
      <header class="mb-5">
        <nav class="navbar navbar-expand bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">My Issue Tracker</a>
            <div id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="api/user/list">Users</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="api/bug/list">Bugs</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main class="my-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-5 border border-2 my-3">
              <h1 class="text-center"><a href="api/user/list">Users</a></h1>
              <ul>
                <li><a href='api/user/1'>Michael Rhoades</a></li>
                <li><a href='api/user/2'>Firstname Lastname</a></li>
                <li><a href='api/user/3'>Real Human</a></li>
              </ul>
            </div>
            <div class="col-md-2"></div>
            <div class="col-12 col-sm-5 border border-2 my-3">
              <h1 class="text-center"><a href="api/bug/list">Bugs</a></h1>
              <ul>
                <li><a href='api/bug/1'>Crash on Startup</a></li>
                <li><a href='api/bug/2'>Logic Error</a></li>
                <li><a href='api/bug/3'>Not Loading</a></li>
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
