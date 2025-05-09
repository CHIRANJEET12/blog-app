// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// interface ProfileProps {
//   name: string;
//   age: number;
//   email: string;
//   image: string;
//   bio: string;
//   location: string;
//   website?: string;
//   twitter?: string;
//   github?: string;
//   linkedin?: string;
//   facebook?: string;
//   instagram?: string;
//   portfolio?: string;
//   resume?: string;
//   created_at: string;
// }

// export const GetProfile = () => {
//   const { id } = useParams(); // Get the profile ID from the URL
//   const [profileData, setProfileData] = useState<ProfileProps | null>(null); // State to store the profile data
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch the profile data when the component mounts
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/profile/${id}`);
//         setProfileData(response.data); // Set the fetched profile data
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   // If the profile data is still loading, display a loading message
//   if (loading) {
//     return <div>Loading profile...</div>;
//   }

//   // If no profile data is found
//   if (!profileData) {
//     return <div>Profile not found.</div>;
//   }

//   return (
//     <div>
//       <h1>{profileData.name}'s Profile</h1>
//       <div>
//         <img src={profileData.image} alt={`${profileData.name}'s profile`} width="150" height="150" />
//       </div>
//       <p><strong>Age:</strong> {profileData.age}</p>
//       <p><strong>Email:</strong> {profileData.email}</p>
//       <p><strong>Bio:</strong> {profileData.bio}</p>
//       <p><strong>Location:</strong> {profileData.location}</p>
      
//       {/* Conditionally render links if they exist */}
//       {profileData.website && (
//         <p><strong>Website:</strong> <a href={profileData.website} target="_blank" rel="noopener noreferrer">{profileData.website}</a></p>
//       )}
//       {profileData.twitter && (
//         <p><strong>Twitter:</strong> <a href={profileData.twitter} target="_blank" rel="noopener noreferrer">{profileData.twitter}</a></p>
//       )}
//       {profileData.github && (
//         <p><strong>GitHub:</strong> <a href={profileData.github} target="_blank" rel="noopener noreferrer">{profileData.github}</a></p>
//       )}
//       {profileData.linkedin && (
//         <p><strong>LinkedIn:</strong> <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">{profileData.linkedin}</a></p>
//       )}
//       {profileData.facebook && (
//         <p><strong>Facebook:</strong> <a href={profileData.facebook} target="_blank" rel="noopener noreferrer">{profileData.facebook}</a></p>
//       )}
//       {profileData.instagram && (
//         <p><strong>Instagram:</strong> <a href={profileData.instagram} target="_blank" rel="noopener noreferrer">{profileData.instagram}</a></p>
//       )}
//       {profileData.portfolio && (
//         <p><strong>Portfolio:</strong> <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer">{profileData.portfolio}</a></p>
//       )}
//       {profileData.resume && (
//         <p><strong>Resume:</strong> <a href={profileData.resume} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
//       )}
      
//       <p><strong>Joined on:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
//     </div>
//   );
// };
