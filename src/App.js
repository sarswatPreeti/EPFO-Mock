import React, { useEffect, useState } from "react";
import "./index.css";

// // UPSC EPFO - Phrasal Verbs Mock Test (90 questions in sets of 15)
// // Fixed: guard against invalid setIndex and ensure currentSet is always an array

// const QUESTIONS = [
//   // Section A - MCQs (40)
//   { id: 1, text: "The car suddenly broke down on the highway. Here, 'broke down' means:", type: "mcq", options: ["To repair quickly","To stop functioning","To slow down","To start suddenly"], answer: 1 },
//   { id: 2, text: "She couldn’t control her emotions and finally broke down.", type: "mcq", options: ["To faint","To lose emotional control","To laugh loudly","To escape"], answer: 1 },
//   { id: 3, text: "The thieves broke into the house last night.", type: "mcq", options: ["To decorate","To enter by force","To lock from outside","To investigate"], answer: 1 },
//   { id: 4, text: "World War II broke out in 1939.", type: "mcq", options: ["To end","To start suddenly","To collapse","To prevent"], answer: 1 },
//   { id: 5, text: "The prisoners managed to break out of jail.", type: "mcq", options: ["To escape","To argue","To fight","To break a machine"], answer: 0 },
//   { id: 6, text: "Scientists broke through in their search for a cure.", type: "mcq", options: ["Failed","Overcame an obstacle","Escaped","Collapsed"], answer: 1 },
//   { id: 7, text: "The couple decided to break up after years of quarrels.", type: "mcq", options: ["To reconcile","To end a relationship","To celebrate","To succeed"], answer: 1 },
//   { id: 8, text: "The police used force to break up the protest.", type: "mcq", options: ["To organize","To disperse","To lead","To encourage"], answer: 1 },
//   { id: 9, text: "The new policy will bring about major changes.", type: "mcq", options: ["Cancel","Cause to happen","Avoid","Suppress"], answer: 1 },
//   { id: 10, text: "The company will soon bring out a new smartphone.", type: "mcq", options: ["Hide","Publish or release","Destroy","Abolish"], answer: 1 },
//   { id: 11, text: "Stress can bring out the worst in people.", type: "mcq", options: ["Reveal","Cure","Suppress","Hide"], answer: 0 },
//   { id: 12, text: "She was brought up by her grandparents.", type: "mcq", options: ["Raised","Ignored","Adopted","Taught in school"], answer: 0 },
//   { id: 13, text: "He brought up an important issue during the meeting.", type: "mcq", options: ["Deleted","Introduced","Postponed","Rejected"], answer: 1 },
//   { id: 14, text: "The match was called off due to heavy rain.", type: "mcq", options: ["Postponed","Canceled","Extended","Replayed"], answer: 1 },
//   { id: 15, text: "The situation calls for immediate action.", type: "mcq", options: ["Avoids","Demands","Postpones","Rejects"], answer: 1 },
//   { id: 16, text: "The teacher called on me to answer the question.", type: "mcq", options: ["Ignored","Requested","Punished","Praised"], answer: 1 },
//   { id: 17, text: "I accidentally came across an old diary while cleaning.", type: "mcq", options: ["Destroyed","Found by chance","Forgot","Collected"], answer: 1 },
//   { id: 18, text: "No witness has come forward yet.", type: "mcq", options: ["Hidden","Escaped","Volunteered","Ignored"], answer: 2 },
//   { id: 19, text: "His plan didn’t come off as expected.", type: "mcq", options: ["Succeeded","Failed","Escaped","Completed"], answer: 1 },
//   { id: 20, text: "The handle came off the door.", type: "mcq", options: ["Detached","Strengthened","Painted","Created"], answer: 0 },
//   { id: 21, text: "We need to come up with a better strategy.", type: "mcq", options: ["Abandon","Think of","Reject","Copy"], answer: 1 },
//   { id: 22, text: "Do you get along with your colleagues?", type: "mcq", options: ["Argue with","Have a friendly relationship","Ignore","Supervise"], answer: 1 },
//   { id: 23, text: "The thief managed to get away from the police.", type: "mcq", options: ["Escape","Arrest","Hide evidence","Fight"], answer: 0 },
//   { id: 24, text: "She took months to get over her illness.", type: "mcq", options: ["Start","Recover from","Spread","Hide"], answer: 1 },
//   { id: 25, text: "I finally got through to the helpline after waiting for hours.", type: "mcq", options: ["Contacted successfully","Failed","Avoided","Lost"], answer: 0 },
//   { id: 26, text: "The teacher gave away the prizes to the winners.", type: "mcq", options: ["Took back","Distributed freely","Sold","Announced"], answer: 1 },
//   { id: 27, text: "Don’t give away the secret!", type: "mcq", options: ["Hide","Reveal","Forget","Lose"], answer: 1 },
//   { id: 28, text: "The government refused to give in to the demands.", type: "mcq", options: ["Accept","Surrender","Fight","Postpone"], answer: 1 },
//   { id: 29, text: "He finally decided to give up smoking.", type: "mcq", options: ["Start","Continue","Quit","Demand"], answer: 2 },
//   { id: 30, text: "The machine gave out after 10 years of use.", type: "mcq", options: ["Functioned smoothly","Stopped working","Continued","Sold"], answer: 1 },
//   { id: 31, text: "He went to Delhi to go after his dreams.", type: "mcq", options: ["Pursue","Avoid","Forget","Delay"], answer: 0 },
//   { id: 32, text: "She had to go through a lot of difficulties.", type: "mcq", options: ["Celebrate","Experience","Avoid","Cancel"], answer: 1 },
//   { id: 33, text: "Please go on with your presentation.", type: "mcq", options: ["Stop","Continue","Cancel","Postpone"], answer: 1 },
//   { id: 34, text: "Can you look after my dog while I’m away?", type: "mcq", options: ["Sell","Take care of","Ignore","Lose"], answer: 1 },
//   { id: 35, text: "She tends to look down on uneducated people.", type: "mcq", options: ["Respect","Consider inferior","Encourage","Avoid"], answer: 1 },
//   { id: 36, text: "I am looking for my keys.", type: "mcq", options: ["Hiding","Searching","Destroying","Forgetting"], answer: 1 },
//   { id: 37, text: "The police will look into the case.", type: "mcq", options: ["Ignore","Investigate","Cancel","End"], answer: 1 },
//   { id: 38, text: "They decided to put off the meeting until next week.", type: "mcq", options: ["Cancel","Postpone","Start","Finalize"], answer: 1 },
//   { id: 39, text: "The firefighters quickly put out the fire.", type: "mcq", options: ["Start","Extinguish","Spread","Delay"], answer: 1 },
//   { id: 40, text: "I can’t put up with his arrogance anymore.", type: "mcq", options: ["Encourage","Tolerate","Celebrate","Avoid"], answer: 1 },

