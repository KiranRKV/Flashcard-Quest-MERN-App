import Feedback from "../models/feedbackModel.js";

const createFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res
      .status(201)
      .send({ message: "Message sent successfully!", data: newFeedback });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Failed to send message", details: error.message });
  }
};

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).send({ data: feedback });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Failed to fetch feedback", details: error.message });
  }
};

export default { createFeedback, getAllFeedback };
