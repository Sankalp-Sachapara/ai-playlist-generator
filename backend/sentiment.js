const { spawn } = require('child_process');

const analyzeSentiment = (text) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['sentiment_analysis.py', text]);

    pythonProcess.stdout.on('data', (data) => {
      resolve(data.toString().trim());
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(`Error: ${data}`);
    });
  });
};

module.exports = { analyzeSentiment };