//   // Section B - Fill in the Blanks (41-65)
//   { id: 41, text: "The plane ______ on time.", type: "fill", options: ["took off","took over","took after"], answer: "took off" },
//   { id: 42, text: "His career really ______ after the award.", type: "fill", options: ["took off","took down","took away"], answer: "took off" },
//   { id: 43, text: "Please ______ your shoes before entering.", type: "fill", options: ["take up","take off","take out"], answer: "take off" },
//   { id: 44, text: "The army ______ the government.", type: "fill", options: ["took over","took after","took down"], answer: "took over" },
//   { id: 45, text: "She ______ her mother in appearance.", type: "fill", options: ["took after","took off","took away"], answer: "took after" },
//   { id: 46, text: "He has ______ gardening as a hobby.", type: "fill", options: ["taken up","taken off","taken down"], answer: "taken up" },
//   { id: 47, text: "The soldiers ______ their orders.", type: "fill", options: ["carried out","carried on","carried off"], answer: "carried out" },
//   { id: 48, text: "The doctor advised him to ______ sugar.", type: "fill", options: ["cut down on","cut off","cut out"], answer: "cut down on" },
//   { id: 49, text: "Our electricity was ______ due to non-payment.", type: "fill", options: ["cut off","cut out","cut down"], answer: "cut off" },
//   { id: 50, text: "The law ______ the old system.", type: "fill", options: ["did away with","did up","did out"], answer: "did away with" },
//   { id: 51, text: "They are ______ their house.", type: "fill", options: ["doing up","doing away with","doing off"], answer: "doing up" },
//   { id: 52, text: "She had to ______ her savings.", type: "fill", options: ["fall back on","fall out","fall through"], answer: "fall back on" },
//   { id: 53, text: "He ______ his friend over money.", type: "fill", options: ["fell out with","fell through","fell down"], answer: "fell out with" },
//   { id: 54, text: "Our vacation plans ______ due to rain.", type: "fill", options: ["fell through","fell back on","fell up"], answer: "fell through" },
//   { id: 55, text: "Please ______ for a minute.", type: "fill", options: ["hold on","hold up","hold out"], answer: "hold on" },
//   { id: 56, text: "The robbers ______ the bank.", type: "fill", options: ["held up","held on","held out"], answer: "held up" },
//   { id: 57, text: "He ______ talking despite objections.", type: "fill", options: ["kept on","kept away","kept up"], answer: "kept on" },
//   { id: 58, text: "It’s hard to ______ the latest trends.", type: "fill", options: ["keep up with","keep on","keep away"], answer: "keep up with" },
//   { id: 59, text: "Please ______ from the edge of the cliff.", type: "fill", options: ["keep away","keep up","keep on"], answer: "keep away" },
//   { id: 60, text: "He promised but ______ his friends.", type: "fill", options: ["let down","let off","let out"], answer: "let down" },
//   { id: 61, text: "The judge ______ the thief with a warning.", type: "fill", options: ["let off","let down","let out"], answer: "let off" },
//   { id: 62, text: "If you don’t know a word, ______ in a dictionary.", type: "fill", options: ["look up","look into","look out"], answer: "look up" },
//   { id: 63, text: "Business is finally ______.", type: "fill", options: ["looking up","looking into","looking out"], answer: "looking up" },
//   { id: 64, text: "She has always ______ her elder sister.", type: "fill", options: ["looked up to","looked after","looked for"], answer: "looked up to" },
//   { id: 65, text: "I can’t ______ his handwriting.", type: "fill", options: ["make out","make up","make over"], answer: "make out" },

