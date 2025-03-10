import React from "react";

export default function Contact() {
  return (
    <>
      <div className="container mt-5">
        <div className="text-center bg-light py-5 mb-4 rounded">
          <h1 className="display-4">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you! Reach out for any inquiries or feedback.
          </p>
        </div>
        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Send Us a Message</h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Enter your message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Contact Info and Map */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Our Location</h2>
                <iframe
                  className="w-100"
                  height={300}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.229021728936!2d29.9027724!3d31.1922465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c394ebd03ec1:0x16cbff5d844ff34b!2sInformation+Technology+Institute!5e0!3m2!1sen!2sus!4v1622549402996!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                />

                <h3 className="h5">Contact Information</h3>
                <ul className="list-group">
                  <li className="list-group-item">
                    <i className="bi bi-envelope-fill me-2"></i>
                    <a
                      href="mailto:adhamgalal70@gmail.com"
                      className="text-decoration-none"
                    >
                      Email
                    </a>
                  </li>

                  <li className="list-group-item">
                    <i className="bi bi-phone-fill me-2"></i>
                    <a
                      href="https://www.linkedin.com/in/adham-galal-a46384254/"
                      className="text-decoration-none"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
