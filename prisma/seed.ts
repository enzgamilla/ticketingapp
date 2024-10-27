import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Check if any users exist
  const userCount = await prisma.userAccount.count();

  if (userCount === 0) {
    // No users found, create an admin user
    const hashedPassword = await bcrypt.hash("admin", 10); // Securely hash the password

    await prisma.userAccount.create({
      data: {
        username: "admin",
        name: "admin",
        hashedPassword: hashedPassword,
        restrictions: "ADMIN",
        verification: true,
      },
    });

    console.log("Admin user created with default credentials.");
  } else {
    console.log("Users already exist, no default admin created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
