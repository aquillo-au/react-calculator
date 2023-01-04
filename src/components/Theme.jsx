import "./Theme.css";

const Theme = ({value, themeClick}) => {
  return <button className="mini-button" onClick={themeClick}>{value} </button>;
};

export default Theme;
