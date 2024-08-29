/*
  Warnings:

  - Added the required column `siteCode` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Site` ADD COLUMN `siteCode` CHAR(4) NOT NULL;
