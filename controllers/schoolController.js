// controllers/schoolController.js
const School = require('../models/schoolModel');
const { calculateDistance } = require('../utils/distanceCalculator');


exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newSchool = await School.create({ name, address, latitude, longitude });
        res.status(201).json({ message: 'School added successfully.', school: newSchool });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add school.' });
    }
};

exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    try {
        const schools = await School.findAll();
        const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLocation, { latitude: school.latitude, longitude: school.longitude });
            return { ...school.toJSON(), distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve schools.' });
    }
};
