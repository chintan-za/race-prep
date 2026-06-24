import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Play, Dumbbell, Footprints, Info, X } from "lucide-react";

// ---------- Design tokens (carried from prior plan: dark track theme, terracotta accent) ----------
const C = {
  track: "#1c1f1a",
  trackLight: "#262a22",
  trackLighter: "#2f342a",
  chalk: "#f3efe3",
  lane: "#d8521f",
  laneSoft: "#e8a06c",
  uphill: "#8a9a5b",
  downhill: "#5b8a9a",
  line: "#3d4234",
  muted: "#9a9d8e",
};

// ---------- Video references ----------
// Only using video links/IDs verified via search. Channel links used where a specific
// video wasn't confirmed, so nothing is fabricated.
const VIDEOS = {
  medranoBeginner: {
    title: "Beginner Calisthenics Workout — Frank Medrano",
    url: "https://www.youtube.com/watch?v=Mv3P4qMkEwc",
    creator: "Frank Medrano",
  },
  hybridChannel: {
    title: "Hybrid Calisthenics — Hampton Liu (channel)",
    url: "https://www.youtube.com/@HybridCalisthenics",
    creator: "Hampton Liu",
  },
  hybridRoutine: {
    title: "The Hybrid Routine — 6 foundational moves",
    url: "https://www.hybridcalisthenics.com/routine",
    creator: "Hampton Liu",
  },
};

