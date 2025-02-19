const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Ensure database connection
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const path = require("path");


// Import Express routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Shopping Cart API! 🎉 Use /graphql for GraphQL.');
});

//API Routes (REST Endpoints)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

//Logger Middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} Request to ${req.url}`);
  next();
});

//Set up Apollo GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Optional: Add authentication token processing here if needed
    const token = req.headers.authorization || '';
    return { token };
  }
});

//Start Apollo Server & Apply Middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL Endpoint: http://localhost:${PORT}/graphql`);
  });
}

//Start the application
startServer();
