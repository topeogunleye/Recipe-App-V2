import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useFetchMealDbApi = (initialUrl, initialData) => {
  // const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const fetchMeals = async () => {
      dispatch({ type: 'FETCH_INIT' });
      // setIsError(false);
      // setIsLoading(true);

      try {
        const result = await axios(url);
        // setData(result.data);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
          // setIsError(true);
        }
      }
      // setIsLoading(false);
    };

    fetchMeals();

    return () => {
      didCancel = true;
    };
  }, [url]);

  // return [{ data, isLoading, isError },state, setUrl, setUrl];
  return [state, setUrl];
};

export default useFetchMealDbApi;
