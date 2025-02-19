const db = require('../config/db'); 

const User = {

async getAllUsers() {
    try {
        const [rows] = await db.query('SELECT id, name, email FROM users'); 
        return rows; 
    } catch (error) {
        console.error('Error fetching users:', error);
    }
},

async findByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0]; // Return the user object
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Failed to fetch user');
        }
    },

    async createUser(name, email, hashedPassword) {
        try {
            const [result] = await db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            return result.insertId; // Return the new user's ID
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    },
};

module.exports = User;
