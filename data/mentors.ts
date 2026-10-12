/**
 * Mentor profiles - rebuilt from the original API records recovered out of the
 * scraped pages' RSC payloads (the site's database no longer exists).
 *
 * photo / coverPhoto are Cloudinary public IDs - build delivery URLs with
 * cloudinaryUrl() from @/lib/cloudinary.
 */

export type MentorStatus = "current_student" | "recent_graduate" | "alumni";

export type MentorScholarship = {
  rawName: string | null;
  displayName: string | null;
  relationshipStatus: string | null;
  benefits: string[];
};

export type MentorExperience = {
  name: string | null;
  accepted: string | null;
  scholarship: string | null;
  location: string | null;
  degree: string | null;
  fieldOfStudy: string | null;
  city: string | null;
  admissionYear: number | null;
  graduationDate: string | null;
  attendanceStatus: string | null;
  currentlyStudying: boolean | null;
  scholarships: MentorScholarship[];
};

export type MentorActivity = {
  name: string | null;
  title: string | null;
  details: string[];
};

export type MentorWorkExperience = {
  companyName: string | null;
  title: string | null;
  yearExp: string | null;
  details: string[];
};

export type MentorSocial = {
  platform: string | null;
  url: string | null;
};

export type MentorPricing = {
  usd20: number | null;
  usd40: number | null;
  bdt20: number | null;
  bdt40: number | null;
};

export type Mentor = {
  slug: string;
  name: string;
  bio: string | null;
  photo: string | null;
  coverPhoto: string | null;
  mentorSince: string | null;
  status: MentorStatus | null;
  statusLabel: string | null;
  country: string | null;
  homeCountry: string | null;
  universityName: string | null;
  universityCountry: string | null;
  universityCity: string | null;
  major: string | null;
  program: string | null;
  scholarshipLine: string | null;
  ieltsScore: number | null;
  satScore: number | null;
  isScholarshipAwardee: boolean | null;
  pricing: MentorPricing;
  timeZone: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  topics: string[];
  experiences: MentorExperience[];
  activities: MentorActivity[];
  workExperience: MentorWorkExperience[];
  socialMediaLinks: MentorSocial[];
};

