export const generateCORSoptions = () => {
  return {
    origin: 'https://studio.apollographql.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
};
