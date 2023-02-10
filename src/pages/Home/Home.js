import instIcon from "../../images/icon.insta.svg";
import TwitterIcon from "../../images/icon-twitter.svg";
import Illustration from "../../images/illustration-home.svg";
import ReactPlayer from 'react-player/youtube';

export const Home = () => {
  return (
    <div className="bg-offWhite py-24 md:py-44">
      <div className="text-xl container mx-auto flex-col-reverse md:flex-row flex items-center justify-between">
        <div className="slideLeft w-full md:w-1/2 flex-col items-center space-y-4 text-center md:text-left">
          <h2>We are Coming Soon!</h2>
          <p>
            Our Website is under construction, feel free to explore!
            <br />
            Follow us and be the first to know when we go live!
          </p>
          <div className="flex w-full items-center justify-center md:justify-start space-x-4">
            <a
              href="https://www.instagram.com/_the__monkeys_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instIcon} className="w-14" alt="Insta-logo"></img>
            </a>
            <a
              href="https://twitter.com/themonkeyslife"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={TwitterIcon} className="w-12" alt="Twitter-logo"></img>
            </a>
          </div>
        </div>
        <div className="w-1/2 mb-4 md:mb-0 md:w-1/3">
          {/* <img src={Illustration} className="slide" alt="img" /> */}
          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        </div>
      </div>
    </div>
  );
};
