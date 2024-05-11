import axios from "axios";
import { useEffect, useState } from "react";

interface AppType {
  id: number;
  name: string;
  image: string;
}

const App = () => {
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [user, setUser] = useState<AppType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://api-v2.elchocrud.pro/api/v1/9079067ed2f267cd61f5d3de64cfbffa/product`
      );
      setUser(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async () => {
    try {
      if (value === "") {
        alert("Toltuuur ");
      } else {
        const { data } = await axios.post(
          `https://api-v2.elchocrud.pro/api/v1/9079067ed2f267cd61f5d3de64cfbffa/product`,
          {
            name: value,
            image: photo,
          }
        );
        setUser(data);
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    } 
  };

  console.log(user, "user");

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="">
        <button onClick={postData}>Add</button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="text"
          value={photo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoto(e.target.value)
          }
        />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="user">
            {user.map((el) => (
              <div key={el.id} className="">
                <h1>{el.name}</h1>
                <img src={el.image} alt="img" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
