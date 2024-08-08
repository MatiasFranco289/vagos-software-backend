export const DEVELOPMENT_ENVIRONMENT = "DEV";

export const PRODUCTION_ENVIRONMENT = "PROD";

export const TESTING_ENVIRONMENT = "TEST";

export const STATUS_CODE = {
  ok: 200,
  created: 201,
  Accepted: 202,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

export const QUERY_LIMIT = 20; //Maximum ammount of rows to return in a query to the db
export const ORDER_BY = [
  "ALPH_ASC",
  "ALPH_DESC",
  "DATE_ASC",
  "DATE_DESC",
  "ID_ASC",
  "ID_DESC",
];
