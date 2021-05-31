import { AiOutlineCloudUpload } from 'react-icons/ai';
import './NewMealForm.css';
import Navbar from '../../components/Navbar/Navbar';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import React, { useContext } from 'react';
import ThemeToggle from '../../components/theme-toggle/ThemeToggle';

const NewMealForm = () => {
  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;

  return (
    <div>
      <Navbar />
      <div
        className="meal-form text-sm sm:text-base"
        style={{ background: ui, color: syntax }}
      >
        <div className="overlay hidden" />
        <div
          className="add-recipe-window "
          style={{ background: ui, color: syntax }}
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
                style={{ background: bg, color: syntax }}
              />
              <label>URL</label>
              <input
                defaultValue="TEST23"
                required
                name="sourceUrl"
                type="text"
                style={{ background: bg, color: syntax }}
              />
              <label>Image URL</label>
              <input
                defaultValue="TEST23"
                required
                name="image"
                type="text"
                style={{ background: bg, color: syntax }}
              />
              <label>Publisher</label>
              <input
                defaultValue="TEST23"
                required
                name="publisher"
                type="text"
                style={{ background: bg, color: syntax }}
              />
              <label>Prep time</label>
              <input
                defaultValue={23}
                required
                name="cookingTime"
                type="number"
                style={{ background: bg, color: syntax }}
              />
              <label>Servings</label>
              <input
                defaultValue={23}
                required
                name="servings"
                type="number"
                style={{ background: bg, color: syntax }}
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
                style={{ background: bg, color: syntax }}
              />
              <label>Ingredient 2</label>
              <input
                defaultValue="1,,Avocado"
                type="text"
                name="ingredient-2"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
              />
              <label>Ingredient 3</label>
              <input
                defaultValue=",,salt"
                type="text"
                name="ingredient-3"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient-4"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient-5"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient-6"
                placeholder="Format: 'Quantity,Unit,Description'"
                style={{ background: bg, color: syntax }}
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
