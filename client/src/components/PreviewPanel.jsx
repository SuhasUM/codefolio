import { usePortfolio } from '../context/PortfolioContext';
import TemplateMinimalist from './templates/TemplateMinimalist';
import TemplateDarkMode from './templates/TemplateDarkMode';
import TemplateTerminal from './templates/TemplateTerminal';
import TemplateGradient from './templates/TemplateGradient';

export default function PreviewPanel({ username }) {
  const { portfolioData } = usePortfolio();

  function renderTemplate() {
    const props = { data: portfolioData, username, isPreview: true };
    switch (portfolioData.theme_id) {
      case 'dark-mode': return <TemplateDarkMode {...props} />;
      case 'terminal': return <TemplateTerminal {...props} />;
      case 'gradient': return <TemplateGradient {...props} />;
      default: return <TemplateMinimalist {...props} />;
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Preview header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-300 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded text-xs text-gray-500 px-3 py-1 text-center truncate">
          {window.location.origin}/{username}
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-y-auto">
        {renderTemplate()}
      </div>
    </div>
  );
}
