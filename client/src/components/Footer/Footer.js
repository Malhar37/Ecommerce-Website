import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div>
      <footer id="footer">
        <div className="top">
          <div className="container">
            <div className="row">
              <div style={{ textAlign: "center" }} className="col-12">
                <h3>About Mobile Store</h3>
                <p>A place where you will get every mobile phone</p>
                <div className="social-links">
                  <a
                    target="blank"
                    href="https://twitter.com/Malhar37"
                    class="twitter"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://www.facebook.com/Malhar.037/"
                    class="facebook"
                  >
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://www.instagram.com/malhar.19/"
                    class="instagram"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://www.linkedin.com/in/malhar37/"
                    class="linkedin"
                  >
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a
                    target="blank"
                    href="https://github.com/Malhar37/"
                    class="github"
                  >
                    <i class="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div>Copyright © {new Date().getFullYear()} Mobile Store</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
