import logo from "../assest/logo.png";

function Home() {
  return (
    <div>
      <div className="masterhome">
        <div className="thome">
          <div className="title home">
            <h1>Home</h1>
          </div>
          <div className="phome">
            <p>Master Your Journey, Craft Your Tour</p>
          </div>
        </div>
        <div className="imghome">
          <img
            className="biglogo"
            src={logo}
            alt="logo"
            style={{ width: "500px", height: "auto" }}
          ></img>
        </div>
      </div>
      <footer>ChriSiebels</footer>
    </div>
  );
}

export default Home;
