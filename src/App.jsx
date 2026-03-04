import { useState, useEffect, useCallback } from "react";

const EMPLOYEES = [{"id":"E1001","name":"דנה אלון","status":"active","roles":["מחסנאי","קופאי","נציג שירות"],"companies":["חברת בת ה","חברת בת ב","חברת בת ד"],"daily_standard":9},{"id":"E1002","name":"עמית אדרי","status":"active","roles":["אחראי משמרת","סדרן","קופאי","מאבטח"],"companies":["חברת בת ג","חברת בת ב"],"daily_standard":7.5},{"id":"E1003","name":"דניאל סויסה","status":"active","roles":["מלקט","מנהל סניף"],"companies":["חברת בת ג","חברת בת ד"],"daily_standard":9},{"id":"E1004","name":"טל אביטל","status":"active","roles":["טכנאי","מאבטח"],"companies":["חברת בת ז","חברת בת ד","חברת בת ח"],"daily_standard":8.5},{"id":"E1005","name":"מאיה סויסה","status":"active","roles":["סדרן","מחסנאי"],"companies":["חברת בת ח","חברת בת ב"],"daily_standard":7},{"id":"E1007","name":"שחר אביטל","status":"active","roles":["מלקט","נהג","טכנאי","סדרן"],"companies":["חברת בת ב","חברת בת ז"],"daily_standard":8.5},{"id":"E1008","name":"שני סויסה","status":"active","roles":["קופאי","מחסנאי"],"companies":["חברת בת ו","חברת בת ח","חברת בת ג","חברת בת ד"],"daily_standard":7.5},{"id":"E1009","name":"רון לוי","status":"active","roles":["נהג","קופאי","מאבטח","אחראי משמרת"],"companies":["חברת בת ה","חברת בת ו","חברת בת א","חברת בת ג"],"daily_standard":9},{"id":"E1010","name":"טל ביטון","status":"active","roles":["טכנאי","מנהל סניף"],"companies":["חברת בת ו","חברת בת ח","חברת בת ב","חברת בת ה"],"daily_standard":7.5},{"id":"E1011","name":"דנה אלון","status":"active","roles":["סדרן","טכנאי"],"companies":["חברת בת ו","חברת בת ח","חברת בת א"],"daily_standard":7},{"id":"E1012","name":"עמית סויסה","status":"active","roles":["מנהל סניף","נהג","נציג שירות","אחראי משמרת"],"companies":["חברת בת ו","חברת בת ג","חברת בת א","חברת בת ב"],"daily_standard":7},{"id":"E1015","name":"שני אלון","status":"active","roles":["קופאי","מנהל סניף"],"companies":["חברת בת א","חברת בת ב"],"daily_standard":9},{"id":"E1017","name":"יוסי אדרי","status":"active","roles":["סדרן","מאבטח"],"companies":["חברת בת ד","חברת בת ג","חברת בת ה"],"daily_standard":7.5},{"id":"E1018","name":"נועם שטרן","status":"active","roles":["קופאי","מאבטח","נהג"],"companies":["חברת בת ז","חברת בת ח","חברת בת ה"],"daily_standard":7.5},{"id":"E1022","name":"רון אביטל","status":"active","roles":["מלקט","נציג שירות","טכנאי","מנהל סניף"],"companies":["חברת בת ה","חברת בת ח"],"daily_standard":7.5},{"id":"E1024","name":"מאיה אברהם","status":"active","roles":["נהג","קופאי","מלקט","מחסנאי"],"companies":["חברת בת ד","חברת בת ו","חברת בת א"],"daily_standard":8.5},{"id":"E1029","name":"נועה ביטון","status":"active","roles":["מלקט","מאבטח"],"companies":["חברת בת ב","חברת בת ז","חברת בת ג","חברת בת א"],"daily_standard":9},{"id":"E1042","name":"מאיה אלון","status":"active","roles":["מאבטח","מנהל סניף","סדרן","נציג שירות"],"companies":["חברת בת א","חברת בת ד","חברת בת ח"],"daily_standard":9},{"id":"E1048","name":"נועם מזרחי","status":"active","roles":["מלקט","נהג","קופאי","מנהל סניף"],"companies":["חברת בת ה","חברת בת א","חברת בת ו","חברת בת ג"],"daily_standard":7.5}];

