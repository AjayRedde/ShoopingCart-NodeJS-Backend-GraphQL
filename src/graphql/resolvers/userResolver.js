const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "your-secret-key"; // Replace with an env variable in production

const resolvers = {
    Query: {
        //Fetch all users
        users: async () => {
            try {
                const users = await User.getAllUsers();
                if (!users || users.length === 0) {
                    console.warn("No users found in database.");
                }
                return users || [];
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
    },

    Mutation: {
        // Register User, with hashed password
        registerUser: async (_, {name, email, password}) => {
            try {
                // Check if user already exists
                const existingUser = await User.findByEmail(email);
                if (existingUser) {
                    console.error("Error: User already exists with email:", email);
                    throw new Error("User already exists");
                }

                //Converting the password to hash
                const hashedPassword = await bcrypt.hash(password, 10);
                console.log("Hashed Password:", hashedPassword);

                // Save user to database
                const userId = await User.createUser(name, email, hashedPassword);
                console.log("User registered with ID:", userId);

                return { id: userId, name, email };

            } catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Failed to register user");
            }
        },

        // Checking Login User - Validates password & returns JWT token

        login: async (_, { email, password }) => {
            try {
                console.log("Login attempt for:", email);

                // Fetch user from database
                const user = await User.findByEmail(email);
                if (!user) {
                    console.error(" ERROR: User not found for email:", email);
                    throw new Error("Invalid email or password");
                }

                console.log("User found:", user.email);
                console.log("Stored Hashed Password:", user.password);
                console.log("Password Entered:", password);

                // Validate Password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    console.error("ERROR: Incorrect password for:", email);
                    throw new Error("Invalid email or password");
                }

                // Generate JWT Token
                const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
                console.log("Token generated successfully:", token);

                return { token };

            } catch (error) {
                console.error("Login failed:", error);
                throw new Error("Failed to log in");
            }
        }
    }
};

module.exports = resolvers;
