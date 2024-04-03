-- DropForeignKey
ALTER TABLE "Traveler" DROP CONSTRAINT "Traveler_addressId_fkey";

-- AlterTable
ALTER TABLE "Traveler" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Traveler" ADD CONSTRAINT "Traveler_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
