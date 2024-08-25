/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    ADD COLUMN `accountVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `restrictions` ENUM('ADMIN', 'IT_EMPLOYEE', 'DEP_EMPLOYEE') NOT NULL DEFAULT 'DEP_EMPLOYEE';
