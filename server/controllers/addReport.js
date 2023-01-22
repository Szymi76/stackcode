import Report from "../models/Reports.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";

const addReport = async (req, res) => {
  try {
    const { id, text, reasons, for: reportFor } = req.body;

    if (!text || !reasons || !reportFor) return res.status(400).json({ message: "Required data are missing" });

    const report = await new Report({ author: req.user.id, text, reasons, for: reportFor }).save();

    if (reportFor == "question") {
      await Question.findByIdAndUpdate(id, { $push: { reports: report } }).exec();
      return res.status(201).json({ message: "Report was added to question" });
    } else if (reportFor == "answer") {
      await Answer.findByIdAndUpdate(id, { $push: { reports: report } }).exec();
      return res.status(201).json({ message: "Report was added to answer" });
    }
    // else if(reportFor == "comment") await Comment.findByIdAndUpdate(id, {$push: { reports: report} }).exec();

    res.status(201).json({ message: "Report was not added" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default addReport;
