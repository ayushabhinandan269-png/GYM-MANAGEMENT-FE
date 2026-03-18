import { useEffect, useState } from "react";
import { getMemberProfile, updateMemberProfile } from "../../api/memberAPI";

interface Member {
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
}

const Profile = () => {

  const [member, setMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Member | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    const loadProfile = async () => {

      const res = await getMemberProfile();

      setMember(res.data);
      setFormData(res.data);

    };

    loadProfile();

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!formData) return;

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value
    });

  };

  const handleSave = async () => {

    if (!formData) return;

    const res = await updateMemberProfile(formData);

    setMember(res.data);
    setFormData(res.data);
    setEditing(false);

  };

  const handleCancel = () => {

    setFormData(member);
    setEditing(false);

  };

  if (!formData) return <div className="p-6">Loading...</div>;

  return (

    <div className="p-8 bg-gray-100 min-h-screen flex justify-center">

      <div className="bg-white shadow rounded-xl p-8 w-full max-w-xl">

        {/* PROFILE HEADER */}

        <div className="flex flex-col items-center mb-6">

          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white">
            {formData.name?.charAt(0)}
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            {formData.name}
          </h2>

          <p className="text-gray-500">
            {formData.email}
          </p>

        </div>


        {/* FORM */}

        <div className="space-y-4">

          {/* PHONE */}

          <div>

            <label className="text-gray-500 text-sm">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 mt-1 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />

          </div>


          {/* AGE */}

          <div>

            <label className="text-gray-500 text-sm">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 mt-1 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />

          </div>


          {/* GENDER */}

          <div>

            <label className="text-gray-500 text-sm">
              Gender
            </label>

            <input
              type="text"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded p-2 mt-1 ${
                editing ? "bg-white" : "bg-gray-100"
              }`}
            />

          </div>

        </div>


        {/* BUTTONS */}

        {!editing ? (

          <button
            onClick={() => setEditing(true)}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>

        ) : (

          <div className="flex gap-4 mt-6">

            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default Profile;