import * as joi from "joi";

// environment schema
const envSchema = joi.object({
  PORT: joi.number().required(),
  DATABASE_URL: joi.string().required()
});

// validates environment variables
const validateEnvSchema = async () => {
  const { error } = envSchema.validate(
    {
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL
    },
    { abortEarly: false }
  );

  if (error) {
    console.error("\u001b[1;31m", "Environment variables are missing"); // Log validation errors as a single string
    console.error("Validation error details:", error.details); // Log validation details
    throw new Error("Environment variables validation failed");
  }

  console.log("\x1b[32m%s\x1b[0m", "Environment validation successful"); // Log valid environment variables
};

export { validateEnvSchema };
