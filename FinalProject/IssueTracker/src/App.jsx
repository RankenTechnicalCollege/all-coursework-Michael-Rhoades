
import './App.css'
import './index.css'

function App() {

  return (
    <>
      <header class="mb-5">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Issue Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link" href="api/users">Users</a>
                <a class="nav-link" href="api/bugs">Bugs</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main class="my-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-5 border border-2 my-3">
              <h1 class="text-center"><a href="api/users">Users</a></h1>
              <ul>
                <li><a href='api/users/68c871898f7b2252bc00318c'>Michael Rhoades</a></li>
                <li><a href='api/users/68c87adb8f7b2252bc00318e'>Firstname Lastname</a></li>
                <li><a href='api/users/68c9ad6c8f7b2252bc003190'>Real Human</a></li>
              </ul>
            </div>
            <div class="col-md-2"></div>
            <div class="col-12 col-sm-5 border border-2 my-3">
              <h1 class="text-center"><a href="api/bugs">Bugs</a></h1>
              <ul>
                <li><a href='api/bugs/68c8764e8f7b2252bc00318d'>Crash on Startup</a></li>
                <li><a href='api/bugs/68c87d3a8f7b2252bc00318f'>Logic Error</a></li>
                <li><a href='api/bugs/68c9ae018f7b2252bc003191'>Not Loading</a></li>
              </ul>
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