const RATES_RAW = [{"employee_id":"E1001","role":"מחסנאי","company":"חברת בת ה","rate":68},{"employee_id":"E1001","role":"מחסנאי","company":"חברת בת ב","rate":87},{"employee_id":"E1001","role":"מחסנאי","company":"חברת בת ד","rate":95},{"employee_id":"E1001","role":"קופאי","company":"חברת בת ה","rate":63},{"employee_id":"E1001","role":"קופאי","company":"חברת בת ב","rate":80},{"employee_id":"E1001","role":"קופאי","company":"חברת בת ד","rate":66},{"employee_id":"E1001","role":"נציג שירות","company":"חברת בת ה","rate":53},{"employee_id":"E1001","role":"נציג שירות","company":"חברת בת ב","rate":53},{"employee_id":"E1001","role":"נציג שירות","company":"חברת בת ד","rate":61},{"employee_id":"E1002","role":"אחראי משמרת","company":"חברת בת ג","rate":93},{"employee_id":"E1002","role":"אחראי משמרת","company":"חברת בת ב","rate":91},{"employee_id":"E1002","role":"סדרן","company":"חברת בת ג","rate":95},{"employee_id":"E1002","role":"סדרן","company":"חברת בת ב","rate":81},{"employee_id":"E1002","role":"קופאי","company":"חברת בת ג","rate":54},{"employee_id":"E1002","role":"קופאי","company":"חברת בת ב","rate":85},{"employee_id":"E1002","role":"מאבטח","company":"חברת בת ג","rate":82},{"employee_id":"E1002","role":"מאבטח","company":"חברת בת ב","rate":95},{"employee_id":"E1003","role":"מלקט","company":"חברת בת ג","rate":98},{"employee_id":"E1003","role":"מלקט","company":"חברת בת ד","rate":58},{"employee_id":"E1003","role":"מנהל סניף","company":"חברת בת ג","rate":86},{"employee_id":"E1003","role":"מנהל סניף","company":"חברת בת ד","rate":75},{"employee_id":"E1004","role":"טכנאי","company":"חברת בת ז","rate":97},{"employee_id":"E1004","role":"טכנאי","company":"חברת בת ד","rate":67},{"employee_id":"E1004","role":"טכנאי","company":"חברת בת ח","rate":79},{"employee_id":"E1004","role":"מאבטח","company":"חברת בת ז","rate":72},{"employee_id":"E1004","role":"מאבטח","company":"חברת בת ד","rate":99},{"employee_id":"E1004","role":"מאבטח","company":"חברת בת ח","rate":57},{"employee_id":"E1005","role":"סדרן","company":"חברת בת ח","rate":77},{"employee_id":"E1005","role":"סדרן","company":"חברת בת ב","rate":59},{"employee_id":"E1005","role":"מחסנאי","company":"חברת בת ח","rate":97},{"employee_id":"E1005","role":"מחסנאי","company":"חברת בת ב","rate":79},{"employee_id":"E1007","role":"מלקט","company":"חברת בת ב","rate":53},{"employee_id":"E1007","role":"מלקט","company":"חברת בת ז","rate":54},{"employee_id":"E1007","role":"נהג","company":"חברת בת ב","rate":68},{"employee_id":"E1007","role":"נהג","company":"חברת בת ז","rate":85},{"employee_id":"E1007","role":"טכנאי","company":"חברת בת ב","rate":62},{"employee_id":"E1007","role":"טכנאי","company":"חברת בת ז","rate":90},{"employee_id":"E1007","role":"סדרן","company":"חברת בת ב","rate":63},{"employee_id":"E1007","role":"סדרן","company":"חברת בת ז","rate":88},{"employee_id":"E1008","role":"קופאי","company":"חברת בת ו","rate":59},{"employee_id":"E1008","role":"קופאי","company":"חברת בת ח","rate":81},{"employee_id":"E1008","role":"קופאי","company":"חברת בת ג","rate":79},{"employee_id":"E1008","role":"קופאי","company":"חברת בת ד","rate":70},{"employee_id":"E1008","role":"מחסנאי","company":"חברת בת ו","rate":76},{"employee_id":"E1008","role":"מחסנאי","company":"חברת בת ח","rate":99},{"employee_id":"E1008","role":"מחסנאי","company":"חברת בת ג","rate":88},{"employee_id":"E1008","role":"מחסנאי","company":"חברת בת ד","rate":53},{"employee_id":"E1009","role":"נהג","company":"חברת בת ה","rate":72},{"employee_id":"E1009","role":"נהג","company":"חברת בת ו","rate":68},{"employee_id":"E1009","role":"נהג","company":"חברת בת א","rate":59},{"employee_id":"E1009","role":"נהג","company":"חברת בת ג","rate":77},{"employee_id":"E1009","role":"קופאי","company":"חברת בת ה","rate":76},{"employee_id":"E1009","role":"קופאי","company":"חברת בת ו","rate":93},{"employee_id":"E1009","role":"קופאי","company":"חברת בת א","rate":94},{"employee_id":"E1009","role":"קופאי","company":"חברת בת ג","rate":87},{"employee_id":"E1009","role":"מאבטח","company":"חברת בת ה","rate":61},{"employee_id":"E1009","role":"מאבטח","company":"חברת בת ו","rate":72},{"employee_id":"E1009","role":"מאבטח","company":"חברת בת א","rate":67},{"employee_id":"E1009","role":"מאבטח","company":"חברת בת ג","rate":68},{"employee_id":"E1009","role":"אחראי משמרת","company":"חברת בת ה","rate":84},{"employee_id":"E1009","role":"אחראי משמרת","company":"חברת בת ו","rate":87},{"employee_id":"E1009","role":"אחראי משמרת","company":"חברת בת א","rate":51},{"employee_id":"E1009","role":"אחראי משמרת","company":"חברת בת ג","rate":61},{"employee_id":"E1010","role":"טכנאי","company":"חברת בת ו","rate":98},{"employee_id":"E1010","role":"טכנאי","company":"חברת בת ח","rate":51},{"employee_id":"E1010","role":"טכנאי","company":"חברת בת ב","rate":69},{"employee_id":"E1010","role":"טכנאי","company":"חברת בת ה","rate":79},{"employee_id":"E1010","role":"מנהל סניף","company":"חברת בת ו","rate":97},{"employee_id":"E1010","role":"מנהל סניף","company":"חברת בת ח","rate":98},{"employee_id":"E1010","role":"מנהל סניף","company":"חברת בת ב","rate":78},{"employee_id":"E1010","role":"מנהל סניף","company":"חברת בת ה","rate":53},{"employee_id":"E1011","role":"סדרן","company":"חברת בת ו","rate":77},{"employee_id":"E1011","role":"סדרן","company":"חברת בת ח","rate":92},{"employee_id":"E1011","role":"סדרן","company":"חברת בת א","rate":51},{"employee_id":"E1011","role":"טכנאי","company":"חברת בת ו","rate":95},{"employee_id":"E1011","role":"טכנאי","company":"חברת בת ח","rate":98},{"employee_id":"E1011","role":"טכנאי","company":"חברת בת א","rate":82},{"employee_id":"E1012","role":"מנהל סניף","company":"חברת בת ו","rate":52},{"employee_id":"E1012","role":"מנהל סניף","company":"חברת בת ג","rate":93},{"employee_id":"E1012","role":"מנהל סניף","company":"חברת בת א","rate":59},{"employee_id":"E1012","role":"מנהל סניף","company":"חברת בת ב","rate":59},{"employee_id":"E1012","role":"נהג","company":"חברת בת ו","rate":83},{"employee_id":"E1012","role":"נהג","company":"חברת בת ג","rate":86},{"employee_id":"E1012","role":"נהג","company":"חברת בת א","rate":98},{"employee_id":"E1012","role":"נהג","company":"חברת בת ב","rate":89},{"employee_id":"E1012","role":"נציג שירות","company":"חברת בת ו","rate":88},{"employee_id":"E1012","role":"נציג שירות","company":"חברת בת ג","rate":88},{"employee_id":"E1012","role":"נציג שירות","company":"חברת בת א","rate":92},{"employee_id":"E1012","role":"נציג שירות","company":"חברת בת ב","rate":76},{"employee_id":"E1012","role":"אחראי משמרת","company":"חברת בת ו","rate":69},{"employee_id":"E1012","role":"אחראי משמרת","company":"חברת בת ג","rate":81},{"employee_id":"E1012","role":"אחראי משמרת","company":"חברת בת א","rate":97},{"employee_id":"E1012","role":"אחראי משמרת","company":"חברת בת ב","rate":81},{"employee_id":"E1015","role":"קופאי","company":"חברת בת א","rate":92},{"employee_id":"E1015","role":"קופאי","company":"חברת בת ב","rate":57},{"employee_id":"E1015","role":"מנהל סניף","company":"חברת בת א","rate":75},{"employee_id":"E1015","role":"מנהל סניף","company":"חברת בת ב","rate":65},{"employee_id":"E1017","role":"סדרן","company":"חברת בת ד","rate":95},{"employee_id":"E1017","role":"סדרן","company":"חברת בת ג","rate":85},{"employee_id":"E1017","role":"סדרן","company":"חברת בת ה","rate":58},{"employee_id":"E1017","role":"מאבטח","company":"חברת בת ד","rate":62},{"employee_id":"E1017","role":"מאבטח","company":"חברת בת ג","rate":57},{"employee_id":"E1017","role":"מאבטח","company":"חברת בת ה","rate":90},{"employee_id":"E1018","role":"קופאי","company":"חברת בת ז","rate":71},{"employee_id":"E1018","role":"קופאי","company":"חברת בת ח","rate":66},{"employee_id":"E1018","role":"קופאי","company":"חברת בת ה","rate":55},{"employee_id":"E1018","role":"מאבטח","company":"חברת בת ז","rate":81},{"employee_id":"E1018","role":"מאבטח","company":"חברת בת ח","rate":58},{"employee_id":"E1018","role":"מאבטח","company":"חברת בת ה","rate":89},{"employee_id":"E1018","role":"נהג","company":"חברת בת ז","rate":86},{"employee_id":"E1018","role":"נהג","company":"חברת בת ח","rate":59},{"employee_id":"E1018","role":"נהג","company":"חברת בת ה","rate":59},{"employee_id":"E1022","role":"מלקט","company":"חברת בת ה","rate":62},{"employee_id":"E1022","role":"מלקט","company":"חברת בת ח","rate":92},{"employee_id":"E1022","role":"נציג שירות","company":"חברת בת ה","rate":59},{"employee_id":"E1022","role":"נציג שירות","company":"חברת בת ח","rate":69},{"employee_id":"E1022","role":"טכנאי","company":"חברת בת ה","rate":77},{"employee_id":"E1022","role":"טכנאי","company":"חברת בת ח","rate":58},{"employee_id":"E1022","role":"מנהל סניף","company":"חברת בת ה","rate":77},{"employee_id":"E1022","role":"מנהל סניף","company":"חברת בת ח","rate":99},{"employee_id":"E1024","role":"נהג","company":"חברת בת ד","rate":91},{"employee_id":"E1024","role":"נהג","company":"חברת בת ו","rate":100},{"employee_id":"E1024","role":"נהג","company":"חברת בת א","rate":51},{"employee_id":"E1024","role":"קופאי","company":"חברת בת ד","rate":52},{"employee_id":"E1024","role":"קופאי","company":"חברת בת ו","rate":84},{"employee_id":"E1024","role":"קופאי","company":"חברת בת א","rate":87},{"employee_id":"E1024","role":"מלקט","company":"חברת בת ד","rate":59},{"employee_id":"E1024","role":"מלקט","company":"חברת בת ו","rate":63},{"employee_id":"E1024","role":"מלקט","company":"חברת בת א","rate":87},{"employee_id":"E1024","role":"מחסנאי","company":"חברת בת ד","rate":91},{"employee_id":"E1024","role":"מחסנאי","company":"חברת בת ו","rate":54},{"employee_id":"E1024","role":"מחסנאי","company":"חברת בת א","rate":70},{"employee_id":"E1029","role":"מלקט","company":"חברת בת ב","rate":97},{"employee_id":"E1029","role":"מלקט","company":"חברת בת ז","rate":69},{"employee_id":"E1029","role":"מלקט","company":"חברת בת ג","rate":92},{"employee_id":"E1029","role":"מלקט","company":"חברת בת א","rate":71},{"employee_id":"E1029","role":"מאבטח","company":"חברת בת ב","rate":84},{"employee_id":"E1029","role":"מאבטח","company":"חברת בת ז","rate":89},{"employee_id":"E1029","role":"מאבטח","company":"חברת בת ג","rate":74},{"employee_id":"E1029","role":"מאבטח","company":"חברת בת א","rate":74},{"employee_id":"E1042","role":"מאבטח","company":"חברת בת א","rate":97},{"employee_id":"E1042","role":"מאבטח","company":"חברת בת ד","rate":51},{"employee_id":"E1042","role":"מאבטח","company":"חברת בת ח","rate":94},{"employee_id":"E1042","role":"מנהל סניף","company":"חברת בת א","rate":54},{"employee_id":"E1042","role":"מנהל סניף","company":"חברת בת ד","rate":84},{"employee_id":"E1042","role":"מנהל סניף","company":"חברת בת ח","rate":86},{"employee_id":"E1042","role":"סדרן","company":"חברת בת א","rate":53},{"employee_id":"E1042","role":"סדרן","company":"חברת בת ד","rate":74},{"employee_id":"E1042","role":"סדרן","company":"חברת בת ח","rate":96},{"employee_id":"E1042","role":"נציג שירות","company":"חברת בת א","rate":74},{"employee_id":"E1042","role":"נציג שירות","company":"חברת בת ד","rate":71},{"employee_id":"E1042","role":"נציג שירות","company":"חברת בת ח","rate":63},{"employee_id":"E1048","role":"מלקט","company":"חברת בת ה","rate":93},{"employee_id":"E1048","role":"מלקט","company":"חברת בת א","rate":69},{"employee_id":"E1048","role":"מלקט","company":"חברת בת ו","rate":74},{"employee_id":"E1048","role":"מלקט","company":"חברת בת ג","rate":69},{"employee_id":"E1048","role":"נהג","company":"חברת בת ה","rate":53},{"employee_id":"E1048","role":"נהג","company":"חברת בת א","rate":88},{"employee_id":"E1048","role":"נהג","company":"חברת בת ו","rate":57},{"employee_id":"E1048","role":"נהג","company":"חברת בת ג","rate":81},{"employee_id":"E1048","role":"קופאי","company":"חברת בת ה","rate":96},{"employee_id":"E1048","role":"קופאי","company":"חברת בת א","rate":70},{"employee_id":"E1048","role":"קופאי","company":"חברת בת ו","rate":75},{"employee_id":"E1048","role":"קופאי","company":"חברת בת ג","rate":59},{"employee_id":"E1048","role":"מנהל סניף","company":"חברת בת ה","rate":53},{"employee_id":"E1048","role":"מנהל סניף","company":"חברת בת א","rate":55},{"employee_id":"E1048","role":"מנהל סניף","company":"חברת בת ו","rate":64},{"employee_id":"E1048","role":"מנהל סניף","company":"חברת בת ג","rate":56}];

