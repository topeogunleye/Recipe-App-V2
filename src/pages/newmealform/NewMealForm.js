import { AiOutlineCloudUpload } from 'react-icons/ai';
import './NewMealForm.css';
import Navbar from '../../components/Navbar/Navbar';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import React, { useContext, useState } from 'react';
import ThemeToggle from '../../components/theme-toggle/ThemeToggle';
import firebase from 'firebase/app';
import 'firebase/firestore';

const NewMealForm = () => {
  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg } = theme.mode;

  // Initialize firebase database
  var db = firebase.firestore();

 

  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients1, setIngredients1] = useState('0.5,kg,Rice');
  const [ingredients2, setIngredients2] = useState('1,,Avocado');
  const [ingredients3, setIngredients3] = useState(',,salt');
  const [ingredients4, setIngredients4] = useState('');
  const [ingredients5, setIngredients5] = useState('');
  const [ingredients6, setIngredients6] = useState('');

  const [alert, setAlert] = useState('');


  function submitForm(e) {
    e.preventDefault();

    // Save message
    saveMessage(
      title,
      source,
      image,
      publisher,
      cookingTime,
      servings,
      ingredients1,
      ingredients2,
      ingredients3,
      ingredients4,
      ingredients5,
      ingredients6
    );

    setTitle('')
    setSource('')
    setImage('')
    setPublisher('')
    setCookingTime('')
    setServings('')
    setIngredients1('')
    setIngredients2('')
    setIngredients3('')
    setIngredients4('')
    setIngredients5('')
    setIngredients6('')

    setAlert('set')
    alertMessage()
  }

  const alertMessage = () =>{

   // Hide alert after 3 seconds
   setTimeout(function () {
    setAlert(null)
  }, 5000);

  }

  // Save message to firebase
  function saveMessage(
    title,
    source,
    image,
    publisher,
    cookingTime,
    servings,
    ingredients1,
    ingredients2,
    ingredients3,
    ingredients4,
    ingredients5,
    ingredients6
  ) {
      // Add new document to collection users
      db.collection('recipes')
        .add({
          title: title,
          source: source,
          image: image,
          publisher: publisher,
          cookingTime: cookingTime,
          servings: servings,
          ingredients1: ingredients1,
          ingredients2: ingredients2,
          ingredients3: ingredients3,
          ingredients4: ingredients4,
          ingredients5: ingredients5,
          ingredients6: ingredients6,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
   }


  return (
    <div>
      <Navbar />
      <div
        className="meal-form text-sm sm:text-base transition-all duration-1000 ease-out"
        style={{ background: ui, color: syntax }}
      >
        <div className="overlay hidden" />
        <div
          className="add-recipe-window "
          style={{ background: ui, color: syntax }}
        >
          <button className="btn--close-modal"></button>
          { alert ?
          <div className="alert text-center p-2 text-white mb-2 block">Thank you!!. Adding of new meals takes three to five business days</div> : <div className="alert alert text-center p-2 text-white mb-2 hidden"></div>}
          <form className="upload" onSubmit={submitForm}>
            <div className="upload__column">
              <h3 className="upload__heading">Recipe data</h3>
              <label>Title</label>
              <input
                required
                name="title"
                type="text"
                style={{ background: bg, color: syntax }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>URL</label>
              <input
                required
                name="sourceUrl"
                type="text"
                style={{ background: bg, color: syntax }}
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <label>Image URL</label>
              <input
                required
                name="image"
                type="text"
                style={{ background: bg, color: syntax }}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <label>Publisher</label>
              <input
                required
                name="publisher"
                type="text"
                style={{ background: bg, color: syntax }}
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
              <label>Prep time</label>
              <input
                required
                name="cookingTime"
                type="number"
                style={{ background: bg, color: syntax }}
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />
              <label>Servings</label>
              <input
                required
                name="servings"
                type="number"
                style={{ background: bg, color: syntax }}
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
            <div className="upload__column">
              <h3 className="upload__heading">Ingredients</h3>
              <label>Ingredient 1</label>
              <input
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients1}
                onChange={(e) => setIngredients1(e.target.value)}
              />
              <label>Ingredient 2</label>
              <input
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients2}
                onChange={(e) => setIngredients2(e.target.value)}
              />
              <label>Ingredient 3</label>
              <input
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients3}
                onChange={(e) => setIngredients3(e.target.value)}
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients4}
                onChange={(e) => setIngredients4(e.target.value)}
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients5}
                onChange={(e) => setIngredients5(e.target.value)}
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
                value={ingredients6}
                onChange={(e) => setIngredients6(e.target.value)}
              />
            </div>
            <button
              className="btn upload__btn"
              style={{ background: bg, color: syntax }}
            >
              <AiOutlineCloudUpload />
              <span>Upload</span>
            </button>
          </form>
        </div>
        <div
          className="absolute top-5 right-10
          "
        >
          <ThemeToggle
            className="cursor-pointer focus:outline-none"
            id="random"
          />
        </div>
      </div>
    </div>
  );
};

export default NewMealForm;