export const MENTORS: Mentor[] = [
    {
        "slug":  "aasheer-ishaque-taswar",
        "name":  "Aasheer Ishaque Taswar",
        "bio":  "$1c",
        "photo":  "v1790694942/abroadmates/profiles/abroadmates/profiles/f5d404e7-ef68-41ba-a4d9-d53f434c4b45.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jul 2025",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "Italy",
        "homeCountry":  "Bangladesh",
        "universityName":  "Politecnico Di Torino",
        "universityCountry":  "Italy",
        "universityCity":  "Turin",
        "major":  "Engineering and Management",
        "program":  "Master\u0027s",
        "scholarshipLine":  "Regional State Scholarships | EDISU Piemonte Regional Scholarship (Italy); 100% Tuition Waiver ; 100% Tuition Waiver ; 80% Tuition Waiver ; 50% Tuition Waiver ; Stipendium Hungaricum Scholarship ; Stipendium Hungaricum Scholarship ",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  15,
                        "usd40":  25,
                        "bdt20":  600,
                        "bdt40":  1000
                    },
        "timeZone":  "Europe/Rome",
        "createdAt":  "2025-07-25T02:34:26.570Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "University Application",
                       "Visa Application",
                       "Life Abroad",
                       "Essay Review",
                       "Abroad Career",
                       "Resume Review",
                       "Scholarships",
                       "Roadmap",
                       "Recommendation Letters"
                   ],
        "experiences":  [
                            {
                                "name":  "Politecnico Di Torino",
                                "accepted":  "accepted",
                                "scholarship":  "Regional State Scholarships | EDISU Piemonte Regional Scholarship (Italy)",
                                "location":  "Italy",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Engineering and Management",
                                "city":  "Turin",
                                "admissionYear":  2025,
                                "graduationDate":  "2027-06-30T12:00:00.000Z",
                                "attendanceStatus":  "currently_studying",
                                "currentlyStudying":  true,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "TU Hamburg",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition Waiver ",
                                "location":  "Germany",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  2025,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Tor Vergata University",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition Waiver ",
                                "location":  "Italy",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  2025,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Arizona State University",
                                "accepted":  "accepted",
                                "scholarship":  "80% Tuition Waiver ",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  2021,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of South Florida",
                                "accepted":  "accepted",
                                "scholarship":  "50% Tuition Waiver ",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  2021,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Debrecen",
                                "accepted":  "accepted",
                                "scholarship":  "Stipendium Hungaricum Scholarship ",
                                "location":  "Hungary",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "Mechanical Engineering",
                                "city":  "",
                                "admissionYear":  2022,
                                "graduationDate":  "2025-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Budapest University of Technology and Economics",
                                "accepted":  "accepted",
                                "scholarship":  "Stipendium Hungaricum Scholarship ",
                                "location":  "Hungary",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "Mechanical Engineering",
                                "city":  "",
                                "admissionYear":  2021,
                                "graduationDate":  "2022-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "English Olympiad",
                               "title":  "Former Management Department Head",
                               "details":  [
                                               "â€¢ Organized and led impactful international and national events",
                                               "including an online event during the COVID-19 pandemic that reached over 1 million people and garnered 7500+ submissions",
                                               "demonstrating adaptability and innovation. â€¢ Coordinated multiple National Olympiads",
                                               "workshops",
                                               "seminars",
                                               "and international expansion plans",
                                               "fostering teamwork and leadership to enhance participant engagement and event impact."
                                           ]
                           }
                       ],
        "workExperience":  [
                               {
                                   "companyName":  "Synergy Construction",
                                   "title":  "Mechanical Engineer Intern ",
                                   "yearExp":  "1",
                                   "details":  [
                                                   "â€¢Designing and integrating HVAC systems for the CATL factory",
                                                   "ensuring efficient construction and operations. â€¢Collaborating with engineers",
                                                   "architects",
                                                   "and contractors to achieve seamless MEP system planning and implementation. â€¢Conducting site inspections to monitor progress",
                                                   "uphold safety standards",
                                                   "and ensure quality compliance. â€¢Managing cost control operations and utilizing tools like AutoCAD and MS Project to stay within budget."
                                               ]
                               },
                               {
                                   "companyName":  "Fossil Group",
                                   "title":  "General Office Administrator ",
                                   "yearExp":  "1",
                                   "details":  [
                                                   "â€¢ For Fossil Group",
                                                   "under Transcosmos Europe manage customer interactions via phone",
                                                   "chat",
                                                   "email",
                                                   "and cases using SAP ERP",
                                                   "Salesforce etc. assisting with billing",
                                                   "contract requests",
                                                   "product inquiries",
                                                   "and maintaining accurate records of interactions and account processes. â€¢ Oversee inventory",
                                                   "conduct pricing checks",
                                                   "handle billing and payments",
                                                   "tracking shipments",
                                                   "while maintaining standardized troubleshooting and addressing ad-hoc tasks to support business operations."
                                               ]
                               },
                               {
                                   "companyName":  "University of Debrecen",
                                   "title":  "Undergraduate Research Assistant ",
                                   "yearExp":  "1",
                                   "details":  [
                                                   "â€¢Researching Lean management and Agile product development to optimize industrial operations and enhance market responsiveness. â€¢Investigating sustainable and ethical AI integration in engineering education",
                                                   "focusing on adaptive curricula and cyber-physical systems."
                                               ]
                               }
                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/https%3A%2F%2Fwww.facebook.com%2Faasheer.ishaque.taswar"
                                 },
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/https%3A%2F%2Fwww.linkedin.com%2Fin%2Faasheer88"
                                 },
                                 {
                                     "platform":  "Instagram",
                                     "url":  "https://www.instagram.com/aasheer_ishaque_taswar?igsh=MWc5NjZjcHdubWtiYg=="
                                 }
                             ]
    },
    {
        "slug":  "abdullah-bin-murad-rifat",
        "name":  "Abdullah Bin Murad (rifat)",
        "bio":  "Hi! Iâ€™m Abdullah, a PhD researcher in Chemical Engineering at Northeastern University, USA (fully funded). Before this, I completed my undergrad in Chemical Engineering at Shahjalal University of Science \u0026 Technology (SUST), Sylhet.\n\nI know the journey to higher studies abroad can feel overwhelmingâ€”applications, research, funding, interviewsâ€”itâ€™s a lot! Having gone through it myself, I can guide you step by step. From building a strong research profile during undergrad to securing a fully funded PhD spot, Iâ€™ve learned what works (and what doesnâ€™t),\n\n---\n\nðŸ’¡ What I can help with â†’ Pathways to higher studies in the USA (and insights on other countries too) â€¢ Research guidance â€” how to start, where to look, and how to make it count â€¢ Application strategies to stand out for scholarships \u0026 funding â€¢ Honest, practical advice from someone whoâ€™s been in your shoes.\n\n---\n\nIâ€™m here not just to answer questions, but to share my experiences so you can aim higher, avoid mistakes, and make your path smoother ðŸš€",
        "photo":  "v1757818802/abroadmates/mentors/ukv94jqabnvpdn0cdocl.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Sep 2025",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "United States",
        "homeCountry":  null,
        "universityName":  "Northeastern University",
        "universityCountry":  "United States",
        "universityCity":  "Boston",
        "major":  "Chemical Engineering",
        "program":  "PhD",
        "scholarshipLine":  "Full funded scholarship; Full Funded Scholarship; Full funded scholarship",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  15,
                        "usd40":  25,
                        "bdt20":  500,
                        "bdt40":  850
                    },
        "timeZone":  "America/New_York",
        "createdAt":  "2025-09-13T20:00:16.171Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Essay Review",
                       "Roadmap",
                       "Visa Application",
                       "Scholarships",
                       "ECA Guidance",
                       "Personal Statement",
                       "Recommendation Letters",
                       "Test Prep",
                       "University Application",
                       "Life Abroad",
                       "Abroad Career",
                       "Mock Interviews",
                       "Resume Review"
                   ],
        "experiences":  [
                            {
                                "name":  "Northeastern University",
                                "accepted":  "accepted",
                                "scholarship":  "Full funded scholarship",
                                "location":  "United States",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Boston",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "currently_studying",
                                "currentlyStudying":  true,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Teaching / Research Assistantship | Full funded scholarship",
                                                         "displayName":  "Full funded scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "insurance",
                                                                          "research_funding"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Auburn University",
                                "accepted":  "accepted",
                                "scholarship":  "Full Funded Scholarship",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "Auburn",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Teaching / Research Assistantship | Full Funded Scholarship",
                                                         "displayName":  "Full Funded Scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "insurance",
                                                                          "research_funding",
                                                                          "salary"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "University of Florida",
                                "accepted":  "not accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Gainesville",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "applied_not_accepted",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Tulane University",
                                "accepted":  "accepted",
                                "scholarship":  "Full funded scholarship",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "New Orleans",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Teaching / Research Assistantship | Full funded scholarship",
                                                         "displayName":  "Full funded scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "research_funding",
                                                                          "insurance"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Michigan Technological University",
                                "accepted":  "not accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Houghton",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "applied_not_accepted",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Houston",
                                "accepted":  "not accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Houston",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "applied_not_accepted",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Virginia",
                                "accepted":  "not accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Charlottesville",
                                "admissionYear":  2024,
                                "graduationDate":  null,
                                "attendanceStatus":  "applied_not_accepted",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Shahjalal University of Science \u0026 Technology",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Bangladesh",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "Chemical Engineering",
                                "city":  "Sylhet",
                                "admissionYear":  null,
                                "graduationDate":  "2023-06-30T12:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Notre Dame College",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Bangladesh",
                                "degree":  "High School",
                                "fieldOfStudy":  "",
                                "city":  "Dhaka",
                                "admissionYear":  null,
                                "graduationDate":  "2017-06-30T12:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "Bangladesh Research \u0026 Innovation Society (BRIS)",
                               "title":  "Deputy Head of Event Management",
                               "details":  [
                                               "Conducted short- and long-term planning.",
                                               "Arranged 2 workshops and 2 open talks and a virtual poster competition that had increased Facebook page followers from 1.2k to 6k.",
                                               "Developed and recommended budget and marketing plans and post-event feedback and presented final reports."
                                           ]
                           },
                           {
                               "name":  "SUST Student Chapter of AIChE",
                               "title":  "Director of Design and Technical",
                               "details":  [
                                               "Worked as a team leader in the design and technical wing and",
                                               "Designed the logo of the Student Chapter for branding and social media promotion",
                                               "Scheduled meetings with higher authorities to produce final design",
                                               "Amended designs after feedback",
                                               "Managed technical support team to configure computer systems and solve technical problems during any event."
                                           ]
                           }
                       ],
        "workExperience":  [
                               {
                                   "companyName":  "Bioenergy \u0026 Bioremediation Lab, Department of Chemical Engineering \u0026 Polymer Science",
                                   "title":  "Undergraduate Research Assistant",
                                   "yearExp":  "3",
                                   "details":  [
                                                   "Planned and developed the working procedures and proposed budgets and project timeline.",
                                                   "Designed and run experiments and analyzed and interpreted results by working as part of a team.",
                                                   "Operated standard chemical lab equipment and instruments and evaluated data through Gas Chromatography and UV-vis spectroscopy.",
                                                   "Communicated with local people while conducting the survey project.",
                                                   "Maintained records of research activities and prepared necessary reports."
                                               ]
                               },
                               {
                                   "companyName":  "Meghna PVC Ltd.",
                                   "title":  "Distributed Control System Engineer",
                                   "yearExp":  "1",
                                   "details":  [
                                                   "Operated and optimized chemical processes using DCS systems to ensure safe and efficient plant operations.",
                                                   "Collaborated with teams to resolve plant issues and drive continuous improvement initiatives.",
                                                   "Monitor operational parameters to detect issues early and apply appropriate troubleshooting measures."
                                               ]
                               }
                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/abdullah-bin-murad-rifat"
                                 },
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/abmrifat"
                                 },
                                 {
                                     "platform":  "WhatsApp",
                                     "url":  "https://wa.me/+18573966012"
                                 }
                             ]
    },
    {
        "slug":  "ashfia-salsabil",
        "name":  "Ashfia Salsabil",
        "bio":  "Dear students,\nAs a Stipendium Hungaricum Scholar, I\u0027m here to simplify your application journey! From improvising your CV and motivation letter to sharing entrance exam/interview tips and my struggles and turning points through the process, I\u0027ve got your back! Together, we will ensure your journey is organised, confident and successful. ",
        "photo":  "v1760094881/abroadmates/mentors/xw7g3ebr6zzq5jdvusgt.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Oct 2025",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "Hungary",
        "homeCountry":  null,
        "universityName":  "University of Pecs",
        "universityCountry":  "Hungary",
        "universityCity":  "PÃ©cs",
        "major":  "Psychology",
        "program":  "Bachelor\u0027s",
        "scholarshipLine":  "Stipendium Hungaricum scholarship Program; Stipendium Hungaricum scholarship Program",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  40,
                        "bdt20":  999,
                        "bdt40":  1999
                    },
        "timeZone":  "Europe/Budapest",
        "createdAt":  "2025-10-01T17:04:44.994Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Scholarships",
                       "University Application",
                       "Test Prep",
                       "Life Abroad",
                       "Abroad Career",
                       "Mock Interviews",
                       "Resume Review",
                       "ECA Guidance",
                       "Personal Statement",
                       "Recommendation Letters",
                       "Roadmap",
                       "Essay Review",
                       "Visa Application"
                   ],
        "experiences":  [
                            {
                                "name":  "University of Pecs",
                                "accepted":  "accepted",
                                "scholarship":  "Stipendium Hungaricum scholarship Program",
                                "location":  "Hungary",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "Psychology",
                                "city":  "PÃ©cs",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "currently_studying",
                                "currentlyStudying":  true,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | Stipendium Hungaricum scholarship Program",
                                                         "displayName":  "Stipendium Hungaricum scholarship Program",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "insurance",
                                                                          "research_funding"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "University of Debrecen",
                                "accepted":  "accepted",
                                "scholarship":  "Stipendium Hungaricum scholarship Program",
                                "location":  "Hungary",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "Psychology Student Association",
                               "title":  "Event Organiser",
                               "details":  [
                                               "Organising events and international conferences related to psychology",
                                               "subthrival workshops on mental health",
                                               "academic studies and many other topics for the best student experience of new-comers."
                                           ]
                           },
                           {
                               "name":  "University of Pecs",
                               "title":  "International Student Ambassador ",
                               "details":  [
                                               "Making contents for the university\u0027s social media engagement and communicating with students through UniBuddy platform"
                                           ]
                           },
                           {
                               "name":  "Erasmus+ Projects titled \"Life in Art\"",
                               "title":  "Project Participant",
                               "details":  [
                                               "A 10 days project where I could improve my knowledge on photography",
                                               "videography and sound art through several workshops."
                                           ]
                           },
                           {
                               "name":  "Bangladesh Red Crescent Society",
                               "title":  "National Volunteer",
                               "details":  [
                                               "First Aid Training",
                                               "Covid-19 Vaccination Drive",
                                               "Hotline Service"
                                           ]
                           }
                       ],
        "workExperience":  [
                               {
                                   "companyName":  "Stipendium Hungaricum Mentor Program",
                                   "title":  "Student Mentor ",
                                   "yearExp":  "1",
                                   "details":  [

                                               ]
                               },
                               {
                                   "companyName":  "European Digital UniverCity - EDUC",
                                   "title":  "Content and Social Media Management",
                                   "yearExp":  "0.5",
                                   "details":  [

                                               ]
                               },
                               {
                                   "companyName":  "National Newspaper Olympiad",
                                   "title":  "Joint secretary ",
                                   "yearExp":  "2",
                                   "details":  [

                                               ]
                               },
                               {
                                   "companyName":  "National Newspaper Olympiad",
                                   "title":  "Head of Academic Department ",
                                   "yearExp":  "2",
                                   "details":  [

                                               ]
                               },
                               {
                                   "companyName":  "Bangladesh Red Crescent Society",
                                   "title":  "Program Host ",
                                   "yearExp":  "4",
                                   "details":  [

                                               ]
                               }
                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/https%3A%2F%2Fwww.linkedin.com%2Fin%2Fashfia-salsabil-6356542bb"
                                 }
                             ]
    },
    {
        "slug":  "mayesha-maliha-proma",
        "name":  "Mayesha Maliha Proma",
        "bio":  "I know how overwhelming the whole â€œstudy abroadâ€ thing can feel, because Iâ€™ve been there too. So Iâ€™m here to make it simpler, clearer, and honestly, a lot less stressful for you.\nThink of me as someone in your corner. Iâ€™ll help you figure out where to apply, how to build a strong application, and what actually matters so you donâ€™t waste time guessing.\nAt the end of the day, I want you to feel confident about your choices and excited about whatâ€™s ahead. And Iâ€™ll be right here to guide you.",
        "photo":  "v1774542978/abroadmates/mentors/atfamle5z7cukuttmnmo.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jul 2025",
        "status":  "recent_graduate",
        "statusLabel":  "Just Graduated",
        "country":  "Japan",
        "homeCountry":  "Japan",
        "universityName":  "Tokyo International University",
        "universityCountry":  "Japan",
        "universityCity":  "Kawagoe",
        "major":  "Digital Business \u0026 Innovation",
        "program":  "Bachelor\u0027s",
        "scholarshipLine":  "100% Tuition Reduction Scholarship",
        "ieltsScore":  8,
        "satScore":  1400,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  20,
                        "usd40":  30,
                        "bdt20":  800,
                        "bdt40":  1500
                    },
        "timeZone":  "Asia/Tokyo",
        "createdAt":  "2025-07-25T02:34:28.080Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Essay Review",
                       "Roadmap",
                       "Test Prep",
                       "University Application",
                       "Scholarships",
                       "Life Abroad",
                       "Visa Application",
                       "Abroad Career",
                       "ECA Guidance",
                       "Resume Review",
                       "Personal Statement",
                       "Recommendation Letters"
                   ],
        "experiences":  [
                            {
                                "name":  "Tallinn University of Technology",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Estonia",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "Tallinn",
                                "admissionYear":  2021,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Tokyo International University",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition Reduction Scholarship",
                                "location":  "Japan",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "Digital Business \u0026 Innovation",
                                "city":  "Kawagoe",
                                "admissionYear":  2022,
                                "graduationDate":  "2026-06-30T12:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Tuition reduction scholarship | 100% Tuition Reduction Scholarship",
                                                         "displayName":  "100% Tuition Reduction Scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Viqarunnisa Noon School \u0026 College",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Bangladesh",
                                "degree":  "High School",
                                "fieldOfStudy":  "",
                                "city":  "Dhaka",
                                "admissionYear":  null,
                                "graduationDate":  "2020-06-30T12:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "English Olympiad",
                               "title":  "Divisional Coordinator",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "National Curriculum \u0026 Textbook Board of Bangladesh",
                               "title":  "Educational Content Developer",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Superwoman: A She Learning Platform",
                               "title":  "Founder",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Women Opportunities",
                               "title":  "Co-founder \u0026 Former President",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Worldwide Organization for Charity (WOC)",
                               "title":  "Event Coordinator",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Mainly Coding",
                               "title":  "Content Writer",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Dhaka Apologue",
                               "title":  "Content Writer",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Share-E-Net: A Research on \u0027Reproductive Health of Dhaka City Adolescence\u0027",
                               "title":  "Project Enumerator",
                               "details":  [
                                               ""
                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/mayeshamalihaproma"
                                 }
                             ]
    },
    {
        "slug":  "md-ahnaf-farhan",
        "name":  "Md. Ahnaf Farhan",
        "bio":  "Hi! Iâ€™m Farhan, an Erasmus Mundus masterâ€™s student currently studying Communications Engineering and Data Science at Aalto University, Finland, and soon at Grenoble INP, France.\nComing from Bangladesh, I know firsthand how challenging it can be to figure out where to apply, how to secure funding, and what life abroad really looks like beyond the glossy brochures. I went through the same uncertainties â€” and that experience is what drives me to mentor others today.\nHere, I help students explore study-abroad opportunities, review universities and programs honestly, and guide them through applications and scholarships. If youâ€™re planning your next academic step abroad, Iâ€™m here to help you make informed and confident decisions.",
        "photo":  "v1769625908/abroadmates/mentors/ke9dsdaqonk6zjsxclaa.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jan 2026",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "France",
        "homeCountry":  "France",
        "universityName":  "Grenoble INP UGA",
        "universityCountry":  "France",
        "universityCity":  "Saint-Martin-d\u0027HÃ©res",
        "major":  "Communications Engineering and Data Science",
        "program":  "Master\u0027s",
        "scholarshipLine":  "Global Prestigious Scholarships | Erasmus Mundus Joint Masters; Global Prestigious Scholarships | Erasmus Mundus Joint Masters",
        "ieltsScore":  null,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  45,
                        "bdt20":  1250,
                        "bdt40":  2400
                    },
        "timeZone":  "Europe/Paris",
        "createdAt":  "2026-01-28T18:34:45.674Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Essay Review",
                       "Roadmap",
                       "Scholarships",
                       "ECA Guidance",
                       "Personal Statement",
                       "Recommendation Letters",
                       "University Application",
                       "Life Abroad",
                       "Resume Review"
                   ],
        "experiences":  [
                            {
                                "name":  "Grenoble INP UGA",
                                "accepted":  "accepted",
                                "scholarship":  "Global Prestigious Scholarships | Erasmus Mundus Joint Masters",
                                "location":  "France",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Communications Engineering and Data Science",
                                "city":  "Saint-Martin-d\u0027HÃ©res",
                                "admissionYear":  2026,
                                "graduationDate":  "2027-06-30T12:00:00.000Z",
                                "attendanceStatus":  "currently_studying",
                                "currentlyStudying":  true,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Grenoble INP UGA",
                                "accepted":  "accepted",
                                "scholarship":  "Global Prestigious Scholarships | Erasmus Mundus Joint Masters",
                                "location":  "France",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Communications Engineering and Data Science",
                                "city":  "Grenoble",
                                "admissionYear":  2026,
                                "graduationDate":  "2027-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [

                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/ahnaf.farhan.1"
                                 }
                             ]
    },
    {
        "slug":  "md-sakib-khan",
        "name":  "Md. Sakib Khan",
        "bio":  "Hi, I am Sakib, currently completing my Bachelor in Business Administration and Management at University of PÃ©cs. I am a Stipendium Hungaricum Holder since 2022, which covers my whole tuition fees and I get a monthly stipend. I will be glad to assist you with any questions regarding studying abroad.",
        "photo":  "v1753210951/dNNghqDxA1TCJTIex6RnzmebsXL2_vm6hr4.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jul 2025",
        "status":  null,
        "statusLabel":  null,
        "country":  "PÃ©cs, Hungary",
        "homeCountry":  null,
        "universityName":  "University of PÃ©cs",
        "universityCountry":  "PÃ©cs, Hungary",
        "universityCity":  null,
        "major":  "Business Administration and Management",
        "program":  "Bachelor\u0027s",
        "scholarshipLine":  "Full Scholarship including monthly stipend; Full Scholarship Including monthly Stipend",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  40,
                        "bdt20":  1000,
                        "bdt40":  2000
                    },
        "timeZone":  "Asia/Dhaka",
        "createdAt":  "2025-07-25T02:34:28.646Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Essay Review",
                       "University Application",
                       "Visa Application",
                       "Life Abroad",
                       "Scholarships",
                       "Mock Interviews",
                       "ECA Guidance",
                       "Resume Review",
                       "Roadmap"
                   ],
        "experiences":  [
                            {
                                "name":  "University of PÃ©cs",
                                "accepted":  "accepted",
                                "scholarship":  "Full Scholarship including monthly stipend",
                                "location":  "PÃ©cs, Hungary",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  null,
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Szeged",
                                "accepted":  "accepted",
                                "scholarship":  "Full Scholarship Including monthly Stipend",
                                "location":  "Hungary",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  null,
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "Notre Dame Nature Study Club",
                               "title":  "President",
                               "details":  [
                                               "Organising and Leading the team to host biggest Nature and Climate based event in across the country for youth and children."
                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Instagram",
                                     "url":  "https://www.instagram.com/sakib__akash01"
                                 },
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/sakibkhan01"
                                 },
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/sakib.akash.969"
                                 }
                             ]
    },
    {
        "slug":  "mohsina-siddika",
        "name":  "Mohsina Siddika",
        "bio":  "$1c",
        "photo":  "v1770312280/abroadmates/mentors/zmgzvu0pyfijdegssdpu.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Feb 2026",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "United Kingdom",
        "homeCountry":  "United Kingdom",
        "universityName":  "University of Aberdeen",
        "universityCountry":  "United Kingdom",
        "universityCity":  "Aberdeen",
        "major":  "Biological Science",
        "program":  "PhD",
        "scholarshipLine":  "QUARTILES DLA; Erasmus Mundus Scholarship",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  40,
                        "bdt20":  999,
                        "bdt40":  1999
                    },
        "timeZone":  "Europe/London",
        "createdAt":  "2026-02-05T17:20:43.298Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Scholarships",
                       "Recommendation Letters",
                       "Life Abroad",
                       "Essay Review",
                       "Mock Interviews",
                       "Resume Review",
                       "Personal Statement",
                       "Test Prep",
                       "University Application",
                       "Roadmap"
                   ],
        "experiences":  [
                            {
                                "name":  "University of Aberdeen",
                                "accepted":  "accepted",
                                "scholarship":  "QUARTILES DLA",
                                "location":  "United Kingdom",
                                "degree":  "PhD",
                                "fieldOfStudy":  "Biological Science",
                                "city":  "Aberdeen",
                                "admissionYear":  2026,
                                "graduationDate":  null,
                                "attendanceStatus":  "currently_studying",
                                "currentlyStudying":  true,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | QUARTILES DLA",
                                                         "displayName":  "QUARTILES DLA",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [

                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Ghent University",
                                "accepted":  "accepted",
                                "scholarship":  "Erasmus Mundus Scholarship",
                                "location":  "Belgium",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Health Management in Aquaculture",
                                "city":  "Ghent",
                                "admissionYear":  2022,
                                "graduationDate":  "2024-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | Erasmus Mundus Scholarship",
                                                         "displayName":  "Erasmus Mundus Scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition"
                                                                      ]
                                                     }
                                                 ]
                            }
                        ],
        "activities":  [

                       ],
        "workExperience":  [
                               {
                                   "companyName":  "Nofima, Norway",
                                   "title":  "Research Intern",
                                   "yearExp":  "4 Months ",
                                   "details":  [
                                                   ""
                                               ]
                               },
                               {
                                   "companyName":  "Stazione Zoologica Anton Dohrn, Italy",
                                   "title":  "Research Collaborator",
                                   "yearExp":  "3 months",
                                   "details":  [
                                                   ""
                                               ]
                               },
                               {
                                   "companyName":  "KYTOS BV, Belgium",
                                   "title":  "Student Intern",
                                   "yearExp":  "6 months",
                                   "details":  [
                                                   ""
                                               ]
                               },
                               {
                                   "companyName":  "Bangladesh Agricultural University, Bangladesh",
                                   "title":  "Research Assistant",
                                   "yearExp":  "1 year",
                                   "details":  [
                                                   ""
                                               ]
                               }
                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C2ezXyUWq%2F%3Fmibextid%3DwwXIfr"
                                 },
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmohsina-siddika-4313491b8"
                                 }
                             ]
    },
    {
        "slug":  "parinda-rahman",
        "name":  "Parinda Rahman",
        "bio":  "Iâ€™m a Computer Science Masterâ€™s graduate from the University of British Columbia (UBC), where I completed my studies on a full scholarship, and a Computer Science BSc graduate from North South University, with an online BSc in Psychology from the University of Derby. I have research experience in ethical technology and UX, along with hands-on work in data science and human-computer interaction. Having studied in Bangladesh and Canada, Iâ€™ve learned to adapt quickly, communicate across cultures, and thrive in diverse academic and professional environments. Fluent in English, Iâ€™m passionate about helping students navigate study abroad journeys and maximize their global education opportunities.",
        "photo":  "v1760606022/abroadmates/mentors/bzzhsmm39a3yxg9tuqd2.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Oct 2025",
        "status":  "alumni",
        "statusLabel":  "Alumni",
        "country":  "Canada",
        "homeCountry":  null,
        "universityName":  "University of British Columbia",
        "universityCountry":  "Canada",
        "universityCity":  null,
        "major":  "Computer science",
        "program":  "Master\u0027s",
        "scholarshipLine":  "100%; 50%; 25%",
        "ieltsScore":  8,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  40,
                        "bdt20":  999,
                        "bdt40":  1999
                    },
        "timeZone":  "America/Toronto",
        "createdAt":  "2025-10-14T21:24:20.621Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Roadmap",
                       "Essay Review",
                       "Scholarships",
                       "Visa Application",
                       "ECA Guidance",
                       "Personal Statement",
                       "Recommendation Letters",
                       "University Application",
                       "Life Abroad",
                       "Abroad Career",
                       "Test Prep"
                   ],
        "experiences":  [
                            {
                                "name":  "University of British Columbia",
                                "accepted":  "accepted",
                                "scholarship":  "100%",
                                "location":  "Canada",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Computer science",
                                "city":  "",
                                "admissionYear":  2023,
                                "graduationDate":  "2025-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Calgary",
                                "accepted":  "accepted",
                                "scholarship":  "50%",
                                "location":  "Canada",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Glasgow",
                                "accepted":  "accepted",
                                "scholarship":  "25%",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Edinburgh",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University College London (UCL)",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Queen Mary University",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Cornell University",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Warwick",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "King\u0027s College London",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United Kingdom",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "Bangladesh Debating Council",
                               "title":  "Events and Activation Secretary ",
                               "details":  [
                                               "Organized events"
                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "Instagram",
                                     "url":  "https://www.instagram.com/pari.rahman"
                                 }
                             ]
    },
    {
        "slug":  "rahat-yasin",
        "name":  "Yasin Rahat",
        "bio":  "Hi, Iâ€™m Rahat! Iâ€™m currently a senior at Tokyo International University, majoring in International Relations. Iâ€™ve applied to and been accepted by schools across the US, Europe, and Asia, so I bring firsthand experience with diverse application processes. Over the past three years, Iâ€™ve mentored more than 50 students, helping them craft strong, authentic applications to their dream universities. My extracurricular background includes debating, public speaking, creative writing, and leadership. Since I study IR, Iâ€™m especially passionate about supporting applications focused on social justice, politics, and nonprofit work. Iâ€™m well-versed in applications for the US, Europe, and Japan, and my mentoring style is friendly, personalized, and encouraging.",
        "photo":  "v1789669594/abroadmates/profiles/abroadmates/profiles/0b70b986-19f6-4ba1-8b23-b8bb892061ca.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jul 2025",
        "status":  "recent_graduate",
        "statusLabel":  "Just Graduated",
        "country":  "Japan",
        "homeCountry":  "Japan",
        "universityName":  "Tokyo International University",
        "universityCountry":  "Japan",
        "universityCity":  "Kawagoe",
        "major":  "International Relations",
        "program":  "Bachelor\u0027s",
        "scholarshipLine":  "80% tuition Scholarship; Monbukagakusho Honors Scholarship for Privately-Financed International Students; Teaching/Research Assistantship",
        "ieltsScore":  8,
        "satScore":  null,
        "isScholarshipAwardee":  false,
        "pricing":  {
                        "usd20":  25,
                        "usd40":  40,
                        "bdt20":  750,
                        "bdt40":  1350
                    },
        "timeZone":  "Asia/Tokyo",
        "createdAt":  "2025-07-25T02:34:28.924Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "University Application",
                       "Test Prep",
                       "Visa Application",
                       "ECA Guidance",
                       "Recommendation Letters",
                       "Scholarships",
                       "Personal Statement",
                       "Roadmap"
                   ],
        "experiences":  [
                            {
                                "name":  "Howard University",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "United States",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "Washington",
                                "admissionYear":  2021,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Tallinn University of Technology",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Estonia",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "Tallinn",
                                "admissionYear":  2021,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Tokyo International University",
                                "accepted":  "accepted",
                                "scholarship":  "80% tuition Scholarship; Monbukagakusho Honors Scholarship for Privately-Financed International Students; Teaching/Research Assistantship",
                                "location":  "Japan",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "International Relations",
                                "city":  "Kawagoe",
                                "admissionYear":  2022,
                                "graduationDate":  "2026-06-30T12:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Tuition reduction scholarship | 80% tuition Scholarship",
                                                         "displayName":  "80% tuition Scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "partial_tuition"
                                                                      ]
                                                     },
                                                     {
                                                         "rawName":  "Need-based scholarship / bursary | Monbukagakusho Honors Scholarship for Privately-Financed International Students",
                                                         "displayName":  "Monbukagakusho Honors Scholarship for Privately-Financed International Students",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "stipend"
                                                                      ]
                                                     },
                                                     {
                                                         "rawName":  "Teaching / Research Assistantship | Teaching/Research Assistantship",
                                                         "displayName":  "Teaching/Research Assistantship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "salary"
                                                                      ]
                                                     }
                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "Debate",
                               "title":  "National",
                               "details":  [
                                               "- Won 7 National Debate Championship - Served as high school debate club President"
                                           ]
                           },
                           {
                               "name":  "Model UN",
                               "title":  "National",
                               "details":  [
                                               "- Won 5 awards in national, international MUN comp. - Served as Secretary General at my high school MUN"
                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [

                             ]
    },
    {
        "slug":  "selim-sarowar",
        "name":  "Selim Sarowar",
        "bio":  "I am pursuing an M.Sc. in Computer Vision \u0026 AI at Yeungnam University (YU). I am a Global Korea Scholarship (GKS) scholar funded by NIIED, with additional support from the RLRC \u0026 RISE industry-collaboration projects. \n\nMy research focuses on 3D computer vision \u0026 spatial intelligence, 6D pose estimation, vision-language-action (VLA) models, world models, and agentic robotics for robot manipulation.\nMy Homepage: s-elim.github.io",
        "photo":  "v1771382780/abroadmates/mentors/bj1ejeukokflh0rr7wi8.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Feb 2026",
        "status":  "alumni",
        "statusLabel":  "Alumni",
        "country":  "South Korea",
        "homeCountry":  null,
        "universityName":  "Yeungnam University",
        "universityCountry":  "South Korea",
        "universityCity":  "Hsinchu",
        "major":  "AI \u0026 Computer Vision",
        "program":  "Master\u0027s",
        "scholarshipLine":  "GKS Scholarship( Korean Government Scholarship); NRF Fund; Indian Government Scholarship; 100% Tuition waiver \u0026 Stipends; 100% Tuition waiver \u0026 Stipends; 100% Tuition waiver",
        "ieltsScore":  7,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  40,
                        "usd40":  55,
                        "bdt20":  999,
                        "bdt40":  1999
                    },
        "timeZone":  "Asia/Seoul",
        "createdAt":  "2026-02-18T02:33:52.105Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "Essay Review",
                       "University Application",
                       "Roadmap",
                       "Scholarships",
                       "Visa Application",
                       "Life Abroad",
                       "ECA Guidance",
                       "Personal Statement",
                       "Recommendation Letters",
                       "Mock Interviews",
                       "Resume Review",
                       "Abroad Career",
                       "Test Prep"
                   ],
        "experiences":  [
                            {
                                "name":  "Yeungnam University",
                                "accepted":  "accepted",
                                "scholarship":  "GKS Scholarship( Korean Government Scholarship)",
                                "location":  "South Korea",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "AI \u0026 Computer Vision",
                                "city":  "",
                                "admissionYear":  2025,
                                "graduationDate":  "2027-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | GKS Scholarship( Korean Government Scholarship)",
                                                         "displayName":  "GKS Scholarship( Korean Government Scholarship)",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "travel",
                                                                          "insurance",
                                                                          "books",
                                                                          "research_funding",
                                                                          "salary"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "National Tsing Hua University",
                                "accepted":  "accepted",
                                "scholarship":  "NRF Fund",
                                "location":  "Taiwan",
                                "degree":  "Diploma",
                                "fieldOfStudy":  "Research Internship in Convex Optimization",
                                "city":  "Hsinchu",
                                "admissionYear":  2023,
                                "graduationDate":  "2024-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Teaching / Research Assistantship | NRF Fund",
                                                         "displayName":  "NRF Fund",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "meals",
                                                                          "travel",
                                                                          "insurance",
                                                                          "research_funding",
                                                                          "salary"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "KIIT",
                                "accepted":  "accepted",
                                "scholarship":  "Indian Government Scholarship",
                                "location":  "India",
                                "degree":  "Bachelor\u0027s",
                                "fieldOfStudy":  "School of Electronics Engineering",
                                "city":  "",
                                "admissionYear":  2019,
                                "graduationDate":  "2023-06-30T00:00:00.000Z",
                                "attendanceStatus":  "attended",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | Indian Government Scholarship",
                                                         "displayName":  "Indian Government Scholarship",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "meals",
                                                                          "insurance",
                                                                          "books",
                                                                          "research_funding"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "SKOLTECH",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition waiver \u0026 Stipends",
                                "location":  "Russia",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Computer Science",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | 100% Tuition waiver \u0026 Stipends",
                                                         "displayName":  "100% Tuition waiver \u0026 Stipends",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "salary",
                                                                          "research_funding"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Nazarbayev University",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition waiver \u0026 Stipends",
                                "location":  "Kazakhstan",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Computer Science",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | 100% Tuition waiver \u0026 Stipends",
                                                         "displayName":  "100% Tuition waiver \u0026 Stipends",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition",
                                                                          "stipend",
                                                                          "living_expenses",
                                                                          "accommodation",
                                                                          "travel",
                                                                          "insurance",
                                                                          "research_funding"
                                                                      ]
                                                     }
                                                 ]
                            },
                            {
                                "name":  "Asian Institute Of Technology",
                                "accepted":  "accepted",
                                "scholarship":  "100% Tuition waiver",
                                "location":  "Thailand",
                                "degree":  "Master\u0027s",
                                "fieldOfStudy":  "Computer Science",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  "accepted_did_not_attend",
                                "currentlyStudying":  false,
                                "scholarships":  [
                                                     {
                                                         "rawName":  "Merit scholarship | 100% Tuition waiver",
                                                         "displayName":  "100% Tuition waiver",
                                                         "relationshipStatus":  "awarded",
                                                         "benefits":  [
                                                                          "full_tuition"
                                                                      ]
                                                     }
                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "KIIT International Students Society",
                               "title":  "Coordinator ",
                               "details":  [

                                           ]
                           },
                           {
                               "name":  "The Korea Times",
                               "title":  "Global Supporter",
                               "details":  [

                                           ]
                           },
                           {
                               "name":  "39th World Congress of Poet by UNESCO",
                               "title":  "Assistant Coordinator ",
                               "details":  [

                                           ]
                           },
                           {
                               "name":  "National Taiwan University( Academia Sinica)",
                               "title":  "Visiting Scholar( Research)",
                               "details":  [
                                               "It\u0027s an amazing opportunity to explore world class AI \u0026 Robotics research, as well to make the networking with top industry leaders!"
                                           ]
                           },
                           {
                               "name":  "UNITAR CIFAL, JEJU( UN)",
                               "title":  "Honorary Young Diplomat",
                               "details":  [

                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [
                                 {
                                     "platform":  "LinkedIn",
                                     "url":  "https://www.linkedin.com/in/selim.sarowar"
                                 },
                                 {
                                     "platform":  "WhatsApp",
                                     "url":  "https://wa.me/8201028203071"
                                 },
                                 {
                                     "platform":  "Facebook",
                                     "url":  "https://www.facebook.com/selim.sarowar30"
                                 }
                             ]
    },
    {
        "slug":  "tabib-wasit-khan",
        "name":  "Tabib Wasit Khan",
        "bio":  "Iâ€™m from Bangladesh and have been living in St. Johnâ€™s for more than three years. Iâ€™m a fourth-year Economics student at Memorial University of Newfoundland, pursuing a Minor in Business Administration and a Diploma in Public Policy, with an expected graduation in 2027.\nI have been through the full experience of moving abroad, figuring things out one step at a time and I genuinely enjoy helping others do the same. Whether it is settling in, finding work, navigating university life or just feeling a little less lost, I am happy to support however I can.\nFun fact: I am a shameless binge watcher. If I start a show I like, I have to finish it in one sitting, even if it means staying up until 4 a.m. I just cannot deal with cliffhangers!",
        "photo":  "v1753210950/jvdYHMt0nBQEcvURUTX72CQI9nx1_kl6xmq.jpg",
        "coverPhoto":  null,
        "mentorSince":  "Jul 2025",
        "status":  "current_student",
        "statusLabel":  "Studying Now",
        "country":  "Canada",
        "homeCountry":  "Canada",
        "universityName":  "Memorial University of Newfoundland, CanadaÂ ðŸ‡¨ðŸ‡¦",
        "universityCountry":  "Canada",
        "universityCity":  "St. John\u0027s",
        "major":  "Economics",
        "program":  "Bachelor\u0027s",
        "scholarshipLine":  "Endowed Merit Scholarship | Chevron Canada Ltd. Endowed Scholarships in Business, Earth Sciences, Economics and Engineering",
        "ieltsScore":  null,
        "satScore":  null,
        "isScholarshipAwardee":  null,
        "pricing":  {
                        "usd20":  15,
                        "usd40":  25,
                        "bdt20":  null,
                        "bdt40":  null
                    },
        "timeZone":  "America/St_Johns",
        "createdAt":  "2025-07-25T02:34:29.205Z",
        "updatedAt":  "2026-10-05T19:01:54.233Z",
        "topics":  [
                       "University Application",
                       "Visa Application",
                       "Life Abroad",
                       "Essay Review",
                       "Personal Statement",
                       "Resume Review",
                       "Abroad Career"
                   ],
        "experiences":  [
                            {
                                "name":  "Memorial University of Newfoundland, CanadaÂ ðŸ‡¨ðŸ‡¦",
                                "accepted":  "accepted",
                                "scholarship":  "Endowed Merit Scholarship | Chevron Canada Ltd. Endowed Scholarships in Business, Earth Sciences, Economics and Engineering",
                                "location":  "Canada",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  2023,
                                "graduationDate":  "2027-06-30T12:00:00.000Z",
                                "attendanceStatus":  null,
                                "currentlyStudying":  true,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Manitoba",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Winnipeg, Manitoba",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  null,
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "University of Regina",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Regina, Saskatchewan",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  null,
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            },
                            {
                                "name":  "Middle East Technical University",
                                "accepted":  "accepted",
                                "scholarship":  "",
                                "location":  "Ankara, Turkey",
                                "degree":  "",
                                "fieldOfStudy":  "",
                                "city":  "",
                                "admissionYear":  null,
                                "graduationDate":  null,
                                "attendanceStatus":  null,
                                "currentlyStudying":  false,
                                "scholarships":  [

                                                 ]
                            }
                        ],
        "activities":  [
                           {
                               "name":  "MUN Economics Society",
                               "title":  "President",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Student Volunteer Bureau",
                               "title":  "Volunteer Assistant",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Memorial University of Newfoundland",
                               "title":  "Research Assistant",
                               "details":  [
                                               ""
                                           ]
                           },
                           {
                               "name":  "Memorial University of Newfoundland",
                               "title":  "Tutor",
                               "details":  [
                                               ""
                                           ]
                           }
                       ],
        "workExperience":  [

                           ],
        "socialMediaLinks":  [

                             ]
    }
];

export function getMentor(slug: string): Mentor | undefined {
  return MENTORS.find((m) => m.slug === slug);
}