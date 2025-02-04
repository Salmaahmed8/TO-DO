import dotenv from "dotenv";

dotenv.config();

class Config {
  public static readonly NODE_ENV = process.env.NODE_ENV || "development";
  public static readonly PORT = process.env.PORT || "5000";
  public static readonly MONGO_URI = Config.getEnvVariable("MONGO_URI");
  public static readonly JWT_SECRET = Config.getEnvVariable("JWT_SECRET");
  public static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30d";

  private static getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }
}

export default Config;
