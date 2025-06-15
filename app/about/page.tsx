import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Heart } from "lucide-react";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />


      <div className="container py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Page Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              About <span className="text-[#2ecc17]">BHS24HUB</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
              Learn more about our educational reading platform and our mission
            </p>
          </div>

          {/* Platform Description */}
          <div className="prose dark:prose-invert max-w-none">
            <p>
              <strong>BHS24HUB</strong> is a student-centered digital platform dedicated to enhancing the reading and learning journey.
              We provide tools to support comprehension, promote engagement, and foster a deeper love for reading through technology.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-black dark:text-black">
              We aim to make educational resources universally accessible and engaging. BHS24HUB is designed to spark curiosity,
              support understanding, and help students build lasting knowledge through intuitive learning tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <BookOpen className="h-12 w-12 text-[#2ecc17]" />
                  <h3 className="text-xl font-bold">Accessible Reading</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Making books and educational content accessible to all students regardless of location.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Lightbulb className="h-12 w-12 text-[#2ecc17]" />
                  <h3 className="text-xl font-bold">Enhanced Understanding</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Providing tools like AI summaries and dictionaries to improve comprehension.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-black dark:text-black">
              BHS24HUB was developed by a passionate team of educators, technologists, and content lovers. Our goal is to
              combine academic expertise with smart technology to deliver a better learning experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Users className="h-12 w-12 text-[#2ecc17]" />
                  <h3 className="text-xl font-bold">Educators & Technologists</h3>
                  <p className="text-sm text-black dark:text-black">
                    Our team consists of experienced educators and skilled technologists working together.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Heart className="h-12 w-12 text-[#2ecc17]" />
                  <h3 className="text-xl font-bold">Passion for Learning</h3>
                  <p className="text-sm text-black dark:text-black">
                    We&apos;re united by our passion for education and belief in the power of reading.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-black dark:text-black">
              <li><strong>Accessibility:</strong> Making education accessible to all students</li>
              <li><strong>Innovation:</strong> Constantly improving our platform with new features</li>
              <li><strong>Community:</strong> Fostering a community of readers and learners</li>
              <li><strong>Quality:</strong> Providing high-quality educational content and tools</li>
              <li><strong>Privacy:</strong> Respecting user privacy and data security</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-black dark:text-black">
              We&apos;d love to hear from you! If you have any questions, suggestions, or feedback, please don&apos;t hesitate to
              reach out to us at{" "}
              <a href="mailto:androtechlistgroup@gmail.com" className="text-[#2ecc17] underline">
                androtechlistgroup@gmail.com
              </a> or on WhatsApp at{" "}
              <a href="https://wa.me/8101451936" className="text-[#2ecc17] underline">
                WhatsApp
              </a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}