import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import type { LeaderboardEntry, LeaderboardScope, LeaderboardPeriod } from '../../types/api';

interface LeaderboardWidgetProps {
  scope: LeaderboardScope;
  period: LeaderboardPeriod;
  classId?: number;
  departmentId?: number;
  limit?: number;
}

export const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({
  scope,
  period,
  classId,
  departmentId,
  limit = 10
}) => {
  const params = new URLSearchParams({
    scope,
    period,
    limit: limit.toString(),
  });

  if (classId) params.append('classId', classId.toString());
  if (departmentId) params.append('departmentId', departmentId.toString());

  const { data: leaderboard, loading, error } = useApi<LeaderboardEntry[]>(
    `/gamification/leaderboard?${params.toString()}`
  );

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-gray-500">#{position}</span>;
    }
  };

  const getRankBadge = (position: number) => {
    if (position <= 3) {
      const colors = {
        1: 'bg-yellow-100 text-yellow-800',
        2: 'bg-gray-100 text-gray-800',
        3: 'bg-amber-100 text-amber-800'
      };
      return <Badge className={colors[position as keyof typeof colors]}>#{position}</Badge>;
    }
    return <Badge variant="outline">#{position}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Failed to load leaderboard</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="capitalize">{period}</span>
            <span>•</span>
            <span className="capitalize">{scope}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard && leaderboard.length > 0 ? (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  entry.rank_position <= 3 
                    ? 'bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {getRankIcon(entry.rank_position)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Student #{entry.student_id}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{entry.total_points} pts</span>
                    <span>{entry.attendance_rate}% attendance</span>
                    <span>{entry.streak_days} day streak</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getRankBadge(entry.rank_position)}
                  <Badge variant="outline" className="text-xs">
                    {entry.achievements_count} 🏆
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">No leaderboard data</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Start attending classes to see rankings
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};