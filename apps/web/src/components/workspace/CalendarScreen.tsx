"use client";

import { useMemo, useState } from "react";
import { PageHeading, WorkspaceShell, workspaceStyles as styles } from "./WorkspaceShell";

type CalendarEvent = { day: number; start: number; length: number; name: string; service: string; tone: "blush" | "green" | "blue" | "lavender" | "yellow" };

const sampleWeekStart = new Date(2026, 9, 5);
const events: CalendarEvent[] = [
  { day: 0, start: 1, length: 1.35, name: "Alexis R.", service: "Haircut", tone: "blush" },
  { day: 0, start: 4.2, length: 1.35, name: "Open", service: "", tone: "green" },
  { day: 0, start: 5.7, length: 1.2, name: "Color", service: "Touch Up", tone: "blue" },
  { day: 1, start: 2.8, length: 1.25, name: "New Client", service: "Consult", tone: "blue" },
  { day: 2, start: 0.8, length: 1.4, name: "Gia M.", service: "Highlights", tone: "lavender" },
  { day: 2, start: 4.2, length: 1.35, name: "Alexis E.", service: "Long Haircut", tone: "blush" },
  { day: 2, start: 6.25, length: 1.25, name: "Amara D.", service: "Haircut", tone: "blush" },
  { day: 4, start: 1, length: 1.8, name: "Iris P.", service: "Color", tone: "yellow" },
  { day: 4, start: 5.5, length: 1.45, name: "Priya S.", service: "Child Style", tone: "yellow" },
];
const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];

function midnight(date: Date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
function addDays(date: Date, amount: number) { const result = midnight(date); result.setDate(result.getDate() + amount); return result; }
function startOfWeek(date: Date) { return addDays(date, date.getDay() === 0 ? -6 : 1 - date.getDay()); }
function sameDay(first: Date, second: Date) { return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate(); }
function dateKey(date: Date) { return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`; }
function eventDate(event: CalendarEvent) { return addDays(sampleWeekStart, event.day); }

export function CalendarScreen() {
  const today = useMemo(() => midnight(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const weekStart = startOfWeek(selectedDate);
  const visibleDates = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const heading = `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(visibleDates[0])} – ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(visibleDates[visibleDates.length - 1])}`;
  const dateGridStyle = { gridTemplateColumns: `45px repeat(${visibleDates.length}, minmax(120px, 1fr))` };

  function move(direction: -1 | 1) { setSelectedDate((date) => addDays(date, direction * 7)); }

  return <WorkspaceShell active="calendar"><section>
    <PageHeading title="Calendar" subtitle="Your schedule, designed around your day." action={<button className={styles.primaryButton} type="button">＋ Book Appointment</button>} />
    <div className={styles.calendarControls}><button className={styles.secondaryButton} type="button" onClick={() => setSelectedDate(today)}>Today</button><button className={styles.squareButton} type="button" onClick={() => move(-1)} aria-label="Previous week">‹</button><strong aria-live="polite">{heading}</strong><button className={styles.squareButton} type="button" onClick={() => move(1)} aria-label="Next week">›</button></div>
    <div className={styles.calendarLayout}><section className={styles.calendarGrid} aria-label="Weekly calendar"><div className={styles.calendarHeaders} style={dateGridStyle}><div />{visibleDates.map((date) => <button type="button" className={sameDay(date, selectedDate) ? styles.selectedDay : ""} onClick={() => setSelectedDate(date)} key={dateKey(date)}><b>{new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date)}</b><span>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)}</span></button>)}</div><div className={styles.calendarBody}><div className={styles.timeLabels}>{times.map((time) => <span key={time}>{time}</span>)}</div><div className={styles.calendarDays} style={{ gridTemplateColumns: `repeat(${visibleDates.length}, minmax(120px, 1fr))` }}>{visibleDates.map((date) => <div className={`${styles.dayColumn} ${sameDay(date, today) ? styles.todayColumn : ""}`} key={dateKey(date)}>{events.filter((event) => sameDay(eventDate(event), date)).map((event) => <div className={`${styles.eventBlock} ${styles[event.tone]}`} style={{ top: `${event.start * 9.09}%`, height: `${event.length * 9.09}%` }} key={`${event.name}-${event.start}`}><b>{event.name}</b><span>{event.service}</span></div>)}</div>)}</div></div></section><DayDetailRail selectedDate={selectedDate} /></div>
  </section></WorkspaceShell>;
}

function DayDetailRail({ selectedDate }: { selectedDate: Date }) {
  const appointments = events.filter((event) => sameDay(eventDate(event), selectedDate));
  const bookedHours = appointments.filter((event) => event.name !== "Open").reduce((total, event) => total + event.length, 0);
  const title = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }).format(selectedDate);
  return <aside className={styles.detailRail}><h2>{title}</h2><div className={styles.dayStats}><div><b>▣</b><strong>{appointments.length}</strong><span>Appts</span></div><div><b>◷</b><strong>{bookedHours.toFixed(bookedHours ? 1 : 0)}h</strong><span>Booked</span></div><div><b>◉</b><strong>{appointments.length ? "—" : "0%"}</strong><span>Capacity</span></div></div><div className={styles.railTabs}><button className={styles.railTabActive} type="button">Appointments ({appointments.length})</button></div><div className={styles.appointmentList}>{appointments.length ? appointments.map((event) => <div className={styles.appointmentItem} key={`${event.name}-${event.start}`}><time>{formatTime(event.start)}</time><div><strong className={event.name === "Open" ? styles.openText : ""}>{event.name}</strong><span>{event.service || "Available"}</span></div>{event.name === "Open" && <span className={`${styles.statusPill} ${styles.bookPill}`}>Book now</span>}</div>) : <p className={styles.emptySchedule}>No appointments scheduled.</p>}</div></aside>;
}

function formatTime(start: number) {
  const totalMinutes = Math.round((8 + start) * 60);
  const hour = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hour > 12 ? hour - 12 : hour}:${minutes.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}
