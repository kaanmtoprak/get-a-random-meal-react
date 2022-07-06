import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [meals, setMeals] = useState({});
  const ingredients = [];
  const [control, setControl] = useState(false);

  const getir = async () => {
    await axios("https://www.themealdb.com/api/json/v1/1/random.php").then(
      (res) => {
        setMeals(res.data.meals[0]);

        setControl(true);
      }
    );
  };


  if (control) {
    for (let i = 1; i <= 20; i++) {
      if (meals[`strIngredient${i}`] !== "") {
        ingredients.push(
          `${meals[`strIngredient${i}`]} - ${meals[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
  }


  return (
    <div className="App">
      <div className="container">

      {
        control ? '' : <h3 className="m-3">Hungry ? </h3>
      }



      <button className="btn btn-success butt" onClick={getir}>{control ? "Didn't Like it ? Change" : 'Get A Meal :)'}</button>

      </div>

      {control ? (
        <div>
          {
            <div className="container" key={meals.idMeal}>
              <div className="row">
                <div className="col-3">
                  <img className="img-fluid" src={meals.strMealThumb} alt="" />
                  <p>
                    <strong>Category : </strong> {meals.strCategory}
                  </p>
                  <p>
                    <strong>Area : </strong> {meals.strArea}
                  </p>
                  <hr />
                  <h5>Ingredients</h5>
                  {ingredients.map((ing) => (
                    <ul>
                      <li>
                        <p>{ing}</p>
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="col-7">
                  <h4>{meals.strMeal}</h4>
                  <p>{meals.strInstructions}</p>
                </div>
              </div>




              {meals.strYoutube ? 
    <div class="container">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe title="youtube" width={'100%'} height={'400px'}
        src={`https://www.youtube.com/embed/${meals.strYoutube.slice(-11)}`}>
        </iframe>
      </div>
    </div> : ''}
  
            </div>
          }
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