// ---------- Data: 10 weeks across 4 races (10km then three half marathons) ----------
const WEEKS = [
  {
    label: "18 – 21 June",
    title: "Week 1",
    subtitle: "Rebuild gently, test the legs",
    days: [
      { name: "Thu", type: "gym", summary: "Gym — legs", detail: "Warm-up, treadmill 17/break/17 at 6 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 2, reps: 12, weight: "Light — ~50% of comfortable", rest: "90 sec" },
          { name: "Leg curl machine", sets: 2, reps: 12, weight: "Light", rest: "90 sec" },
          { name: "Leg extension machine", sets: 2, reps: 12, weight: "Light", rest: "90 sec" },
        ], video: "hybridChannel" },
      { name: "Fri", type: "run", summary: "Treadmill run", detail: "Treadmill 6km easy, conversational pace, 0-1% incline." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only — counts as rest." },
      { name: "Sun", type: "run", summary: "Long treadmill run", detail: "Treadmill 13-14km equivalent (roughly 100-110 min), easy effort, light incline variation instead of hills.", long: true },
    ],
  },
  {
    label: "22 – 28 June",
    title: "Week 2",
    subtitle: "Build toward 10km speed",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "gym", summary: "Gym — legs", detail: "Warm-up, treadmill 17/break/17 at 6.5 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 2, reps: 12, weight: "Light-moderate", rest: "90 sec" },
          { name: "Leg curl machine", sets: 2, reps: 12, weight: "Light", rest: "90 sec" },
          { name: "Leg extension machine", sets: 2, reps: 12, weight: "Light", rest: "90 sec" },
        ], video: "hybridChannel" },
      { name: "Wed", type: "run", summary: "Treadmill incline", detail: "Within your usual 17/17 structure, set incline to 3-4% for one block." },
      { name: "Thu", type: "gym", summary: "Gym — chest & arms", detail: "Warm-up, treadmill as usual, then:",
        exercises: [
          { name: "Chest press machine", sets: 2, reps: 10, weight: "25 kg", rest: "90 sec" },
          { name: "Lat pulldown", sets: 2, reps: 10, weight: "25 kg", rest: "90 sec" },
          { name: "Tricep pulldown", sets: 2, reps: 10, weight: "25 kg", rest: "90 sec" },
        ], video: "medranoBeginner" },
      { name: "Fri", type: "run", summary: "Treadmill run", detail: "Treadmill 6-7km easy-steady, 0-1% incline." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only." },
      { name: "Sun", type: "run", summary: "Long treadmill run", detail: "Treadmill 14-15km equivalent, easy effort — your peak distance before the 10km race.", long: true },
    ],
  },
  {
    label: "29 June – 5 July",
    title: "Week 3",
    subtitle: "Sharpen for the 10km",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "gym", summary: "Gym — legs", detail: "Warm-up, treadmill 17/break/17 at 7 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 3, reps: 10, weight: "Moderate — step up slightly", rest: "90 sec" },
          { name: "Bulgarian split squat (dumbbells)", sets: 2, reps: "10 each leg", weight: "10 kg per hand", rest: "90 sec" },
          { name: "Seated calf raise", sets: 2, reps: 12, weight: "Light-moderate", rest: "60 sec" },
        ], video: "hybridRoutine" },
      { name: "Wed", type: "run", summary: "Treadmill tempo", detail: "5km with the middle 2km at a brisker, comfortably-hard pace." },
      { name: "Thu", type: "gym", summary: "Gym — chest & arms", detail: "Warm-up, treadmill as usual, then:",
        exercises: [
          { name: "Chest press machine", sets: 3, reps: 10, weight: "30 kg", rest: "90 sec" },
          { name: "Lat pulldown", sets: 3, reps: 10, weight: "30 kg", rest: "90 sec" },
          { name: "Ab crunch machine", sets: 2, reps: 10, weight: "30 kg", rest: "60 sec" },
        ], video: "medranoBeginner" },
      { name: "Fri", type: "run", summary: "Treadmill easy", detail: "5km easy, relaxed — start backing off before race week." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only." },
      { name: "Sun", type: "run", summary: "Easy long treadmill run", detail: "Treadmill 10km equivalent, easy, comfortable — last long effort before the 10km race.", long: true },
    ],
  },
  {
    label: "6 – 12 July",
    title: "Week 4 — 10km race week",
    subtitle: "Taper, then race comfortably",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "run", summary: "Treadmill easy", detail: "4km easy, flat, relaxed." },
      { name: "Wed", type: "gym", summary: "Very light", detail: "15min easy treadmill walk/jog plus light stretching. No heavy lifting." },
      { name: "Thu", type: "run", summary: "Treadmill shakeout", detail: "3km very relaxed, just to keep legs moving." },
      { name: "Fri", type: "off", summary: "Rest", detail: "Start carb-loading, hydrate well." },
      { name: "Sat", type: "volunteer", summary: "Volunteer + rest", detail: "Light walking only. Lay out race kit, early night." },
      { name: "Sun", type: "race", summary: "RACE DAY — 10km", detail: "Run by feel, RPE 6-7. This is also a fitness check ahead of the half marathon block.", long: true },
    ],
  },
  {
    label: "13 – 19 July",
    title: "Week 5",
    subtitle: "Recover, then start the half-marathon build",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "off", summary: "Recovery", detail: "Light walk only — legs need 2-3 days to absorb the 10km race." },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "4km very easy, see how the legs feel." },
      { name: "Thu", type: "gym", summary: "Gym — legs, light", detail: "Warm-up, treadmill 17/break/17 at 6.5 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 2, reps: 10, weight: "Light, rebuilding after the race", rest: "90 sec" },
          { name: "Leg curl machine", sets: 2, reps: 10, weight: "Light", rest: "90 sec" },
        ], video: "hybridChannel" },
      { name: "Fri", type: "run", summary: "Treadmill run", detail: "Treadmill 6km easy, conversational pace, 0-1% incline." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only." },
      { name: "Sun", type: "run", summary: "Long treadmill run", detail: "Treadmill 15-16km equivalent, easy effort — first long session of the half-marathon block.", long: true },
    ],
  },
  {
    label: "20 – 26 July",
    title: "Week 6 — Half #1 race week",
    subtitle: "Short taper into the first half marathon",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "gym", summary: "Gym — chest & arms, light", detail: "Warm-up, treadmill as usual, then:",
        exercises: [
          { name: "Chest press machine", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
          { name: "Lat pulldown", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
        ], video: "medranoBeginner" },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "5km easy, flat." },
      { name: "Thu", type: "run", summary: "Treadmill shakeout", detail: "4km relaxed, light incline only." },
      { name: "Fri", type: "off", summary: "Rest", detail: "Start carb-loading, hydrate well." },
      { name: "Sat", type: "volunteer", summary: "Volunteer + rest", detail: "Light walking only. Lay out race kit, early night." },
      { name: "Sun", type: "race", summary: "RACE DAY — 21.1km (#1)", detail: "Comfortable finish, not all-out. RPE 5-6, walk hills freely. This doubles as a long training run for the races ahead.", long: true },
    ],
  },
  {
    label: "27 July – 2 Aug",
    title: "Week 7",
    subtitle: "Recover from half #1",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "off", summary: "Recovery", detail: "Light walk only — give the legs real recovery after 21.1km." },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "4-5km very easy, gauge how the legs feel." },
      { name: "Thu", type: "gym", summary: "Gym — legs, light", detail: "Warm-up, treadmill 17/break/17 at 6.5-7 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 2, reps: 10, weight: "Light-moderate", rest: "90 sec" },
          { name: "Bulgarian split squat (dumbbells)", sets: 2, reps: "8 each leg", weight: "8-10 kg per hand", rest: "90 sec" },
        ], video: "hybridRoutine" },
      { name: "Fri", type: "run", summary: "Treadmill run", detail: "Treadmill 6km easy, conversational pace, 0-1% incline." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only." },
      { name: "Sun", type: "run", summary: "Moderate long treadmill run", detail: "Treadmill 12-13km equivalent, easy, comfortable — rebuilding toward half #2.", long: true },
    ],
  },
  {
    label: "3 – 9 Aug",
    title: "Week 8 — Half #2 race week",
    subtitle: "Maintain, then race comfortably again",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "gym", summary: "Gym — chest & arms, light", detail: "Warm-up, treadmill as usual, then:",
        exercises: [
          { name: "Chest press machine", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
          { name: "Lat pulldown", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
        ], video: "medranoBeginner" },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "5km easy, flat." },
      { name: "Thu", type: "run", summary: "Treadmill shakeout", detail: "4km relaxed, light incline only." },
      { name: "Fri", type: "off", summary: "Rest", detail: "Carb-load, hydrate well." },
      { name: "Sat", type: "volunteer", summary: "Volunteer + rest", detail: "Light walking only. Lay out kit, early night." },
      { name: "Sun", type: "race", summary: "RACE DAY — 21.1km (#2)", detail: "Comfortable finish again, RPE 5-6. Two halves two weeks apart is real load — patience over pace.", long: true },
    ],
  },
  {
    label: "10 – 16 Aug",
    title: "Week 9",
    subtitle: "Recover from half #2",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "off", summary: "Recovery", detail: "Light walk only — this recovery matters more each time, don't skip it." },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "4-5km very easy." },
      { name: "Thu", type: "gym", summary: "Gym — legs, light", detail: "Warm-up, treadmill 17/break/17 at 6.5-7 km/h, then:",
        exercises: [
          { name: "Leg press", sets: 2, reps: 10, weight: "Light-moderate", rest: "90 sec" },
          { name: "Leg curl machine", sets: 2, reps: 10, weight: "Light", rest: "90 sec" },
        ], video: "hybridChannel" },
      { name: "Fri", type: "run", summary: "Treadmill run", detail: "Treadmill 6km easy, conversational pace, 0-1% incline." },
      { name: "Sat", type: "volunteer", summary: "Parkrun volunteering", detail: "Light walking/standing only." },
      { name: "Sun", type: "run", summary: "Moderate long treadmill run", detail: "Treadmill 12-13km equivalent, easy, comfortable.", long: true },
    ],
  },
  {
    label: "17 – 23 Aug",
    title: "Week 10 — Half #3 race week",
    subtitle: "Final half, finish strong and stay healthy",
    days: [
      { name: "Mon", type: "off", summary: "Off — work day", detail: "No training today." },
      { name: "Tue", type: "gym", summary: "Gym — chest & arms, light", detail: "Warm-up, treadmill as usual, then:",
        exercises: [
          { name: "Chest press machine", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
          { name: "Lat pulldown", sets: 2, reps: 10, weight: "25-30 kg", rest: "90 sec" },
        ], video: "medranoBeginner" },
      { name: "Wed", type: "run", summary: "Treadmill easy", detail: "5km easy, flat." },
      { name: "Thu", type: "run", summary: "Treadmill shakeout", detail: "4km relaxed." },
      { name: "Fri", type: "off", summary: "Rest", detail: "Carb-load, hydrate well." },
      { name: "Sat", type: "volunteer", summary: "Volunteer + rest", detail: "Light walking only. Lay out kit, early night." },
      { name: "Sun", type: "race", summary: "RACE DAY — 21.1km (#3)", detail: "Three halves in five weeks is a real season — finishing healthy is the win. RPE 5-6, walk what you need to.", long: true },
    ],
  },
];

