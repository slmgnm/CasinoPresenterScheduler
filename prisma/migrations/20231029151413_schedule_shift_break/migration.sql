/*
  Warnings:

  - You are about to drop the column `shift` on the `GamePresenter` table. All the data in the column will be lost.
  - You are about to drop the `ClosedDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Day` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "GamePresenter" DROP COLUMN "shift";

-- DropTable
DROP TABLE "ClosedDay";

-- DropTable
DROP TABLE "Day";

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Break" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "gamePresenterId" TEXT,

    CONSTRAINT "Break_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GamePresenterToShift" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamePresenterToShift_AB_unique" ON "_GamePresenterToShift"("A", "B");

-- CreateIndex
CREATE INDEX "_GamePresenterToShift_B_index" ON "_GamePresenterToShift"("B");

-- AddForeignKey
ALTER TABLE "Break" ADD CONSTRAINT "Break_gamePresenterId_fkey" FOREIGN KEY ("gamePresenterId") REFERENCES "GamePresenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamePresenterToShift" ADD CONSTRAINT "_GamePresenterToShift_A_fkey" FOREIGN KEY ("A") REFERENCES "GamePresenter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamePresenterToShift" ADD CONSTRAINT "_GamePresenterToShift_B_fkey" FOREIGN KEY ("B") REFERENCES "Shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;
