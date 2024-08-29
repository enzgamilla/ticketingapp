/*
  Warnings:

  - You are about to drop the column `assignedSiteId` on the `UserAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[siteCode]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `UserAccount` DROP FOREIGN KEY `UserAccount_assignedSiteId_fkey`;

-- AlterTable
ALTER TABLE `Site` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `UserAccount` DROP COLUMN `assignedSiteId`,
    ADD COLUMN `assignedSiteCode` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Site_siteCode_key` ON `Site`(`siteCode`);

-- AddForeignKey
ALTER TABLE `UserAccount` ADD CONSTRAINT `UserAccount_assignedSiteCode_fkey` FOREIGN KEY (`assignedSiteCode`) REFERENCES `Site`(`siteCode`) ON DELETE SET NULL ON UPDATE CASCADE;
