import React, { useState } from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaSpotify,
  FaTwitch,
  FaPinterest,
  FaReddit,
  FaSnapchat,
} from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose, AiOutlineLink } from 'react-icons/ai';
import './LinktreeButton.css';

export type IconName =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'twitter'
  | 'x'
  | 'linkedin'
  | 'github'
  | 'discord'
  | 'spotify'
  | 'twitch'
  | 'pinterest'
  | 'reddit'
  | 'snapchat'
  | 'link';

export interface Link {
  url: string;
  title: string;
  label: string;
  icon: IconName;
}

interface LinktreeButtonProps {
  link: Link;
  onUpdate: (index: number, link: Link) => void;
  onDelete: (index: number) => void;
  index: number;
}

const ICON_MAP: Record<IconName, React.ComponentType<any>> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  twitter: FaTwitter,
  x: FaTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  discord: FaDiscord,
  spotify: FaSpotify,
  twitch: FaTwitch,
  pinterest: FaPinterest,
  reddit: FaReddit,
  snapchat: FaSnapchat,
  link: AiOutlineLink,
};

const ICON_OPTIONS: IconName[] = [
  'instagram',
  'facebook',
  'youtube',
  'tiktok',
  'twitter',
  'x',
  'linkedin',
  'github',
  'discord',
  'spotify',
  'twitch',
  'pinterest',
  'reddit',
  'snapchat',
  'link',
];

const LinktreeButton: React.FC<LinktreeButtonProps> = ({
  link,
  onUpdate,
  onDelete,
  index,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedLink, setEditedLink] = useState<Link>(link);
  const [error, setError] = useState<string>('');

  const IconComponent = ICON_MAP[editedLink.icon] || AiOutlineLink;

  const handleStartEdit = (): void => {
    setIsEditing(true);
    setError('');
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = (): void => {
    if (!editedLink.url || !editedLink.title || !editedLink.label) {
      setError('All fields are required');
      return;
    }

    if (!validateUrl(editedLink.url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onUpdate(index, editedLink);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = (): void => {
    setIsEditing(false);
    setEditedLink(link);
    setError('');
  };

  const handleInputChange = (field: keyof Link, value: string): void => {
    if (field === 'icon') {
      setEditedLink({ ...editedLink, [field]: value as IconName });
    } else {
      setEditedLink({ ...editedLink, [field]: value });
    }
    setError('');
  };

  if (isEditing) {
    return (
      <div className="linktree-button-edit">
        <div className="edit-form-link">
          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={editedLink.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="form-input"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editedLink.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="form-input"
              placeholder="Link title"
            />
          </div>

          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={editedLink.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              className="form-input"
              placeholder="e.g. Follow me"
            />
          </div>

          <div className="form-group">
            <label>Icon</label>
            <select
              value={editedLink.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
              className="form-select"
            >
              {ICON_OPTIONS.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">
              <AiOutlineCheck /> Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              <AiOutlineClose /> Cancel
            </button>
            <button onClick={() => onDelete(index)} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="linktree-button"
      title={link.title}
    >
      <div className="button-content">
        <IconComponent className="button-icon" />
        <div className="button-text">
          <div className="button-title">{link.title}</div>
          <div className="button-label">{link.label}</div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleStartEdit();
        }}
        className="button-edit"
        title="Edit link"
      >
        <AiOutlineEdit />
      </button>
    </a>
  );
};

export default LinktreeButton;
