import bcryptjs from "bcryptjs";
import fs from "fs";
import path from "path";

const ADMIN_CONFIG_FILE = "data/admin-config.json";

interface AdminConfig {
  passwordHash: string;
}

async function ensureAdminConfig() {
  const filePath = path.join(process.cwd(), ADMIN_CONFIG_FILE);

  if (!fs.existsSync(filePath)) {
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash("batipro2026", salt);

    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(
      filePath,
      JSON.stringify({ passwordHash }, null, 2),
      "utf-8"
    );

    return { passwordHash };
  }

  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content) as AdminConfig;
}

async function getAdminConfig(): Promise<AdminConfig> {
  const filePath = path.join(process.cwd(), ADMIN_CONFIG_FILE);

  if (!fs.existsSync(filePath)) {
    return await ensureAdminConfig();
  }

  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content) as AdminConfig;
}

async function updatePasswordHash(newPassword: string): Promise<void> {
  const filePath = path.join(process.cwd(), ADMIN_CONFIG_FILE);
  const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(newPassword, salt);

  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(
    filePath,
    JSON.stringify({ passwordHash }, null, 2),
    "utf-8"
  );
}

export async function verifyAdminPassword(
  password: string
): Promise<boolean> {
  const config = await getAdminConfig();
  return await bcryptjs.compare(password, config.passwordHash);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
}

export async function getPasswordHash(): Promise<string> {
  const config = await getAdminConfig();
  return config.passwordHash;
}

export async function setPasswordHash(newPassword: string): Promise<void> {
  await updatePasswordHash(newPassword);
}
