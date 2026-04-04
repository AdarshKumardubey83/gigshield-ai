import 'dotenv/config';

import { connectDB } from './src/config/db.js';
import app from './src/app.js';



const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Shree Harivansh , Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
