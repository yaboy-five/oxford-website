import { FormEvent, ReactNode, useMemo, useState } from "react";
import clinicLogo from "./assets/oxford-dental-centre-logo.png";
import loginLogo from "./assets/oxford-dental-login-logo.png";

export type AppointmentStatus = "pending" | "upcoming" | "completed" | "cancelled" | "emergency";

export type AdminAppointment = {
  id: string;
  name: string;
  date: string;
  time: string;
  treatment: string;
  phone: string;
  email: string;
  status: AppointmentStatus;
  approved: boolean;
};

export const seedAppointments: AdminAppointment[] = [
  {
    id: "APT-101",
    name: "Amelia Roberts",
    date: "2026-11-15",
    time: "10:00",
    treatment: "Dental implants",
    phone: "07700 900321",
    email: "amelia@example.com",
    status: "upcoming",
    approved: true,
  },
  {
    id: "APT-102",
    name: "Daniel Wilson",
    date: "2026-11-15",
    time: "11:30",
    treatment: "Root Canal",
    phone: "07700 900482",
    email: "daniel@example.com",
    status: "emergency",
    approved: true,
  },
  {
    id: "APT-103",
    name: "Sophia Taylor",
    date: "2026-11-16",
    time: "09:30",
    treatment: "Dentures",
    phone: "07700 900741",
    email: "sophia@example.com",
    status: "pending",
    approved: false,
  },
  {
    id: "APT-104",
    name: "Oliver Hughes",
    date: "2026-11-16",
    time: "11:00",
    treatment: "Orthodontic treatment",
    phone: "07700 900156",
    email: "oliver@example.com",
    status: "upcoming",
    approved: true,
  },
  {
    id: "APT-105",
    name: "Isla Thompson",
    date: "2026-11-17",
    time: "14:00",
    treatment: "Wisdom teeth removal",
    phone: "07700 900865",
    email: "isla@example.com",
    status: "pending",
    approved: false,
  },
  {
    id: "APT-106",
    name: "Noah Patel",
    date: "2026-11-17",
    time: "15:30",
    treatment: "Dental emergencies",
    phone: "07700 900294",
    email: "noah@example.com",
    status: "emergency",
    approved: true,
  },
  {
    id: "APT-107",
    name: "Grace Evans",
    date: "2026-11-13",
    time: "09:00",
    treatment: "Dentures",
    phone: "07700 900637",
    email: "grace@example.com",
    status: "completed",
    approved: true,
  },
  {
    id: "APT-108",
    name: "Arthur Lewis",
    date: "2026-11-18",
    time: "10:30",
    treatment: "Dental implants",
    phone: "07700 900418",
    email: "arthur@example.com",
    status: "upcoming",
    approved: true,
  },
  {
    id: "APT-109",
    name: "Freya Walker",
    date: "2026-11-18",
    time: "13:00",
    treatment: "Root Canal",
    phone: "07700 900573",
    email: "freya@example.com",
    status: "cancelled",
    approved: true,
  },
  {
    id: "APT-110",
    name: "Leo Morgan",
    date: "2026-11-19",
    time: "16:00",
    treatment: "Oral and Teeth Extractions",
    phone: "07700 900729",
    email: "leo@example.com",
    status: "pending",
    approved: false,
  },
];

type AdminScreen =
  | "home"
  | "scheduling"
  | "dentists"
  | "appointments"
  | "pending"
  | "treatments"
  | "clinic";

type Treatment = { id: number; name: string; description: string; fee: string; active: boolean };
type Dentist = {
  id: number;
  name: string;
  role: string;
  qualifications: string;
  active: boolean;
};
type ClinicInfo = {
  address: string;
  telephone: string;
  emergency: string;
  email: string;
  reception: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  hours: Record<string, { open: string; close: string }>;
};

const initialTreatments: Treatment[] = [
  {
    id: 1,
    name: "Dental emergencies",
    description: "Urgent assessment and relief.",
    fee: "from £95",
    active: true,
  },
  {
    id: 2,
    name: "Dentures",
    description: "Natural-looking restorative solutions.",
    fee: "from £850",
    active: true,
  },
  {
    id: 3,
    name: "Root Canal",
    description: "Treatment to preserve an infected tooth.",
    fee: "from £695",
    active: true,
  },
  {
    id: 4,
    name: "Orthodontic treatment",
    description: "Personalised teeth-straightening care.",
    fee: "from £3,250",
    active: true,
  },
  {
    id: 5,
    name: "Dental implants",
    description: "Long-lasting missing tooth replacement.",
    fee: "from £2,500",
    active: true,
  },
  {
    id: 6,
    name: "Oral and Teeth Extractions",
    description: "Gentle oral surgery and extraction care.",
    fee: "from £225",
    active: true,
  },
  {
    id: 7,
    name: "Wisdom teeth removal",
    description: "Assessment and removal of problematic wisdom teeth.",
    fee: "from £350",
    active: true,
  },
];