//   // Section C - Match the Following (66-75)
//   { id: 66, text: "Pull down:", type: "mcq", options: ["To succeed in something difficult","To demolish","To stop a vehicle","To meet by accident"], answer: 1 },
//   { id: 67, text: "Pull off:", type: "mcq", options: ["To demolish","To succeed in something difficult","To meet by accident","To exhaust supply"], answer: 1 },
//   { id: 68, text: "Pull up:", type: "mcq", options: ["To stop a vehicle","To meet by accident","To exhaust supply","To reject an offer"], answer: 0 },
//   { id: 69, text: "Run into:", type: "mcq", options: ["To demolish","To meet by accident","To stop a vehicle","To exceed time/limit"], answer: 1 },
//   { id: 70, text: "Run out of:", type: "mcq", options: ["To stop a vehicle","To demolish","To exhaust supply","To begin a journey"], answer: 2 },
//   { id: 71, text: "Run over:", type: "mcq", options: ["To exceed time/limit","To save for a purpose","To begin a journey","To establish"], answer: 0 },
//   { id: 72, text: "Set aside:", type: "mcq", options: ["To exceed time/limit","To save for a purpose","To begin a journey","To establish"], answer: 1 },
//   { id: 73, text: "Set off:", type: "mcq", options: ["To save for a purpose","To begin a journey","To establish","To reject an offer"], answer: 1 },
//   { id: 74, text: "Set up:", type: "mcq", options: ["To reject an offer","To begin a journey","To establish","To demolish"], answer: 2 },
//   { id: 75, text: "Turn down:", type: "mcq", options: ["To save for a purpose","To establish","To reject an offer","To stop a vehicle"], answer: 2 },

