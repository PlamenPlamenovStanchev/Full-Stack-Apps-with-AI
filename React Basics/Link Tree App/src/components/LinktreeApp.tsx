import React, { useState, useEffect } from 'react';
import LinktreeProfileAvatar from './LinktreeProfileAvatar';
import LinktreeButton from './LinktreeButton';
import type { Link, IconName } from './LinktreeButton';
import { AiOutlinePlus } from 'react-icons/ai';
import './LinktreeApp.css';

interface Profile {
  name: string;
  bio: string;
  picture: string;
}

const DEFAULT_PROFILE: Profile = {
  name: 'John Doe',
  bio: 'Sharing all my important links in one place 🎯',
  picture: 'https://i.pravatar.cc/150?img=1',
};

const DEFAULT_LINKS: Link[] = [
  {
    url: 'https://instagram.com',
    title: 'Instagram',
    label: 'Follow me',
    icon: 'instagram' as IconName,
  },
  {
    url: 'https://youtube.com',
    title: 'YouTube',
    label: 'Subscribe',
    icon: 'youtube' as IconName,
  },
  {
    url: 'https://twitter.com',
    title: 'X / Twitter',
    label: 'Tweet with me',
    icon: 'twitter' as IconName,
  },
];

const LinktreeApp: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [links, setLinks] = useState<Link[]>(DEFAULT_LINKS);
  const [hydrated, setHydrated] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('linktree_profile');
    const savedLinks = localStorage.getItem('linktree_links');

    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile) as Profile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }

    if (savedLinks) {
      try {
        setLinks(JSON.parse(savedLinks) as Link[]);
      } catch (error) {
        console.error('Error parsing saved links:', error);
      }
    }

    setHydrated(true);
  }, []);

  // Save profile to localStorage
  const handleProfileUpdate = (updatedProfile: Profile): void => {
    setProfile(updatedProfile);
    localStorage.setItem('linktree_profile', JSON.stringify(updatedProfile));
  };

  // Update link
  const handleUpdateLink = (index: number, updatedLink: Link): void => {
    const updatedLinks = [...links];
    updatedLinks[index] = updatedLink;
    setLinks(updatedLinks);
    localStorage.setItem('linktree_links', JSON.stringify(updatedLinks));
  };

  // Delete link
  const handleDeleteLink = (index: number): void => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      const updatedLinks = links.filter((_, i) => i !== index);
      setLinks(updatedLinks);
      localStorage.setItem('linktree_links', JSON.stringify(updatedLinks));
    }
  };

  // Add new link
  const handleAddLink = (): void => {
    const newLink: Link = {
      url: 'https://example.com',
      title: 'New Link',
      label: 'Click here',
      icon: 'link' as IconName,
    };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    localStorage.setItem('linktree_links', JSON.stringify(updatedLinks));
  };

  // Reset to defaults
  const handleReset = (): void => {
    if (window.confirm('This will reset all data to defaults. Are you sure?')) {
      setProfile(DEFAULT_PROFILE);
      setLinks(DEFAULT_LINKS);
      localStorage.setItem('linktree_profile', JSON.stringify(DEFAULT_PROFILE));
      localStorage.setItem('linktree_links', JSON.stringify(DEFAULT_LINKS));
    }
  };

  if (!hydrated) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="linktree-app">
      {/* Gradient Background */}
      <div className="gradient-bg"></div>

      {/* Main Container */}
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>LinkTree</h1>
          <p>Share all your links in one place</p>
        </header>

        {/* Profile Section */}
        <section className="profile-section">
          <LinktreeProfileAvatar
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
        </section>

        {/* Links Section */}
        <section className="links-section">
          <h2>My Links</h2>
          <div className="links-list">
            {links.map((link, index) => (
              <LinktreeButton
                key={index}
                link={link}
                index={index}
                onUpdate={handleUpdateLink}
                onDelete={handleDeleteLink}
              />
            ))}
          </div>

          {/* Add Link Button */}
          <button onClick={handleAddLink} className="btn-add-link">
            <AiOutlinePlus /> Add Link
          </button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <button onClick={handleReset} className="btn-reset">
            Reset to Defaults
          </button>
          <p className="info-text">
            💾 All changes are automatically saved to your browser
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LinktreeApp;
