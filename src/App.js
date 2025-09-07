import React, { useEffect, useMemo, useState } from "react";

// =============================
// UPSC EPFO Mock — Multi-Subject
// =============================
// Requirements covered:
// - Full 90 Phrasal Verbs questions (split into 6 sets of 15)
// - Switchable subjects (Phrasal Verbs + placeholder for Modern Indian History)
// - Each set shows 15 questions at once with its own Submit button
// - Wrong selected answers render in RED text after submit
// - Correct options indicated with a green check ✓ and green text
// - Guards for out-of-bounds set index (prevents currentSet undefined .map error)
// - Responsive Tailwind UI

// ---------- DATA ----------
const SUBJECTS = {
  "Phrasal Verbs": [
    // Section A - MCQs (1-40)
    {
      id: 1,
      text: "The car suddenly broke down on the highway. Here, 'broke down' means:",
      type: "mcq",
      options: [
        "To repair quickly",
        "To stop functioning",
        "To slow down",
        "To start suddenly",
      ],
      answer: 1,
    },
    {
      id: 2,
      text: "She couldn’t control her emotions and finally broke down.",
      type: "mcq",
      options: [
        "To faint",
        "To lose emotional control",
        "To laugh loudly",
        "To escape",
      ],
      answer: 1,
    },
    {
      id: 3,
      text: "The thieves broke into the house last night.",
      type: "mcq",
      options: [
        "To decorate",
        "To enter by force",
        "To lock from outside",
        "To investigate",
      ],
      answer: 1,
    },
    {
      id: 4,
      text: "World War II broke out in 1939.",
      type: "mcq",
      options: ["To end", "To start suddenly", "To collapse", "To prevent"],
      answer: 1,
    },
    {
      id: 5,
      text: "The prisoners managed to break out of jail.",
      type: "mcq",
      options: ["To escape", "To argue", "To fight", "To break a machine"],
      answer: 0,
    },
    {
      id: 6,
      text: "Scientists broke through in their search for a cure.",
      type: "mcq",
      options: ["Failed", "Overcame an obstacle", "Escaped", "Collapsed"],
      answer: 1,
    },
    {
      id: 7,
      text: "The couple decided to break up after years of quarrels.",
      type: "mcq",
      options: [
        "To reconcile",
        "To end a relationship",
        "To celebrate",
        "To succeed",
      ],
      answer: 1,
    },
    {
      id: 8,
      text: "The police used force to break up the protest.",
      type: "mcq",
      options: ["To organize", "To disperse", "To lead", "To encourage"],
      answer: 1,
    },
    {
      id: 9,
      text: "The new policy will bring about major changes.",
      type: "mcq",
      options: ["Cancel", "Cause to happen", "Avoid", "Suppress"],
      answer: 1,
    },
    {
      id: 10,
      text: "The company will soon bring out a new smartphone.",
      type: "mcq",
      options: ["Hide", "Publish or release", "Destroy", "Abolish"],
      answer: 1,
    },
    {
      id: 11,
      text: "Stress can bring out the worst in people.",
      type: "mcq",
      options: ["Reveal", "Cure", "Suppress", "Hide"],
      answer: 0,
    },
    {
      id: 12,
      text: "She was brought up by her grandparents.",
      type: "mcq",
      options: ["Raised", "Ignored", "Adopted", "Taught in school"],
      answer: 0,
    },
    {
      id: 13,
      text: "He brought up an important issue during the meeting.",
      type: "mcq",
      options: ["Deleted", "Introduced", "Postponed", "Rejected"],
      answer: 1,
    },
    {
      id: 14,
      text: "The match was called off due to heavy rain.",
      type: "mcq",
      options: ["Postponed", "Canceled", "Extended", "Replayed"],
      answer: 1,
    },
    {
      id: 15,
      text: "The situation calls for immediate action.",
      type: "mcq",
      options: ["Avoids", "Demands", "Postpones", "Rejects"],
      answer: 1,
    },
    {
      id: 16,
      text: "The teacher called on me to answer the question.",
      type: "mcq",
      options: ["Ignored", "Requested", "Punished", "Praised"],
      answer: 1,
    },
    {
      id: 17,
      text: "I accidentally came across an old diary while cleaning.",
      type: "mcq",
      options: ["Destroyed", "Found by chance", "Forgot", "Collected"],
      answer: 1,
    },
    {
      id: 18,
      text: "No witness has come forward yet.",
      type: "mcq",
      options: ["Hidden", "Escaped", "Volunteered", "Ignored"],
      answer: 2,
    },
    {
      id: 19,
      text: "His plan didn’t come off as expected.",
      type: "mcq",
      options: ["Succeeded", "Failed", "Escaped", "Completed"],
      answer: 1,
    },
    {
      id: 20,
      text: "The handle came off the door.",
      type: "mcq",
      options: ["Detached", "Strengthened", "Painted", "Created"],
      answer: 0,
    },
    {
      id: 21,
      text: "We need to come up with a better strategy.",
      type: "mcq",
      options: ["Abandon", "Think of", "Reject", "Copy"],
      answer: 1,
    },
    {
      id: 22,
      text: "Do you get along with your colleagues?",
      type: "mcq",
      options: [
        "Argue with",
        "Have a friendly relationship",
        "Ignore",
        "Supervise",
      ],
      answer: 1,
    },
    {
      id: 23,
      text: "The thief managed to get away from the police.",
      type: "mcq",
      options: ["Escape", "Arrest", "Hide evidence", "Fight"],
      answer: 0,
    },
    {
      id: 24,
      text: "She took months to get over her illness.",
      type: "mcq",
      options: ["Start", "Recover from", "Spread", "Hide"],
      answer: 1,
    },
    {
      id: 25,
      text: "I finally got through to the helpline after waiting for hours.",
      type: "mcq",
      options: ["Contacted successfully", "Failed", "Avoided", "Lost"],
      answer: 0,
    },
    {
      id: 26,
      text: "The teacher gave away the prizes to the winners.",
      type: "mcq",
      options: ["Took back", "Distributed freely", "Sold", "Announced"],
      answer: 1,
    },
    {
      id: 27,
      text: "Don’t give away the secret!",
      type: "mcq",
      options: ["Hide", "Reveal", "Forget", "Lose"],
      answer: 1,
    },
    {
      id: 28,
      text: "The government refused to give in to the demands.",
      type: "mcq",
      options: ["Accept", "Surrender", "Fight", "Postpone"],
      answer: 1,
    },
    {
      id: 29,
      text: "He finally decided to give up smoking.",
      type: "mcq",
      options: ["Start", "Continue", "Quit", "Demand"],
      answer: 2,
    },
    {
      id: 30,
      text: "The machine gave out after 10 years of use.",
      type: "mcq",
      options: ["Functioned smoothly", "Stopped working", "Continued", "Sold"],
      answer: 1,
    },
    {
      id: 31,
      text: "He went to Delhi to go after his dreams.",
      type: "mcq",
      options: ["Pursue", "Avoid", "Forget", "Delay"],
      answer: 0,
    },
    {
      id: 32,
      text: "She had to go through a lot of difficulties.",
      type: "mcq",
      options: ["Celebrate", "Experience", "Avoid", "Cancel"],
      answer: 1,
    },
    {
      id: 33,
      text: "Please go on with your presentation.",
      type: "mcq",
      options: ["Stop", "Continue", "Cancel", "Postpone"],
      answer: 1,
    },
    {
      id: 34,
      text: "Can you look after my dog while I’m away?",
      type: "mcq",
      options: ["Sell", "Take care of", "Ignore", "Lose"],
      answer: 1,
    },
    {
      id: 35,
      text: "She tends to look down on uneducated people.",
      type: "mcq",
      options: ["Respect", "Consider inferior", "Encourage", "Avoid"],
      answer: 1,
    },
    {
      id: 36,
      text: "I am looking for my keys.",
      type: "mcq",
      options: ["Hiding", "Searching", "Destroying", "Forgetting"],
      answer: 1,
    },
    {
      id: 37,
      text: "The police will look into the case.",
      type: "mcq",
      options: ["Ignore", "Investigate", "Cancel", "End"],
      answer: 1,
    },
    {
      id: 38,
      text: "They decided to put off the meeting until next week.",
      type: "mcq",
      options: ["Cancel", "Postpone", "Start", "Finalize"],
      answer: 1,
    },
    {
      id: 39,
      text: "The firefighters quickly put out the fire.",
      type: "mcq",
      options: ["Start", "Extinguish", "Spread", "Delay"],
      answer: 1,
    },
    {
      id: 40,
      text: "I can’t put up with his arrogance anymore.",
      type: "mcq",
      options: ["Encourage", "Tolerate", "Celebrate", "Avoid"],
      answer: 1,
    },

    // Section B - Fill in the Blanks (41-65)
    {
      id: 41,
      text: "The plane ______ on time.",
      type: "fill",
      options: ["took off", "took over", "took after"],
      answer: "took off",
    },
    {
      id: 42,
      text: "His career really ______ after the award.",
      type: "fill",
      options: ["took off", "took down", "took away"],
      answer: "took off",
    },
    {
      id: 43,
      text: "Please ______ your shoes before entering.",
      type: "fill",
      options: ["take up", "take off", "take out"],
      answer: "take off",
    },
    {
      id: 44,
      text: "The army ______ the government.",
      type: "fill",
      options: ["took over", "took after", "took down"],
      answer: "took over",
    },
    {
      id: 45,
      text: "She ______ her mother in appearance.",
      type: "fill",
      options: ["took after", "took off", "took away"],
      answer: "took after",
    },
    {
      id: 46,
      text: "He has ______ gardening as a hobby.",
      type: "fill",
      options: ["taken up", "taken off", "taken down"],
      answer: "taken up",
    },
    {
      id: 47,
      text: "The soldiers ______ their orders.",
      type: "fill",
      options: ["carried out", "carried on", "carried off"],
      answer: "carried out",
    },
    {
      id: 48,
      text: "The doctor advised him to ______ sugar.",
      type: "fill",
      options: ["cut down on", "cut off", "cut out"],
      answer: "cut down on",
    },
    {
      id: 49,
      text: "Our electricity was ______ due to non-payment.",
      type: "fill",
      options: ["cut off", "cut out", "cut down"],
      answer: "cut off",
    },
    {
      id: 50,
      text: "The law ______ the old system.",
      type: "fill",
      options: ["did away with", "did up", "did out"],
      answer: "did away with",
    },
    {
      id: 51,
      text: "They are ______ their house.",
      type: "fill",
      options: ["doing up", "doing away with", "doing off"],
      answer: "doing up",
    },
    {
      id: 52,
      text: "She had to ______ her savings.",
      type: "fill",
      options: ["fall back on", "fall out", "fall through"],
      answer: "fall back on",
    },
    {
      id: 53,
      text: "He ______ his friend over money.",
      type: "fill",
      options: ["fell out with", "fell through", "fell down"],
      answer: "fell out with",
    },
    {
      id: 54,
      text: "Our vacation plans ______ due to rain.",
      type: "fill",
      options: ["fell through", "fell back on", "fell up"],
      answer: "fell through",
    },
    {
      id: 55,
      text: "Please ______ for a minute.",
      type: "fill",
      options: ["hold on", "hold up", "hold out"],
      answer: "hold on",
    },
    {
      id: 56,
      text: "The robbers ______ the bank.",
      type: "fill",
      options: ["held up", "held on", "held out"],
      answer: "held up",
    },
    {
      id: 57,
      text: "He ______ talking despite objections.",
      type: "fill",
      options: ["kept on", "kept away", "kept up"],
      answer: "kept on",
    },
    {
      id: 58,
      text: "It’s hard to ______ the latest trends.",
      type: "fill",
      options: ["keep up with", "keep on", "keep away"],
      answer: "keep up with",
    },
    {
      id: 59,
      text: "Please ______ from the edge of the cliff.",
      type: "fill",
      options: ["keep away", "keep up", "keep on"],
      answer: "keep away",
    },
    {
      id: 60,
      text: "He promised but ______ his friends.",
      type: "fill",
      options: ["let down", "let off", "let out"],
      answer: "let down",
    },
    {
      id: 61,
      text: "The judge ______ the thief with a warning.",
      type: "fill",
      options: ["let off", "let down", "let out"],
      answer: "let off",
    },
    {
      id: 62,
      text: "If you don’t know a word, ______ in a dictionary.",
      type: "fill",
      options: ["look up", "look into", "look out"],
      answer: "look up",
    },
    {
      id: 63,
      text: "Business is finally ______.",
      type: "fill",
      options: ["looking up", "looking into", "looking out"],
      answer: "looking up",
    },
    {
      id: 64,
      text: "She has always ______ her elder sister.",
      type: "fill",
      options: ["looked up to", "looked after", "looked for"],
      answer: "looked up to",
    },
    {
      id: 65,
      text: "I can’t ______ his handwriting.",
      type: "fill",
      options: ["make out", "make up", "make over"],
      answer: "make out",
    },

    // Section C - Match the Following (66-75)
    {
      id: 66,
      text: "Pull down:",
      type: "mcq",
      options: [
        "To succeed in something difficult",
        "To demolish",
        "To stop a vehicle",
        "To meet by accident",
      ],
      answer: 1,
    },
    {
      id: 67,
      text: "Pull off:",
      type: "mcq",
      options: [
        "To demolish",
        "To succeed in something difficult",
        "To meet by accident",
        "To exhaust supply",
      ],
      answer: 1,
    },
    {
      id: 68,
      text: "Pull up:",
      type: "mcq",
      options: [
        "To stop a vehicle",
        "To meet by accident",
        "To exhaust supply",
        "To reject an offer",
      ],
      answer: 0,
    },
    {
      id: 69,
      text: "Run into:",
      type: "mcq",
      options: [
        "To demolish",
        "To meet by accident",
        "To stop a vehicle",
        "To exceed time/limit",
      ],
      answer: 1,
    },
    {
      id: 70,
      text: "Run out of:",
      type: "mcq",
      options: [
        "To stop a vehicle",
        "To demolish",
        "To exhaust supply",
        "To begin a journey",
      ],
      answer: 2,
    },
    {
      id: 71,
      text: "Run over:",
      type: "mcq",
      options: [
        "To exceed time/limit",
        "To save for a purpose",
        "To begin a journey",
        "To establish",
      ],
      answer: 0,
    },
    {
      id: 72,
      text: "Set aside:",
      type: "mcq",
      options: [
        "To exceed time/limit",
        "To save for a purpose",
        "To begin a journey",
        "To establish",
      ],
      answer: 1,
    },
    {
      id: 73,
      text: "Set off:",
      type: "mcq",
      options: [
        "To save for a purpose",
        "To begin a journey",
        "To establish",
        "To reject an offer",
      ],
      answer: 1,
    },
    {
      id: 74,
      text: "Set up:",
      type: "mcq",
      options: [
        "To reject an offer",
        "To begin a journey",
        "To establish",
        "To demolish",
      ],
      answer: 2,
    },
    {
      id: 75,
      text: "Turn down:",
      type: "mcq",
      options: [
        "To save for a purpose",
        "To establish",
        "To reject an offer",
        "To stop a vehicle",
      ],
      answer: 2,
    },

    // Section D - Error Spotting & Correction (76-85) + Mixed (86-90)
    {
      id: 76,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "He fall out with his partner.",
        "He fell out with his partner.",
      ],
      answer: 1,
    },
    {
      id: 77,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: ["She did away to the rule.", "She did away with the rule."],
      answer: 1,
    },
    {
      id: 78,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: ["The plane take off late.", "The plane took off late."],
      answer: 1,
    },
    {
      id: 79,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "He run into a problem yesterday.",
        "He ran into a problem yesterday.",
      ],
      answer: 1,
    },
    {
      id: 80,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "I will set out off early tomorrow.",
        "I will set out early tomorrow.",
      ],
      answer: 1,
    },
    {
      id: 81,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "She was bringing up by her aunt.",
        "She was brought up by her aunt.",
      ],
      answer: 1,
    },
    {
      id: 82,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "He gave on after repeated failures.",
        "He gave up after repeated failures.",
      ],
      answer: 1,
    },
    {
      id: 83,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: ["The meeting was call off.", "The meeting was called off."],
      answer: 1,
    },
    {
      id: 84,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: ["We have ran out of sugar.", "We have run out of sugar."],
      answer: 1,
    },
    {
      id: 85,
      text: "Choose the correct sentence:",
      type: "mcq",
      options: [
        "The teacher give out answer sheets yesterday.",
        "The teacher gave out answer sheets yesterday.",
      ],
      answer: 1,
    },
    {
      id: 86,
      text: "Choose the correct meaning: 'keep up with'",
      type: "mcq",
      options: [
        "To avoid",
        "To move at same rate as",
        "To ignore",
        "To tolerate",
      ],
      answer: 1,
    },
    {
      id: 87,
      text: "Choose the correct meaning: 'look forward to'",
      type: "mcq",
      options: ["To await eagerly", "To investigate", "To search", "To detest"],
      answer: 0,
    },
    {
      id: 88,
      text: "Choose the correct meaning: 'put out' (fire)",
      type: "mcq",
      options: ["To start", "To extinguish", "To publish", "To tolerate"],
      answer: 1,
    },
    {
      id: 89,
      text: "Choose the correct meaning: 'give away' (secret)",
      type: "mcq",
      options: ["To distribute for free", "To reveal", "To sell", "To hide"],
      answer: 1,
    },
    {
      id: 90,
      text: "Choose the correct meaning: 'turn up'",
      type: "mcq",
      options: [
        "To arrive or appear",
        "To reject",
        "To demolish",
        "To investigate",
      ],
      answer: 0,
    },
  ],

  // Placeholder subject — you can paste 200 MCQs later
  "Modern Indian History": [
    {
      id: 1,
      text: "In which year, the Danish East India Company was formed?",
      type: "mcq",
      options: ["1614", "1615", "1616", "1617"],
      answer: 2, // "1616"
    },
    {
      id: 2,
      text: "The resolutions on Fundamental Rights and National Economic Policy were passed in which of the following sessions of the Indian National Congress?",
      type: "mcq",
      options: ["Belgaum,1934", "Lahore,1929", "Karachi,1931", "Faizpur,1936"],
      answer: 2, // "Karachi,1931"
    },
    {
      id: 3,
      text: "Arrange the following events in the order of their chronology: 1. August Offer 2. Poona Pact 3. Third Round Table Conference",
      type: "mcq",
      options: ["1-2-3", "2-3-1", "2-1-3", "2-1-3"],
      answer: 1, // "2-3-1"
    },
    {
      id: 4,
      text: "Who founded the Ramakrishna Mission in 1896 to carry on humanitarian relief and social work?",
      type: "mcq",
      options: [
        "Ramakrishna Paramahansa",
        "Swami Dayananda Saraswati",
        "Swami Vivekananda",
        "Blavatsky and Olcott",
      ],
      answer: 2, // "Swami Vivekananda"
    },
    {
      id: 5,
      text: "Which among the following Viceroys was associated with the Ilbert Bill Controversy?",
      type: "mcq",
      options: ["Lord Curzon", "Lord Lytton", "Lord Ripon", "Lord Hardinge"],
      answer: 2, // "Lord Ripon"
    },
    {
      id: 6,
      text: "Q6. Subhash Chandra Bose was re-elected the President of INC at the Tripuri Session in 1939 by defeating Gandhiji’s candidate:",
      options: [
        "Dr. Rajendra Prasad",
        "J.B.Kriplani",
        "Pattabhi Sitaramaiyya",
        "Nellie Sengupta",
      ],
      answer: 2, // "Pattabhi Sitaramaiyya"
    },
    {
      id: 7,
      text: "Q7. The pioneer of Communism in India was:",
      options: ["S.A.Dange", "M.R.Jayakar", "M.N.Roy", "Nalin Gupta"],
      answer: 2, // "M.N.Roy"
    },
    {
      id: 8,
      text: "Q8. Which of the following was the most controversial measure of Lord Mountbatten?",
      options: [
        "Partitioning of Punjab and Bengal",
        "Holding of a referendum in the North West Frontier Province (NWFP)",
        "Setting up of an Executive Council comprising of Indians alone",
        "Advancing the date of transfer of power from June 1948 to August 15,1947",
      ],
      answer: 3, // "Advancing the date of transfer of power..."
    },
    {
      id: 9,
      text: "Q9. Both the processes of transfer of power and the partition of India were hurried through in ____ days.",
      options: ["68", "70", "72", "85"],
      answer: 2, // "72"
    },
    {
      id: 10,
      text: "Q10. The Swaraj Party was divided into factions after the death of C.R.Das and its ‘Responsivists’ faction worked for/by:",
      options: [
        "Safeguarding the hindu interests by cooperating with the British Government.",
        "Creating obstacles in legislative process by acting as dissenters.",
        "Cooperating with the No-Changers of the Congress in the favour of constructive programme of Gandhi.",
        "Maintaining a separate identity of the Party",
      ],
      answer: 0, // "Safeguarding the hindu interests..."
    },
    {
      id: 11,
      text: "Q11. Which among the following great revolutionaries was the brain behind the ‘Chittagong Armoury Raid’?",
      options: [
        "Ganesh Ghosh",
        "Chandrashekhar Azad",
        "Surya Sen",
        "Lala Hardayal",
      ],
      answer: 2, // "Surya Sen"
    },
    {
      id: 12,
      text: "Q12. The revolutionary organisation ‘Abhinav Bharat Society’ was founded in 1904 by:",
      options: [
        "Bhagat Singh",
        "Vinayak Damodar Savarkar",
        "Barindra Kumar Ghosh",
        "Pulin Behari Das",
      ],
      answer: 1, // "Vinayak Damodar Savarkar"
    },
    {
      id: 13,
      text: "Q13. Who among the following was popularly known as the ‘Frontier Gandhi’?",
      options: [
        "Hasrat Mohani",
        "Maulana Abul Kalam Azad",
        "Khan Abdul Ghaffar Khan",
        "Iqbal Khan",
      ],
      answer: 2, // "Khan Abdul Ghaffar Khan"
    },
    {
      id: 14,
      text: "Q14. Ishwar Chandra Vidyasagar was a great 19th Century Social Reformer who waged a struggle for/against which of the following social cause?",
      options: [
        "Education of Women",
        "Widow Remarriage",
        "Abolition of Sati",
        "Untouchability",
      ],
      answer: 1, // "Widow Remarriage"
    },
    {
      id: 15,
      text: "Q15. ‘Neel-Darpan’ by Din Bandhu Mitra portrays the plight of:",
      options: [
        "Bengali Artisans",
        "Indigo Planters",
        "Landless Labourers",
        "All of the above",
      ],
      answer: 1, // "Indigo Planters"
    },
    {
      id: 16,
      text: "Q16. The first British ‘Presidency’ in India was established at:",
      options: ["Surat", "Madras", "Bengal", "Bombay"],
      answer: 0, // "Surat"
    },
    {
      id: 17,
      text: "Q17. Who planted the ‘Tree of Liberty’ at Srirangapatnam?",
      options: [
        "Hyder Ali",
        "Tipu Sultan",
        "Chin Quilich Khan",
        "Murshid Quli Khan",
      ],
      answer: 1, // "Tipu Sultan"
    },
    {
      id: 18,
      text: "Q18. Which Indian mass movement began with the famous ‘Dandi March’ of Mahatma Gandhi?",
      options: [
        "Khilafat Movement",
        "Non-Cooperation Movement",
        "Civil Disobedience Movement",
        "Quit India Movement",
      ],
      answer: 2, // "Civil Disobedience Movement"
    },
    {
      id: 19,
      text: "Q19. Who presided over the Karachi Session of Indian National Congress where the resolutions on Fundamental Rights and National Economic Policy were passed?",
      options: [
        "Maulana Abul Kalam Azad",
        "Jawahar Lal Nehru",
        "Sardar Vallabhbhai Patel",
        "Subhash Chandra Bose",
      ],
      answer: 2, // "Sardar Vallabhbhai Patel"
    },
    {
      id: 20,
      text: "Q20. Arrange the following events/movements in the correct order of their chronology: 1. Rowlatt Act Satyagraha 2. Civil Disobedience Movement 3. Boycott of Simon Commission 4. Quit India Movement",
      options: ["1-2-3-4", "1-3-2-4", "2-3-4-1", "2-3-4-1"],
      answer: 1, // "1-3-2-4"
    },
    {
      id: 21,
      text: "Q21. Who founded the association ‘Naujawan Bharat Sabha’ to help foster revolution against the British Raj by gathering together worker and peasant youth in 1928?",
      options: [
        "Chandra Shekhar Azad",
        "Surya Sen",
        "Bhagat Singh",
        "V.D.Savarkar",
      ],
      answer: 2, // Bhagat Singh
    },
    {
      id: 22,
      text: "Q22. Who among the following attended all the three Round Table Conferences held in London?",
      options: [
        "Mahatma Gandhi",
        "Dr. B.R.Ambedkar",
        "Tez Bahadur Sapru",
        "Chittaranjan Das",
      ],
      answer: 1, // Dr. B.R.Ambedkar
    },
    {
      id: 23,
      text: "Q23. ‘New India’ and ‘Commonweal’ newspapers were started by:",
      options: [
        "Madan Mohan Malviya",
        "S.Subramaniyam Iyer",
        "Annie Besant",
        "Lala Lajpat Rai",
      ],
      answer: 2, // Annie Besant
    },
    {
      id: 24,
      text: "Q24. Which of the following statements is/are correct regarding the Quit India Movement?",
      options: [
        "It was a leaderless movement, with the reigns of the movement in the hands of the masses.",
        "It was also characterized by the outbreak of violence though Gandhi had given a call for passive resistance.",
        "The movement failed in terms of achieving immediate objective.",
        "All of the above",
      ],
      answer: 3, // All of the above
    },
    {
      id: 25,
      text: "Q25. Socio-religious reform movements in western India were led by some illustrious personalities, the incorrect statement in this context is:",
      options: [
        "Gopal Hari Deshmukh was one of the earliest reformers who rationally attacked Hindu orthodox beliefs.",
        "Bal Gangadhar Tilak revived Indian faith in their culture by celebration of Shivaji and Ganesh.",
        "Dr Atmaram Pandurang and Justice Ranade founded the Prarthana Samaj in Maharashtra.",
        "Justice Ranade and Pandita Ramabai were pioneers of women’s education in India.",
      ],
      answer: 3, // Justice Ranade and Pandita Ramabai were pioneers...
    },
    {
      id: 26,
      text: "Q26. In the tenure of which Governor-General an attempt was made for the first time to codify Hindu and Muslim customary laws?",
      options: [
        "Lord Cornwallis",
        "Warren Hastings",
        "William Bentinck",
        "Charles Metcalfe",
      ],
      answer: 1, // Warren Hastings
    },
    {
      id: 27,
      text: "Q27. After the General Elections of 1937 and subsequent formation of ministries in provinces, identify the incorrect statement:",
      options: [
        "Congress was highly successful and Muslim League failed miserably.",
        "Congress emerged as the largest party in NWFP.",
        "Unionist Party and Krishak Praja Party formed Governments in Punjab and Bengal respectively.",
        "Pirpur Report was prepared by Jinnah to highlight misrule of Congress ministries.",
      ],
      answer: 1, // Congress emerged as the largest party in NWFP.
    },
    {
      id: 28,
      text: "Q28. The only session of Indian National Congress which was presided by Mahatma Gandhi was held at:",
      options: ["Belgaum", "Faizpur", "Allahabad", "Karachi"],
      answer: 0, // Belgaum
    },
    {
      id: 29,
      text: "Q29. Which of the following personalities were the founders of the ‘Home Rule Movement’?",
      options: [
        "Bal Gangadhar Tilak",
        "Annie Besant",
        "Mohammad Ali Jinnah",
        "Mahatma Gandhi",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 30,
      text: "Q30. Which among the following was/were related to Governor-General William Bentinck?",
      options: [
        "Regulation XVII",
        "Committee of Public Instruction",
        "Macaulay’s Minute",
        "Presidency of Agra",
      ],
      answer: 3, // Presidency of Agra
    },
    {
      id: 31,
      text: "Q31. Consider the following policies followed during the growth of British paramountcy in India: 1. Subordinate Isolation 2. Policy of Ring Fence 3. Policy of Subordinate Union. Which is the correct sequence?",
      options: ["1-3-2", "2-1-3", "1-2-3", "3-2-1"],
      answer: 1, // 2-1-3
    },
    {
      id: 32,
      text: "Q32. What was the name of the first newspaper to announce the partition of Bengal on July 6th 1905?",
      options: ["Swaraj", "Sanjivani", "Kalantar", "Anandabazar Patrika"],
      answer: 1, // Sanjivani
    },
    {
      id: 33,
      text: "Q33. In which country was the Indian Independence Committee formed during British Era?",
      options: ["France", "UK", "Germany", "USA"],
      answer: 2, // Germany
    },
    {
      id: 34,
      text: "Q34. In which year was the Land Holder’s society established in India?",
      options: ["1806", "1828", "1838", "1850"],
      answer: 2, // 1838
    },
    {
      id: 35,
      text: "Q35. Under which among the following acts, Civil Services started in India?",
      options: [
        "Charter Act 1813",
        "Charter Act 1833",
        "Charter Act 1853",
        "Charter Act 1858",
      ],
      answer: 2, // Charter Act 1853
    },
    {
      id: 36,
      text: "Q36. Which among the following is called the Magna Carta of English education?",
      options: [
        "Wood’s Despatch",
        "Hartog Committee Report",
        "Minute on Indian Education by Macaulay",
        "None of the above",
      ],
      answer: 0, // Wood’s Despatch
    },
    {
      id: 37,
      text: "Q37. Who among the following founded the Depressed Classes Mission of India?",
      options: [
        "Dr. B.R. Ambedkar",
        "Vitthal Ramji Shinde",
        "Annabhau Sathe",
        "Shantabai Kamble",
      ],
      answer: 1, // Vitthal Ramji Shinde
    },
    {
      id: 38,
      text: "Q38. Who was the founder of the Paris Indian Society?",
      options: ["S R Rana", "Bhikaji Cama", "Taraknath", "Lala Hardayal"],
      answer: 1, // Bhikaji Cama
    },
    {
      id: 39,
      text: "Q39. Which organization published the journal called Indian Sociologists?",
      options: [
        "India House",
        "Ghadar Party",
        "British Indian Association",
        "Berlin Committee",
      ],
      answer: 0, // India House
    },
    {
      id: 40,
      text: "Q40. Who among the following is called the father of Nationalism in India?",
      options: [
        "Raja Rammohan Roy",
        "Bal Gangadhar Tilak",
        "Mahatma Gandhi",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Raja Rammohan Roy
    },
    {
      id: 41,
      text: "Q41. Who among the following founded the All India Harijan Sangh in 1932?",
      options: [
        "Dr. B.R. Ambedkar",
        "Mahatma Gandhi",
        "Jyotiba Phule",
        "Annie Besant",
      ],
      answer: 1, // Mahatma Gandhi
    },
    {
      id: 42,
      text: "Q42. Who was the founder of the Indian National Army (Azad Hind Fauj)?",
      options: [
        "Rash Behari Bose",
        "Captain Mohan Singh",
        "Subhash Chandra Bose",
        "Lala Hardayal",
      ],
      answer: 1, // Captain Mohan Singh
    },
    {
      id: 43,
      text: "Q43. Who among the following was associated with the suppression of Thugs?",
      options: [
        "Lord Hardinge",
        "Lord Cornwallis",
        "William Sleeman",
        "John Shore",
      ],
      answer: 2, // William Sleeman
    },
    {
      id: 44,
      text: "Q44. The famous book ‘The Economic History of India’ was written by:",
      options: [
        "Romesh Chunder Dutt",
        "M.G. Ranade",
        "Dadabhai Naoroji",
        "R.C. Majumdar",
      ],
      answer: 0, // Romesh Chunder Dutt
    },
    {
      id: 45,
      text: "Q45. The Satya Shodhak Samaj was founded by:",
      options: [
        "Gopal Krishna Gokhale",
        "Jyotiba Phule",
        "M.G. Ranade",
        "B.R. Ambedkar",
      ],
      answer: 1, // Jyotiba Phule
    },
    {
      id: 46,
      text: "Q46. Who among the following was the first Indian to qualify for the Indian Civil Services?",
      options: [
        "R.C. Dutt",
        "Satyendranath Tagore",
        "Surendranath Banerjee",
        "Dadabhai Naoroji",
      ],
      answer: 1, // Satyendranath Tagore
    },
    {
      id: 47,
      text: "Q47. Who was the founder of the Indian Association in 1876?",
      options: [
        "Anand Mohan Bose",
        "Raja Rammohan Roy",
        "Surendranath Banerjee",
        "Dadabhai Naoroji",
      ],
      answer: 2, // Surendranath Banerjee
    },
    {
      id: 48,
      text: "Q48. Who was the founder of the ‘Arzi Hukumat-e-Azad Hind’ (Provisional Government of Free India)?",
      options: [
        "Subhash Chandra Bose",
        "Rash Behari Bose",
        "Captain Mohan Singh",
        "Sardar Patel",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 49,
      text: "Q49. Who was the Viceroy of India at the time of the Partition of Bengal (1905)?",
      options: ["Lord Ripon", "Lord Curzon", "Lord Lytton", "Lord Hardinge"],
      answer: 1, // Lord Curzon
    },
    {
      id: 50,
      text: "Q50. The Ghadar Party was formed in:",
      options: ["USA", "Canada", "UK", "Germany"],
      answer: 0, // USA
    },
    {
      id: 51,
      text: "Q51. Who among the following founded the East India Association in London in 1866?",
      options: [
        "Anand Mohan Bose",
        "Dadabhai Naoroji",
        "Surendranath Banerjee",
        "R.C. Dutt",
      ],
      answer: 1, // Dadabhai Naoroji
    },
    {
      id: 52,
      text: "Q52. Who was the Viceroy of India at the time of Jallianwala Bagh Massacre?",
      options: ["Lord Reading", "Lord Chelmsford", "Lord Irwin", "Lord Minto"],
      answer: 1, // Lord Chelmsford
    },
    {
      id: 53,
      text: "Q53. Who among the following was called the ‘Grand Old Man of India’?",
      options: [
        "Dadabhai Naoroji",
        "Bal Gangadhar Tilak",
        "R.C. Dutt",
        "G.K. Gokhale",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 54,
      text: "Q54. Who was the founder of the Aligarh Movement?",
      options: [
        "Sir Syed Ahmed Khan",
        "M.A. Jinnah",
        "Abul Kalam Azad",
        "Maulana Hasrat Mohani",
      ],
      answer: 0, // Sir Syed Ahmed Khan
    },
    {
      id: 55,
      text: "Q55. Who among the following was known as ‘Punjab Kesari’?",
      options: [
        "Bal Gangadhar Tilak",
        "Gopal Krishna Gokhale",
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
      ],
      answer: 2, // Lala Lajpat Rai
    },
    {
      id: 56,
      text: "Q56. Which among the following movements was started by Swami Sahajanand Saraswati?",
      options: [
        "Kisan Sabha Movement",
        "Swadeshi Movement",
        "Quit India Movement",
        "Temple Entry Movement",
      ],
      answer: 0, // Kisan Sabha Movement
    },
    {
      id: 57,
      text: "Q57. Who was the first Indian woman President of the Indian National Congress?",
      options: [
        "Sarojini Naidu",
        "Nellie Sengupta",
        "Annie Besant",
        "Indira Gandhi",
      ],
      answer: 2, // Annie Besant
    },
    {
      id: 58,
      text: "Q58. Who among the following founded the ‘Servants of India Society’ in 1905?",
      options: [
        "Gopal Krishna Gokhale",
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "M.G. Ranade",
      ],
      answer: 0, // Gopal Krishna Gokhale
    },
    {
      id: 59,
      text: "Q59. Who was the Viceroy of India at the time of the Quit India Movement?",
      options: [
        "Lord Linlithgow",
        "Lord Irwin",
        "Lord Wavell",
        "Lord Mountbatten",
      ],
      answer: 0, // Lord Linlithgow
    },
    {
      id: 60,
      text: "Q60. Who among the following was the President of the Indian National Congress at the time of Indian Independence?",
      options: [
        "J.B. Kripalani",
        "Subhash Chandra Bose",
        "Sardar Patel",
        "Jawaharlal Nehru",
      ],
      answer: 0, // J.B. Kripalani
    },
    {
      id: 61,
      text: "Q61. Who was the founder of the Indian National Army in Singapore?",
      options: [
        "Captain Mohan Singh",
        "Rash Behari Bose",
        "Subhash Chandra Bose",
        "Lala Hardayal",
      ],
      answer: 0, // Captain Mohan Singh
    },
    {
      id: 62,
      text: "Q62. Who among the following was associated with the ‘Poona Sarvajanik Sabha’?",
      options: [
        "Gopal Krishna Gokhale",
        "M.G. Ranade",
        "Dadabhai Naoroji",
        "Bal Gangadhar Tilak",
      ],
      answer: 1, // M.G. Ranade
    },
    {
      id: 63,
      text: "Q63. Who was the founder of the Ramakrishna Mission?",
      options: [
        "Ramakrishna Paramahansa",
        "Swami Vivekananda",
        "Keshab Chandra Sen",
        "Dayananda Saraswati",
      ],
      answer: 1, // Swami Vivekananda
    },
    {
      id: 64,
      text: "Q64. Who among the following was known as the ‘Liberator of Indian Press’?",
      options: [
        "Lord Ripon",
        "Lord Hastings",
        "Charles Metcalfe",
        "Lord Hardinge",
      ],
      answer: 2, // Charles Metcalfe
    },
    {
      id: 65,
      text: "Q65. Who among the following was associated with the establishment of the ‘Indian National Congress’?",
      options: [
        "Dadabhai Naoroji",
        "A.O. Hume",
        "Bal Gangadhar Tilak",
        "M.G. Ranade",
      ],
      answer: 1, // A.O. Hume
    },
    {
      id: 66,
      text: "Q66. Who was the first Indian woman to become the President of the Indian National Congress?",
      options: [
        "Sarojini Naidu",
        "Annie Besant",
        "Nellie Sengupta",
        "Indira Gandhi",
      ],
      answer: 1, // Annie Besant
    },
    {
      id: 67,
      text: "Q67. Who among the following gave the theory of Drain of Wealth?",
      options: [
        "M.G. Ranade",
        "Dadabhai Naoroji",
        "R.C. Dutt",
        "Bal Gangadhar Tilak",
      ],
      answer: 1, // Dadabhai Naoroji
    },
    {
      id: 68,
      text: "Q68. Who among the following founded the ‘Indian Home Rule Society’ in London?",
      options: [
        "Shyamji Krishna Varma",
        "Madan Lal Dhingra",
        "Lala Lajpat Rai",
        "Annie Besant",
      ],
      answer: 0, // Shyamji Krishna Varma
    },
    {
      id: 69,
      text: "Q69. Who among the following was known as the ‘Father of Indian Renaissance’?",
      options: [
        "Gopal Krishna Gokhale",
        "Raja Rammohan Roy",
        "M.G. Ranade",
        "Ishwar Chandra Vidyasagar",
      ],
      answer: 1, // Raja Rammohan Roy
    },
    {
      id: 70,
      text: "Q70. Who among the following was the author of the book ‘India Wins Freedom’?",
      options: [
        "Maulana Abul Kalam Azad",
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Rajendra Prasad",
      ],
      answer: 0, // Maulana Abul Kalam Azad
    },
    {
      id: 71,
      text: "Q71. Who among the following was the leader of the Indigo Revolt of 1859-60?",
      options: [
        "R.C. Dutt",
        "Digambar Biswas & Bishnu Biswas",
        "Ishwar Chandra Vidyasagar",
        "Bankim Chandra Chattopadhyay",
      ],
      answer: 1, // Digambar Biswas & Bishnu Biswas
    },
    {
      id: 72,
      text: "Q72. Who among the following established the ‘Servants of India Society’?",
      options: [
        "Gopal Krishna Gokhale",
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "Annie Besant",
      ],
      answer: 0, // Gopal Krishna Gokhale
    },
    {
      id: 73,
      text: "Q73. The Simon Commission was appointed in which year?",
      options: ["1927", "1928", "1930", "1932"],
      answer: 0, // 1927
    },
    {
      id: 74,
      text: "Q74. Who among the following founded the Theosophical Society in India?",
      options: [
        "Annie Besant",
        "Blavatsky & Olcott",
        "M.G. Ranade",
        "Dayananda Saraswati",
      ],
      answer: 1, // Blavatsky & Olcott
    },
    {
      id: 75,
      text: "Q75. Who among the following was the first Indian to demand Swaraj in the Congress session?",
      options: [
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "Annie Besant",
        "Mahatma Gandhi",
      ],
      answer: 1, // Dadabhai Naoroji
    },
    {
      id: 76,
      text: "Q76. Who among the following wrote the book ‘Discovery of India’?",
      options: [
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "Sardar Patel",
        "Rajendra Prasad",
      ],
      answer: 0, // Jawaharlal Nehru
    },
    {
      id: 77,
      text: "Q77. The All India Trade Union Congress (AITUC) was founded in:",
      options: ["1918", "1920", "1921", "1923"],
      answer: 1, // 1920
    },
    {
      id: 78,
      text: "Q78. The Non-Cooperation Movement was withdrawn because of which incident?",
      options: [
        "Rowlatt Act",
        "Jallianwala Bagh Massacre",
        "Chauri Chaura Incident",
        "Partition of Bengal",
      ],
      answer: 2, // Chauri Chaura Incident
    },
    {
      id: 79,
      text: "Q79. Who among the following was known as the ‘Iron Man of India’?",
      options: [
        "Bal Gangadhar Tilak",
        "Sardar Patel",
        "Bipin Chandra Pal",
        "C. Rajagopalachari",
      ],
      answer: 1, // Sardar Patel
    },
    {
      id: 80,
      text: "Q80. Who was the first Indian woman to become President of the United Nations General Assembly?",
      options: [
        "Sarojini Naidu",
        "Indira Gandhi",
        "Vijaya Lakshmi Pandit",
        "Sucheta Kripalani",
      ],
      answer: 2, // Vijaya Lakshmi Pandit
    },
    {
      id: 81,
      text: "Q81. Who among the following founded the ‘Indian Association’ in 1876?",
      options: [
        "Surendranath Banerjee",
        "Anand Mohan Bose",
        "Dadabhai Naoroji",
        "R.C. Dutt",
      ],
      answer: 0, // Surendranath Banerjee
    },
    {
      id: 82,
      text: "Q82. Who was the first Indian Governor-General of Independent India?",
      options: [
        "C. Rajagopalachari",
        "Lord Mountbatten",
        "Dr. Rajendra Prasad",
        "Sardar Patel",
      ],
      answer: 0, // C. Rajagopalachari
    },
    {
      id: 83,
      text: "Q83. Who among the following established the ‘Brahmo Samaj’?",
      options: [
        "Raja Rammohan Roy",
        "Debendranath Tagore",
        "Keshab Chandra Sen",
        "Dayananda Saraswati",
      ],
      answer: 0, // Raja Rammohan Roy
    },
    {
      id: 84,
      text: "Q84. Who was the first Indian President of the Indian National Congress?",
      options: [
        "W.C. Banerjee",
        "Dadabhai Naoroji",
        "Pherozeshah Mehta",
        "Rash Behari Ghosh",
      ],
      answer: 0, // W.C. Banerjee
    },
    {
      id: 85,
      text: "Q85. Who among the following gave the slogan ‘Go Back to the Vedas’?",
      options: [
        "Raja Rammohan Roy",
        "Dayananda Saraswati",
        "Swami Vivekananda",
        "Bal Gangadhar Tilak",
      ],
      answer: 1, // Dayananda Saraswati
    },
    {
      id: 86,
      text: "Q86. Who among the following is considered the ‘Mother of Indian Revolution’?",
      options: [
        "Rani Lakshmibai",
        "Sarojini Naidu",
        "Madam Bhikaji Cama",
        "Annie Besant",
      ],
      answer: 2, // Madam Bhikaji Cama
    },
    {
      id: 87,
      text: "Q87. Who among the following was the leader of the Santhal Revolt (1855-56)?",
      options: ["Sido and Kanhu", "Birsa Munda", "Kunwar Singh", "Tantia Tope"],
      answer: 0, // Sido and Kanhu
    },
    {
      id: 88,
      text: "Q88. The Indian National Congress was founded in:",
      options: ["1885", "1890", "1900", "1905"],
      answer: 0, // 1885
    },
    {
      id: 89,
      text: "Q89. Who was the founder of the ‘Arya Samaj’?",
      options: [
        "Dayananda Saraswati",
        "Swami Vivekananda",
        "Raja Rammohan Roy",
        "Keshab Chandra Sen",
      ],
      answer: 0, // Dayananda Saraswati
    },
    {
      id: 90,
      text: "Q90. Who among the following founded the ‘Prarthana Samaj’?",
      options: [
        "M.G. Ranade",
        "Atmaram Pandurang",
        "Gopal Krishna Gokhale",
        "Ishwar Chandra Vidyasagar",
      ],
      answer: 1, // Atmaram Pandurang
    },
    {
      id: 91,
      text: "Q91. Who was the author of the book ‘Hind Swaraj’?",
      options: [
        "Bal Gangadhar Tilak",
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 1, // Mahatma Gandhi
    },
    {
      id: 92,
      text: "Q92. The Hunter Commission was appointed to enquire into which event?",
      options: [
        "Partition of Bengal",
        "Jallianwala Bagh Massacre",
        "Chauri Chaura Incident",
        "Quit India Movement",
      ],
      answer: 1, // Jallianwala Bagh Massacre
    },
    {
      id: 93,
      text: "Q93. Who was the first Muslim President of the Indian National Congress?",
      options: [
        "Maulana Abul Kalam Azad",
        "Badruddin Tyabji",
        "Syed Ahmed Khan",
        "M.A. Jinnah",
      ],
      answer: 1, // Badruddin Tyabji
    },
    {
      id: 94,
      text: "Q94. Who among the following was called the ‘Frontier Gandhi’?",
      options: [
        "Maulana Abul Kalam Azad",
        "Hasrat Mohani",
        "Khan Abdul Ghaffar Khan",
        "Syed Ahmed Khan",
      ],
      answer: 2, // Khan Abdul Ghaffar Khan
    },
    {
      id: 95,
      text: "Q95. The All India Muslim League was founded in:",
      options: ["1906", "1910", "1915", "1920"],
      answer: 0, // 1906
    },
    {
      id: 96,
      text: "Q96. Who among the following wrote the book ‘Unhappy India’?",
      options: [
        "Dadabhai Naoroji",
        "Jawaharlal Nehru",
        "Lala Lajpat Rai",
        "Bal Gangadhar Tilak",
      ],
      answer: 2, // Lala Lajpat Rai
    },
    {
      id: 97,
      text: "Q97. Who was the President of the Indian National Congress at the time of Surat Split (1907)?",
      options: [
        "Dadabhai Naoroji",
        "Rash Behari Ghosh",
        "Bal Gangadhar Tilak",
        "Gopal Krishna Gokhale",
      ],
      answer: 1, // Rash Behari Ghosh
    },
    {
      id: 98,
      text: "Q98. Who among the following founded the Indian Reform Association?",
      options: [
        "Keshab Chandra Sen",
        "Raja Rammohan Roy",
        "Dayananda Saraswati",
        "Debendranath Tagore",
      ],
      answer: 0, // Keshab Chandra Sen
    },
    {
      id: 99,
      text: "Q99. Who was the first Indian to enter the Indian Civil Services?",
      options: [
        "Surendranath Banerjee",
        "Satyendranath Tagore",
        "R.C. Dutt",
        "Dadabhai Naoroji",
      ],
      answer: 1, // Satyendranath Tagore
    },
    {
      id: 100,
      text: "Q100. Who among the following was popularly known as the ‘Prince of Patriots’?",
      options: [
        "Bal Gangadhar Tilak",
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
        "Dadabhai Naoroji",
      ],
      answer: 1, // Lala Lajpat Rai
    },
    {
      id: 101,
      text: "Q101. Who among the following gave the slogan ‘Swaraj is my birthright and I shall have it’?",
      options: [
        "Bal Gangadhar Tilak",
        "Bipin Chandra Pal",
        "Lala Lajpat Rai",
        "Mahatma Gandhi",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 102,
      text: "Q102. Who among the following was the founder of the Banaras Hindu University?",
      options: [
        "Gopal Krishna Gokhale",
        "Madan Mohan Malaviya",
        "Annie Besant",
        "Satyendra Nath Bose",
      ],
      answer: 1, // Madan Mohan Malaviya
    },
    {
      id: 103,
      text: "Q103. Who among the following was the author of the book ‘Anand Math’?",
      options: [
        "Bankim Chandra Chattopadhyay",
        "Ishwar Chandra Vidyasagar",
        "Rabindranath Tagore",
        "Dinbandhu Mitra",
      ],
      answer: 0, // Bankim Chandra Chattopadhyay
    },
    {
      id: 104,
      text: "Q104. Who was the founder of the Indian National Congress?",
      options: [
        "A.O. Hume",
        "Dadabhai Naoroji",
        "W.C. Banerjee",
        "Raja Rammohan Roy",
      ],
      answer: 0, // A.O. Hume
    },
    {
      id: 105,
      text: "Q105. Who was the first Indian woman President of the Indian National Congress?",
      options: [
        "Annie Besant",
        "Sarojini Naidu",
        "Vijaya Lakshmi Pandit",
        "Nellie Sengupta",
      ],
      answer: 0, // Annie Besant
    },
    {
      id: 106,
      text: "Q106. Who among the following was called the ‘Father of Indian Unrest’ by the British?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Subhash Chandra Bose",
        "Lala Lajpat Rai",
      ],
      answer: 1, // Bal Gangadhar Tilak
    },
    {
      id: 107,
      text: "Q107. Who among the following wrote the book ‘India Divided’?",
      options: [
        "Sardar Patel",
        "Rajendra Prasad",
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
      ],
      answer: 1, // Rajendra Prasad
    },
    {
      id: 108,
      text: "Q108. Who among the following was the Viceroy of India at the time of Quit India Movement?",
      options: [
        "Lord Irwin",
        "Lord Wavell",
        "Lord Linlithgow",
        "Lord Mountbatten",
      ],
      answer: 2, // Lord Linlithgow
    },
    {
      id: 109,
      text: "Q109. Who among the following founded the All India Muslim League?",
      options: [
        "Syed Ahmed Khan",
        "M.A. Jinnah",
        "Nawab Salimullah Khan",
        "Badruddin Tyabji",
      ],
      answer: 2, // Nawab Salimullah Khan
    },
    {
      id: 110,
      text: "Q110. Who among the following was the author of the book ‘Poverty and Un-British Rule in India’?",
      options: [
        "M.G. Ranade",
        "Dadabhai Naoroji",
        "R.C. Dutt",
        "Bal Gangadhar Tilak",
      ],
      answer: 1, // Dadabhai Naoroji
    },
    {
      id: 111,
      text: "Q111. Who was the Viceroy of India during the Revolt of 1857?",
      options: ["Lord Canning", "Lord Dalhousie", "Lord Ripon", "Lord Lytton"],
      answer: 0, // Lord Canning
    },
    {
      id: 112,
      text: "Q112. Who among the following was called the ‘Father of Indian Renaissance’?",
      options: [
        "Raja Rammohan Roy",
        "M.G. Ranade",
        "Dayananda Saraswati",
        "Swami Vivekananda",
      ],
      answer: 0, // Raja Rammohan Roy
    },
    {
      id: 113,
      text: "Q113. Who among the following gave the slogan ‘Do or Die’?",
      options: [
        "Subhash Chandra Bose",
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 1, // Mahatma Gandhi
    },
    {
      id: 114,
      text: "Q114. Who among the following was the founder of the ‘Ghadar Party’?",
      options: [
        "Sohan Singh Bhakna",
        "Lala Lajpat Rai",
        "Madam Bhikaji Cama",
        "Shyamji Krishna Varma",
      ],
      answer: 0, // Sohan Singh Bhakna
    },
    {
      id: 115,
      text: "Q115. Who among the following wrote the book ‘Gita Rahasya’?",
      options: [
        "Bal Gangadhar Tilak",
        "Mahatma Gandhi",
        "Sri Aurobindo",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 116,
      text: "Q116. Who among the following started the newspaper ‘Young India’?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Annie Besant",
        "Subhash Chandra Bose",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 117,
      text: "Q117. Who among the following was the founder of the ‘East India Association’?",
      options: [
        "Dadabhai Naoroji",
        "R.C. Dutt",
        "M.G. Ranade",
        "Surendranath Banerjee",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 118,
      text: "Q118. Who was the author of the book ‘India of My Dreams’?",
      options: [
        "Sardar Patel",
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "B.R. Ambedkar",
      ],
      answer: 1, // Mahatma Gandhi
    },
    {
      id: 119,
      text: "Q119. Who among the following founded the Indian National Army (INA)?",
      options: [
        "Rash Behari Bose",
        "Captain Mohan Singh",
        "Subhash Chandra Bose",
        "Mahatma Gandhi",
      ],
      answer: 1, // Captain Mohan Singh
    },
    {
      id: 120,
      text: "Q120. Who among the following was the first Indian woman to become the President of Indian National Congress?",
      options: [
        "Sarojini Naidu",
        "Nellie Sengupta",
        "Annie Besant",
        "Vijaya Lakshmi Pandit",
      ],
      answer: 2, // Annie Besant
    },
    {
      id: 121,
      text: "Q121. Who among the following was the founder of the ‘Anushilan Samiti’?",
      options: [
        "Jatin Das",
        "Barindra Kumar Ghosh",
        "Khudiram Bose",
        "Aurobindo Ghosh",
      ],
      answer: 1, // Barindra Kumar Ghosh
    },
    {
      id: 122,
      text: "Q122. Who among the following was the author of the book ‘What Congress and Gandhi have done to the Untouchables’?",
      options: [
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "B.R. Ambedkar",
        "Rajendra Prasad",
      ],
      answer: 2, // B.R. Ambedkar
    },
    {
      id: 123,
      text: "Q123. Who among the following founded the All India Kisan Sabha in 1936?",
      options: [
        "Sardar Patel",
        "Jawaharlal Nehru",
        "Swami Sahajanand Saraswati",
        "M.N. Roy",
      ],
      answer: 2, // Swami Sahajanand Saraswati
    },
    {
      id: 124,
      text: "Q124. Who among the following was the first Indian to become a member of the British Parliament?",
      options: [
        "Dadabhai Naoroji",
        "M.G. Ranade",
        "R.C. Dutt",
        "Surendranath Banerjee",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 125,
      text: "Q125. Who among the following was the founder of the ‘Swatantra Party’?",
      options: [
        "C. Rajagopalachari",
        "Sardar Patel",
        "Mahatma Gandhi",
        "Subhash Chandra Bose",
      ],
      answer: 0, // C. Rajagopalachari
    },
    {
      id: 126,
      text: "Q126. Who among the following was the founder of the ‘Justice Party’?",
      options: [
        "C. Natesa Mudaliar",
        "E.V. Ramasamy Naicker",
        "C. Rajagopalachari",
        "B.R. Ambedkar",
      ],
      answer: 0, // C. Natesa Mudaliar
    },
    {
      id: 127,
      text: "Q127. Who among the following founded the newspaper ‘Indian Opinion’?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Annie Besant",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 128,
      text: "Q128. Who among the following was the founder of the All India Forward Bloc?",
      options: [
        "Subhash Chandra Bose",
        "C. Rajagopalachari",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 129,
      text: "Q129. Who among the following started the ‘Bombay Chronicle’?",
      options: [
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "Pherozeshah Mehta",
        "Annie Besant",
      ],
      answer: 2, // Pherozeshah Mehta
    },
    {
      id: 130,
      text: "Q130. Who among the following was the founder of the ‘Poona Sarvajanik Sabha’?",
      options: [
        "M.G. Ranade",
        "Gopal Krishna Gokhale",
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
      ],
      answer: 0, // M.G. Ranade
    },
    {
      id: 131,
      text: "Q131. Who among the following was the founder of the Theosophical Society in India?",
      options: [
        "Annie Besant",
        "Blavatsky & Olcott",
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
      ],
      answer: 1, // Blavatsky & Olcott
    },
    {
      id: 132,
      text: "Q132. Who among the following started the newspaper ‘Kesari’?",
      options: [
        "M.G. Ranade",
        "Bal Gangadhar Tilak",
        "Gopal Krishna Gokhale",
        "Annie Besant",
      ],
      answer: 1, // Bal Gangadhar Tilak
    },
    {
      id: 133,
      text: "Q133. Who among the following founded the Ramakrishna Math and Mission?",
      options: [
        "Swami Vivekananda",
        "Ramakrishna Paramahansa",
        "Dayananda Saraswati",
        "Keshab Chandra Sen",
      ],
      answer: 0, // Swami Vivekananda
    },
    {
      id: 134,
      text: "Q134. Who among the following gave the call ‘Inquilab Zindabad’?",
      options: [
        "Bhagat Singh",
        "Chandrashekhar Azad",
        "Subhash Chandra Bose",
        "Sardar Patel",
      ],
      answer: 0, // Bhagat Singh
    },
    {
      id: 135,
      text: "Q135. Who among the following founded the ‘Satya Shodhak Samaj’?",
      options: [
        "Jyotiba Phule",
        "Bal Gangadhar Tilak",
        "Raja Rammohan Roy",
        "Dayananda Saraswati",
      ],
      answer: 0, // Jyotiba Phule
    },
    {
      id: 136,
      text: "Q136. Who among the following was the founder of the ‘Indian National Army’?",
      options: [
        "Subhash Chandra Bose",
        "Rash Behari Bose",
        "Captain Mohan Singh",
        "M.N. Roy",
      ],
      answer: 2, // Captain Mohan Singh
    },
    {
      id: 137,
      text: "Q137. Who among the following wrote the book ‘Discovery of India’?",
      options: [
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "Subhash Chandra Bose",
        "Sardar Patel",
      ],
      answer: 0, // Jawaharlal Nehru
    },
    {
      id: 138,
      text: "Q138. Who among the following started the paper ‘Young India’?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "Annie Besant",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 139,
      text: "Q139. Who among the following was the founder of the ‘Indian National Congress’?",
      options: [
        "A.O. Hume",
        "Dadabhai Naoroji",
        "W.C. Banerjee",
        "M.G. Ranade",
      ],
      answer: 0, // A.O. Hume
    },
    {
      id: 140,
      text: "Q140. Who among the following was popularly known as ‘Sher-e-Punjab’?",
      options: [
        "Bal Gangadhar Tilak",
        "Sardar Patel",
        "Bipin Chandra Pal",
        "Lala Lajpat Rai",
      ],
      answer: 3, // Lala Lajpat Rai
    },
    {
      id: 141,
      text: "Q141. Who among the following founded the All India Trade Union Congress (AITUC)?",
      options: [
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
        "M.N. Roy",
        "Sardar Patel",
      ],
      answer: 0, // Lala Lajpat Rai
    },
    {
      id: 142,
      text: "Q142. Who among the following started the newspaper ‘The Hindu’?",
      options: [
        "G. Subramania Iyer",
        "Bal Gangadhar Tilak",
        "M.G. Ranade",
        "Annie Besant",
      ],
      answer: 0, // G. Subramania Iyer
    },
    {
      id: 143,
      text: "Q143. Who among the following started the Aligarh Movement?",
      options: [
        "Sir Syed Ahmed Khan",
        "M.A. Jinnah",
        "Abul Kalam Azad",
        "Maulana Hasrat Mohani",
      ],
      answer: 0, // Sir Syed Ahmed Khan
    },
    {
      id: 144,
      text: "Q144. Who among the following started the Home Rule Movement in India?",
      options: [
        "Bal Gangadhar Tilak",
        "Annie Besant",
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 145,
      text: "Q145. Who among the following started the paper ‘Harijan’?",
      options: [
        "Mahatma Gandhi",
        "B.R. Ambedkar",
        "Jawaharlal Nehru",
        "Bal Gangadhar Tilak",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 146,
      text: "Q146. Who among the following was the Viceroy of India during the Partition of Bengal?",
      options: ["Lord Curzon", "Lord Ripon", "Lord Hardinge", "Lord Lytton"],
      answer: 0, // Lord Curzon
    },
    {
      id: 147,
      text: "Q147. Who among the following gave the slogan ‘Dilli Chalo’?",
      options: [
        "Subhash Chandra Bose",
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 148,
      text: "Q148. Who among the following gave the slogan ‘Jai Hind’?",
      options: [
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
        "Sardar Patel",
        "Mahatma Gandhi",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 149,
      text: "Q149. Who among the following started the newspaper ‘Indian Mirror’?",
      options: [
        "Raja Rammohan Roy",
        "Ishwar Chandra Vidyasagar",
        "Bal Gangadhar Tilak",
        "G. Subramania Iyer",
      ],
      answer: 0, // Raja Rammohan Roy
    },
    {
      id: 150,
      text: "Q150. Who among the following was popularly known as ‘Lokmanya’?",
      options: [
        "Bal Gangadhar Tilak",
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 151,
      text: "Q151. Who among the following was the author of ‘Gokhale – My Political Guru’?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 152,
      text: "Q152. Who among the following founded the Indian Independence League?",
      options: [
        "Rash Behari Bose",
        "Subhash Chandra Bose",
        "Captain Mohan Singh",
        "M.N. Roy",
      ],
      answer: 0, // Rash Behari Bose
    },
    {
      id: 153,
      text: "Q153. Who among the following started the Servants of India Society?",
      options: [
        "Gopal Krishna Gokhale",
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "M.G. Ranade",
      ],
      answer: 0, // Gopal Krishna Gokhale
    },
    {
      id: 154,
      text: "Q154. Who among the following started the Swadeshi Movement?",
      options: [
        "Bal Gangadhar Tilak",
        "Dadabhai Naoroji",
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 155,
      text: "Q155. Who among the following started the ‘Young Bengal Movement’?",
      options: [
        "Henry Vivian Derozio",
        "Ishwar Chandra Vidyasagar",
        "Raja Rammohan Roy",
        "Keshab Chandra Sen",
      ],
      answer: 0, // Henry Vivian Derozio
    },
    {
      id: 156,
      text: "Q156. Who among the following started the Self-Respect Movement in South India?",
      options: [
        "E.V. Ramasamy Naicker",
        "C. Rajagopalachari",
        "K. Kamaraj",
        "C. Natesa Mudaliar",
      ],
      answer: 0, // E.V. Ramasamy Naicker (Periyar)
    },
    {
      id: 157,
      text: "Q157. Who among the following was the author of ‘Hind Swaraj’?",
      options: [
        "Mahatma Gandhi",
        "Bal Gangadhar Tilak",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 158,
      text: "Q158. Who among the following founded the Indian Association?",
      options: [
        "Surendranath Banerjee",
        "Dadabhai Naoroji",
        "M.G. Ranade",
        "Raja Rammohan Roy",
      ],
      answer: 0, // Surendranath Banerjee
    },
    {
      id: 159,
      text: "Q159. Who among the following founded the Indian National Army (INA)?",
      options: [
        "Rash Behari Bose",
        "Captain Mohan Singh",
        "Subhash Chandra Bose",
        "Sohan Singh Bhakna",
      ],
      answer: 1, // Captain Mohan Singh
    },
    {
      id: 160,
      text: "Q160. Who among the following was popularly known as ‘Deshbandhu’?",
      options: [
        "Chittaranjan Das",
        "Sardar Patel",
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Chittaranjan Das
    },
    {
      id: 161,
      text: "Q161. Who among the following started the ‘Satyashodhak Samaj’?",
      options: [
        "Jyotiba Phule",
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
        "Swami Vivekananda",
      ],
      answer: 0, // Jyotiba Phule
    },
    {
      id: 162,
      text: "Q162. Who among the following was the founder of the Indian National Army in Malaya?",
      options: [
        "Captain Mohan Singh",
        "Rash Behari Bose",
        "Subhash Chandra Bose",
        "Sohan Singh Bhakna",
      ],
      answer: 0, // Captain Mohan Singh
    },
    {
      id: 163,
      text: "Q163. Who among the following gave the slogan ‘Give me blood, I will give you freedom’?",
      options: [
        "Subhash Chandra Bose",
        "Bhagat Singh",
        "Mahatma Gandhi",
        "Sardar Patel",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 164,
      text: "Q164. Who among the following started the ‘Ramkrishna Mission’?",
      options: [
        "Swami Vivekananda",
        "Ramakrishna Paramahansa",
        "Dayananda Saraswati",
        "Keshab Chandra Sen",
      ],
      answer: 0, // Swami Vivekananda
    },
    {
      id: 165,
      text: "Q165. Who among the following gave the slogan ‘Swaraj is my birthright and I shall have it’?",
      options: [
        "Bal Gangadhar Tilak",
        "Lala Lajpat Rai",
        "Bipin Chandra Pal",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 166,
      text: "Q166. Who among the following was popularly known as ‘Punjab Kesari’?",
      options: [
        "Lala Lajpat Rai",
        "Bal Gangadhar Tilak",
        "Bipin Chandra Pal",
        "Gopal Krishna Gokhale",
      ],
      answer: 0, // Lala Lajpat Rai
    },
    {
      id: 167,
      text: "Q167. Who among the following was the founder of the Indian Home Rule League?",
      options: [
        "Annie Besant",
        "Bal Gangadhar Tilak",
        "Mahatma Gandhi",
        "Subhash Chandra Bose",
      ],
      answer: 0, // Annie Besant
    },
    {
      id: 168,
      text: "Q168. Who among the following was popularly known as ‘Netaji’?",
      options: [
        "Subhash Chandra Bose",
        "Bhagat Singh",
        "Sardar Patel",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Subhash Chandra Bose
    },
    {
      id: 169,
      text: "Q169. Who among the following started the journal ‘The Indian Sociologist’?",
      options: [
        "Shyamji Krishna Varma",
        "Lala Lajpat Rai",
        "M.G. Ranade",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Shyamji Krishna Varma
    },
    {
      id: 170,
      text: "Q170. Who among the following founded the ‘East India Association’?",
      options: [
        "Dadabhai Naoroji",
        "R.C. Dutt",
        "M.G. Ranade",
        "Surendranath Banerjee",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 171,
      text: "Q171. Who among the following was popularly known as the ‘Grand Old Man of India’?",
      options: [
        "Dadabhai Naoroji",
        "Bal Gangadhar Tilak",
        "Gopal Krishna Gokhale",
        "M.G. Ranade",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 172,
      text: "Q172. Who among the following gave the slogan ‘Quit India’?",
      options: [
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Subhash Chandra Bose",
        "Sardar Patel",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 173,
      text: "Q173. Who among the following was the founder of the Arya Samaj?",
      options: [
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
        "Swami Vivekananda",
        "Jyotiba Phule",
      ],
      answer: 0, // Dayananda Saraswati
    },
    {
      id: 174,
      text: "Q174. Who among the following started the ‘Poona Sarvajanik Sabha’?",
      options: [
        "M.G. Ranade",
        "Bal Gangadhar Tilak",
        "Gopal Krishna Gokhale",
        "Dadabhai Naoroji",
      ],
      answer: 0, // M.G. Ranade
    },
    {
      id: 175,
      text: "Q175. Who among the following was the founder of the ‘Indian Association’?",
      options: [
        "Surendranath Banerjee",
        "Raja Rammohan Roy",
        "Dadabhai Naoroji",
        "Gopal Krishna Gokhale",
      ],
      answer: 0, // Surendranath Banerjee
    },
    {
      id: 176,
      text: "Q176. Who among the following started the ‘Servants of India Society’?",
      options: [
        "Gopal Krishna Gokhale",
        "M.G. Ranade",
        "Bal Gangadhar Tilak",
        "Annie Besant",
      ],
      answer: 0, // Gopal Krishna Gokhale
    },
    {
      id: 177,
      text: "Q177. Who among the following started the ‘Bombay Chronicle’?",
      options: [
        "Pherozeshah Mehta",
        "Dadabhai Naoroji",
        "Bal Gangadhar Tilak",
        "Lala Lajpat Rai",
      ],
      answer: 0, // Pherozeshah Mehta
    },
    {
      id: 178,
      text: "Q178. Who among the following was the first Muslim President of the Indian National Congress?",
      options: [
        "Badruddin Tyabji",
        "Maulana Abul Kalam Azad",
        "Syed Ahmed Khan",
        "M.A. Jinnah",
      ],
      answer: 0, // Badruddin Tyabji
    },
    {
      id: 179,
      text: "Q179. Who among the following started the ‘Prarthana Samaj’?",
      options: [
        "Atmaram Pandurang",
        "M.G. Ranade",
        "Raja Rammohan Roy",
        "Dayananda Saraswati",
      ],
      answer: 0, // Atmaram Pandurang
    },
    {
      id: 180,
      text: "Q180. Who among the following was popularly known as ‘Frontier Gandhi’?",
      options: [
        "Khan Abdul Ghaffar Khan",
        "Maulana Abul Kalam Azad",
        "Hasrat Mohani",
        "Syed Ahmed Khan",
      ],
      answer: 0, // Khan Abdul Ghaffar Khan
    },
    {
      id: 181,
      text: "Q181. Who among the following founded the Theosophical Society in India?",
      options: [
        "Annie Besant",
        "Blavatsky & Olcott",
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
      ],
      answer: 1, // Blavatsky & Olcott
    },
    {
      id: 182,
      text: "Q182. Who among the following started the ‘Indian Home Rule League’ in 1916?",
      options: [
        "Bal Gangadhar Tilak",
        "Annie Besant",
        "Mahatma Gandhi",
        "Subhash Chandra Bose",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 183,
      text: "Q183. Who among the following was the author of the book ‘Indian Unrest’?",
      options: [
        "Valentine Chirol",
        "Annie Besant",
        "Mahatma Gandhi",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Valentine Chirol
    },
    {
      id: 184,
      text: "Q184. Who among the following was the founder of the Indian Reform Association?",
      options: [
        "Keshab Chandra Sen",
        "Raja Rammohan Roy",
        "Dayananda Saraswati",
        "Debendranath Tagore",
      ],
      answer: 0, // Keshab Chandra Sen
    },
    {
      id: 185,
      text: "Q185. Who among the following gave the slogan ‘Arise, Awake and Stop not till the Goal is Reached’?",
      options: [
        "Swami Vivekananda",
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
        "Jyotiba Phule",
      ],
      answer: 0, // Swami Vivekananda
    },
    {
      id: 186,
      text: "Q186. Who among the following founded the Indian National Congress?",
      options: [
        "A.O. Hume",
        "Dadabhai Naoroji",
        "W.C. Banerjee",
        "Gopal Krishna Gokhale",
      ],
      answer: 0, // A.O. Hume
    },
    {
      id: 187,
      text: "Q187. Who among the following was the first Indian woman to preside over a session of the Indian National Congress?",
      options: [
        "Annie Besant",
        "Sarojini Naidu",
        "Nellie Sengupta",
        "Vijaya Lakshmi Pandit",
      ],
      answer: 0, // Annie Besant
    },
    {
      id: 188,
      text: "Q188. Who among the following founded the Indian Association in 1876?",
      options: [
        "Surendranath Banerjee",
        "Anand Mohan Bose",
        "Dadabhai Naoroji",
        "Raja Rammohan Roy",
      ],
      answer: 0, // Surendranath Banerjee
    },
    {
      id: 189,
      text: "Q189. Who among the following was popularly known as the ‘Frontier Gandhi’?",
      options: [
        "Khan Abdul Ghaffar Khan",
        "Maulana Abul Kalam Azad",
        "Hasrat Mohani",
        "Syed Ahmed Khan",
      ],
      answer: 0, // Khan Abdul Ghaffar Khan
    },
    {
      id: 190,
      text: "Q190. Who among the following was popularly known as the ‘Grand Old Man of India’?",
      options: [
        "Dadabhai Naoroji",
        "Bal Gangadhar Tilak",
        "M.G. Ranade",
        "Gopal Krishna Gokhale",
      ],
      answer: 0, // Dadabhai Naoroji
    },
    {
      id: 191,
      text: "Q191. Who among the following started the All India Muslim League?",
      options: [
        "Nawab Salimullah Khan",
        "M.A. Jinnah",
        "Syed Ahmed Khan",
        "Badruddin Tyabji",
      ],
      answer: 0, // Nawab Salimullah Khan
    },
    {
      id: 192,
      text: "Q192. Who among the following gave the slogan ‘Do or Die’?",
      options: [
        "Mahatma Gandhi",
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
        "Sardar Patel",
      ],
      answer: 0, // Mahatma Gandhi
    },
    {
      id: 193,
      text: "Q193. Who among the following was popularly known as ‘Deshbandhu’?",
      options: [
        "Chittaranjan Das",
        "Sardar Patel",
        "Subhash Chandra Bose",
        "Jawaharlal Nehru",
      ],
      answer: 0, // Chittaranjan Das
    },
    {
      id: 194,
      text: "Q194. Who among the following founded the Servants of India Society?",
      options: [
        "Gopal Krishna Gokhale",
        "M.G. Ranade",
        "Bal Gangadhar Tilak",
        "Annie Besant",
      ],
      answer: 0, // Gopal Krishna Gokhale
    },
    {
      id: 195,
      text: "Q195. Who among the following was popularly known as the ‘Iron Man of India’?",
      options: [
        "Sardar Patel",
        "Bal Gangadhar Tilak",
        "Subhash Chandra Bose",
        "Bipin Chandra Pal",
      ],
      answer: 0, // Sardar Patel
    },
    {
      id: 196,
      text: "Q196. Who among the following was the author of the book ‘Gita Rahasya’?",
      options: [
        "Bal Gangadhar Tilak",
        "Mahatma Gandhi",
        "Jawaharlal Nehru",
        "Sri Aurobindo",
      ],
      answer: 0, // Bal Gangadhar Tilak
    },
    {
      id: 197,
      text: "Q197. Who among the following was popularly known as ‘Punjab Kesari’?",
      options: [
        "Lala Lajpat Rai",
        "Bal Gangadhar Tilak",
        "Bipin Chandra Pal",
        "Dadabhai Naoroji",
      ],
      answer: 0, // Lala Lajpat Rai
    },
    {
      id: 198,
      text: "Q198. Who among the following started the Self-Respect Movement in South India?",
      options: [
        "E.V. Ramasamy Naicker",
        "C. Rajagopalachari",
        "K. Kamaraj",
        "C. Natesa Mudaliar",
      ],
      answer: 0, // E.V. Ramasamy Naicker
    },
    {
      id: 199,
      text: "Q199. Who among the following was the founder of the Arya Samaj?",
      options: [
        "Dayananda Saraswati",
        "Raja Rammohan Roy",
        "Swami Vivekananda",
        "Jyotiba Phule",
      ],
      answer: 0, // Dayananda Saraswati
    },
    {
      id: 200,
      text: "Q200. Who among the following gave the slogan ‘Inquilab Zindabad’?",
      options: [
        "Bhagat Singh",
        "Chandrashekhar Azad",
        "Subhash Chandra Bose",
        "Sardar Patel",
      ],
      answer: 0, // Bhagat Singh
    },
  ],
};

// ---------- HELPERS ----------
const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const SUBJECT_COLORS = {
  "Phrasal Verbs": "from-indigo-600 to-indigo-400",
  "Modern Indian History": "from-emerald-600 to-emerald-400",
};

// ---------- COMPONENT ----------
export default function MockTestMultiSubject() {
  const subjectNames = Object.keys(SUBJECTS);
  const [subject, setSubject] = useState(subjectNames[0]);
  const [setIndex, _setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [subject]: { [qId]: idxOrValue } }
  const [submitted, setSubmitted] = useState({}); // { [subject]: { [setIndex]: true } }
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({}); // { [subject]: { [qId]: true } }
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem("epfo-dark-mode");
    return saved ? JSON.parse(saved) : false;
  });

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("epfo-dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const questions = SUBJECTS[subject] || [];
  const SETS = useMemo(() => chunk(questions, 15), [questions]);

  // Guard against out-of-range indexes (fixes undefined currentSet.map error)
  const safeSetIndex = Math.min(
    Math.max(setIndex, 0),
    Math.max(SETS.length - 1, 0)
  );
  const currentSet = SETS[safeSetIndex] || [];

  useEffect(() => {
    // If subject changes and previous index is out of range, reset to 0
    if (safeSetIndex !== setIndex) _setIndex(safeSetIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, SETS.length]);

  const isSubmitted =
    (submitted[subject] && submitted[subject][safeSetIndex]) || false;

  function handleSubjectChange(e) {
    const next = e.target.value;
    setSubject(next);
    _setIndex(0);
  }

  function markAnswer(qId, val) {
    setAnswers((prev) => ({
      ...prev,
      [subject]: { ...(prev[subject] || {}), [qId]: val },
    }));
  }

  function submitSet() {
    // Bookmark wrong answers
    const wrongAnswers = {};
    currentSet.forEach((q) => {
      const userAnswer = (answers[subject] || {})[q.id];
      const isCorrect = userAnswer === q.correct;
      if (userAnswer !== undefined && !isCorrect) {
        wrongAnswers[q.id] = true;
      }
    });

    // Update bookmarked questions
    if (Object.keys(wrongAnswers).length > 0) {
      setBookmarkedQuestions((prev) => ({
        ...prev,
        [subject]: { ...(prev[subject] || {}), ...wrongAnswers },
      }));
    }

    setSubmitted((prev) => ({
      ...prev,
      [subject]: { ...(prev[subject] || {}), [safeSetIndex]: true },
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetSet() {
    // clear answers only for the questions in the current set for current subject
    setAnswers((prev) => {
      const subj = { ...(prev[subject] || {}) };
      currentSet.forEach((q) => delete subj[q.id]);
      return { ...prev, [subject]: subj };
    });
    setSubmitted((prev) => ({
      ...prev,
      [subject]: { ...(prev[subject] || {}), [safeSetIndex]: false },
    }));
  }

  function toggleBookmark(questionId) {
    setBookmarkedQuestions((prev) => {
      const currentBookmarks = prev[subject] || {};
      const isBookmarked = currentBookmarks[questionId];

      return {
        ...prev,
        [subject]: {
          ...currentBookmarks,
          [questionId]: !isBookmarked,
        },
      };
    });
  }

  function generateAnalysisData() {
    const analysisData = [];

    currentSet.forEach((q, index) => {
      const userAnswer = (answers[subject] || {})[q.id];
      const isCorrect = userAnswer === q.answer;
      const questionNumber = safeSetIndex * 15 + index + 1;

      // Get the text of user's selected option
      let userAnswerText = "Not attempted";
      let correctAnswerText = "";

      if (q.type === "mcq" || !q.type) {
        if (userAnswer !== undefined) {
          userAnswerText = q.options[userAnswer] || "Invalid selection";
        }
        correctAnswerText = q.options[q.answer] || "Not available";
      } else if (q.type === "fill") {
        userAnswerText = userAnswer || "Not attempted";
        correctAnswerText = q.answer;
      }

      analysisData.push({
        questionNumber,
        question: q.text,
        type: q.type || "mcq",
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect,
        subject,
        setNumber: safeSetIndex + 1,
        isBookmarked: (bookmarkedQuestions[subject] || {})[q.id] || false,
        options: q.options || [],
        explanation: q.explanation || "No explanation available",
        timestamp: new Date().toISOString(),
      });
    });

    return analysisData;
  }

  function downloadCSV() {
    const data = generateAnalysisData();
    console.log("CSV Data:", data); // Debug log
    const headers = [
      "Question Number",
      "Question",
      "Type",
      "Option A",
      "Option B",
      "Option C",
      "Option D",
      "Your Answer",
      "Correct Answer",
      "Result",
      "Subject",
      "Set Number",
      "Bookmarked",
      "Explanation",
    ];

    const csvContent = [
      headers.join(","),
      ...data.map((row) => {
        console.log("Row options:", row.options); // Debug log
        return [
          row.questionNumber,
          `"${row.question.replace(/"/g, '""')}"`,
          row.type,
          `"${(row.options[0] || "").replace(/"/g, '""')}"`,
          `"${(row.options[1] || "").replace(/"/g, '""')}"`,
          `"${(row.options[2] || "").replace(/"/g, '""')}"`,
          `"${(row.options[3] || "").replace(/"/g, '""')}"`,
          `"${row.userAnswer.replace(/"/g, '""')}"`,
          `"${row.correctAnswer.replace(/"/g, '""')}"`,
          row.isCorrect ? "Correct" : "Wrong",
          row.subject,
          row.setNumber,
          row.isBookmarked ? "Yes" : "No",
          `"${row.explanation.replace(/"/g, '""')}"`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `EPFO_${subject}_Set${safeSetIndex + 1}_Analysis_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  function scoreCurrentSet() {
    let s = 0;
    for (const q of currentSet) {
      const given = (answers[subject] || {})[q.id];
      if (q.type === "mcq" || !q.type) {
        if (given === q.answer) s++;
      } else if (q.type === "fill") {
        if (given === q.answer) s++;
      }
    }
    return s;
  }

  const totalSets = Math.max(SETS.length, 1);
  const totalAnsweredInSet = currentSet.filter(
    (q) => (answers[subject] || {})[q.id] !== undefined
  ).length;

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto shadow-lg rounded-2xl overflow-hidden transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header with subject badge */}
        <header
          className={`p-6 text-white bg-gradient-to-r ${
            SUBJECT_COLORS[subject] || "from-slate-700 to-slate-500"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                UPSC EPFO — Mock Test Platform
              </h1>
              <p className="mt-1 text-sm md:text-base opacity-95">
                Subject-wise sets of 15 questions. Submit each set to view
                answers and score.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center gap-2"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="text-lg">{isDarkMode ? "☀️" : "🌙"}</span>
                <span className="hidden sm:inline text-sm">
                  {isDarkMode ? "Light" : "Dark"}
                </span>
              </button>
              <span className="px-3 py-1 rounded-full bg-white/20 font-semibold">
                Current: <span className="underline">{subject}</span>
              </span>
              <select
                value={subject}
                onChange={handleSubjectChange}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 border border-gray-600"
                    : "bg-white text-gray-800 border border-gray-300"
                }`}
              >
                {subjectNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left — Sets & Questions */}
          <section className="md:col-span-3">
            {/* Set Switcher */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {[...Array(totalSets)].map((_, i) => {
                const isActive = i === safeSetIndex;
                const answeredCount = (SETS[i] || []).filter(
                  (q) => (answers[subject] || {})[q.id] !== undefined
                ).length;
                return (
                  <button
                    key={i}
                    onClick={() => _setIndex(i)}
                    className={`px-3 py-2 rounded-full border text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                        : "bg-gray-50 text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Set {i + 1}{" "}
                    <span className="ml-2 text-xs opacity-75">
                      {answeredCount}/{(SETS[i] || []).length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Summary Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div
                className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Questions in this set: <strong>{currentSet.length}</strong> |
                Answered: <strong>{totalAnsweredInSet}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetSet}
                  className={`px-3 py-2 rounded border transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Reset Set
                </button>
              </div>
            </div>

            {/* QUESTIONS (15 per set) */}
            <div className="space-y-5">
              {currentSet.map((q, qi) => {
                const given = (answers[subject] || {})[q.id];
                const isCorrect =
                  q.type === "mcq" || !q.type
                    ? given === q.answer
                    : given === q.answer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border transition-colors duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div
                      className={`mb-3 font-medium flex items-center justify-between transition-colors duration-200 ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      <span>
                        {safeSetIndex * 15 + qi + 1}. {q.text}
                      </span>
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`ml-2 p-1 rounded transition-colors ${
                          (bookmarkedQuestions[subject] || {})[q.id]
                            ? "text-yellow-600 hover:text-yellow-700"
                            : "text-gray-400 hover:text-yellow-500"
                        }`}
                        title={
                          (bookmarkedQuestions[subject] || {})[q.id]
                            ? "Remove bookmark"
                            : "Add bookmark"
                        }
                      >
                        {(bookmarkedQuestions[subject] || {})[q.id] ? "★" : "☆"}
                      </button>
                    </div>

                    {/* Options */}
                    {(q.type === "mcq" || !q.type) && (
                      <div className="space-y-3">
                        {q.options.map((opt, i) => {
                          const selected = given === i;
                          const isRight = i === q.answer;
                          const wrongSelected =
                            isSubmitted && selected && !isRight;
                          const correctOption = isSubmitted && isRight;

                          return (
                            <label
                              key={i}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors duration-200 ${
                                wrongSelected
                                  ? "bg-red-50 border-red-300"
                                  : correctOption
                                  ? "bg-green-50 border-green-300"
                                  : selected
                                  ? isDarkMode
                                    ? "bg-indigo-900 border-indigo-700"
                                    : "bg-indigo-50 border-indigo-300"
                                  : isDarkMode
                                  ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                                  : "bg-white border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q-${subject}-${q.id}`}
                                checked={selected || false}
                                onChange={() => markAnswer(q.id, i)}
                                disabled={false}
                              />
                              <span
                                className={`transition-colors duration-200 ${
                                  wrongSelected
                                    ? "text-red-700 font-medium"
                                    : correctOption
                                    ? "text-green-700 font-medium"
                                    : selected
                                    ? isDarkMode
                                      ? "text-indigo-200 font-medium"
                                      : "text-indigo-700 font-medium"
                                    : isDarkMode
                                    ? "text-gray-200"
                                    : "text-gray-800"
                                }`}
                              >
                                {opt}
                              </span>
                              {isSubmitted && isRight && (
                                <span className="ml-auto text-green-600 font-bold">
                                  ✓
                                </span>
                              )}
                              {wrongSelected && (
                                <span className="ml-auto text-red-600 font-bold">
                                  ❌
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {q.type === "fill" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {q.options.map((opt, i) => {
                          const selected = given === opt;
                          const isRight = opt === q.answer;
                          const wrongSelected =
                            isSubmitted && selected && !isRight;
                          const correctOption = isSubmitted && isRight;

                          return (
                            <button
                              key={i}
                              onClick={() => markAnswer(q.id, opt)}
                              className={`p-3 rounded-lg border text-left transition-colors duration-200 ${
                                wrongSelected
                                  ? "bg-red-50 border-red-300 text-red-700 font-medium"
                                  : correctOption
                                  ? "bg-green-50 border-green-300 text-green-700 font-medium"
                                  : selected
                                  ? isDarkMode
                                    ? "bg-indigo-900 border-indigo-700 text-indigo-200 font-medium"
                                    : "bg-indigo-50 border-indigo-300 text-indigo-700 font-medium"
                                  : isDarkMode
                                  ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                                  : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                              }`}
                            >
                              {opt}
                              {isSubmitted && isRight && (
                                <span className="ml-2 text-green-600 font-bold">
                                  ✓
                                </span>
                              )}
                              {wrongSelected && (
                                <span className="ml-2 text-red-600 font-bold">
                                  ❌
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Feedback after submit */}
                    {isSubmitted && (
                      <div
                        className={`mt-3 p-3 rounded border text-sm transition-colors duration-200 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-gray-200"
                            : "bg-white border-gray-200 text-gray-800"
                        }`}
                      >
                        <div>
                          <strong>Correct Answer:</strong>{" "}
                          {q.type === "mcq" ? q.options[q.answer] : q.answer}
                        </div>
                        <div className="mt-1">
                          <strong>Your Answer:</strong>{" "}
                          {given === undefined ? (
                            <em
                              className={`transition-colors duration-200 ${
                                isDarkMode ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              Not answered
                            </em>
                          ) : q.type === "mcq" ? (
                            q.options[given]
                          ) : (
                            given
                          )}
                        </div>
                        {given !== undefined && (
                          <div
                            className={`mt-1 font-medium ${
                              isCorrect ? "text-green-700" : "text-red-600"
                            }`}
                          >
                            {isCorrect ? "Correct" : "Incorrect"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Empty-set message */}
              {currentSet.length === 0 && (
                <div
                  className={`p-6 rounded-lg border transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-yellow-900 border-yellow-700 text-yellow-200"
                      : "bg-yellow-50 border-yellow-200 text-yellow-900"
                  }`}
                >
                  No questions in this subject yet. Choose another subject from
                  the dropdown.
                </div>
              )}
            </div>

            {/* Submit Button at the end of questions */}
            {currentSet.length > 0 && !isSubmitted && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={submitSet}
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                  Submit Set
                </button>
              </div>
            )}

            {/* Result Card */}
            {isSubmitted && (
              <div
                className={`mt-6 p-4 rounded-lg border transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-green-900 to-gray-800 border-gray-600"
                    : "bg-gradient-to-r from-green-50 to-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Set Result
                </h3>
                <p
                  className={`mt-1 transition-colors duration-200 ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Score: <strong>{scoreCurrentSet()}</strong> /{" "}
                  {currentSet.length}
                </p>
                <p
                  className={`text-sm mb-4 transition-colors duration-200 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Review the answers above. You can switch sets anytime using
                  the buttons at the top.
                </p>

                {/* Export Analysis Buttons */}
                <div
                  className={`border-t pt-4 transition-colors duration-200 ${
                    isDarkMode ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <h4
                    className={`font-medium mb-3 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    📊 Export Analysis
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={downloadCSV}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      📁 Export CSV
                    </button>
                  </div>
                  <p
                    className={`text-xs mt-2 transition-colors duration-200 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Download detailed CSV analysis with all options,
                    correct/wrong answers, and explanations for study review
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Right — Panel */}
          <aside className="md:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4
                  className={`font-medium transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Set Navigation
                </h4>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[...Array(totalSets)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => _setIndex(i)}
                      className={`text-xs p-2 rounded transition-colors duration-200 ${
                        i === safeSetIndex
                          ? "bg-indigo-600 text-white"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div
                  className={`mt-3 text-sm transition-colors duration-200 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Sets: <strong>{totalSets}</strong>
                </div>
              </div>

              {/* Bookmarked Questions */}
              {Object.keys(bookmarkedQuestions[subject] || {}).length > 0 && (
                <div
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h4 className="font-medium text-yellow-700">
                    ★ Bookmarked Questions
                  </h4>
                  <div
                    className={`mt-3 text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <p className="mb-2">
                      Questions you got wrong (auto-bookmarked):
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(bookmarkedQuestions[subject] || {})
                        .filter((qId) => bookmarkedQuestions[subject][qId])
                        .map((qId) => {
                          const questionIndex = questions.findIndex(
                            (q) => q.id.toString() === qId
                          );
                          return (
                            <span
                              key={qId}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded"
                            >
                              Q{questionIndex + 1}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`p-4 rounded-lg border text-sm transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4
                  className={`font-medium transition-colors duration-200 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Tips
                </h4>
                <ul
                  className={`mt-2 list-disc pl-4 transition-colors duration-200 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <li>Select a subject from the dropdown in the header.</li>
                  <li>
                    Each set has 15 questions with Submit button at the end.
                  </li>
                  <li>
                    Wrong options you selected turn{" "}
                    <span className="text-red-600 font-semibold">red</span>{" "}
                    after submit.
                  </li>
                  <li>
                    Correct options are marked with a{" "}
                    <span className="text-green-700 font-semibold">✓</span>.
                  </li>
                  <li>
                    Wrong answers are automatically bookmarked with{" "}
                    <span className="text-yellow-600 font-semibold">★</span>.
                  </li>
                  <li>Click ☆ next to questions to manually bookmark them.</li>
                  <li>
                    After submission, export CSV for detailed analysis with all
                    options and explanations.
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </main>

        <footer
          className={`p-4 text-center text-sm transition-colors duration-200 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Phrasal Verbs subject contains all 90 questions • Designed for UPSC
          EPFO practice.
        </footer>
      </div>
    </div>
  );
}
