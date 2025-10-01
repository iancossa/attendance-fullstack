import React from 'react';
import { Badge } from '../ui/badge';
import { Award, Star, Zap, Target, Calendar, TrendingUp } from 'lucide-react';
import type { Achievement, StudentAchievement } from '../../types/api';

interface AchievementBadgeProps {
  achievement: Achievement;
  studentAchievement?: StudentAchievement;
  earned?: boolean;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  studentAchievement,
  earned = false,
  showProgress = false,
  size = 'md'
}) => {
  const isEarned = earned || studentAchievement?.is_earned || false;
  const progress = studentAchievement?.progress || 0;
  const target = achievement.requirement_value || 100;
  const progressPercentage = Math.min((progress / target) * 100, 100);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'attendance':
        return <Calendar className="h-4 w-4" />;
      case 'punctuality':
        return <Zap className="h-4 w-4" />;
      case 'consistency':
        return <TrendingUp className="h-4 w-4" />;
      case 'improvement':
        return <Target className="h-4 w-4" />;
      case 'special':
        return <Star className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'attendance':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'punctuality':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'consistency':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'improvement':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'special':
        return 'text-pink-600 bg-pink-100 dark:bg-pink-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div 
      className={`
        relative rounded-lg border transition-all duration-200 hover:shadow-md
        ${isEarned 
          ? `${getCategoryColor(achievement.category)} border-current shadow-sm` 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
        }
        ${sizeClasses[size]}
      `}
    >
      {/* Achievement Icon */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1 rounded ${isEarned ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
          {achievement.icon ? (
            <span className={iconSizes[size]}>{achievement.icon}</span>
          ) : (
            <div className={iconSizes[size]}>
              {getCategoryIcon(achievement.category)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {achievement.name}
          </h4>
          <Badge 
            variant="outline" 
            className={`text-xs ${isEarned ? 'border-current' : 'border-gray-300'}`}
          >
            {achievement.category}
          </Badge>
        </div>
        
        {isEarned && (
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            <span className="text-xs font-bold">+{achievement.points_reward}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {achievement.description && (
        <p className={`text-xs opacity-80 mb-2 ${size === 'sm' ? 'line-clamp-1' : 'line-clamp-2'}`}>
          {achievement.description}
        </p>
      )}

      {/* Progress Bar */}
      {showProgress && !isEarned && studentAchievement && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{progress}/{target}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-current h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Earned Badge */}
      {isEarned && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-yellow-400 text-yellow-900 rounded-full p-1">
            <Award className="h-3 w-3" />
          </div>
        </div>
      )}

      {/* Earned Date */}
      {isEarned && studentAchievement?.earned_at && (
        <div className="mt-2 text-xs opacity-70">
          Earned: {new Date(studentAchievement.earned_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

// Achievement Grid Component
interface AchievementGridProps {
  achievements: Achievement[];
  studentAchievements?: StudentAchievement[];
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievements,
  studentAchievements = [],
  showProgress = true,
  size = 'md'
}) => {
  const gridCols = {
    sm: 'grid-cols-2 md:grid-cols-4',
    md: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    lg: 'grid-cols-1 md:grid-cols-2'
  };

  return (
    <div className={`grid gap-4 ${gridCols[size]}`}>
      {achievements.map((achievement) => {
        const studentAchievement = studentAchievements.find(
          sa => sa.achievement_id === achievement.id
        );
        
        return (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            studentAchievement={studentAchievement}
            showProgress={showProgress}
            size={size}
          />
        );
      })}
    </div>
  );
};