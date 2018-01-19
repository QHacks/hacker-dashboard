const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const connectToDb = require('./db');
const { User } = require('./models');

connectToDb(async (err) => {
    if (err) throw err;
    try {
        const response = await User.updateMany(
            {
                $and: [
                    // {
                    //     $or: [
                    //         { applications: { $exists: false } },
                    //         { applications: { $size: 0 } }
                    //     ]
                    // },
                    { role: 'HACKER' }
                ]
            },
            // {$set: {applications: []}}
            {
                $push: {
                    applications: {
                        event: '5a10b1a32056fff78d0054f9'
                    }
                }
            }
        );
        console.log(response);
    } catch (e) {
        console.error(e);
    }
});
