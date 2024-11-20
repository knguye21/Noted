import Image from "next/image";
import LandingNav from "@components/landingnav";
import LandingFooter from "@components/landingfooter";

export default function LandingPage() {
  //const hero = ["Stay Creative", "Stay Organized", "Stay Focused"];

  const sections = [
    {
      title: "Instant Task Capture",
      description:
        "Quickly jot down your tasks, ideas, and reminders as soon as they come to mind. No more forgotten thoughts or missed deadlines—just capture it all with a few taps.",
      imageAlt: "Instant Task Capture",
      imageSrc: "/icons/note.png",
    },
    {
      title: "Effortless Task Organization",
      description:
        "Arrange tasks, projects, and deadlines in a way that makes sense to you. Whether you prefer lists, boards, or calendars, organize your workload your way and stay on track.",
      imageAlt: "Effortless Task Organization",
      imageSrc: "/icons/effortless.png",
    },
    {
      title: "Stay Focused",
      description:
        "Keep everything in one place—tasks, notes, and reminders. Stay organized while you stay inspired, with all your creative and task-based needs right at your fingertips.",
      imageAlt: "Stay Focused",
      imageSrc: "/icons/focus.png",
    },
    {
      title: "Plan with Confidence",
      description:
        "Make the most of your time. Set clear priorities, break down tasks into manageable steps, and keep track of deadlines effortlessly. Stay organized and ahead of the curve, so you can focus on what truly matters.",
      imageAlt: "Plan with Confidence",
      imageSrc: "/icons/confidence.png",
    },
  ];

  return (
    <div>
      <LandingNav/>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-10 px-4 md:px-16 space-y-8 md:space-y-0">
        <div className="text-center md:text-left space-y-4 md:max-w-lg mx-auto">
          <h1 className="text-4xl font-semibold text-gray-800 sm:text-4xl transition-transform duration-500 ease-in-out transform hover:scale-105">
            Stay Creative, Stay Organized, Stay Focused
          </h1>
          <h2 className="text-xl text-gray-600 sm:text-xl max-w-xl mx-auto md:mx-0 transition-opacity duration-500 ease-in-out opacity-90 hover:opacity-100">
            Whether you&apos;re jotting down notes or managing your to-dos, stay on track without losing your creative flow.
          </h2>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12 p-8 mx-auto max-w-7xl">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center p-10 space-y-8 mx-auto"
          >
            {/* Text Section */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4 transition-opacity duration-500 ease-in-out opacity-90 hover:opacity-100">
                {section.title}
              </h3>
              <p className="text-xl text-gray-600 transition-opacity duration-500 ease-in-out opacity-80 hover:opacity-100">
                {section.description}
              </p>
            </div>
            {/* Image Section */}
            <div className="flex-shrink-0 w-full md:w-1/2 mx-auto">
              <div className="transition-transform duration-300 ease-in-out transform hover:scale-105">
                <Image
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  width={250}
                  height={250}
                  className="object-cover rounded-lg shadow-md mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <LandingFooter/>
    </div>
  );
}
