import JWT from "jsonwebtoken";
import { Traveler } from "@prisma/client";

const jwtKey = process.env.JWT_SECRET_KEY;

function tokenGenerator(traveler: Traveler) {
  return JWT.sign(
    {
      id: traveler.id,
      name: traveler.name,
      email: traveler.email,
      role: traveler.role,
    },
    jwtKey,
    {
      expiresIn: "1h",
    }
  );
}

function decode(token: string) {
  return JWT.verify(token, jwtKey);
}

export { tokenGenerator, decode };
