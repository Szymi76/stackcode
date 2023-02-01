import Report from "../models/Reports.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";
import formatError from "../utils/formatError.js";

const addReport = async (req, res) => {
  try {
    const { id, text, reasons, for: reportFor } = req.body;

    if (!text || !reasons || !reportFor) return res.status(400).json({ message: "Required data are missing" });

    const report = await new Report({ author: req.user.id, text, reasons, for: reportFor }).save();

    if (reportFor == "question") {
      // dodawanie zgłoszenia do pytania
      await Question.findByIdAndUpdate(id, { $push: { reports: report } }).exec();

      return res.status(201).json({ message: "Report was added to question" });
    } else if (reportFor == "answer") {
      // dodawanie zgłoszenia do odpowiedzi
      await Answer.findByIdAndUpdate(id, { $push: { reports: report } }).exec();
      return res.status(201).json({ message: "Report was added to answer" });
    } else if (reportFor == "comment") {
      // dodawanie zgłoszenia do komentarza
      await Comment.findByIdAndUpdate(id, { $push: { reports: report } }).exec();
      return res.status(201).json({ message: "Report was added to comment" });
    }

    res.status(201).json({ message: "Report was not added" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default addReport;
