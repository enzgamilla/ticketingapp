-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `siteCode` CHAR(4) NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_siteCode_fkey` FOREIGN KEY (`siteCode`) REFERENCES `Site`(`siteCode`) ON DELETE SET NULL ON UPDATE CASCADE;
