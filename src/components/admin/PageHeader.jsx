import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === 'string') {
      return <span className="text-purple-400 mt-1 text-sm">{breadcrumb}</span>;
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <div className="flex items-center space-x-2 mt-1 text-sm text-purple-500">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <span>{item}</span>
              {index < breadcrumb.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 rounded-2xl shadow border border-purple-200">
      <div className="flex flex-col mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-purple-800 tracking-tight">{title || 'Page Title'}</h1>
        {renderBreadcrumb()}
      </div>
      <div>{children}</div>
    </div>
  );
}