const RATES_MAP = {};
RATES_RAW.forEach(r => { RATES_MAP[`${r.employee_id}|${r.role}|${r.company}`] = r.rate; });

function timeToMinutes(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function shiftDurationHours(start, end) { let s = timeToMinutes(start), e = timeToMinutes(end); if (e <= s) e += 1440; return (e - s) / 60; }
function nightHoursInShift(start, end) {
  let s = timeToMinutes(start), e = timeToMinutes(end);
  if (e <= s) e += 1440;
  const ov = (aS, aE, bS, bE) => Math.max(0, Math.min(aE, bE) - Math.max(aS, bS));
  return (ov(s, e, 1320, 1440) + ov(s, e, 1440, 1800)) / 60;
}
function calcDaySummary(dayShifts, employee) {
  if (!dayShifts || dayShifts.length === 0) return null;
  let totalHours = 0, totalNight = 0;
  const breakdown = [];
  dayShifts.forEach(sh => {
    const dur = shiftDurationHours(sh.start, sh.end);
    const night = nightHoursInShift(sh.start, sh.end);
    const rate = RATES_MAP[`${employee.id}|${sh.role}|${sh.company}`] || 0;
    totalHours += dur; totalNight += night;
    breakdown.push({ ...sh, hours: dur, nightHours: night, rate });
  });
  const threshold = totalNight >= 2 ? 7 : 8;
  const h100 = Math.min(totalHours, threshold);
  const h125 = totalHours > threshold ? Math.min(totalHours - threshold, 10 - threshold) : 0;
  const h150 = totalHours > 10 ? totalHours - 10 : 0;
  const maxRate = Math.max(...breakdown.map(b => b.rate), 0);
  const salary = maxRate * (h100 + h125 * 1.25 + h150 * 1.5);
  const deficit = Math.max(0, employee.daily_standard - totalHours);
  return { totalHours, totalNight, threshold, h100, h125, h150, maxRate, salary, deficit, breakdown };
}

const S = {
  page:    { background: "#c8d4e8", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, overflowY: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "24px 16px", boxSizing: "border-box" },
  phone:   { width: "100%", maxWidth: 500, background: "#F0F4FF", borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.25)", fontFamily: "'Segoe UI', Arial, sans-serif", direction: "rtl", color: "#1a1a2e", minHeight: 600 },
  header:  { background: "linear-gradient(135deg,#0f3460,#16213e)", color: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 3px 16px #0003" },
  logo:    { fontSize: 22, fontWeight: 900, letterSpacing: 2, color: "#4FC3F7" },
  sub:     { fontSize: 11, color: "#90CAF9", marginTop: 2 },
  body:    { padding: "16px" },
  card:    { background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px #0002", padding: 16, marginBottom: 14 },
  ctitle:  { fontSize: 15, fontWeight: 700, color: "#0f3460", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 },
  g2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  g3:      { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 },
  label:   { fontSize: 12, fontWeight: 600, color: "#5a6585", marginBottom: 5, display: "block" },
  input:   { width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d0d8f0", fontSize: 14, direction: "rtl", background: "#f8faff", color: "#1a1a2e", boxSizing: "border-box", outline: "none" },
  select:  { width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #d0d8f0", fontSize: 14, direction: "rtl", background: "#f8faff", color: "#1a1a2e", boxSizing: "border-box", cursor: "pointer" },
  btn:     (bg) => ({ background: bg || "linear-gradient(135deg,#0f3460,#1976D2)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" }),
  sbox:    (c) => ({ background: c, borderRadius: 10, padding: "12px 10px", textAlign: "center" }),
  snum:    { fontSize: 22, fontWeight: 900, color: "#0f3460" },
  slbl:    { fontSize: 11, color: "#607D8B", marginTop: 3, fontWeight: 600 },
  table:   { width: "100%", borderCollapse: "collapse" },
  th:      { background: "#e8edf8", color: "#0f3460", padding: "8px 10px", fontWeight: 700, fontSize: 12, textAlign: "right" },
  td:      { padding: "8px 10px", fontSize: 13, borderBottom: "1px solid #f0f4ff", textAlign: "right" },
  err:     { color: "#d32f2f", background: "#ffeaea", borderRadius: 8, padding: "9px 12px", fontSize: 12, marginTop: 8 },
  ok:      { color: "#2E7D32", background: "#e8f5e9", borderRadius: 8, padding: "9px 12px", fontSize: 12, marginTop: 8 },
  tag:     (c) => ({ display: "inline-block", background: c, borderRadius: 20, padding: "1px 8px", fontSize: 10, color: "#fff", fontWeight: 600, marginRight: 4 }),
};

export default function App() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("log");
  const [selectedDay, setSelectedDay] = useState(null);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startT, setStartT] = useState("08:00");
  const [endT, setEndT] = useState("16:00");

  const employee = EMPLOYEES.find(e => e.id === empId);
  const fmt = (n) => n.toFixed(2);
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("he-IL", { day: "numeric", month: "short", year: "numeric" });

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get("eztime-shifts"); if (r) setShifts(JSON.parse(r.value)); } catch (_) {}
      setLoading(false);
    })();
  }, []);

  const saveShifts = useCallback(async (s) => {
    try { await window.storage.set("eztime-shifts", JSON.stringify(s)); } catch (_) {}
  }, []);

  const exportCSV = () => {
    const csv = ["work_date,employee_id,role_name,company_name,start_time,end_time",
      ...shifts.map(s => `="${s.date}",${s.empId},${s.role},${s.company},${s.start},${s.end}`)
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    a.download = "eztime_shifts.csv";
    a.click();
  };

  const addShift = async () => {
    setErr("");
    if (!empId) return setErr("יש לבחור עובד");
    if (!date) return setErr("יש לבחור תאריך");
    if (!company) return setErr("יש לבחור חברה");
    if (!role) return setErr("יש לבחור תפקיד");
    if (!startT || !endT) return setErr("יש להזין שעות");
    const next = [...shifts, { id: Date.now(), empId, date, company, role, start: startT, end: endT }];
    setShifts(next); await saveShifts(next);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    setView("log");
  };

  const deleteShift = async (id) => { const next = shifts.filter(s => s.id !== id); setShifts(next); await saveShifts(next); };

  const getDaySummary = (eId, d) => {
    const emp = EMPLOYEES.find(e => e.id === eId); if (!emp) return null;
    return calcDaySummary(shifts.filter(s => s.empId === eId && s.date === d), emp);
  };

  const empDays = [...new Set(shifts.map(s => `${s.empId}|${s.date}`))].map(k => {
    const [eId, d] = k.split("|");
    return { key: k, empId: eId, empName: EMPLOYEES.find(e => e.id === eId)?.name || eId, date: d, summary: getDaySummary(eId, d) };
  }).sort((a, b) => b.date.localeCompare(a.date));

  const getDayBreakdown = (eId, d) => {
    const map = {};
    shifts.filter(s => s.empId === eId && s.date === d).forEach(s => {
      const k = `${s.company}|${s.role}`;
      if (!map[k]) map[k] = { company: s.company, role: s.role, hours: 0 };
      map[k].hours += shiftDurationHours(s.start, s.end);
    });
    return Object.values(map);
  };

  // ── DAY VIEW ───────────────────────────────────────────────────────────────
  if (view === "day" && selectedDay) {
    const { empId: eId, date: d, summary: sum } = selectedDay;
    const emp = EMPLOYEES.find(e => e.id === eId);
    const dayShifts = shifts.filter(s => s.empId === eId && s.date === d);
    const total = sum?.totalHours || 0;
    const p100 = total > 0 ? (sum.h100 / total) * 100 : 0;
    const p125 = total > 0 ? (sum.h125 / total) * 100 : 0;
    const p150 = total > 0 ? (sum.h150 / total) * 100 : 0;
    return (
      <div style={S.page}>
        <div style={S.phone}>
          <div style={S.header}>
            <div><div style={S.logo}>⏱ EZTIME</div><div style={S.sub}>פירוט יום</div></div>
            <button onClick={() => setView("log")} style={S.btn()}>← חזרה</button>
          </div>
          <div style={S.body}>
            <div style={S.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#0f3460" }}>{emp?.name}</div>
                  <div style={{ fontSize: 12, color: "#607D8B", marginTop: 3 }}>{eId} · {fmtDate(d)}</div>
                  <div style={{ fontSize: 12, color: "#607D8B", marginTop: 2 }}>
                    תקן: <b>{emp?.daily_standard}ש׳</b>
                    {sum?.threshold === 7 && <span style={S.tag("#e65100")}>🌙 לילה</span>}
                  </div>
                </div>
                <div style={{ textAlign: "center", background: "linear-gradient(135deg,#0f3460,#1976D2)", borderRadius: 12, padding: "12px 16px", color: "#fff" }}>
                  <div style={{ fontSize: 26, fontWeight: 900 }}>₪{fmt(sum?.salary || 0)}</div>
                  <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>שכר יומי</div>
                </div>
              </div>
              <div style={S.g3}>
                <div style={S.sbox("#e8f5e9")}><div style={S.snum}>{fmt(sum?.h100||0)}h</div><div style={S.slbl}>100%</div></div>
                <div style={S.sbox("#fff8e1")}><div style={S.snum}>{fmt(sum?.h125||0)}h</div><div style={S.slbl}>125%</div></div>
                <div style={S.sbox("#fce4ec")}><div style={S.snum}>{fmt(sum?.h150||0)}h</div><div style={S.slbl}>150%</div></div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", gap: 1 }}>
                  {p100 > 0 && <div style={{ width: `${p100}%`, background: "#4CAF50" }} />}
                  {p125 > 0 && <div style={{ width: `${p125}%`, background: "#FF9800" }} />}
                  {p150 > 0 && <div style={{ width: `${p150}%`, background: "#F44336" }} />}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 5, fontSize: 10, color: "#607D8B" }}>
                  <span><span style={{ color: "#4CAF50" }}>■</span> 100%</span>
                  <span><span style={{ color: "#FF9800" }}>■</span> 125%</span>
                  <span><span style={{ color: "#F44336" }}>■</span> 150%</span>
                </div>
              </div>
              <div style={{ ...S.sbox(sum?.deficit > 0 ? "#fff3e0" : "#e8f5e9"), marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#607D8B" }}>חוסר מהתקן</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: sum?.deficit > 0 ? "#e65100" : "#2E7D32" }}>
                  {sum?.deficit > 0 ? `-${fmt(sum.deficit)}h` : "✓ הושלם"}
                </span>
              </div>
              <div style={{ marginTop: 12, padding: 12, background: "#f8faff", borderRadius: 8, fontSize: 12, fontFamily: "monospace", direction: "ltr", textAlign: "left" }}>
                <div style={{ direction: "rtl", textAlign: "right", color: "#607D8B", marginBottom: 4, fontSize: 11 }}>חישוב שכר (₪{sum?.maxRate}/ש׳)</div>
                <div>{fmt(sum?.h100||0)}h × ₪{sum?.maxRate} × 100% = ₪{fmt((sum?.h100||0)*(sum?.maxRate||0))}</div>
                {(sum?.h125||0) > 0 && <div>{fmt(sum.h125)}h × ₪{sum.maxRate} × 125% = ₪{fmt(sum.h125*sum.maxRate*1.25)}</div>}
                {(sum?.h150||0) > 0 && <div>{fmt(sum.h150)}h × ₪{sum.maxRate} × 150% = ₪{fmt(sum.h150*sum.maxRate*1.5)}</div>}
                <div style={{ borderTop: "1px solid #ddd", marginTop: 4, paddingTop: 4, fontWeight: 700, color: "#0f3460" }}>= ₪{fmt(sum?.salary||0)}</div>
              </div>
            </div>
            <div style={S.card}>
              <div style={S.ctitle}>📋 משמרות</div>
              <table style={S.table}>
                <thead><tr>{["חברה","תפקיד","כניסה","יציאה","ש׳","₪",""].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {dayShifts.map(s => (
                    <tr key={s.id}>
                      <td style={S.td}>{s.company}</td>
                      <td style={S.td}>{s.role}</td>
                      <td style={S.td}>{s.start}</td>
                      <td style={S.td}>{s.end}</td>
                      <td style={S.td}><b>{fmt(shiftDurationHours(s.start,s.end))}</b></td>
                      <td style={S.td}>{RATES_MAP[`${s.empId}|${s.role}|${s.company}`]||"—"}</td>
                      <td style={S.td}><button onClick={() => deleteShift(s.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d32f2f" }}>🗑</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={S.card}>
              <div style={S.ctitle}>🏢 לפי חברה ותפקיד</div>
              <table style={S.table}>
                <thead><tr>{["חברה","תפקיד","שעות"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>
                  {getDayBreakdown(eId, d).map((b, i) => (
                    <tr key={i}>
                      <td style={S.td}>{b.company}</td>
                      <td style={S.td}>{b.role}</td>
                      <td style={{ ...S.td, fontWeight: 700, color: "#0f3460" }}>{fmt(b.hours)}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ADD FORM ───────────────────────────────────────────────────────────────
  if (view === "add") {
    return (
      <div style={S.page}>
        <div style={S.phone}>
          <div style={S.header}>
            <div><div style={S.logo}>⏱ EZTIME</div><div style={S.sub}>הוספת משמרת</div></div>
            <button onClick={() => { setView("log"); setErr(""); }} style={S.btn()}>← ביטול</button>
          </div>
          <div style={S.body}>
            <div style={S.card}>
              <div style={S.ctitle}>✚ רישום משמרת חדשה</div>
              <label style={S.label}>עובד</label>
              <select style={S.select} value={empId} onChange={e => { setEmpId(e.target.value); setCompany(""); setRole(""); }}>
                <option value="">— בחר עובד —</option>
                {EMPLOYEES.filter(e => e.status === "active").map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
              </select>
              <div style={{ marginTop: 12 }}>
                <label style={S.label}>תאריך</label>
                <input style={S.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              {employee && (
                <>
                  <div style={{ ...S.g2, marginTop: 12 }}>
                    <div>
                      <label style={S.label}>חברה</label>
                      <select style={S.select} value={company} onChange={e => setCompany(e.target.value)}>
                        <option value="">— בחר —</option>
                        {employee.companies.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={S.label}>תפקיד</label>
                      <select style={S.select} value={role} onChange={e => setRole(e.target.value)}>
                        <option value="">— בחר —</option>
                        {employee.roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                  {company && role && (
                    <div style={{ fontSize: 12, color: "#607D8B", marginTop: 8, background: "#e8f5e9", padding: "5px 10px", borderRadius: 7 }}>
                      תעריף: <b>₪{RATES_MAP[`${employee.id}|${role}|${company}`] || "לא קיים"}/ש׳</b>
                    </div>
                  )}
                </>
              )}
              <div style={{ ...S.g2, marginTop: 12 }}>
                <div>
                  <label style={S.label}>כניסה</label>
                  <input style={S.input} type="time" value={startT} onChange={e => setStartT(e.target.value)} />
                </div>
                <div>
                  <label style={S.label}>יציאה</label>
                  <input style={S.input} type="time" value={endT} onChange={e => setEndT(e.target.value)} />
                </div>
              </div>
              {startT && endT && (
                <div style={{ marginTop: 8, fontSize: 12, color: "#0f3460", background: "#e8edf8", padding: "5px 10px", borderRadius: 7 }}>
                  ⏱ {fmt(shiftDurationHours(startT, endT))} שעות
                  {nightHoursInShift(startT, endT) >= 2 && <span style={{ color: "#e65100", marginRight: 6 }}>🌙 לילה</span>}
                </div>
              )}
              {err && <div style={S.err}>⚠ {err}</div>}
              {saved && <div style={S.ok}>✓ נשמר!</div>}
              <button style={{ ...S.btn(), width: "100%", marginTop: 14, padding: "12px", display: "block" }} onClick={addShift}>שמור משמרת ✓</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN LOG ───────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      <div style={S.phone}>
        <div style={S.header}>
          <div><div style={S.logo}>⏱ EZTIME</div><div style={S.sub}>ניהול נוכחות ושכר</div></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={exportCSV} disabled={shifts.length === 0}
              style={{ ...S.btn(shifts.length === 0 ? "#555" : "linear-gradient(135deg,#2E7D32,#43A047)"), opacity: shifts.length === 0 ? 0.5 : 1, cursor: shifts.length === 0 ? "not-allowed" : "pointer", fontSize: 12 }}>
              ⬇ CSV
            </button>
            <button onClick={() => { setView("add"); setErr(""); }} style={{ ...S.btn("linear-gradient(135deg,#1976D2,#42A5F5)"), fontSize: 12 }}>
              ✚ משמרת
            </button>
          </div>
        </div>
        <div style={S.body}>
          {loading && <div style={{ textAlign: "center", padding: 40, color: "#607D8B" }}>טוען...</div>}
          {!loading && empDays.length === 0 && (
            <div style={{ ...S.card, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🕐</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f3460", marginBottom: 6 }}>אין משמרות עדיין</div>
              <div style={{ color: "#607D8B", marginBottom: 16, fontSize: 13 }}>לחץ על "✚ משמרת" כדי להתחיל</div>
              <button onClick={() => setView("add")} style={{ ...S.btn(), padding: "10px 24px" }}>✚ הוסף משמרת ראשונה</button>
            </div>
          )}
          {!loading && empDays.length > 0 && (
            <div style={S.card}>
              <div style={S.ctitle}>📅 יומן משמרות ({empDays.length} ימים)</div>
              <table style={S.table}>
                <thead>
                  <tr>{["עובד","תאריך","שעות","100%","125%","150%","שכר","חוסר",""].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {empDays.map(row => {
                    const s = row.summary;
                    return (
                      <tr key={row.key} style={{ cursor: "pointer" }} onClick={() => { setSelectedDay(row); setView("day"); }}>
                        <td style={S.td}><b style={{ fontSize: 12 }}>{row.empName}</b><br /><span style={{ fontSize: 10, color: "#9E9E9E" }}>{row.empId}</span></td>
                        <td style={S.td}><span style={{ fontSize: 11 }}>{fmtDate(row.date)}</span>{s?.threshold===7 && <span style={S.tag("#e65100")}>🌙</span>}</td>
                        <td style={{ ...S.td, fontWeight: 700 }}>{s ? fmt(s.totalHours) : "—"}</td>
                        <td style={{ ...S.td, color: "#2E7D32", fontWeight: 600 }}>{s ? fmt(s.h100) : "—"}</td>
                        <td style={{ ...S.td, color: "#E65100", fontWeight: 600 }}>{s ? fmt(s.h125) : "—"}</td>
                        <td style={{ ...S.td, color: "#C62828", fontWeight: 600 }}>{s ? fmt(s.h150) : "—"}</td>
                        <td style={{ ...S.td, fontWeight: 900, color: "#0f3460", fontSize: 12 }}>₪{s ? fmt(s.salary) : "—"}</td>
                        <td style={{ ...S.td, color: s?.deficit > 0 ? "#e65100" : "#2E7D32", fontWeight: 700 }}>{s ? (s.deficit > 0 ? `-${fmt(s.deficit)}` : "✓") : "—"}</td>
                        <td style={S.td}><span style={{ color: "#1976D2" }}>›</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
