import openai from "../index.js";

const createFineTune = async () => {
  try {
    const response = await openai.fineTuning.jobs.create({
      training_file: "file-BHdpEi6huAAmQGTTewq4BqfF",
      model: "gpt-3.5-turbo-1106",
    });
    console.log("Response: ", response);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

createFineTune();