const screenLabels: { id: AdminScreen; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "scheduling", label: "Scheduling", icon: "calendar" },
  { id: "dentists", label: "Dentist profiles", icon: "users" },
  { id: "appointments", label: "Appointment details", icon: "clipboard" },
  { id: "pending", label: "Pending requests", icon: "clock" },
  { id: "treatments", label: "Edit treatment details", icon: "edit" },
  { id: "clinic", label: "Edit clinic details", icon: "settings" },
];

function AdminIcon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M16 5.5a3 3 0 0 1 0 5.8M17 14c2.5.4 4 2.3 4 5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V2h6v2M9 10h6M9 14h6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    edit: (
      <>
        <path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z" />
        <path d="m13.5 7 3.5 3.5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a8 8 0 0 0-1.7-1L14.5 3h-5l-.4 3.1a8 8 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2L3 14.5l2 3.4 2.4-1a8 8 0 0 0 1.7 1l.4 3.1h5l.4-3.1a8 8 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.5a7 7 0 0 0 .1-1Z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3M14 4h6v16h-6" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name] ?? paths.home}
    </svg>
  );
}

export function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [createdAdmin, setCreatedAdmin] = useState<{ email: string; password: string } | null>(
    null,
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "")
      .trim()
      .toLowerCase();
    const password = String(data.get("password") || "");
    if (mode === "signup") {
      const confirm = String(data.get("confirm") || "");
      if (password.length < 8 || password !== confirm) {
        setError("Passwords must match and contain at least 8 characters.");
        return;
      }
      setCreatedAdmin({ email, password });
      setMode("login");
      setError("Admin account created in memory. You can now log in.");
      return;
    }
    const isDemo = email === "admin@oxforddentalcentre.co.uk" && password === "Admin123";
    const isCreated = createdAdmin?.email === email && createdAdmin.password === password;
    if (!isDemo && !isCreated) {
      setError("Those admin credentials were not recognised.");
      return;
    }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#dceef8] px-5 py-10 text-[#15282e]">
      <button
        className="admin-text-link mx-auto flex max-w-5xl items-center gap-2"
        onClick={onBack}
      >
        <AdminIcon name="arrow" size={17} /> Back to website
      </button>
      <div className="mx-auto mt-10 grid max-w-4xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(17,42,50,.18)] lg:grid-cols-2">
        <div className="bg-[#2E9FCC] p-8 text-black md:p-12">
          <p className="text-xs font-semibold tracking-[.2em] text-black/70 uppercase">
            Secure staff access
          </p>
          <h1 className="mt-8 font-serif text-5xl">{mode === "login" ? "LOGIN" : "SIGN UP"}</h1>
          <p className="mt-4 leading-7 text-black/70">
            {mode === "login"
              ? "Sign in to manage appointments, clinic details and treatment information."
              : "Create an additional in-memory admin account for this session."}
          </p>
          <form className="mt-9 space-y-5" onSubmit={submit}>
            {mode === "signup" && (
              <label className="block">
                <span className="admin-field-label text-black/70">Username</span>
                <input
                  className="admin-field border-black/25 bg-white/65 text-black"
                  name="username"
                  required
                />
              </label>
            )}
            <label className="block">
              <span className="admin-field-label text-black/70">Email</span>
              <input
                className="admin-field border-black/25 bg-white/65 text-black"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="block">
              <span className="admin-field-label text-black/70">Password</span>
              <input
                className="admin-field border-black/25 bg-white/65 text-black"
                name="password"
                required
                type="password"
              />
            </label>
            {mode === "signup" && (
              <label className="block">
                <span className="admin-field-label text-black/70">Confirm password</span>
                <input
                  className="admin-field border-black/25 bg-white/65 text-black"
                  name="confirm"
                  required
                  type="password"
                />
              </label>
            )}
            {error && <p className="text-sm font-semibold text-black">{error}</p>}
            <div className="flex gap-3">
              <button className="admin-button bg-[#ffc947] text-[#15282e]" type="submit">
                {mode === "login" ? "Login" : "Create admin"}
              </button>
              <button className="admin-button border border-black/30 text-black" type="reset">
                Clear
              </button>
            </div>
          </form>
          <button
            className="mt-8 text-sm text-black/70 underline underline-offset-4"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
          >
            {mode === "login"
              ? "Don’t have an admin account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
        <div className="flex flex-col justify-between bg-white p-8 md:p-12">
          <div>
            <img
              alt="Oxford Dental Centre — Personalised Care"
              className="w-full max-w-[265px]"
              src={loginLogo}
            />
            <span className="mt-3 block text-[10px] font-semibold tracking-[.2em] uppercase">
              Admin portal
            </span>
          </div>
          <div className="my-16">
            <p className="text-xs font-semibold tracking-[.17em] uppercase">Demo administrator</p>
            <div className="mt-5 border border-[#15282e]/20 bg-[#f3f6f7] p-5 text-sm leading-7">
              <p>
                <strong>Email:</strong> admin@oxforddentalcentre.co.uk
              </p>
              <p>
                <strong>Password:</strong> Admin123
              </p>
            </div>
          </div>
          <p className="text-sm leading-6 text-[#15282e]/65">
            Admin access is separate from the public website. This prototype keeps changes only in
            memory.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminPortal({
  appointments,
  setAppointments,
  onLogout,
  onWebsite,
}: {
  appointments: AdminAppointment[];
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
  onLogout: () => void;
  onWebsite: () => void;
}) {
  const [screen, setScreen] = useState<AdminScreen>("home");
  const [treatments, setTreatments] = useState(initialTreatments);
  const [dentists, setDentists] = useState<Dentist[]>([
    {
      id: 1,
      name: "Dr. Leonard Bowora",
      role: "Principal Dental Surgeon",
      qualifications: "MSc, BChD, Assoc. Fellow AAID",
      active: true,
    },
    {
      id: 2,
      name: "Dr. Maya Bennett",
      role: "General Dentist",
      qualifications: "BDS, MJDF",
      active: true,
    },
  ]);
  const [clinic, setClinic] = useState<ClinicInfo>({
    address: "162 Banbury Road, Oxford OX2 7BT",
    telephone: "+44 1865 493372",
    emergency: "+44 7985 716665",
    email: "info@oxforddentalcentre.co.uk",
    reception: "+44 1865 493372",
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    hours: Object.fromEntries(
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => [
        day,
        { open: "09:00", close: "17:00" },
      ]),
    ),
  });

  const updateStatus = (id: string, status: AppointmentStatus) =>
    setAppointments((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              approved: item.approved || status === "upcoming" || status === "emergency",
            }
          : item,
      ),
    );

  return (
    <div className="min-h-screen bg-[#eef5f7] text-[#14292f] lg:flex">
      <aside className="bg-[#15282e] text-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0">
        <div className="flex items-center justify-between border-b border-white/10 p-5 lg:p-7">
          <button className="text-left" onClick={() => setScreen("home")}>
            <img
              alt="Oxford Dental Centre — Personalised Care"
              className="w-full max-w-[190px]"
              src={clinicLogo}
            />
            <span className="mt-2 block text-[9px] tracking-[.2em] text-white/45 uppercase">
              Admin portal
            </span>
          </button>
        </div>
        <nav className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:p-4">
          {screenLabels.map((item) => (
            <button
              className={`flex shrink-0 items-center gap-3 px-4 py-3 text-sm transition lg:w-full ${
                screen === item.id
                  ? "bg-[#ffc947] font-semibold text-[#15282e]"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
              key={item.id}
              onClick={() => setScreen(item.id)}
            >
              <AdminIcon name={item.icon} size={18} />
              {item.label}
              {item.id === "pending" &&
                appointments.filter((a) => a.status === "pending").length > 0 && (
                  <span className="ml-auto rounded-full bg-[#e45d4f] px-2 py-0.5 text-[10px] text-white">
                    {appointments.filter((a) => a.status === "pending").length}
                  </span>
                )}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4 lg:absolute lg:right-0 lg:bottom-0 lg:left-0">
          <button
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/65 hover:text-white"
            onClick={onWebsite}
          >
            <AdminIcon name="arrow" size={18} /> View public website
          </button>
          <button
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/65 hover:text-white"
            onClick={onLogout}
          >
            <AdminIcon name="logout" size={18} /> Log out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[#15282e]/10 bg-white px-5 py-4 md:px-8">
          <div>
            <p className="text-xs tracking-[.16em] text-[#668086] uppercase">
              Oxford Dental Centre
            </p>
            <h1 className="mt-1 font-serif text-2xl">
              {screenLabels.find((item) => item.id === screen)?.label}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Admin user</p>
            <a className="text-xs text-[#527177]" href="tel:+447985716665">
              Emergency +44 7985 716665
            </a>
          </div>
        </header>
        <main className="p-5 md:p-8 lg:p-10">
          {screen === "home" && (
            <Dashboard appointments={appointments} dentists={dentists} setScreen={setScreen} />
          )}
          {screen === "scheduling" && (
            <Scheduling
              appointments={appointments}
              setAppointments={setAppointments}
              updateStatus={updateStatus}
            />
          )}
          {screen === "dentists" && <Dentists dentists={dentists} setDentists={setDentists} />}
          {screen === "appointments" && (
            <Appointments
              appointments={appointments}
              setAppointments={setAppointments}
              updateStatus={updateStatus}
            />
          )}
          {screen === "pending" && (
            <Pending appointments={appointments} updateStatus={updateStatus} />
          )}
          {screen === "treatments" && (
            <Treatments treatments={treatments} setTreatments={setTreatments} />
          )}
          {screen === "clinic" && <ClinicDetails clinic={clinic} setClinic={setClinic} />}
        </main>
      </div>
    </div>
  );
}

function Dashboard({
  appointments,
  dentists,
  setScreen,
}: {
  appointments: AdminAppointment[];
  dentists: Dentist[];
  setScreen: (screen: AdminScreen) => void;
}) {
  const approvedAppointments = appointments.filter((appointment) => appointment.approved);
  const stats = [
    ["Total appointments", approvedAppointments.length, "#39b98a"],
    ["Pending requests", appointments.filter((a) => a.status === "pending").length, "#efb83f"],
    ["Emergencies", approvedAppointments.filter((a) => a.status === "emergency").length, "#e45d4f"],
    [
      "Cancellations",
      approvedAppointments.filter((a) => a.status === "cancelled").length,
      "#62747a",
    ],
  ];
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-[#647a80]">Welcome back, Admin</p>
        <h2 className="mt-2 font-serif text-4xl">Here’s what is happening today.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, color]) => (
          <div className="border border-[#15282e]/10 bg-white p-6" key={String(label)}>
            <span className="block h-1 w-10" style={{ background: String(color) }} />
            <p className="mt-6 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-[#647a80]">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-7 grid gap-7 xl:grid-cols-[1.4fr_.6fr]">
        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <p className="admin-kicker">Today</p>
              <h3 className="admin-title">Patient schedule</h3>
            </div>
            <button className="admin-text-link" onClick={() => setScreen("appointments")}>
              View all
            </button>
          </div>
          <AppointmentRows appointments={approvedAppointments.slice(0, 5)} compact />
        </section>
        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <p className="admin-kicker">Team</p>
              <h3 className="admin-title">Dentist availability</h3>
            </div>
          </div>
          <div className="divide-y divide-[#15282e]/10">
            {dentists.map((dentist) => (
              <div className="flex items-center gap-3 py-4" key={dentist.id}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#dceef1] font-semibold">
                  {dentist.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{dentist.name}</p>
                  <p className="text-xs text-[#6c8085]">{dentist.role}</p>
                </div>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${dentist.active ? "bg-[#39b98a]" : "bg-[#aab6b8]"}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Scheduling({
  appointments,
  setAppointments,
  updateStatus,
}: {
  appointments: AdminAppointment[];
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
  updateStatus: (id: string, status: AppointmentStatus) => void;
}) {
  const scheduledAppointments = appointments.filter(
    (appointment) =>
      appointment.approved &&
      (appointment.status === "upcoming" || appointment.status === "emergency"),
  );
  return (
    <div className="space-y-7">
      <AddAppointment setAppointments={setAppointments} />
      <section className="admin-card">
        <div className="admin-card-header">
          <div>
            <p className="admin-kicker">Weekly overview</p>
            <h2 className="admin-title">Scheduling and appointments</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[75px_repeat(5,1fr)] border-b border-[#15282e]/10 text-xs font-semibold uppercase tracking-wider">
              <div className="p-3 text-[#6b8085]">Time</div>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <div className="border-l border-[#15282e]/10 p-3" key={day}>
                  {day}
                </div>
              ))}
            </div>
            {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map(
              (time, row) => (
                <div
                  className="grid min-h-20 grid-cols-[75px_repeat(5,1fr)] border-b border-[#15282e]/10"
                  key={time}
                >
                  <div className="p-3 text-xs text-[#6b8085]">{time}</div>
                  {[0, 1, 2, 3, 4].map((day) => {
                    const item = scheduledAppointments[(row + day) % scheduledAppointments.length];
                    const show = scheduledAppointments.length > 0 && (row + day) % 5 === 0;
                    return (
                      <div className="border-l border-[#15282e]/10 p-2" key={day}>
                        {show && (
                          <button
                            className={`w-full p-2 text-left text-xs ${item.status === "emergency" ? "bg-[#fff0bd]" : "bg-[#d9f3e8]"}`}
                            onClick={() => updateStatus(item.id, "completed")}
                          >
                            <strong className="block">{item.name}</strong>
                            <span>{item.treatment}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function AddAppointment({
  setAppointments,
}: {
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
}) {
  const [open, setOpen] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emergency = data.get("emergency") === "on";
    setAppointments((items) => [
      {
        id: `APT-${100 + items.length + 1}`,
        name: String(data.get("name")),
        date: String(data.get("date")),
        time: String(data.get("time")),
        treatment: String(data.get("treatment")),
        phone: String(data.get("phone")),
        email: String(data.get("email")),
        status: emergency ? "emergency" : "upcoming",
        approved: true,
      },
      ...items,
    ]);
    event.currentTarget.reset();
    setOpen(false);
  };
  return (
    <section className="admin-card">
      <div className="admin-card-header">
        <div>
          <p className="admin-kicker">Quick action</p>
          <h2 className="admin-title">Schedule an appointment</h2>
        </div>
        <button className="admin-button bg-[#39b98a] text-white" onClick={() => setOpen(!open)}>
          <AdminIcon name="plus" size={17} /> Add appointment
        </button>
      </div>
      {open && (
        <form
          className="grid gap-4 border-t border-[#15282e]/10 pt-6 md:grid-cols-3"
          onSubmit={submit}
        >
          <AdminField label="Patient name" name="name" required />
          <AdminField label="Contact number" name="phone" required />
          <AdminField label="Email address" name="email" required type="email" />
          <AdminField label="Appointment date" name="date" required type="date" />
          <AdminField label="Appointment time" name="time" required type="time" />
          <AdminField label="Treatment plan" name="treatment" required />
          <label className="flex items-center gap-3 text-sm">
            <input name="emergency" type="checkbox" /> Add as emergency
          </label>
          <div className="flex gap-2 md:col-span-2 md:justify-end">
            <button className="admin-button border border-[#15282e]/20" type="reset">
              Clear
            </button>
            <button className="admin-button bg-[#ffc947]" type="submit">
              Save appointment
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Appointments({
  appointments,
  setAppointments,
  updateStatus,
}: {
  appointments: AdminAppointment[];
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
  updateStatus: (id: string, status: AppointmentStatus) => void;
}) {
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");
  const [search, setSearch] = useState("");
  const approvedAppointments = appointments.filter((item) => item.approved);
  const filtered = approvedAppointments.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      `${item.name} ${item.id} ${item.treatment}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="admin-card">
      <div className="admin-card-header flex-wrap gap-4">
        <div>
          <p className="admin-kicker">Patient records</p>
          <h2 className="admin-title">Appointment details</h2>
        </div>
        <label className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-[#71868b]">
            <AdminIcon name="search" size={17} />
          </span>
          <input
            className="admin-field pl-10"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            value={search}
          />
        </label>
      </div>
      <div className="mb-5 flex gap-2 overflow-x-auto">
        {(["all", "upcoming", "completed", "cancelled"] as const).map((status) => (
          <button
            className={`shrink-0 px-4 py-2 text-xs font-semibold capitalize ${filter === status ? "bg-[#15282e] text-white" : "bg-[#e8eff1]"}`}
            key={status}
            onClick={() => setFilter(status)}
          >
            {status} ·{" "}
            {status === "all"
              ? approvedAppointments.length
              : approvedAppointments.filter((a) => a.status === status).length}
          </button>
        ))}
      </div>
      <AppointmentRows
        appointments={filtered}
        onComplete={(id) => updateStatus(id, "completed")}
        onCancel={(id) => updateStatus(id, "cancelled")}
        onDelete={(id) => setAppointments((items) => items.filter((item) => item.id !== id))}
      />
    </section>
  );
}

function AppointmentRows({
  appointments,
  compact = false,
  onComplete,
  onCancel,
  onDelete,
}: {
  appointments: AdminAppointment[];
  compact?: boolean;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  if (!appointments.length)
    return <p className="py-12 text-center text-sm text-[#71868b]">No appointments found.</p>;
  return (
    <div className="divide-y divide-[#15282e]/10">
      {appointments.map((item) => (
        <article
          className="grid gap-4 py-5 md:grid-cols-[1fr_.8fr_.8fr_auto] md:items-center"
          key={item.id}
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="mt-1 text-xs text-[#71868b]">
              {item.id} · {item.treatment}
            </p>
          </div>
          <div>
            <p className="text-sm">{item.date}</p>
            <p className="text-xs text-[#71868b]">{item.time}</p>
          </div>
          <span className={`admin-status ${item.status}`}>{item.status}</span>
          {!compact && (
            <div className="flex gap-2">
              <button
                className="admin-mini bg-[#39b98a] text-white"
                onClick={() => onComplete?.(item.id)}
              >
                Complete
              </button>
              <button className="admin-mini bg-[#efb83f]" onClick={() => onCancel?.(item.id)}>
                Cancel
              </button>
              <button
                aria-label={`Delete ${item.id}`}
                className="admin-mini bg-[#e45d4f] text-white"
                onClick={() => onDelete?.(item.id)}
              >
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function Pending({
  appointments,
  updateStatus,
}: {
  appointments: AdminAppointment[];
  updateStatus: (id: string, status: AppointmentStatus) => void;
}) {
  const pending = appointments.filter((item) => item.status === "pending");
  return (
    <section className="admin-card">
      <div className="admin-card-header">
        <div>
          <p className="admin-kicker">Requests from public website</p>
          <h2 className="admin-title">Pending appointments</h2>
        </div>
        <span className="rounded-full bg-[#fff0bd] px-3 py-1 text-sm font-semibold">
          {pending.length} pending
        </span>
      </div>
      {!pending.length ? (
        <p className="py-12 text-center text-sm text-[#71868b]">
          There are no pending appointment requests.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-[#15282e]/15 text-xs tracking-wider text-[#71868b] uppercase">
              <tr>
                <th className="py-3">Appointment ID</th>
                <th>Patient</th>
                <th>Contact</th>
                <th>Treatment plan</th>
                <th>Preferred date</th>
                <th>Request status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((item) => (
                <tr className="border-b border-[#15282e]/10" key={item.id}>
                  <td className="py-5 font-semibold">{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className="block">{item.phone}</span>
                    <span className="text-xs text-[#71868b]">{item.email}</span>
                  </td>
                  <td>{item.treatment}</td>
                  <td>
                    {item.date}
                    <span className="block text-xs text-[#71868b]">{item.time}</span>
                  </td>
                  <td>
                    <span className="admin-status pending">Pending</span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="admin-mini bg-[#39b98a] text-white"
                        onClick={() => updateStatus(item.id, "upcoming")}
                      >
                        Add appointment
                      </button>
                      <button
                        className="admin-mini bg-[#efb83f]"
                        onClick={() => updateStatus(item.id, "emergency")}
                      >
                        Add emergency
                      </button>
                      <button
                        className="admin-mini bg-[#e45d4f] text-white"
                        onClick={() => updateStatus(item.id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Dentists({
  dentists,
  setDentists,
}: {
  dentists: Dentist[];
  setDentists: React.Dispatch<React.SetStateAction<Dentist[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Dentist | null>(null);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name")),
      role: String(data.get("role")),
      qualifications: String(data.get("qualifications")),
    };
    if (editing) {
      setDentists((items) =>
        items.map((dentist) => (dentist.id === editing.id ? { ...dentist, ...values } : dentist)),
      );
    } else {
      setDentists((items) => [...items, { id: Date.now(), ...values, active: true }]);
    }
    setEditing(null);
    setOpen(false);
  };
  return (
    <div>
      <section className="admin-card">
        <div className="admin-card-header">
          <div>
            <p className="admin-kicker">
              Active dentists · {dentists.filter((d) => d.active).length}
            </p>
            <h2 className="admin-title">Dentist profiles</h2>
          </div>
          <button
            className="admin-button bg-[#ffc947]"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <AdminIcon name="plus" size={17} /> Add new
          </button>
        </div>
        {(open || editing) && (
          <form
            className="mb-7 grid gap-4 border-b border-[#15282e]/10 pb-7 md:grid-cols-3"
            key={editing?.id ?? "new"}
            onSubmit={submit}
          >
            <AdminField
              defaultValue={editing?.name}
              label="Dr. name surname"
              name="name"
              required
            />
            <AdminField defaultValue={editing?.role} label="Role" name="role" required />
            <AdminField
              defaultValue={editing?.qualifications}
              label="Qualifications"
              name="qualifications"
              required
            />
            <div className="flex justify-end gap-2 md:col-span-3">
              <button
                className="admin-button border border-[#15282e]/20 bg-white"
                onClick={() => {
                  setEditing(null);
                  setOpen(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button className="admin-button bg-[#39b98a] text-white" type="submit">
                {editing ? "Save changes" : "Save profile"}
              </button>
            </div>
          </form>
        )}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dentists.map((dentist) => (
            <article className="border border-[#15282e]/12 p-6" key={dentist.id}>
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#dceef1] font-serif text-xl">
                  {dentist.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)}
                </span>
                <span className={`admin-status ${dentist.active ? "upcoming" : "cancelled"}`}>
                  {dentist.active ? "Active" : "Inactive"}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-2xl">{dentist.name}</h3>
              <p className="mt-1 text-sm text-[#587177]">{dentist.role}</p>
              <p className="mt-4 text-xs leading-6 text-[#71868b]">{dentist.qualifications}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  className="admin-mini bg-[#5c91a0] text-white"
                  onClick={() => {
                    setEditing(dentist);
                    setOpen(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="admin-mini bg-[#ffc947]"
                  onClick={() =>
                    setDentists((items) =>
                      items.map((d) => (d.id === dentist.id ? { ...d, active: !d.active } : d)),
                    )
                  }
                >
                  Set {dentist.active ? "inactive" : "active"}
                </button>
                <button
                  className="admin-mini bg-[#e45d4f] text-white"
                  onClick={() => setDentists((items) => items.filter((d) => d.id !== dentist.id))}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Treatments({
  treatments,
  setTreatments,
}: {
  treatments: Treatment[];
  setTreatments: React.Dispatch<React.SetStateAction<Treatment[]>>;
}) {
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [open, setOpen] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name")),
      description: String(data.get("description")),
      fee: String(data.get("fee")),
    };
    if (editing)
      setTreatments((items) =>
        items.map((item) => (item.id === editing.id ? { ...item, ...values } : item)),
      );
    else setTreatments((items) => [...items, { id: Date.now(), ...values, active: true }]);
    setEditing(null);
    setOpen(false);
  };
  return (
    <section className="admin-card">
      <div className="admin-card-header">
        <div>
          <p className="admin-kicker">Treatment plans</p>
          <h2 className="admin-title">Edit treatment details</h2>
        </div>
        <button
          className="admin-button bg-[#ffc947]"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <AdminIcon name="plus" size={17} /> Add treatment
        </button>
      </div>
      {(open || editing) && (
        <form
          className="mb-7 grid gap-4 border-b border-[#15282e]/10 pb-7 md:grid-cols-[1fr_2fr_1fr_auto]"
          key={editing?.id ?? "new"}
          onSubmit={submit}
        >
          <AdminField defaultValue={editing?.name} label="Treatment name" name="name" required />
          <AdminField
            defaultValue={editing?.description}
            label="Description"
            name="description"
            required
          />
          <AdminField
            defaultValue={editing?.fee}
            label="Treatment fee"
            name="fee"
            placeholder="e.g. from £95"
            required
          />
          <button className="admin-button mt-auto bg-[#39b98a] text-white" type="submit">
            Save
          </button>
        </form>
      )}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {treatments.map((treatment) => (
          <article className="overflow-hidden border border-[#15282e]/12" key={treatment.id}>
            <div className="h-24 bg-gradient-to-br from-[#dceef1] to-[#aacfc9]" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-2xl">{treatment.name}</h3>
                <span className={`admin-status ${treatment.active ? "upcoming" : "cancelled"}`}>
                  {treatment.active ? "Live" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 min-h-12 text-sm leading-6 text-[#667d82]">
                {treatment.description}
              </p>
              <p className="mt-4 border-t border-[#15282e]/10 pt-4 text-sm font-semibold text-[#315f5b]">
                Fee: {treatment.fee}
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  className="admin-mini bg-[#5c91a0] text-white"
                  onClick={() => {
                    setEditing(treatment);
                    setOpen(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="admin-mini bg-[#efb83f]"
                  onClick={() =>
                    setTreatments((items) =>
                      items.map((item) =>
                        item.id === treatment.id ? { ...item, active: !item.active } : item,
                      ),
                    )
                  }
                >
                  {treatment.active ? "Hide" : "Publish"}
                </button>
                <button
                  className="admin-mini bg-[#e45d4f] text-white"
                  onClick={() =>
                    setTreatments((items) => items.filter((item) => item.id !== treatment.id))
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClinicDetails({
  clinic,
  setClinic,
}: {
  clinic: ClinicInfo;
  setClinic: React.Dispatch<React.SetStateAction<ClinicInfo>>;
}) {
  const [saved, setSaved] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    setClinic({
      address: String(data.get("address")),
      telephone: String(data.get("telephone")),
      emergency: String(data.get("emergency")),
      email: String(data.get("email")),
      reception: String(data.get("reception")),
      social: {
        facebook: String(data.get("facebook")),
        instagram: String(data.get("instagram")),
        twitter: String(data.get("twitter")),
      },
      hours: Object.fromEntries(
        weekdays.map((day) => [
          day,
          {
            open: String(data.get(`${day}-open`)),
            close: String(data.get(`${day}-close`)),
          },
        ]),
      ),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };
  return (
    <form className="grid gap-7 xl:grid-cols-2" onSubmit={submit}>
      <section className="admin-card">
        <div className="admin-card-header">
          <div>
            <p className="admin-kicker">Clinic availability</p>
            <h2 className="admin-title">Edit opening hours</h2>
          </div>
        </div>
        <div className="space-y-4">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <div className="grid grid-cols-[1fr_120px_20px_120px] items-center gap-2" key={day}>
              <span className="text-sm font-medium">{day}</span>
              <input
                className="admin-field"
                defaultValue={clinic.hours[day]?.open}
                name={`${day}-open`}
                type="time"
              />
              <span className="text-center">–</span>
              <input
                className="admin-field"
                defaultValue={clinic.hours[day]?.close}
                name={`${day}-close`}
                type="time"
              />
            </div>
          ))}
          {["Saturday", "Sunday"].map((day) => (
            <div
              className="flex items-center justify-between border-t border-[#15282e]/10 py-3"
              key={day}
            >
              <span className="text-sm font-medium">{day}</span>
              <span className="admin-status cancelled">Closed</span>
            </div>
          ))}
        </div>
      </section>
      <section className="admin-card">
        <div className="admin-card-header">
          <div>
            <p className="admin-kicker">Public information</p>
            <h2 className="admin-title">Edit contact details</h2>
          </div>
        </div>
        <div className="space-y-4">
          <AdminField defaultValue={clinic.address} label="Company address" name="address" />
          <AdminField defaultValue={clinic.telephone} label="Telephone" name="telephone" />
          <AdminField defaultValue={clinic.emergency} label="Emergency phone" name="emergency" />
          <AdminField defaultValue={clinic.email} label="Email" name="email" type="email" />
          <AdminField defaultValue={clinic.reception} label="Reception phone" name="reception" />
        </div>
      </section>
      <section className="admin-card xl:col-span-2">
        <div className="admin-card-header">
          <div>
            <p className="admin-kicker">Social profiles</p>
            <h2 className="admin-title">Edit social media links</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <AdminField
            defaultValue={clinic.social.facebook}
            label="Facebook"
            name="facebook"
            placeholder="https://facebook.com/..."
            type="url"
          />
          <AdminField
            defaultValue={clinic.social.instagram}
            label="Instagram"
            name="instagram"
            placeholder="https://instagram.com/..."
            type="url"
          />
          <AdminField
            defaultValue={clinic.social.twitter}
            label="X (Twitter)"
            name="twitter"
            placeholder="https://x.com/..."
            type="url"
          />
        </div>
      </section>
      <div className="flex items-center justify-end gap-4 xl:col-span-2">
        {saved && (
          <span className="text-sm font-semibold text-[#27885f]">
            Clinic details saved in memory.
          </span>
        )}
        <button className="admin-button border border-[#15282e]/20" type="reset">
          Clear
        </button>
        <button className="admin-button bg-[#39b98a] text-white" type="submit">
          Save changes
        </button>
      </div>
    </form>
  );
}

function AdminField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="admin-field-label">{label}</span>
      <input className="admin-field" {...props} />
    </label>
  );
}
