import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useFetchMealDbApi from './useFetchMealDbApi';


const CategoryInfo = () => {
  const { strCategory } = useParams();

  const [{ data, isLoading, isError }, doFetch] = useFetchMealDbApi();

  useEffect(
    () =>
      doFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`),
    [doFetch, strCategory, data]

  );

 if (data) {
   console.log(data)
   console.log(strCategory)
 }

  return ( 
     <div></div>
   );
}
 
export default CategoryInfo;