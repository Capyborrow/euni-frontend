import { addDays, setHours, setMinutes, startOfWeek } from "date-fns";
import { LessonType } from "../types/lesson";
import { useMemo } from "react";
import { useDate } from "../hooks/useDate";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import Timetable from "../components/timetable/Timetable";

import { useQuery, useQueryClient } from "@tanstack/react-query";

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

const fetchTimetable = async (
  axios: ReturnType<typeof useAxiosPrivate>,
  studentId: string,
  weekStart: Date,
  weekEnd: Date
) => {
  const response = await axios.get(`/Timetable/student/${studentId}`, {
    params: {
      startDate: weekStart.toISOString(),
      endDate: weekEnd.toISOString(),
    },
  });
  return response.data.map((lesson: LessonType) => ({
    ...lesson,
    date: lesson.date ? new Date(lesson.date) : new Date(),
  }));
};

const TimetablePage = () => {
  const { selectedDate } = useDate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const startOfCurrentWeek = useMemo(
    () => startOfWeek(selectedDate || new Date(), { weekStartsOn: 1 }),
    [selectedDate]
  );
  const endOfCurrentWeek = useMemo(
    () => addDays(startOfCurrentWeek, 5),
    [startOfCurrentWeek]
  );

  const queryKey = ["timetable", auth?.id, startOfCurrentWeek.toISOString()];

  const { data: currentWeekLessons = [] } = useQuery(
    queryKey,
    () =>
      fetchTimetable(
        axiosPrivate,
        auth!.id,
        startOfCurrentWeek,
        endOfCurrentWeek
      ),
    { enabled: !!auth?.id }
  );

  useMemo(() => {
    if (!auth?.id) return;

    const previousWeekStart = addDays(startOfCurrentWeek, -7);
    const previousWeekEnd = addDays(endOfCurrentWeek, -7);
    const nextWeekStart = addDays(startOfCurrentWeek, 7);
    const nextWeekEnd = addDays(endOfCurrentWeek, 7);

    queryClient.prefetchQuery(
      ["timetable", auth.id, previousWeekStart.toISOString()],
      () =>
        fetchTimetable(
          axiosPrivate,
          auth.id,
          previousWeekStart,
          previousWeekEnd
        )
    );

    queryClient.prefetchQuery(
      ["timetable", auth.id, nextWeekStart.toISOString()],
      () => fetchTimetable(axiosPrivate, auth.id, nextWeekStart, nextWeekEnd)
    );
  }, [auth, startOfCurrentWeek, endOfCurrentWeek, axiosPrivate, queryClient]);

  return (
    <Timetable
      lessons={currentWeekLessons}
      timeSlots={timeSlots}
      startOfWeek={startOfCurrentWeek}
    />
  );
};

export default TimetablePage;
