import { addDays, setHours, setMinutes, startOfWeek } from "date-fns";
import Timetable from "../components/Timetable";
import { LessonType } from "../types/Lesson";
import { useEffect, useMemo, useState } from "react";
import { useDate } from "../hooks/useDate";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const baseDate = new Date(1970, 0, 1);
const timeSlots: [Date, Date][] = [
  [
    setHours(setMinutes(new Date(baseDate), 40), 8),
    setHours(setMinutes(new Date(baseDate), 15), 10),
  ],
  [
    setHours(setMinutes(new Date(baseDate), 35), 10),
    setHours(setMinutes(new Date(baseDate), 10), 12),
  ],
  [
    setHours(setMinutes(new Date(baseDate), 20), 12),
    setHours(setMinutes(new Date(baseDate), 55), 13),
  ],
  [
    setHours(setMinutes(new Date(baseDate), 5), 14),
    setHours(setMinutes(new Date(baseDate), 40), 15),
  ],
  [
    setHours(setMinutes(new Date(baseDate), 50), 15),
    setHours(setMinutes(new Date(baseDate), 25), 17),
  ],
  [
    setHours(setMinutes(new Date(baseDate), 35), 17),
    setHours(setMinutes(new Date(baseDate), 20), 19),
  ],
];

const TimetablePage = () => {
  const { selectedDate } = useDate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const startOfCurrentWeek = useMemo(
    () => startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 }),
    [selectedDate]
  );

  const endOfCurrentWeek = useMemo(
    () => addDays(startOfCurrentWeek, 5),
    [startOfCurrentWeek]
  ); // Saturday

  // State for lessons
  const [weekLessons, setWeekLessons] = useState<LessonType[]>([]);

  // Fetch lessons
  useEffect(() => {
    const fetchLessons = async () => {
      if (!auth?.id) return;

      try {
        const response = await axiosPrivate.get(
          `/Timetable/student/${auth.id}`,
          {
            params: {
              startDate: startOfCurrentWeek.toISOString(),
              endDate: endOfCurrentWeek.toISOString(),
            },
          }
        );

        setWeekLessons(
          response.data.map((lesson: LessonType) => ({
            ...lesson,
            date: lesson.date ? new Date(lesson.date) : new Date(),
          }))
        );
        console.log("Fetched timetable:", response.data);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchLessons();
  }, [auth?.id, startOfCurrentWeek, endOfCurrentWeek, axiosPrivate]);

  console.log("Week lessons:", weekLessons);

  return (
    <Timetable
      lessons={weekLessons}
      timeSlots={timeSlots}
      startOfWeek={startOfCurrentWeek}
    />
  );
};
export default TimetablePage;