//   // Section D - Error Spotting & Correction (76-90 as MCQ style: choose correct sentence)
//   { id: 76, text: "Choose the correct sentence:", type: "mcq", options: ["He fall out with his partner.","He fell out with his partner."], answer: 1 },
//   { id: 77, text: "Choose the correct sentence:", type: "mcq", options: ["She did away to the rule.","She did away with the rule."], answer: 1 },
//   { id: 78, text: "Choose the correct sentence:", type: "mcq", options: ["The plane take off late.","The plane took off late."], answer: 1 },
//   { id: 79, text: "Choose the correct sentence:", type: "mcq", options: ["He run into a problem yesterday.","He ran into a problem yesterday."], answer: 1 },
//   { id: 80, text: "Choose the correct sentence:", type: "mcq", options: ["I will set out off early tomorrow.","I will set out early tomorrow."], answer: 1 },
//   { id: 81, text: "Choose the correct sentence:", type: "mcq", options: ["She was bringing up by her aunt.","She was brought up by her aunt."], answer: 1 },
//   { id: 82, text: "Choose the correct sentence:", type: "mcq", options: ["He gave on after repeated failures.","He gave up after repeated failures."], answer: 1 },
//   { id: 83, text: "Choose the correct sentence:", type: "mcq", options: ["The meeting was call off.","The meeting was called off."], answer: 1 },
//   { id: 84, text: "Choose the correct sentence:", type: "mcq", options: ["We have ran out of sugar.","We have run out of sugar."], answer: 1 },
//   { id: 85, text: "Choose the correct sentence:", type: "mcq", options: ["The teacher give out answer sheets yesterday.","The teacher gave out answer sheets yesterday."], answer: 1 },

//   // Add 5 more to make 90 (86-90) — short mixed questions
//   { id: 86, text: "Choose the correct meaning: 'keep up with'", type: "mcq", options: ["To avoid","To move at same rate as","To ignore","To tolerate"], answer: 1 },
//   { id: 87, text: "Choose the correct meaning: 'look forward to'", type: "mcq", options: ["To await eagerly","To investigate","To search","To detest"], answer: 0 },
//   { id: 88, text: "Choose the correct meaning: 'put out' (fire)", type: "mcq", options: ["To start","To extinguish","To publish","To tolerate"], answer: 1 },
//   { id: 89, text: "Choose the correct meaning: 'give away' (secret)", type: "mcq", options: ["To distribute for free","To reveal","To sell","To hide"], answer: 1 },
//   { id: 90, text: "Choose the correct meaning: 'turn up'", type: "mcq", options: ["To arrive or appear","To reject","To demolish","To investigate"], answer: 0 },
// ];

// const SET_SIZE = 15;
// const SETS = Array.from({ length: Math.max(1, Math.ceil(QUESTIONS.length / SET_SIZE)) }, (_, i) => {
//   const start = i * SET_SIZE;
//   return QUESTIONS.slice(start, start + SET_SIZE);
// });

// export default function App() {
//   const [setIndex, setSetIndex] = useState(0);
//   const [answers, setAnswers] = useState(() => ({}));
//   const [submittedSets, setSubmittedSets] = useState({});

//   // Ensure setIndex is always within bounds
//   useEffect(() => {
//     if (SETS.length === 0) return;
//     if (setIndex < 0) setSetIndex(0);
//     else if (setIndex >= SETS.length) setSetIndex(SETS.length - 1);
//     // we intentionally don't include setIndex in deps to avoid infinite loop — handled by React state update
//     // but include SETS.length so effect reruns if questions change
//   }, [SETS.length]);

//   // Safe currentSet fallback to an empty array to avoid runtime errors
//   const currentSet = SETS[setIndex] || [];

//   function selectOption(qId, optIndexOrValue) {
//     setAnswers(prev => ({ ...prev, [qId]: optIndexOrValue }));
//   }

