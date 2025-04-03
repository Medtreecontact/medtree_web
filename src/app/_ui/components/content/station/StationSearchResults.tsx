// import { SearchResult } from "@/entities/models/search_result";
// import Link from "next/link";
// import { FaLock } from "react-icons/fa";

// export default function StationSearchResultList({ 
//     searchResults,
//     paidUser
// }: { 
//     searchResults: SearchResult[],
//     paidUser: boolean
// }) {
//     if (searchResults.length === 0) {
//         return (
//             <div className="text-center py-10">
//                 <p className="text-gray-500">No stations found</p>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full max-w-4xl">
//             <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <ul className="divide-y divide-gray-200">
//                     {searchResults.map(result => {
//                         const isLocked = result.isPremium && !paidUser;
                        
//                         return (
//                             <li key={result.id} className="p-4">
//                                 <Link href={isLocked ? "#" : `/station/${result.id}`} className="flex items-center justify-between">
//                                     <div>
//                                         <h3 className="font-medium">{result.title}</h3>
//                                         <div className="mt-1 flex flex-wrap gap-1">
//                                             {result.tags.map((tag, index) => (
//                                                 <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
//                                                     {tag}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     {isLocked && <FaLock className="text-gray-400" />}
//                                 </Link>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//         </div>
//     );
// }