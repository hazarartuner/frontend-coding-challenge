import loaderImage from "../../../assets/images/loader.svg";
import "./_loader.scss";

const Loader = () => {
  return <div className="loader" style={{ backgroundImage: `url(${loaderImage})` }} />;
}

export default Loader;
