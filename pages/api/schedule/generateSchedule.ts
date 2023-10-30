// Import Prisma and other dependencies
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

      // Implement your scheduling algorithm here
      const generatedSchedule = generateSchedule(
        gamePresenters,
        tables,
        shifts
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
  table: Table | null;
  breakSlot: boolean;
}
let idCounter = 1; 

function generateSchedule(
  gamePresenters: GamePresenter[],
  tables: Table[],
  shifts: Shift[]
): Record<string, ScheduleItem[]> {
  const scheduleByShift: Record<string, ScheduleItem[]> = {};

  // Define shift start times
  const morningShiftStart = new Date();
  morningShiftStart.setHours(7, 0, 0, 0);

  const afternoonShiftStart = new Date();
  afternoonShiftStart.setHours(15, 0, 0, 0);

  const nightShiftStart = new Date();
  nightShiftStart.setHours(23, 0, 0, 0);

  // Calculate the duration of a shift in minutes (8 hours)
  const SHIFT_DURATION_MINUTES = 480;

  // Calculate the number of time slots in a shift
  const TIME_SLOT_DURATION = 20; // Duration in minutes
  const numSlots = SHIFT_DURATION_MINUTES / TIME_SLOT_DURATION;

  // Calculate the number of breaks based on the number of tables
  const numBreaks = numSlots - tables.length;

  shifts.forEach((shift) => {
    const shiftName = shift.name;
    let shiftSchedule: ScheduleItem[] = [];

    // Determine shift start and end times based on the shift name
    let shiftStart, shiftEnd;

    switch (shiftName) {
      case "Morning":
        shiftStart = morningShiftStart;
        break;
      case "Afternoon":
        shiftStart = afternoonShiftStart;
        break;
      case "Night":
        shiftStart = nightShiftStart;
        break;
      default:
        // Handle unknown shift names
        console.error("Unknown shift name:", shift.name);
        return;
    }

    shiftEnd = new Date(shiftStart);
    shiftEnd.setMinutes(shiftEnd.getMinutes() + SHIFT_DURATION_MINUTES);

    for (let slotIndex = 0; slotIndex < numSlots; slotIndex++) {
      const slotStartTime = new Date(shiftStart);
      slotStartTime.setMinutes(
        slotStartTime.getMinutes() + slotIndex * TIME_SLOT_DURATION
      );
      const slotEndTime = new Date(slotStartTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + TIME_SLOT_DURATION);

      tables.forEach((table, tableIndex) => {
        const gamePresenter = gamePresenters[slotIndex % gamePresenters.length];
        shiftSchedule.push({
          id:idCounter++,
          startTime: slotStartTime,
          endTime: slotEndTime,
          gamePresenter: {
            id: gamePresenter.id,
            name: gamePresenter.name,
          },
          table: {
            id: table.id,
            name: table.name,
          },
          breakSlot: false,
          
        });
      });

      if (slotIndex < numBreaks) {
        const breakStartTime = new Date(slotEndTime);
        const breakEndTime = new Date(breakStartTime);
        breakEndTime.setMinutes(breakEndTime.getMinutes() + TIME_SLOT_DURATION);

        const gamePresenter = gamePresenters[slotIndex % gamePresenters.length];
        shiftSchedule.push({
          id:idCounter++,
          startTime: breakStartTime,
          endTime: breakEndTime,
          gamePresenter: {
            id: gamePresenter.id,
            name: gamePresenter.name,
          },
          table: null,
          breakSlot: true,
        });
      }
    }

    // Store the schedule for this shift in the scheduleByShift object
    scheduleByShift[shiftName] = shiftSchedule;
  });

  return scheduleByShift;
}
