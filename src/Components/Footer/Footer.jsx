export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* Quick Links Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-dark text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-dark text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a
                href="https://www.facebook.com/DOMZ.2001"
                className="text-primary fs-5 text-decoration-none"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/adham-galal-a46384254/"
                className="text-primary fs-5"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/adham025"
                className="text-dark fs-5"
                aria-label="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>

            </div>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary mb-3">Newsletter</h5>
            <form className="d-flex gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} Adham Galal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}