//   function submitSet() {
//     setSubmittedSets(prev => ({ ...prev, [setIndex]: true }));
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   function score(setIdx) {
//     const set = SETS[setIdx];
//     if (!set || !Array.isArray(set)) return 0;
//     let s = 0;
//     set.forEach(q => {
//       const given = answers[q.id];
//       if (q.type === "mcq") {
//         if (given === q.answer) s++;
//       } else if (q.type === "fill") {
//         if (given === q.answer) s++;
//       }
//     });
//     return s;
//   }

//   function exportResults() {
//     const payload = { answers, submittedSets, scores: SETS.map((_, i) => score(i)), totalQuestions: QUESTIONS.length, timestamp: new Date().toISOString() };
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
//     const a = document.createElement('a');
//     a.href = dataStr;
//     a.download = 'epfo_phrasal_verbs_results.json';
//     a.click();
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
//         <header className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
//           <h1 className="text-2xl md:text-3xl font-semibold">UPSC EPFO — Phrasal Verbs Mock Test</h1>
//           <p className="mt-1 text-sm md:text-base opacity-90">90 Questions divided into sets of {SET_SIZE}</p>
//         </header>

//         <div className="p-4 flex gap-2 flex-wrap">
//           {SETS.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setSetIndex(i)}
//               className={`px-4 py-2 rounded ${setIndex === i ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
//               Set {i + 1}
//             </button>
//           ))}
//         </div>

//         <main className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
//           <section className="md:col-span-3 space-y-6">
//             {currentSet.length === 0 ? (
//               <div className="p-6 rounded border bg-yellow-50">No questions available for this set.</div>
//             ) : (
//               currentSet.map((q) => (
//                 <div key={q.id} className="p-4 rounded-lg border bg-gray-50">
//                   <div className="mb-3 text-gray-800 font-medium">Q{q.id}. {q.text}</div>

//                   <div className="space-y-3">
//                     {q.type === 'mcq' && q.options.map((opt, i) => (
//                       <label key={i} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${answers[q.id] === i ? 'bg-indigo-50 border-indigo-200' : 'bg-white'}`}>
//                         <input type="radio" name={`q-${q.id}`} checked={answers[q.id] === i} onChange={() => selectOption(q.id, i)} />
//                         <span>{opt}</span>
//                         {submittedSets[setIndex] && q.answer === i && <span className="ml-auto text-green-600">✔</span>}
//                       </label>
//                     ))}

//                     {q.type === 'fill' && (
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                         {q.options.map((opt, i) => (
//                           <button key={i} onClick={() => selectOption(q.id, opt)} className={`p-3 rounded-lg border ${answers[q.id] === opt ? 'bg-indigo-50 border-indigo-200' : 'bg-white'}`}>
//                             {opt}
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   </div>

//                   {submittedSets[setIndex] && (
//                     <div className="mt-2 text-sm">
//                       <div><strong>Correct:</strong> {q.type === 'mcq' ? q.options[q.answer] : q.answer}</div>
//                       <div><strong>Your Answer:</strong> {answers[q.id] !== undefined ? (q.type === 'mcq' ? (typeof answers[q.id] === 'number' ? q.options[answers[q.id]] : answers[q.id]) : answers[q.id]) : 'Not answered'}</div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}

//             <div className="mt-4 flex justify-end">
//               {!submittedSets[setIndex] ? (
//                 <button onClick={submitSet} className="px-6 py-2 bg-indigo-600 text-white rounded">Submit Set {setIndex + 1}</button>
//               ) : (
//                 <div className="p-3 bg-green-50 border rounded">Score for Set {setIndex + 1}: <strong>{score(setIndex)}</strong> / {currentSet.length}</div>
//               )}
//             </div>

//           </section>

//           <aside className="md:col-span-1">
//             <div className="sticky top-6 p-4 bg-white border rounded space-y-3">
//               <h4 className="font-medium">Set Navigation</h4>
//               {SETS.map((_, i) => (
//                 <button key={i} onClick={() => setSetIndex(i)} className={`block w-full text-left px-3 py-2 rounded ${setIndex === i ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>
//                   Set {i + 1} {submittedSets[i] && <span className="ml-2 text-green-600">✔</span>}
//                 </button>
//               ))}

//               <div className="pt-3 border-t mt-3">
//                 <button onClick={exportResults} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">Export Results (JSON)</button>
//               </div>

//               <div className="pt-3 text-sm text-gray-600">
//                 <p><strong>Answered:</strong> {Object.keys(answers).length} / {QUESTIONS.length}</p>
//                 <p className="mt-2">Tip: Each set has its own submit button. Submit sets separately to get per-set scores.</p>
//               </div>
//             </div>
//           </aside>
//         </main>

//         <footer className="p-4 text-center text-sm text-gray-500">Designed for practice — UPSC EPFO style | All questions based on provided phrasal verbs list.</footer>
//       </div>
//     </div>
//   );
// }

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-indigo-600">Hello Tailwind!</h1>
    </div>
  );
}