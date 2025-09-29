-- Complete indexes from DATABASE.md

-- Report indexes
CREATE INDEX idx_reports_generated_by ON reports(generated_by);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_class_id ON reports(class_id);
CREATE INDEX idx_reports_department_id ON reports(department_id);
CREATE INDEX idx_reports_period ON reports(period_start, period_end);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_is_scheduled ON reports(is_scheduled);

-- Report template indexes
CREATE INDEX idx_report_templates_type ON report_templates(type);
CREATE INDEX idx_report_templates_category ON report_templates(category);
CREATE INDEX idx_report_templates_created_by ON report_templates(created_by);
CREATE INDEX idx_report_templates_is_public ON report_templates(is_public);

-- Report share indexes
CREATE INDEX idx_report_shares_report_id ON report_shares(report_id);
CREATE INDEX idx_report_shares_shared_by ON report_shares(shared_by);
CREATE INDEX idx_report_shares_shared_with ON report_shares(shared_with);
CREATE INDEX idx_report_shares_token ON report_shares(share_token);
CREATE INDEX idx_report_shares_expires_at ON report_shares(expires_at);

-- Student points indexes
CREATE INDEX idx_student_points_student_id ON student_points(student_id);
CREATE INDEX idx_student_points_class_id ON student_points(class_id);
CREATE INDEX idx_student_points_type ON student_points(point_type);
CREATE INDEX idx_student_points_created_at ON student_points(created_at);

-- Achievement indexes
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_is_active ON achievements(is_active);

-- Student achievement indexes
CREATE INDEX idx_student_achievements_student_id ON student_achievements(student_id);
CREATE INDEX idx_student_achievements_achievement_id ON student_achievements(achievement_id);
CREATE INDEX idx_student_achievements_is_earned ON student_achievements(is_earned);
CREATE INDEX idx_student_achievements_earned_at ON student_achievements(earned_at);

-- Streak indexes
CREATE INDEX idx_student_streaks_student_id ON student_streaks(student_id);
CREATE INDEX idx_student_streaks_class_id ON student_streaks(class_id);
CREATE INDEX idx_student_streaks_current_streak ON student_streaks(current_streak);
CREATE INDEX idx_student_streaks_longest_streak ON student_streaks(longest_streak);

-- Leaderboard indexes
CREATE INDEX idx_leaderboard_student_id ON leaderboard_rankings(student_id);
CREATE INDEX idx_leaderboard_period_scope ON leaderboard_rankings(period, scope);
CREATE INDEX idx_leaderboard_rank_position ON leaderboard_rankings(rank_position);
CREATE INDEX idx_leaderboard_period_dates ON leaderboard_rankings(period_start, period_end);
CREATE INDEX idx_leaderboard_total_points ON leaderboard_rankings(total_points);
CREATE INDEX idx_leaderboard_attendance_rate ON leaderboard_rankings(attendance_rate);

-- Message indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_type ON messages(message_type);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_priority ON messages(priority);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_read_at ON messages(read_at);

-- Message recipient indexes
CREATE INDEX idx_message_recipients_message_id ON message_recipients(message_id);
CREATE INDEX idx_message_recipients_recipient_id ON message_recipients(recipient_id);
CREATE INDEX idx_message_recipients_status ON message_recipients(status);
CREATE INDEX idx_message_recipients_created_at ON message_recipients(created_at);

-- Missing indexes from earlier tables
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_priority ON notifications(priority);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

CREATE INDEX idx_absence_justifications_student_id ON absence_justifications(student_id);
CREATE INDEX idx_absence_justifications_class_id ON absence_justifications(class_id);
CREATE INDEX idx_absence_justifications_status ON absence_justifications(status);
CREATE INDEX idx_absence_justifications_reason ON absence_justifications(reason);
CREATE INDEX idx_absence_justifications_submitted_at ON absence_justifications(submitted_at);