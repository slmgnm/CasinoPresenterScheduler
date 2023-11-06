import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Fetch all Game Presenters, Tables, and Shifts
      const gamePresenters = await prisma.gamePresenter.findMany();
      const tables = await prisma.table.findMany();
      const shifts = await prisma.shift.findMany();

      // Define shift start times and durations
      const morningShiftStart = new Date();
      morningShiftStart.setHours(7, 0, 0, 0);
      const MORNING_SHIFT_DURATION_MINUTES = 480; // 8 hours
      const AFTERNOON_SHIFT_DURATION_MINUTES = 480; // 8 hours
      const NIGHT_SHIFT_DURATION_MINUTES = 480; // 8 hours
      const afternoonShiftStartTime = new Date();
      afternoonShiftStartTime.setHours(15, 0, 0, 0);
      const nightShiftStartTime = new Date();
      nightShiftStartTime.setHours(23, 0, 0, 0);

      // Generate the schedule
      const generatedSchedule = generateSchedule(
        gamePresenters,
        tables,
        shifts,
        morningShiftStart,
        MORNING_SHIFT_DURATION_MINUTES,
        AFTERNOON_SHIFT_DURATION_MINUTES,
        NIGHT_SHIFT_DURATION_MINUTES,
        afternoonShiftStartTime,
        nightShiftStartTime
      );

      res.status(200).json(generatedSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error generating schedule" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

interface GamePresenter {
  id: string;
  name: string;
}

interface Table {
  id: string;
  name: string;
}

interface Shift {
  id: string;
  name: string;
}

interface ScheduleItem {
  id: number;
  startTime: Date;
  endTime: Date;
  gamePresenter: GamePresenter;
  table: Table;
  breakSlot: boolean;
}

function generateSchedule(
  gamePresenters: GamePresenter[],
  tables: Table[],
  shifts: Shift[],
  morningShiftStart: Date,
  MORNING_SHIFT_DURATION_MINUTES: number,
  AFTERNOON_SHIFT_DURATION_MINUTES: number,
  NIGHT_SHIFT_DURATION_MINUTES: number,
  afternoonShiftStartTime: Date,
  nightShiftStartTime: Date
): Array<{ table: Table; shifts: { name: string; slots: ScheduleItem[] }[] }> {
  const scheduleByTable: Array<{
    table: Table;
    shifts: { name: string; slots: ScheduleItem[] }[];
  }> = [];

  for (const table of tables) {
    const shiftsForTable: { name: string; slots: ScheduleItem[] }[] = [];

    // Morning shift
    const morningShiftSlots: ScheduleItem[] = generateShiftSlots(
      gamePresenters,
      table,
      morningShiftStart,
      MORNING_SHIFT_DURATION_MINUTES
    );
    shiftsForTable.push({ name: "Morning", slots: morningShiftSlots });

    // Afternoon shift
    const afternoonShiftSlots: ScheduleItem[] = generateShiftSlots(
      gamePresenters,
      table,
      afternoonShiftStartTime,
      AFTERNOON_SHIFT_DURATION_MINUTES
    );
    shiftsForTable.push({ name: "Afternoon", slots: afternoonShiftSlots });

    // Night shift
    const nightShiftSlots: ScheduleItem[] = generateShiftSlots(
      gamePresenters,
      table,
      nightShiftStartTime,
      NIGHT_SHIFT_DURATION_MINUTES
    );
    shiftsForTable.push({ name: "Night", slots: nightShiftSlots });

    scheduleByTable.push({ table, shifts: shiftsForTable });
  }

  return scheduleByTable;
}

function generateShiftSlots(
  gamePresenters: GamePresenter[],
  table: Table,
  shiftStartTime: Date,
  shiftDurationMinutes: number
): ScheduleItem[] {
  const slots: ScheduleItem[] = [];
  const totalSlots = Math.ceil(shiftDurationMinutes / 20);
  const breakTakenByPresenter = new Array(gamePresenters.length).fill(false);
  let presenterIndex = 0;

  for (let i = 0; i < totalSlots; i++) {
    const startTime = new Date(shiftStartTime);
    startTime.setMinutes(startTime.getMinutes() + i * 20);
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 20);

    let isBreakSlot = false;

    // Check if all presenters have taken a break
    if (breakTakenByPresenter.every((taken) => taken)) {
      breakTakenByPresenter.fill(false);
    }

    // Find a presenter who hasn't taken a break yet
    while (breakTakenByPresenter[presenterIndex]) {
      presenterIndex = (presenterIndex + 1) % gamePresenters.length;
    }

    // Assign a break slot to a presenter every 3 slots
    if (i % 3 === 0 && i !== 0) {
      // Ensure the first slot is not a break
      isBreakSlot = true;
      breakTakenByPresenter[presenterIndex] = true;
    }

    const slot: ScheduleItem = {
      id: i,
      startTime,
      endTime,
      gamePresenter: gamePresenters[presenterIndex],
      table,
      breakSlot: isBreakSlot,
    };

    slots.push(slot);

    // Move to the next presenter for the next slot
    presenterIndex = (presenterIndex + 1) % gamePresenters.length;
  }

  return slots;
}

// function getRandomIndex(length: number): number {
//   return Math.floor(Math.random() * length);
// }
