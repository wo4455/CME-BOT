import openai from "../index.js";

// File ID: ftjob-GXLRb8UCJkWO8ah8iao6ttWa
// Model ID: ft:gpt-3.5-turbo-1106:personal::8q2gfWF4

// List Fine-Tuning Job(s)
const listFineTunes = async () => {
  try {
    let page = await openai.fineTuning.jobs.list();
    console.log("Data: " + page);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

// Retrieve the Status of Fine-Tune
const retrieveStatus = async () => {
  try {
    let fineTune = await openai.fineTuning.jobs.retrieve("abc"); // replace with ft job
    console.log("Data: " + fineTune);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

// Cancel Fine-Tuning Job
const cancelJob = async () => {
  try {
    let status = await openai.fineTuning.jobs.cancel("abc"); // replace with ft job
    console.log("Data: " + status);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

// Delete Fine-Tuned Model
const deleteModel = async () => {
  try {
    let model = await openai.models.delete(
      "ft:gpt-3.5-turbo:acemeco:suffix:abc123"
    ); // replace with ft job
    console.log("Data: " + model);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};
