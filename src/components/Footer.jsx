import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";


const Footer = () => (
  <footer className="footer footer-center bg-neutral text-neutral-content p-10">
    <aside>
      <div className="flex gap-3 justify-center items-center mb-5">
        <img src="./images/business.png" alt="EquiLaw Logo" className="size-14" />
      </div>
      <p className="mb-2 text-base md:text-lg">
        EquiLaw Ltd.
        <br />
        Providing reliable legal solutions since 2000
      </p>
      <div className="grid grid-flow-col gap-4 text-3xl">
        <a href="https://www.twitter.com/">
          <FaTwitter></FaTwitter>
        </a>
        <a href="https://www.youtube.com/">
          <FaYoutube></FaYoutube>
        </a>
        <a href="https://www.facebook.com/">
          <FaFacebook></FaFacebook>
        </a>
      </div>
    </aside>
    <nav className="text-base md:text-lg">
      <p>Copyright © 2024 - All right reserved</p>
    </nav>
  </footer>

);

export default Footer;
