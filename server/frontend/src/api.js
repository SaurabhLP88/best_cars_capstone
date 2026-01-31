export const API = {
  dealers: "/djangoapp/get_dealers",
  dealer: (id) => `/djangoapp/dealer/${id}`,
  cars: (id) => `/djangoapp/cars/${id}`,
  carsByMake: (id, make) => `/djangoapp/carsbymake/${id}/${make}`,
  carsByModel: (id, model) => `/djangoapp/carsbymodel/${id}/${model}`,
  carsByYear: (id, year) => `/djangoapp/carsbyyear/${id}/${year}`,
  carsByMileage: (id, mileage) => `/djangoapp/carsbymaxmileage/${id}/${mileage}`,
  carsByPrice: (id, price) => `/djangoapp/carsbyprice/${id}/${price}`,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default API_BASE_URL;