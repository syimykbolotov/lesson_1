import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const error = () => {
    toast.error("🦄 You must write something!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const success = () => {
    toast.success("🦄 Product is  added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://api-v2.elchocrud.pro/api/v1/4215f307702be4f1d33334cb09af3f26/tesla`
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
      if (value === "" || photo === "") {
        error();
      } else {
        const { data } = await axios.post(
          `https://api-v2.elchocrud.pro/api/v1/4215f307702be4f1d33334cb09af3f26/tesla`,
          {
            name: value,
            image: photo,
          }
        );
        setUser(data);
        console.log(data);
        setValue("")
        setPhoto("")
        success()
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
    <div className="container all">
      <div className="add">
        <input
          type="text"
          value={value}
          placeholder="Name"
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="text"
          value={photo}
          placeholder="URL..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoto(e.target.value)
          }
        />
        <button onClick={postData}>Add</button>
      </div>
      {isLoading ? (
        <h1 className="load">Loading...</h1>
      ) : (
        <div className="user">
          {user.map((el) => (
            <div key={el.id} className="post">
              <img src={el.image} alt="img" />
              <h1>{el.name}</h1>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
