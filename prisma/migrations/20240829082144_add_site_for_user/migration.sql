-- AlterTable
ALTER TABLE `UserAccount` ADD COLUMN `assignedSiteId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Site` (
    `id` VARCHAR(191) NOT NULL,
    `siteName` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAccount` ADD CONSTRAINT `UserAccount_assignedSiteId_fkey` FOREIGN KEY (`assignedSiteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
