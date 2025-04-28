import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className={'navbar navbar-expand-sm navbar-dark bg-dark'}>
      <div className={'container-fluid'}>
        <Link className="navbar-brand" to="/">MyBlog</Link>

        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
          <li className="nav-item">
            <Link className="nav-link" to="/test1">test1</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/test2">test2</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/test2/test3">test3</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/test4">test4</Link>
          </li>
        </ul>

        <div className={'ms-auto'}>
          <button className={'btn btn-success'}>
            <Link className="nav-link " to="/login">Login</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;