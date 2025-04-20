const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Topic = require('./models/topicModel');
const Problem = require('./models/problemModel');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const topics = [
  {
    name: 'Arrays',
    description: 'Basic data structure for storing elements of same data type.',
    order: 1
  },
  {
    name: 'Linked Lists',
    description: 'Linear data structure where elements are not stored at contiguous memory locations.',
    order: 2
  },
  {
    name: 'Stacks & Queues',
    description: 'Abstract data types following LIFO and FIFO principles.',
    order: 3
  },
  {
    name: 'Trees',
    description: 'Hierarchical data structure with a root value and subtrees of children.',
    order: 4
  },
  {
    name: 'Graphs',
    description: 'Non-linear data structure consisting of nodes and edges.',
    order: 5
  }
];

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Topic.deleteMany();
    await Problem.deleteMany();
    
    console.log('Data cleared');
    
    // Insert topics
    const createdTopics = await Topic.insertMany(topics);
    console.log('Topics seeded');
    
    // Sample problems for the first topic (Arrays)
    const problems = [
      {
        title: 'Two Sum',
        description: 'Find two numbers in an array that add up to a specific target.',
        topicId: createdTopics[0]._id,
        difficulty: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
        leetcodeLink: 'https://leetcode.com/problems/two-sum/',
        articleLink: 'https://www.geeksforgeeks.org/two-sum/',
        order: 1
      },
      {
        title: 'Maximum Subarray',
        description: 'Find the contiguous subarray which has the largest sum.',
        topicId: createdTopics[0]._id,
        difficulty: 'Medium',
        youtubeLink: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
        leetcodeLink: 'https://leetcode.com/problems/maximum-subarray/',
        articleLink: 'https://www.geeksforgeeks.org/maximum-subarray-sum-using-divide-and-conquer-algorithm/',
        order: 2
      },
      {
        title: 'Merge Sorted Arrays',
        description: 'Merge two sorted arrays into a single sorted array.',
        topicId: createdTopics[0]._id,
        difficulty: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=P1Ic85RarKY',
        leetcodeLink: 'https://leetcode.com/problems/merge-sorted-array/',
        articleLink: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/',
        order: 3
      },
      {
        title: 'Find All Duplicates in Array',
        description: 'Find all elements that appear twice in an array.',
        topicId: createdTopics[0]._id,
        difficulty: 'Medium',
        youtubeLink: 'https://www.youtube.com/watch?v=aMsSF1Il3IY',
        leetcodeLink: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/',
        articleLink: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/',
        order: 4
      }
    ];
    
    // Insert problems
    await Problem.insertMany(problems);
    console.log('Problems seeded');
    
    console.log('Data seeding completed');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();