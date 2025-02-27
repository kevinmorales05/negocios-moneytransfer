import "./Loader.css";

interface LoaderProps {
  color?: string;
  size?: string;
}

const Loader = ({ color, size }: LoaderProps) => {
  return (
    <div className="loader" style={{ borderTopColor: color, width: size, height: size }}></div>
  );
};

export default Loader;