const TYPE_META = {
  off: { label: "Rest", icon: null, color: C.muted },
  gym: { label: "Gym", icon: Dumbbell, color: C.uphill },
  run: { label: "Run", icon: Footprints, color: C.lane },
  volunteer: { label: "Volunteer", icon: null, color: C.downhill },
  race: { label: "Race", icon: Footprints, color: C.lane },
};

// ---------- Glossary ----------
const GLOSSARY = [
  { term: "3×10", def: "3 sets of 10 reps. Do 10, rest, repeat 2 more times." },
  { term: "Rep", def: "One full repetition of the movement." },
  { term: "Set", def: "A block of reps done without stopping." },
  { term: "Rest (sets)", def: "60-90 seconds between sets — enough to recover, not fully cool down." },
  { term: "Tempo", def: "Speed of the movement. Controlled = ~2 sec down, 2 sec up." },
  { term: "Incline %", def: "Treadmill slope. 0% flat, 6% a noticeable hill." },
  { term: "Easy / conversational", def: "A pace where you could speak full sentences without gasping." },
  { term: "RPE", def: "Rate of perceived effort out of 10. RPE 5-6 moderate, RPE 8+ near max." },
];

function GlossaryModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: C.trackLight, border: `1px solid ${C.line}`, borderRadius: 8,
          maxWidth: 480, width: "100%", maxHeight: "80vh", overflowY: "auto", padding: 20,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h3 style={{ margin: 0, color: C.laneSoft, fontSize: 16, fontFamily: "Georgia, serif" }}>Glossary</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <div style={{ color: C.lane, fontWeight: 700, fontSize: 13.5, fontFamily: "Georgia, serif" }}>{g.term}</div>
              <div style={{ color: C.chalk, fontSize: 12.5, lineHeight: 1.5, marginTop: 2 }}>{g.def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExerciseTable({ exercises, done, onToggle, dayKey }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 12 }}>
      <thead>
        <tr>
          <th style={th}></th>
          <th style={th}>Exercise</th>
          <th style={th}>Sets × reps</th>
          <th style={th}>Weight</th>
          <th style={th}>Rest</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((ex, i) => {
          const key = `${dayKey}-${i}`;
          const checked = !!done[key];
          return (
            <tr key={key}>
              <td style={td}>
                <button
                  onClick={() => onToggle(key)}
                  style={{
                    width: 20, height: 20, borderRadius: 4,
                    border: `1px solid ${checked ? C.lane : C.line}`,
                    background: checked ? C.lane : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", padding: 0,
                  }}
                  aria-label={checked ? "Mark incomplete" : "Mark complete"}
                >
                  {checked && <Check size={13} color={C.track} />}
                </button>
              </td>
              <td style={{ ...td, textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.6 : 1 }}>{ex.name}</td>
              <td style={{ ...td, opacity: checked ? 0.6 : 1 }}>{ex.sets}×{ex.reps}</td>
              <td style={{ ...td, opacity: checked ? 0.6 : 1 }}>{ex.weight}</td>
              <td style={{ ...td, opacity: checked ? 0.6 : 1 }}>{ex.rest}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const th = {
  padding: "5px 6px", border: `1px solid ${C.line}`, textAlign: "left",
  color: C.laneSoft, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.04em",
  background: "rgba(0,0,0,0.15)",
};
const td = { padding: "5px 6px", border: `1px solid ${C.line}`, color: C.chalk };

function DayCard({ day, weekIdx, dayIdx, done, onToggle }) {
  const meta = TYPE_META[day.type];
  const Icon = meta.icon;
  const dayKey = `w${weekIdx}-d${dayIdx}`;
  const video = day.video ? VIDEOS[day.video] : null;

  return (
    <div
      style={{
        background: day.type === "race" ? "#2a2017" : C.trackLight,
        borderRadius: 6,
        marginBottom: 10,
        padding: "13px 15px",
        borderLeft: `3px solid ${meta.color}`,
        opacity: day.type === "off" ? 0.6 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.chalk, display: "flex", alignItems: "center", gap: 6 }}>
          {Icon && <Icon size={14} color={meta.color} />}
          {day.name}
        </span>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.muted }}>
          {meta.label}
        </span>
      </div>
      <div style={{ fontSize: 13.5, color: C.chalk, fontWeight: 600, marginBottom: 4 }}>{day.summary}</div>
      <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{day.detail}</div>

      {day.exercises && (
        <ExerciseTable exercises={day.exercises} done={done} onToggle={onToggle} dayKey={dayKey} />
      )}

      {video && (
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10,
            fontSize: 12, color: C.laneSoft, textDecoration: "none",
            border: `1px solid ${C.line}`, borderRadius: 4, padding: "5px 9px",
          }}
        >
          <Play size={12} fill={C.laneSoft} /> {video.title}
        </a>
      )}
    </div>
  );
}

