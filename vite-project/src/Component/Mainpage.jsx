import React, { useState, useEffect } from "react";
import axios, { spread } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add_content, redux_input_text } from "../Redux/action";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
export default function MainPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.content);

  const [inputText, setInputText] = useState("");

  const location = useLocation();
  if (location && location.state) {
    console.log(location.state.firstName);
  }

  useEffect(() => {
    dispatch(add_content([]));

    if (inputText) {
      axios
        .post(
          "https://reactnd-books-api.udacity.com/search",
          { query: inputText, maxResults: 20 },
          { headers: { Authorization: "whatever-you-want" } }
        )
        .then((res) => {
          dispatch(add_content(res.data.books));
          console.log(res.data);
        })
        .catch((err) => console.log("ERROR FOUND", err));
    } else {
      axios
        .get("https://reactnd-books-api.udacity.com/books", {
          headers: { Authorization: "whatever-you-want" },
        })
        .then((res) => {
          if (res.data.books) {
            dispatch(add_content(res.data.books));
          } else {
            console.error(
              "Expected an array of books, received:",
              res.data.books
            );
          }
        })
        .catch((err) => console.log("ERROR FOUND", err));
    }
  }, [inputText, dispatch]);

  const handleInputText = async () => {
    await dispatch(redux_input_text(inputText));
  };

  // handleInputText();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Kalvium Book</h1>
          {!location.state ? (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              {" "}
              <Link to="/Register">Register</Link>{" "}
            </button>
          ) : (
            <h1>{location.state.firstName}</h1>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-center px-4 pt-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            // onKeyPress={handleKeyPress}
          />
        </div>
        {data.length === 0 && (
          <div class="h-screen bg-white">
            <div class="flex justify-center items-center h-full">
              <img
                class="h-16 w-16"
                src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                alt=""
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-6 mt-4 w-30">
          {Array.isArray(data) && data.length !== 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                {item.imageLinks && item.imageLinks.thumbnail && (
                  <img
                    src={item.imageLinks.thumbnail}
                    className="rounded-t-lg w-full h-48 object-fit"
                    alt={item.title}
                  />
                )}
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{item.title}</h5>
                </div>
              </div>
            ))
          ) : (
            <p className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              COMING SOON!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
