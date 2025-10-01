import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/endpoints';
import type {
  StudentPoints,
  Achievement,
  StudentAchievement,
  StudentStreak,
  LeaderboardEntry,
  LeaderboardScope,
  LeaderboardPeriod,
  PointType,
} from '../types/api';

interface StudentRanking {
  student_id: number;
  rank_position: number;
  total_points: number;
  attendance_rate: number;
  streak_days: number;
  achievements_count: number;
}

interface AchievementProgress {
  achievement_id: number;
  progress: number;
  target: number;
  is_earned: boolean;
}

export const gamificationService = {
  // Points system
  async getStudentPoints(studentId: number): Promise<StudentPoints[]> {
    const response = await apiClient.get<StudentPoints[]>(API_ENDPOINTS.STUDENT_POINTS(studentId));
    return response.data;
  },

  async awardPoints(studentId: number, points: number, type: PointType, description?: string): Promise<void> {
    await apiClient.post(`${API_ENDPOINTS.STUDENT_POINTS(studentId)}/award`, {
      points,
      point_type: type,
      description,
    });
  },

  async getStudentTotalPoints(studentId: number): Promise<{ total: number; breakdown: Record<PointType, number> }> {
    const response = await apiClient.get<{ total: number; breakdown: Record<PointType, number> }>(
      `${API_ENDPOINTS.STUDENT_POINTS(studentId)}/total`
    );
    return response.data;
  },

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    const response = await apiClient.get<Achievement[]>(API_ENDPOINTS.ACHIEVEMENTS);
    return response.data;
  },

  async getStudentAchievements(studentId: number): Promise<StudentAchievement[]> {
    const response = await apiClient.get<StudentAchievement[]>(API_ENDPOINTS.STUDENT_ACHIEVEMENTS(studentId));
    return response.data;
  },

  async checkAchievementProgress(studentId: number): Promise<AchievementProgress[]> {
    const response = await apiClient.get<AchievementProgress[]>(
      `${API_ENDPOINTS.STUDENT_ACHIEVEMENTS(studentId)}/progress`
    );
    return response.data;
  },

  async earnAchievement(studentId: number, achievementId: number): Promise<StudentAchievement> {
    const response = await apiClient.post<StudentAchievement>(
      `${API_ENDPOINTS.STUDENT_ACHIEVEMENTS(studentId)}/earn`,
      { achievement_id: achievementId }
    );
    return response.data;
  },

  // Streaks
  async getStudentStreaks(studentId: number): Promise<StudentStreak[]> {
    const response = await apiClient.get<StudentStreak[]>(API_ENDPOINTS.STUDENT_STREAKS(studentId));
    return response.data;
  },

  async updateStreak(studentId: number, classId: number): Promise<StudentStreak> {
    const response = await apiClient.post<StudentStreak>(
      `${API_ENDPOINTS.STUDENT_STREAKS(studentId)}/update`,
      { class_id: classId }
    );
    return response.data;
  },

  async getClassStreakLeaders(classId: number, limit = 10): Promise<StudentStreak[]> {
    const response = await apiClient.get<StudentStreak[]>(
      `${API_ENDPOINTS.LEADERBOARD}/streaks?classId=${classId}&limit=${limit}`
    );
    return response.data;
  },

  // Leaderboards
  async getLeaderboard(
    scope: LeaderboardScope,
    period: LeaderboardPeriod,
    classId?: number,
    departmentId?: number,
    limit = 50
  ): Promise<LeaderboardEntry[]> {
    const params = new URLSearchParams({
      scope,
      period,
      limit: limit.toString(),
    });

    if (classId) params.append('classId', classId.toString());
    if (departmentId) params.append('departmentId', departmentId.toString());

    const response = await apiClient.get<LeaderboardEntry[]>(
      `${API_ENDPOINTS.LEADERBOARD}?${params.toString()}`
    );
    return response.data;
  },

  async getStudentRanking(studentId: number, scope: LeaderboardScope = 'global'): Promise<StudentRanking> {
    const response = await apiClient.get<StudentRanking>(
      `${API_ENDPOINTS.LEADERBOARD}/student/${studentId}?scope=${scope}`
    );
    return response.data;
  },

  // Analytics
  async getGamificationStats(studentId?: number): Promise<{
    totalPoints: number;
    achievementsEarned: number;
    currentStreak: number;
    longestStreak: number;
    rank: number;
  }> {
    const endpoint = studentId 
      ? `${API_ENDPOINTS.STUDENT_POINTS(studentId)}/stats`
      : '/gamification/stats';
    
    const response = await apiClient.get<{
      totalPoints: number;
      achievementsEarned: number;
      currentStreak: number;
      longestStreak: number;
      rank: number;
    }>(endpoint);
    return response.data;
  },
};