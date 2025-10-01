import React from 'react';

// Import all SVG icons
import BuildingIcon from '../../assets/icon/building.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';
import ChartHistogramIcon from '../../assets/icon/chart-histogram.svg';
import CheckboxIcon from '../../assets/icon/checkbox.svg';
import GraduationCapIcon from '../../assets/icon/graduation-cap.svg';
import NewspaperIcon from '../../assets/icon/newspaper.svg';
import SettingsIcon from '../../assets/icon/settings.svg';
import TriangleWarningIcon from '../../assets/icon/triangle-warning.svg';
import TrophCapIcon from '../../assets/icon/troph-cap.svg';
import UserAddIcon from '../../assets/icon/user-add.svg';
import UsersAltIcon from '../../assets/icon/users-alt.svg';
import UsersIcon from '../../assets/icon/users.svg';
import Notification  from '../../assets/icon/envelope-dot.svg';

interface IconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, string> = {
  'chart-histogram': ChartHistogramIcon,
  'checkbox': CheckboxIcon,
  'graduation-cap': GraduationCapIcon,
  'users': UsersIcon,
  'users-alt': UsersAltIcon,
  'user-add': UserAddIcon,
  'triangle-warning': TriangleWarningIcon,
  'building': BuildingIcon,
  'calendar': CalendarIcon,
  'newspaper': NewspaperIcon,
  'settings': SettingsIcon,
  'troph-cap': TrophCapIcon,
  'envelope-dot': Notification,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'h-4 w-4' }) => {
  const iconSrc = iconMap[name];
  
  if (!iconSrc) {
    return null;
  }

  return (
    <img 
      src={iconSrc} 
      alt={name} 
      className={`${className} dark:brightness-125 dark:contrast-125`}
      style={{ 
        filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(97%) contrast(97%)'
      }}
    />
  );
};