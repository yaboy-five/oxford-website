import { FormEvent, ReactNode, useEffect, useState } from "react";
import { AdminLogin, AdminPortal, seedAppointments, type AdminAppointment } from "./AdminPanel";
import aaidLogo from "./assets/associates/aaid.png";
import invisalignLogo from "./assets/associates/invisalign-provider.png";
import smilelignLogo from "./assets/associates/smilelign.png";
import clinicLogo from "./assets/oxford-dental-centre-logo.png";

type Page =
  | "home"
  | "treatments"
  | "treatment"
  | "emergency"
  | "fees"
  | "first-visit"
  | "about"
  | "contact";

const clinicImage =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800";
const chairImage =
  "https://images.unsplash.com/photo-1643660527098-559f89e45a92?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400";
const roomImage =
  "https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";
const careImage =
  "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Treatments", page: "treatments" },
  { label: "Emergencies", page: "emergency" },
  { label: "Fees", page: "fees" },
  { label: "First visits", page: "first-visit" },
  { label: "About", page: "about" },
];

const treatments = [
  {
    title: "Dental emergencies",
    text: "Prompt advice and urgent care when pain, swelling or dental injury cannot wait.",
    image: roomImage,
    tag: "Urgent care",
    page: "emergency" as Page,
  },
  {
    title: "Dentures",
    text: "Comfortable, natural-looking solutions designed to restore your smile and confidence.",
    image: careImage,
    tag: "Restore",
    page: "treatment" as Page,
  },
  {
    title: "Root Canal",
    text: "Careful treatment to relieve pain, remove infection and help preserve your natural tooth.",
    image: chairImage,
    tag: "Preserve",
    page: "treatment" as Page,
  },
  {
    title: "Orthodontic treatment",
    text: "Personalised options to improve alignment, bite and long-term dental health.",
    image: clinicImage,
    tag: "Straighten",
    page: "treatment" as Page,
  },
  {
    title: "Dental implants",
    text: "A secure, long-lasting solution for replacing missing teeth.",
    image: careImage,
    tag: "Replace",
    page: "treatment" as Page,
  },
  {
    title: "Oral and Teeth Extractions",
    text: "Considered, gentle removal care with clear guidance before and after your appointment.",
    image: roomImage,
    tag: "Oral surgery",
    page: "treatment" as Page,
  },
  {
    title: "Wisdom teeth removal",
    text: "Assessment and treatment for painful, impacted or problematic wisdom teeth.",
    image: chairImage,
    tag: "Oral surgery",
    page: "treatment" as Page,
  },
];

