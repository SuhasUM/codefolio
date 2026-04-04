import { createContext, useContext, useState, useCallback } from 'react';

const PortfolioContext = createContext(null);

export const defaultPortfolioData = {
  theme_id: 'minimalist',
  personal_info: {
    name: '',
    headline: '',
    bio: '',
    profile_image_url: '',
    resume_link: '',
    location: ''
  },
  social_links: {
    github: '',
    linkedin: '',
    twitter: '',
    personal_blog: ''
  },
  skills: [],
  projects: []
};

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | 'error' | null

  const updateField = useCallback((section, field, value) => {
    setPortfolioData(prev => {
      if (section === 'root') {
        return { ...prev, [field]: value };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value }
      };
    });
  }, []);

  const updateProjects = useCallback((projects) => {
    setPortfolioData(prev => ({ ...prev, projects }));
  }, []);

  const loadPortfolioData = useCallback((portfolio, projects) => {
    setPortfolioData({
      theme_id: portfolio.theme_id || 'minimalist',
      personal_info: portfolio.personal_info || defaultPortfolioData.personal_info,
      social_links: portfolio.social_links || defaultPortfolioData.social_links,
      skills: portfolio.skills || [],
      projects: projects || []
    });
  }, []);

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      setPortfolioData,
      updateField,
      updateProjects,
      loadPortfolioData,
      saving,
      setSaving,
      saveStatus,
      setSaveStatus
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
