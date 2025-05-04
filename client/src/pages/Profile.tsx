import React, { useState } from 'react';

interface ProfileProps {
    name: string;
    age: number;
    email: string;
    image: string;
    bio: string;
    location: string;
    website: string;
    twitter: string;
    github: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    portfolio: string;
    resume: string;
}

export const Profile = () => {
    const [show, setShow] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        image: "https://i.pravatar.cc/40?img=1",
        bio: "Software Engineer with 5 years of experience in web development.",
        location: "New York, USA",
        website: "",
        twitter: "",
        github: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        portfolio: "",
        resume: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const edit = () => {
        setShow(!show);
        console.log("Edit profile clicked");
    };

    const saveChanges = () => {
        setShow(false);
        console.log("Changes saved");
    };

    return (
        <div>
            <h1 className="text-3xl font-light mt-4">Profile Setup</h1>
            <div className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md">
                <img
                    src={profileData.image}
                    alt="Profile"
                    className="rounded-full w-32 h-32 mr-4"
                />
                <button onClick={edit} className="bg-black text-white px-4 py-2 rounded">
                    {show ? "Cancel" : "Edit"}
                </button>
                <div className="flex flex-col ml-4">
                    {show ? (
                        // Editable form when show is true
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                name="age"
                                value={profileData.age}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="bio"
                                value={profileData.bio}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="website"
                                value={profileData.website}
                                onChange={handleInputChange}
                                placeholder="Website URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="twitter"
                                value={profileData.twitter}
                                onChange={handleInputChange}
                                placeholder="Twitter URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="github"
                                value={profileData.github}
                                onChange={handleInputChange}
                                placeholder="GitHub URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="linkedin"
                                value={profileData.linkedin}
                                onChange={handleInputChange}
                                placeholder="LinkedIn URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="facebook"
                                value={profileData.facebook}
                                onChange={handleInputChange}
                                placeholder="Facebook URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="instagram"
                                value={profileData.instagram}
                                onChange={handleInputChange}
                                placeholder="Instagram URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="portfolio"
                                value={profileData.portfolio}
                                onChange={handleInputChange}
                                placeholder="Portfolio URL"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="resume"
                                value={profileData.resume}
                                onChange={handleInputChange}
                                placeholder="Resume URL"
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={saveChanges}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">{profileData.name}</h2>
                            <p className="text-gray-600">Age: {profileData.age}</p>
                            <p className="text-gray-600">Email: {profileData.email}</p>
                            <p className="text-gray-600">Location: {profileData.location}</p>
                            <p className="text-gray-600">Bio: {profileData.bio}</p>
                            <div className="flex space-x-4 mt-2">
                                <a href={profileData.website} className="text-blue-500 hover:underline">Website</a>
                                <a href={profileData.twitter} className="text-blue-500 hover:underline">Twitter</a>
                                <a href={profileData.github} className="text-blue-500 hover:underline">GitHub</a>
                                <a href={profileData.linkedin} className="text-blue-500 hover:underline">LinkedIn</a>
                                <a href={profileData.facebook} className="text-blue-500 hover:underline">Facebook</a>
                                <a href={profileData.instagram} className="text-blue-500 hover:underline">Instagram</a>
                                <a href={profileData.portfolio} className="text-blue-500 hover:underline">Portfolio</a>
                                <a href={profileData.resume} className="text-blue-500 hover:underline">Resume</a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
