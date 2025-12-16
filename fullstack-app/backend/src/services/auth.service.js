import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Temporary in-memory user (DB later)
const users = [];

export const registerUser = async ({ email, password }) => {
  const exists = users.find(u => u.email === email);
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, email, password: hashedPassword };
  users.push(user);

  return { message: "User registered successfully" };
};

export const loginUser = async ({ email, password }) => {
  const user = users.find(u => u.email === email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};
