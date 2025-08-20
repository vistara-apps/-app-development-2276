import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

/**
 * Breadcrumbs component for navigation context
 * 
 * @param {Object} props - Component props
 * @param {Array} [props.items] - Custom breadcrumb items (optional)
 * @param {string} [props.className] - Additional CSS classes
 */
const Breadcrumbs = ({ items, className }) => {
  const location = useLocation();
  
  // If no custom items are provided, generate from the current path
  const breadcrumbs = items || generateBreadcrumbs(location.pathname);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav aria-label="Breadcrumb" className={clsx('mb-4', className)}>
      <ol className="flex items-center space-x-1 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 h-4 w-4 text-textSecondary" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span className="font-medium text-textPrimary" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="text-textSecondary hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Generate breadcrumbs from a URL path
 * 
 * @param {string} path - URL path
 * @returns {Array} Array of breadcrumb objects with path and label
 */
const generateBreadcrumbs = (path) => {
  const pathSegments = path.split('/').filter(Boolean);
  
  // Always include home
  const breadcrumbs = [{ path: '/', label: 'Dashboard' }];
  
  // Build up breadcrumbs from path segments
  let currentPath = '';
  
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Format the label (capitalize, replace hyphens with spaces)
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({ path: currentPath, label });
  });
  
  return breadcrumbs;
};

export default Breadcrumbs;

