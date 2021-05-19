import { AiOutlineCloudUpload } from 'react-icons/ai';
import './NewMealForm.css';
import Navbar from './Navbar/Navbar';
import { ThemeContext } from '../contexts/ThemeContext';
import React, { useContext } from 'react';
import ThemeToggle from './ThemeToggle';

const NewMealForm = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <div>
      <Navbar />
      <div
        className="meal-form text-sm sm:text-base"
        style={{ background: theme.ui, color: theme.syntax }}
      >
        <div className="overlay hidden" />
        <div
          className="add-recipe-window "
          style={{ background: theme.ui, color: theme.syntax }}
        >
          <button className="btn--close-modal"></button>
          <form className="upload">
            <div className="upload__column">
              <h3 className="upload__heading">Recipe data</h3>
              <label>Title</label>
              <input
                defaultValue="TEST23"
                required
                name="title"
                type="text"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>URL</label>
              <input
                defaultValue="TEST23"
                required
                name="sourceUrl"
                type="text"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Image URL</label>
              <input
                defaultValue="TEST23"
                required
                name="image"
                type="text"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Publisher</label>
              <input
                defaultValue="TEST23"
                required
                name="publisher"
                type="text"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Prep time</label>
              <input
                defaultValue={23}
                required
                name="cookingTime"
                type="number"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Servings</label>
              <input
                defaultValue={23}
                required
                name="servings"
                type="number"
                style={{ background: theme.bg, color: theme.syntax }}
              />
            </div>
            <div className="upload__column">
              <h3 className="upload__heading">Ingredients</h3>
              <label>Ingredient 1</label>
              <input
                defaultValue="0.5,kg,Rice"
                type="text"
                required
                name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Ingredient 2</label>
              <input
                defaultValue="1,,Avocado"
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Ingredient 3</label>
              <input
                defaultValue=",,salt"
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: theme.bg, color: theme.syntax }}
              />
            </div>
            <button
              className="btn upload__btn"
              style={{ background: theme.bg, color: theme.syntax }}
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
