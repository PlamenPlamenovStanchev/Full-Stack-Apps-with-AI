import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import './LinktreeProfileAvatar.css';

export interface Profile {
  name: string;
  bio: string;
  picture: string;
}

interface LinktreeProfileAvatarProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

const LinktreeProfileAvatar: React.FC<LinktreeProfileAvatarProps> = ({
  profile,
  onProfileUpdate,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  const handleStartEdit = (): void => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = (): void => {
    onProfileUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({
          ...editedProfile,
          picture: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string): void => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  if (isEditing) {
    return (
      <div className="profile-avatar profile-avatar-edit">
        <div className="edit-form">
          <div className="image-input-group">
            <img
              src={editedProfile.picture || 'https://via.placeholder.com/120'}
              alt="Profile"
              className="profile-picture-edit"
            />
            <label className="image-upload-label">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </label>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="form-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={editedProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="form-textarea"
              placeholder="Enter your bio"
              rows={3}
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">
              <AiOutlineCheck /> Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              <AiOutlineClose /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-avatar">
      <img
        src={profile.picture || 'https://via.placeholder.com/120'}
        alt={profile.name}
        className="profile-picture"
      />
      <h1 className="profile-name">{profile.name}</h1>
      <p className="profile-bio">{profile.bio}</p>
      <button
        onClick={handleStartEdit}
        className="edit-button"
        title="Edit Profile"
      >
        <AiOutlineEdit />
      </button>
    </div>
  );
};

export default LinktreeProfileAvatar;