const fees = [
  ["Adult consultation", "£95"],
  ["Child consultation", "£65"],
  ["Hygiene appointment", "from £89"],
  ["White filling", "from £185"],
  ["Ceramic crown", "from £795"],
  ["Teeth whitening", "from £395"],
  ["Invisalign", "from £3,250"],
];

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: "arrow" | "phone" | "clock" | "pin" | "menu" | "close" | "check" | "plus";
  size?: number;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<"public" | "login" | "admin">("public");
  const [appointments, setAppointments] = useState<AdminAppointment[]>(seedAppointments);

  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Oxford Dental Centre";
  }, []);

  if (portalMode === "login") {
    return (
      <AdminLogin onBack={() => setPortalMode("public")} onLogin={() => setPortalMode("admin")} />
    );
  }

  if (portalMode === "admin") {
    return (
      <AdminPortal
        appointments={appointments}
        onLogout={() => setPortalMode("login")}
        onWebsite={() => setPortalMode("public")}
        setAppointments={setAppointments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#172c32]">
      <Header
        menuOpen={menuOpen}
        navigate={navigate}
        onAdminLogin={() => setPortalMode("login")}
        page={page}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "treatments" && <TreatmentsPage navigate={navigate} />}
        {page === "treatment" && <TreatmentPage navigate={navigate} />}
        {page === "emergency" && <EmergencyPage navigate={navigate} />}
        {page === "fees" && <FeesPage navigate={navigate} />}
        {page === "first-visit" && <FirstVisitPage navigate={navigate} />}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "contact" && <ContactPage setAppointments={setAppointments} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
  onAdminLogin,
}: {
  page: Page;
  navigate: (page: Page) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onAdminLogin: () => void;
}) {
  return (
    <>
      <div className="bg-[#14383d] px-5 py-2.5 text-[11px] tracking-[.12em] text-white/80 uppercase">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 sm:gap-6">
          <span className="hidden sm:inline">Independent dental care in the heart of Oxford</span>
          <a
            className="ml-auto hidden items-center gap-2 transition hover:text-white sm:flex"
            href="tel:+441865493372"
          >
            <Icon name="phone" size={14} /> +44 1865 493372
          </a>
          <button
            className="border-l border-white/20 pl-4 font-semibold text-white transition hover:text-[#9bc8bf] sm:pl-6"
            onClick={onAdminLogin}
          >
            Staff admin login
          </button>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#16383e]/10 bg-[#f7f7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center px-5 lg:px-8">
          <button className="group mr-auto shrink-0" onClick={() => navigate("home")}>
            <img
              alt="Oxford Dental Centre — Personalised Care"
              className="h-[62px] w-auto transition group-hover:opacity-80"
              src={clinicLogo}
            />
          </button>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                className={`nav-link ${page === item.page || (page === "treatment" && item.page === "treatments") ? "active" : ""}`}
                key={item.page}
                onClick={() => navigate(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="button-primary ml-8 hidden lg:flex"
            onClick={() => navigate("contact")}
          >
            Book appointment <Icon name="arrow" size={17} />
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-5 grid h-11 w-11 place-items-center rounded-full border border-[#14383d]/15 xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#14383d]/10 bg-[#f7f7f2] px-5 py-5 xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <button
                  className="border-b border-[#14383d]/10 py-3 text-left font-medium"
                  key={item.page}
                  onClick={() => navigate(item.page)}
                >
                  {item.label}
                </button>
              ))}
              <button className="button-primary mt-4 w-full" onClick={() => navigate("contact")}>
                Book appointment <Icon name="arrow" size={17} />
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  const [review, setReview] = useState(0);
  const reviews = [
    {
      quote:
        "The whole team made me feel completely at ease. The care was thoughtful, unhurried and genuinely kind.",
      name: "Emily R.",
    },
    {
      quote:
        "A beautiful practice with an exceptional team. Every part of my treatment was explained clearly.",
      name: "James T.",
    },
    {
      quote:
        "The most comfortable dental experience I have had. I left feeling listened to and confident.",
      name: "Sophie M.",
    },
  ];

  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-[#dfeeea]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[56%]">
          <img
            alt="Bright and modern treatment room at Oxford Dental Centre"
            className="h-full w-full object-cover"
            src={clinicImage}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#dfeeea] via-[#dfeeea]/30 to-transparent lg:from-[#dfeeea]/50" />
        </div>
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 lg:px-8">
          <div className="max-w-[650px]">
            <p className="eyebrow">Oxford’s independent dental practice</p>
            <h1 className="mt-7 font-serif text-[clamp(3.4rem,7vw,6.8rem)] leading-[.88] font-medium tracking-[-.04em]">
              Care that feels
              <span className="block italic text-[#477c74]">wonderfully human.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#3e565a]">
              At Oxford Dental Centre, we provide a comprehensive array of dental care services,
              which include preventive dentistry, restorative dentistry, and expert dental
              implants.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button className="button-primary" onClick={() => navigate("contact")}>
                Book your visit <Icon name="arrow" size={18} />
              </button>
              <button className="button-secondary" onClick={() => navigate("treatments")}>
                Explore treatments
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-5 bottom-5 hidden rounded-sm bg-[#f7f7f2] p-5 shadow-xl md:block lg:right-10 lg:bottom-10">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e0efeb]">
              <Icon name="clock" />
            </span>
            <div>
              <p className="text-xs tracking-[.16em] text-[#677a7d] uppercase">Now welcoming</p>
              <p className="mt-1 font-semibold">New patients</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Your dental home</p>
              <h2 className="section-title mt-5">A calmer kind of dentistry.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-xl leading-9 text-[#41585c]">
                We believe exceptional dentistry begins with listening. Our independent Oxford
                practice brings clinical expertise and thoughtful technology together in a space
                designed around you.
              </p>
              <div className="border-l border-[#14383d]/15 pl-7">
                {["Unhurried appointments", "Clear, honest advice", "Thoughtful modern care"].map(
                  (item) => (
                    <div
                      className="flex items-center gap-3 border-b border-[#14383d]/10 py-3"
                      key={item}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#9bc8bf]">
                        <Icon name="check" size={14} />
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#14383d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-[#9bc8bf]">What we offer</p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-tight md:text-6xl">
                Care for every chapter of your smile.
              </h2>
            </div>
            <button className="button-light" onClick={() => navigate("treatments")}>
              View all treatments <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="grid gap-px overflow-hidden bg-white/15 md:grid-cols-3">
            {treatments.slice(0, 3).map((treatment, index) => (
              <button
                className="group relative min-h-[480px] overflow-hidden bg-[#14383d] text-left"
                key={treatment.title}
                onClick={() => navigate(treatment.page)}
              >
                <img
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-50"
                  src={treatment.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b292e] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="text-xs tracking-[.18em] text-[#c1ded8] uppercase">
                    0{index + 1} · {treatment.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl">{treatment.title}</h3>
                  <p className="mt-3 max-w-sm leading-7 text-white/75">{treatment.text}</p>
                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    Learn more <Icon name="arrow" size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative">
              <img
                alt="A welcoming modern dental treatment space"
                className="aspect-[4/5] w-[85%] object-cover"
                src={chairImage}
              />
              <div className="absolute right-0 bottom-[-8%] w-[48%] bg-[#e4b982] p-7">
                <p className="font-serif text-5xl">15+</p>
                <p className="mt-2 text-sm leading-6">years of trusted dental care in Oxford</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Designed around you</p>
              <h2 className="section-title mt-5">Expert care. Without the clinical feeling.</h2>
              <p className="body-copy mt-7">
                From our calm rooms to the way we explain each option, every detail is here to make
                dental care feel easier. You will always know what is happening, why it matters and
                what comes next.
              </p>
              <button className="text-link mt-9" onClick={() => navigate("about")}>
                Meet the practice <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e1ede9] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow">Kind words</p>
          <div className="mt-8 text-[#d59d55]">★★★★★</div>
          <blockquote className="mt-8 font-serif text-3xl leading-snug md:text-5xl">
            “{reviews[review].quote}”
          </blockquote>
          <p className="mt-7 text-sm font-semibold tracking-[.14em] uppercase">
            {reviews[review].name}
          </p>
          <div className="mt-10 flex justify-center gap-2">
            {reviews.map((item, index) => (
              <button
                aria-label={`Show review by ${item.name}`}
                className={`h-2 rounded-full transition-all ${review === index ? "w-8 bg-[#14383d]" : "w-2 bg-[#14383d]/25"}`}
                key={item.name}
                onClick={() => setReview(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  image = clinicImage,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#14383d] text-white">
      <div className="absolute inset-y-0 right-0 w-full opacity-45 lg:w-1/2 lg:opacity-75">
        <img alt="" className="h-full w-full object-cover" src={image} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14383d] via-[#14383d]/35 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-[#9bc8bf]">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-[clamp(3.4rem,7vw,6.3rem)] leading-[.95] font-medium tracking-[-.03em]">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">{text}</p>
        </div>
      </div>
    </section>
  );
}

function TreatmentsPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Treatment page"
        image={careImage}
        text="From everyday prevention to advanced restorative care, our team brings clarity, comfort and precision to every treatment."
        title="Thoughtful care for every smile."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 grid gap-8 lg:grid-cols-2">
            <h2 className="section-title">Treatments, tailored to you.</h2>
            <p className="body-copy">
              No two people are the same, so no two care plans should be either. We take time to
              understand what matters to you and explain every option without pressure.
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment, index) => (
              <article className="group" key={treatment.title}>
                <button
                  className="block w-full overflow-hidden text-left"
                  onClick={() => navigate(treatment.page)}
                >
                  <img
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    src={treatment.image}
                  />
                </button>
                <p className="mt-6 text-xs tracking-[.16em] text-[#58736f] uppercase">
                  0{index + 1} · {treatment.tag}
                </p>
                <h3 className="mt-2 font-serif text-3xl">{treatment.title}</h3>
                <p className="mt-3 leading-7 text-[#52666a]">{treatment.text}</p>
                <button className="text-link mt-5" onClick={() => navigate(treatment.page)}>
                  Learn more <Icon name="arrow" size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA navigate={navigate} />
    </>
  );
}

function TreatmentPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Treatment details"
        image={roomImage}
        text="Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing."
        title="Personalised dental care."
      />
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
          <div>
            <p className="eyebrow">Everyday dental care</p>
            <h2 className="section-title mt-5">Healthy smiles start with a trusted routine.</h2>
            <p className="body-copy mt-7">
              Regular examinations help us spot small changes before they become bigger concerns.
              Your visit is also time to talk—about sensitivity, confidence, habits or anything else
              on your mind.
            </p>
            <p className="body-copy mt-5">
              We use digital imaging and careful clinical assessment to build a complete picture,
              then explain our findings in plain English.
            </p>
          </div>
          <aside className="self-start bg-[#e1ede9] p-8 lg:p-10">
            <p className="eyebrow">Treatment quick details</p>
            <div className="mt-7 space-y-5">
              {[
                ["Appointment time", "30–45 minutes"],
                ["Comfort", "Gentle, unhurried care"],
                ["Recommended", "Every 6–12 months"],
                ["Fee", "From £65"],
              ].map(([label, value]) => (
                <div className="border-b border-[#14383d]/15 pb-5" key={label}>
                  <p className="text-xs tracking-[.12em] text-[#607579] uppercase">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <button className="button-primary mt-8 w-full" onClick={() => navigate("contact")}>
              Ask about treatment <Icon name="arrow" size={18} />
            </button>
          </aside>
        </div>
      </section>
      <section className="bg-[#14383d] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-[#9bc8bf]">Treatment fees</p>
          <h2 className="mt-5 font-serif text-5xl">Clear fees. No surprises.</h2>
          <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-2">
            {[
              ["Routine examination", "£65"],
              ["New patient examination", "£95"],
              ["Small X-ray", "£18"],
              ["White filling", "from £185"],
            ].map(([name, price]) => (
              <div className="flex justify-between bg-[#14383d] p-6" key={name}>
                <span>{name}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA navigate={navigate} />
    </>
  );
}

function EmergencyPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Oxford Dental Centre"
        image={chairImage}
        text="Prompt, compassionate emergency dental care for sudden pain, swelling, trauma or dental infection."
        title="Dental emergencies."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_.72fr]">
            <div>
              <p className="eyebrow">What to do in a dental emergency</p>
              <h2 className="section-title mt-5">We are here when you need us.</h2>
              <p className="body-copy mt-7">
                If you are experiencing sudden tooth pain, swelling, trauma or a dental infection,
                call us immediately. We prioritise emergency dental care to help you get fast and
                effective relief when you need it most.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {["Call the practice", "Explain your symptoms", "See our team promptly"].map(
                  (step, index) => (
                    <div className="border border-[#14383d]/15 p-6" key={step}>
                      <span className="text-xs text-[#588078]">0{index + 1}</span>
                      <p className="mt-7 font-serif text-2xl">{step}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
            <aside className="bg-[#e4b982] p-8 lg:p-10">
              <p className="eyebrow">Dental emergency numbers</p>
              <div className="mt-5 space-y-3">
                <a
                  className="block font-serif text-3xl transition hover:opacity-70 sm:text-4xl"
                  href="tel:+441865493372"
                >
                  01865 493372
                </a>
                <span className="block text-xs tracking-[.15em] uppercase">or</span>
                <a
                  className="block font-serif text-3xl transition hover:opacity-70 sm:text-4xl"
                  href="tel:+447985716665"
                >
                  07985 716665
                </a>
              </div>
              <p className="mt-6 leading-7">
                If you are experiencing facial swelling that affects breathing, go to A&amp;E or
                call 999 immediately.
              </p>
              <div className="mt-8 border-t border-[#14383d]/20 pt-7">
                <p className="text-xs tracking-[.14em] uppercase">Same-day emergency care</p>
                <p className="mt-2 leading-7">
                  Our experienced team aims to see emergency cases on the same day, so you are not
                  left waiting in discomfort.
                </p>
              </div>
            </aside>
          </div>
          <div className="mt-20 bg-[#e1ede9] p-8 lg:p-14">
            <p className="eyebrow">Common emergencies that Oxford treats</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
              Fast, effective relief when you need it most.
            </h2>
            <div className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
              {[
                "Toothache and dental abscesses",
                "Broken or chipped teeth",
                "Lost fillings or crowns",
                "Gum swelling or bleeding",
                "Painful wisdom teeth",
                "Damaged implants or exposed implants",
                "Broken or loose dentures",
              ].map((emergency) => (
                <div
                  className="flex items-center gap-4 border-b border-[#14383d]/15 py-4"
                  key={emergency}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#9bc8bf]">
                    <Icon name="check" size={15} />
                  </span>
                  <span className="font-medium">{emergency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA navigate={navigate} />
    </>
  );
}

function FeesPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Fees and finances"
        image={careImage}
        text="We are open about costs from the start. You will receive a written estimate before treatment begins."
        title="Clarity at every step."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-20 max-w-4xl">
            <p className="eyebrow">Transparent dental fees and clear communication</p>
            <h2 className="section-title mt-5">Know where you stand from the start.</h2>
            <p className="body-copy mt-7 max-w-4xl">
              Oxford Dental Centre is dedicated to ensuring dental fee transparency through a clear
              pricing model. We provide comprehensive treatment plans and straightforward
              explanations of your care, helping you fully understand the value of your treatment.
              As costs depend on the complexity of your specific dental needs, we provide a thorough
              treatment plan and fee estimate immediately after your consultation. Consultation fees
              are £95 for adults and £65 for children.
            </p>
          </div>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="eyebrow">Service fees and finances</p>
              <h2 className="section-title mt-5">A guide to our fees.</h2>
              <div className="mt-10 border-t border-[#14383d]/20">
                {fees.map(([service, price]) => (
                  <div
                    className="flex items-center justify-between gap-5 border-b border-[#14383d]/15 py-5"
                    key={service}
                  >
                    <span>{service}</span>
                    <strong>{price}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-[#627579]">
                Fees are a guide and may vary according to clinical need. A full written estimate is
                always provided.
              </p>
            </div>
            <div>
              <div className="bg-[#e1ede9] p-8 lg:p-10">
                <p className="eyebrow">Approved payment information</p>
                <h3 className="mt-5 font-serif text-3xl">Spread the cost of care.</h3>
                <p className="mt-5 leading-7 text-[#51676a]">
                  Flexible finance options are available on selected treatments, subject to status.
                  Our reception team can explain the options and help you apply.
                </p>
                <button className="button-primary mt-8" onClick={() => navigate("contact")}>
                  Ask reception <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FirstVisitPage({ navigate }: { navigate: (page: Page) => void }) {
  const cards = [
    {
      title: "What to bring with you",
      text: "A list of current medication, relevant medical details and any questions you would like us to answer.",
    },
    {
      title: "What documents you need",
      text: "Please complete your medical history form before you arrive. We will send it securely by email.",
    },
    {
      title: "Nervous about the dentist?",
      text: "Tell us when you book. We will allow extra time, explain each step and move entirely at your pace.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow="First time at the practice"
        image={roomImage}
        text="Your first visit is a chance to get to know us, talk about what matters to you and make a plan together."
        title="A warm welcome awaits."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card, index) => (
              <article className="border border-[#14383d]/15 p-8 lg:p-10" key={card.title}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#9bc8bf] font-semibold">
                  0{index + 1}
                </span>
                <h2 className="mt-8 font-serif text-3xl">{card.title}</h2>
                <p className="mt-5 leading-7 text-[#53686b]">{card.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-20 grid items-center gap-14 bg-[#e1ede9] lg:grid-cols-2">
            <img
              alt="Our calm and modern dental practice"
              className="h-full min-h-[430px] w-full object-cover"
              src={careImage}
            />
            <div className="p-8 lg:p-14">
              <p className="eyebrow">Your first appointment</p>
              <h2 className="mt-5 font-serif text-4xl">Time to talk. Time to listen.</h2>
              <p className="mt-6 leading-8 text-[#506569]">
                We will discuss your dental and medical history, carry out a comprehensive
                assessment and take any images needed. Most importantly, we will listen to your
                goals and concerns.
              </p>
              <button className="button-primary mt-8" onClick={() => navigate("contact")}>
                Book your first visit <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About the practice"
        image={clinicImage}
        text="Independent in spirit, personal in approach and uncompromising about clinical standards."
        title="Dentistry with heart."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Providing exceptional dental care and services</p>
              <h2 className="section-title mt-5">Built around people, not appointments.</h2>
            </div>
            <div>
              <p className="body-copy">
                Oxford Dental Centre was created to offer a more personal kind of dentistry—one
                where clinicians have time to listen, teams know their patients and every decision
                is made with long-term wellbeing in mind.
              </p>
              <p className="body-copy mt-6">
                We invest in modern technology because it makes care more precise and comfortable,
                but warmth, trust and excellent communication will always be at the heart of what we
                do.
              </p>
            </div>
          </div>
          <div className="mt-20 border border-[#14383d]/10 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(20,56,61,.08)] md:px-10 lg:px-16 lg:py-14">
            <div className="flex items-center gap-5 md:gap-8">
              <span className="h-px flex-1 bg-[#74bfd1]/70" />
              <h3 className="text-center text-xl font-medium tracking-[.05em] text-[#248caf] uppercase md:text-3xl">
                Meet the principal dentist
              </h3>
              <span className="h-px flex-1 bg-[#74bfd1]/70" />
            </div>
            <div className="mt-12 grid items-start gap-10 lg:grid-cols-[330px_1fr] lg:gap-14">
              <div className="bg-[#eef4f2]">
                <img
                  alt="Dr. Leonard Bowora, principal dentist at Oxford Dental Centre"
                  className="aspect-[.74] w-full object-cover object-top"
                  src="/dr-leonard-bowora.png"
                />
              </div>
              <div>
                <h4 className="font-serif text-4xl text-[#172c32]">Dr. Leonard Bowora</h4>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52676a] italic">
                  MSc (Oral Surgery), BChD, DCR(T), PDD (US), DUI (Implantology) – Lille, France,
                  Assoc. Fellow (AAID, USA)
                </p>
                <p className="mt-2 text-sm font-semibold text-[#29464b]">
                  Dental surgeon / Implant, Cosmetic &amp; General Dentistry
                </p>
                <p className="mt-1 text-sm font-medium text-[#52676a]">GDC Number 75199</p>
                <p className="mt-8 max-w-3xl leading-8 text-[#42595d] italic">
                  With more than 30 years of experience, Dr. Leonard Bowora is a highly respected
                  dental surgeon known for his warm approach, meticulous care, and advanced
                  expertise in Oral Surgery, Dental Implants, Cosmetic Dentistry, Endodontics, and
                  Conscious Sedation. He believes that every smile is unique and is dedicated to
                  providing personalised care tailored to each patient’s needs and comfort.
                </p>
                <div className="mt-10 border-t border-[#14383d]/10 pt-9">
                  <h5 className="font-serif text-3xl text-[#172c32]">Skills and Experience</h5>
                  <div className="mt-6 space-y-6 leading-8 text-[#52676a]">
                    <p>
                      Dr Bowora began his healthcare career in 1987, earning a Diploma in
                      Radiotherapy from the College of Radiographers in London. He went on to
                      complete his Dentistry degree in Cape Town in 1994 and moved to the UK in
                      1998, where he has been committed to delivering high-quality dental care ever
                      since.
                    </p>
                    <p>
                      His passion for excellence is reflected in his extensive training and
                      qualifications. He achieved Certification in Dental Implantology from the
                      renowned Hilt Tatum Institute in 2002 and attended a year-long Conscious
                      Sedation programme at the University of Newcastle in 2003. That same year, he
                      graduated Cum Laude with a Postgraduate Diploma in Clinical Dentistry.
                    </p>
                    <p>
                      Continuing to expand his knowledge, he completed a Postgraduate Residency in
                      Dental Implantology at the Medical and Dental University of Lille 2 in France
                      in 2010 and has recently been awarded a Master’s degree in Oral Surgery (MSc).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <article className="mt-12 border-t border-[#14383d]/10 pt-10 lg:px-2">
              <h4 className="font-serif text-4xl text-[#172c32]">More about Dr Bowora</h4>
              <div className="mt-7 max-w-5xl space-y-5 leading-8 text-[#52676a]">
                <p>
                  In 2011, Dr Bowora became an Associate Fellow of the prestigious American Academy
                  of Implant Dentistry and is a member of the Alabama Implant Study Group in the
                  USA.
                </p>
                <p>
                  His experience extends to managing complex Oral and Maxillofacial cases, including
                  impacted teeth and advanced extractions—often performed under conscious sedation.
                </p>
                <p>
                  Outside the clinic, Dr Bowora enjoys spending time outdoors. He is passionate
                  about farming and loves being with his family at their allotment, where he finds
                  joy in nurturing both plants and cherished family moments.
                </p>
              </div>
              <button className="button-primary mt-9" onClick={() => navigate("contact")}>
                Book an appointment <Icon name="arrow" size={18} />
              </button>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage({
  setAppointments,
}: {
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
}) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAppointments((items) => [
      {
        id: `REQ-${Date.now().toString().slice(-6)}`,
        name: String(data.get("name")),
        email: String(data.get("email")),
        phone: String(data.get("phone")),
        date: String(data.get("date")),
        time: String(data.get("time")),
        treatment: String(data.get("treatment")),
        status: "pending",
        approved: false,
      },
      ...items,
    ]);
    setSent(true);
  };
  return (
    <>
      <PageHero
        eyebrow="Contact and appointments"
        image={roomImage}
        text="Whether you are ready to book or simply have a question, our friendly reception team is here to help."
        title="Let’s start a conversation."
      />
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div>
            <p className="eyebrow">Request an appointment</p>
            <h2 className="mt-5 font-serif text-5xl">How can we help?</h2>
            {sent ? (
              <div className="mt-10 bg-[#e1ede9] p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#9bc8bf]">
                  <Icon name="check" />
                </span>
                <h3 className="mt-6 font-serif text-3xl">Thank you for getting in touch.</h3>
                <p className="mt-4 leading-7 text-[#52676a]">
                  Your request has been added to the admin team’s pending appointments. The
                  reception team would contact you shortly to confirm the details.
                </p>
                <button className="text-link mt-6" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="mt-10 grid gap-5 sm:grid-cols-2" onSubmit={submit}>
                <Field label="Patient name" name="name" placeholder="Your full name" required />
                <Field
                  label="Email address"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
                <Field
                  label="Contact number"
                  name="phone"
                  placeholder="Your phone number"
                  required
                  type="tel"
                />
                <Field label="Appointment date" name="date" required type="date" />
                <Field label="Preferred time" name="time" required type="time" />
                <label className="sm:col-span-2">
                  <span className="field-label">How would you like us to help?</span>
                  <select className="field-input" defaultValue="" name="treatment" required>
                    <option disabled value="">
                      Choose an option
                    </option>
                    <option>New patient examination</option>
                    <option>Routine appointment</option>
                    <option>Dental emergencies</option>
                    <option>Dentures</option>
                    <option>Root Canal</option>
                    <option>Orthodontic treatment</option>
                    <option>Dental implants</option>
                    <option>Oral and Teeth Extractions</option>
                    <option>Wisdom teeth removal</option>
                    <option>Other treatment enquiry</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Message</span>
                  <textarea
                    className="field-input min-h-36 resize-y"
                    name="message"
                    placeholder="Tell us a little more..."
                  />
                </label>
                <div className="flex flex-wrap gap-3 sm:col-span-2">
                  <button className="button-primary" type="submit">
                    Send enquiry <Icon name="arrow" size={18} />
                  </button>
                  <button className="button-secondary" type="reset">
                    Clear
                  </button>
                </div>
              </form>
            )}
          </div>
          <aside>
            <div className="bg-[#14383d] p-8 text-white lg:p-10">
              <p className="eyebrow text-[#9bc8bf]">Contact information</p>
              <div className="mt-8 space-y-7">
                <ContactLine icon="phone" label="Telephone" value="+44 1865 493372" />
                <ContactLine icon="phone" label="Emergency contact" value="+44 7985 716665" />
                <ContactLine icon="pin" label="Find us" value="162 Banbury Road, Oxford OX2 7BT" />
                <ContactLine
                  icon="clock"
                  label="Working hours"
                  value="Monday–Friday, 09:00–17:00"
                />
                <div className="border-b border-white/15 pb-7">
                  <p className="text-xs tracking-[.14em] text-white/50 uppercase">Email</p>
                  <a
                    className="mt-2 block break-words leading-7 transition hover:text-[#9bc8bf]"
                    href="mailto:info@oxforddentalcentre.co.uk"
                  >
                    info@oxforddentalcentre.co.uk
                  </a>
                </div>
              </div>
            </div>
            <div className="map-pattern grid min-h-[300px] place-items-center p-8 text-center">
              <div className="rounded-full bg-[#f7f7f2] p-5 shadow-lg">
                <Icon name="pin" size={30} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input className="field-input" {...props} />
    </label>
  );
}

function ContactLine({
  icon,
  label,
  value,
}: {
  icon: "phone" | "pin" | "clock";
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4 border-b border-white/15 pb-7">
      <Icon className="mt-1 text-[#9bc8bf]" name={icon} />
      <div>
        <p className="text-xs tracking-[.14em] text-white/50 uppercase">{label}</p>
        <p className="mt-2 leading-7">{value}</p>
      </div>
    </div>
  );
}

function CTA({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <section className="bg-[#e4b982] py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 lg:px-8">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
            Let’s take care of your smile.
          </h2>
        </div>
        <button className="button-primary" onClick={() => navigate("contact")}>
          Book an appointment <Icon name="arrow" size={18} />
        </button>
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer>
      <section className="bg-white px-5 py-14 text-[#14383d] sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-serif text-2xl sm:text-3xl">Proudly associated with</p>
          <div className="mt-10 grid items-center justify-items-center gap-9 sm:grid-cols-3 sm:gap-12">
            <img
              alt="Invisalign Provider"
              className="h-auto w-[245px] max-w-full"
              src={invisalignLogo}
            />
            <img
              alt="American Academy of Implant Dentistry"
              className="h-auto w-[135px] max-w-full"
              src={aaidLogo}
            />
            <img alt="Smilelign" className="h-auto w-[185px] max-w-full" src={smilelignLogo} />
          </div>
        </div>
      </section>
      <div className="bg-[#0c292e] text-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
          <div>
            <p className="footer-heading">Explore</p>
            <div className="mt-5 grid gap-3 text-sm text-white/65">
              {navItems.slice(1).map((item) => (
                <button
                  className="w-fit transition hover:text-white"
                  key={item.page}
                  onClick={() => navigate(item.page)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-heading">Working hours</p>
            <div className="mt-5 space-y-3 text-sm text-white/65">
              <p className="flex justify-between">
                <span>Mon</span>
                <span>09:00–17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Tue</span>
                <span>09:00–17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Wed</span>
                <span>09:00–17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Thu</span>
                <span>09:00–17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Fri</span>
                <span>09:00–17:00</span>
              </p>
              <p className="flex justify-between">
                <span>Sat</span>
                <span>Closed</span>
              </p>
              <p className="flex justify-between">
                <span>Sun</span>
                <span>Closed</span>
              </p>
            </div>
          </div>
          <div>
            <p className="footer-heading">Contact</p>
            <div className="mt-5 space-y-3 text-sm leading-6 text-white/65">
              <p>
                162 Banbury Road
                <br />
                Oxford OX2 7BT
              </p>
              <a className="block transition hover:text-white" href="tel:+441865493372">
                +44 1865 493372
              </a>
              <a
                className="block transition hover:text-white"
                href="mailto:info@oxforddentalcentre.co.uk"
              >
                info@oxforddentalcentre.co.uk
              </a>
              <a className="block transition hover:text-white" href="tel:+447985716665">
                Emergency: +44 7985 716665
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-6 text-center text-[11px] tracking-[.1em] text-white/40 uppercase">
          © 2025 Oxford Dental Centre · Website concept
        </div>
      </div>
    </footer>
  );
}

export default App;
