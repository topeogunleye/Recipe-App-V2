import MealItem from "../../components/meal/Meal";
import { v4 as uuidv4 } from 'uuid';


const BookMarkView = () => {

  const bookmarks = [];
  return ( 
    <div id="meals" className="meals">
    {bookmarks &&
      bookmarks.map((meal) => <MealItem meal={meal} key={uuidv4()} />)}
  </div>
   );
}
 
export default BookMarkView;