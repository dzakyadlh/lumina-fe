import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-700 mt-10 pb-5 px-5">
      <div className="mx-auto w-full max-w-screen-xl py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img
                src="/images/lumina.png"
                className="h-8 me-3"
                alt="Lumina Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Lumina
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Explore
              </h2>
              <ul className=" text-subtitle font-medium">
                <li className="mb-4">
                  <a href="#now-showing" className="hover:text-yellow-200">
                    Now Showing
                  </a>
                </li>
                <li>
                  <a href="#coming-soon" className="hover:text-yellow-200">
                    Coming Soon
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Community
              </h2>
              <ul className="text-subtitle font-medium">
                <li className="mb-4">
                  <a href="#reviews" className="hover:text-yellow-200">
                    User Reviews
                  </a>
                </li>
                <li>
                  <a href="#forums" className="hover:text-yellow-200">
                    Forums
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Legal
              </h2>
              <ul className="text-subtitle font-medium">
                <li className="mb-4">
                  <a href="#privacy-policy" className="hover:text-yellow-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-yellow-200">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6  sm:mx-auto border-neutral-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm  sm:text-center text-subtitle">
            © 2024{' '}
            <a href="#" className="hover:text-yellow-200">
              Lumina
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#facebook"
              className="flex items-center text-gray-500 hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#twitter"
              className="flex items-center text-gray-500 hover:text-white ms-5"
            >
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#instagram"
              className="flex items-center text-gray-500 hover:text-white ms-5"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-500 hover:text-white ms-5"
            >
              <FontAwesomeIcon icon={faDiscord} className="w-4 h-4" />
              <span className="sr-only">Discord community</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
