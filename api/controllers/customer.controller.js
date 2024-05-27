import Customer from "../models/customer.model.js";
import { errorHandler } from "../utils/error.js";

export const addCustomer = async (req, res, next) => {
  const { name, email, contactNumber, message } = req.body;
  if (
    !name ||
    name === "" ||
    !email ||
    email === "" ||
    !contactNumber ||
    contactNumber === "" ||
    !message ||
    message === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const newCustomer = new Customer({
    name,
    email,
    contactNumber,
    message,
  });

  try {
    await newCustomer.save();
    res.json({ message: "Your Data Saved !" });
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async(req,res,next) => {
  try {
    const data = await Customer.find({});
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}