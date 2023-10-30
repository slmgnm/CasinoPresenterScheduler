/*
  Warnings:

  - The primary key for the `Shift` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_GamePresenterToShift" DROP CONSTRAINT "_GamePresenterToShift_B_fkey";

-- AlterTable
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shift_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shift_id_seq";

-- AlterTable
ALTER TABLE "_GamePresenterToShift" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_GamePresenterToShift" ADD CONSTRAINT "_GamePresenterToShift_B_fkey" FOREIGN KEY ("B") REFERENCES "Shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;