export default function TrainingApp() {
  const [weekIdx, setWeekIdx] = useState(0);
  const [done, setDone] = useState({});
  const [showGlossary, setShowGlossary] = useState(false);
  const week = WEEKS[weekIdx];

  const toggle = (key) => setDone((d) => ({ ...d, [key]: !d[key] }));

  // Progress: fraction of exercise checkboxes completed this week
  const weekExerciseKeys = [];
  week.days.forEach((day, dIdx) => {
    if (day.exercises) {
      day.exercises.forEach((_, i) => weekExerciseKeys.push(`w${weekIdx}-d${dIdx}-${i}`));
    }
  });
  const completedCount = weekExerciseKeys.filter((k) => done[k]).length;

  return (
    <div style={{
      background: C.track, color: C.chalk, minHeight: "100vh",
      fontFamily: "'Helvetica Neue', Arial, sans-serif", WebkitFontSmoothing: "antialiased",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 50px" }}>

        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.laneSoft, margin: "0 0 6px" }}>
            10km 12 Jul · 21.1km × 3 — 26 Jul, 9 Aug, 23 Aug
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, margin: "0 0 4px", lineHeight: 1.15 }}>
            Race prep <em style={{ color: C.lane, fontStyle: "normal" }}>tracker</em>
          </h1>
          <p style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.4, margin: 0 }}>
            Four races, ten weeks, gym-only. The 10km is a fitness check; all three halves are
            finish-comfortable, not all-out. Tap exercises to check them off.
          </p>
        </div>

        {/* Glossary button */}
        <button
          onClick={() => setShowGlossary(true)}
          style={{
            display: "flex", alignItems: "center", gap: 6, background: C.trackLight,
            border: `1px solid ${C.line}`, borderRadius: 5, padding: "8px 12px",
            color: C.laneSoft, fontSize: 12.5, marginBottom: 16, cursor: "pointer", width: "100%",
          }}
        >
          <Info size={14} /> What does "3×10" mean? Tap for glossary
        </button>

        {/* Week navigator */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.trackLight, border: `1px solid ${C.line}`, borderRadius: 6,
          padding: "8px 6px", marginBottom: 6,
        }}>
          <button
            onClick={() => setWeekIdx((w) => Math.max(0, w - 1))}
            disabled={weekIdx === 0}
            style={navBtn(weekIdx === 0)}
          >
            <ChevronLeft size={18} color={weekIdx === 0 ? C.muted : C.chalk} />
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: C.laneSoft }}>
              {week.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Georgia, serif" }}>{week.title}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{week.subtitle}</div>
          </div>
          <button
            onClick={() => setWeekIdx((w) => Math.min(WEEKS.length - 1, w + 1))}
            disabled={weekIdx === WEEKS.length - 1}
            style={navBtn(weekIdx === WEEKS.length - 1)}
          >
            <ChevronRight size={18} color={weekIdx === WEEKS.length - 1 ? C.muted : C.chalk} />
          </button>
        </div>

        {/* Week dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
          {WEEKS.map((w, i) => (
            <button
              key={i}
              onClick={() => setWeekIdx(i)}
              style={{
                width: 7, height: 7, borderRadius: "50%", border: "none", cursor: "pointer",
                background: i === weekIdx ? C.lane : C.line, padding: 0,
              }}
              aria-label={`Go to ${w.title}`}
            />
          ))}
        </div>

        {/* Progress */}
        {weekExerciseKeys.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginBottom: 4 }}>
              <span>Gym exercises this week</span>
              <span>{completedCount}/{weekExerciseKeys.length}</span>
            </div>
            <div style={{ height: 5, background: C.line, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", background: C.lane, borderRadius: 3,
                width: `${weekExerciseKeys.length ? (completedCount / weekExerciseKeys.length) * 100 : 0}%`,
                transition: "width 0.3s",
              }} />
            </div>
          </div>
        )}

        {/* Day cards */}
        <div>
          {week.days.map((day, dIdx) => (
            <DayCard key={dIdx} day={day} weekIdx={weekIdx} dayIdx={dIdx} done={done} onToggle={toggle} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: 28, paddingTop: 14, borderTop: `1px solid ${C.line}`,
          fontSize: 11, color: C.muted, lineHeight: 1.6,
        }}>
          Weights are starting points from your pre-injury baseline, scaled down to rebuild
          safely. All running now happens on the gym treadmill, including long runs — distances
          are given as treadmill-equivalent effort and time, not outdoor routes. Three half
          marathons two weeks apart is real cumulative load — each is run at a comfortable, not
          maximal, effort, and the recovery week after each one matters as much as the training
          itself. If anything feels sharp or wrong, drop the weight, skip the session, or walk
          more of the next race — finishing healthy across all four races beats a fast time in
          any one of them.
        </div>
      </div>

      {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
    </div>
  );
}

function navBtn(disabled) {
  return {
    background: "none", border: "none", padding: 8, cursor: disabled ? "default" : "pointer",
    display: "flex", alignItems: "center",
  };
}
