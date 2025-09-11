export interface ReportData {
  id: string;
  type: string;
  class: string;
  period: string;
  attendance: number;
  students: number;
  generated: string;
  status: 'Generated' | 'Processing' | 'Failed';
}

export const MOCK_REPORTS: ReportData[] = [
  {
    id: '1',
    type: 'Weekly Report',
    class: '303105221 - Digital Electronics Laboratory',
    period: 'Jan 8-14, 2024',
    attendance: 84.2,
    students: 16,
    generated: '2024-01-15',
    status: 'Generated'
  },
  {
    id: '2',
    type: 'Monthly Report',
    class: '303191202 - Discrete Mathematics',
    period: 'December 2023',
    attendance: 87.8,
    students: 12,
    generated: '2024-01-01',
    status: 'Generated'
  },
  {
    id: '3',
    type: 'Semester Report',
    class: '303201301 - Data Structures and Algorithms',
    period: 'Fall 2023',
    attendance: 89.5,
    students: 8,
    generated: '2024-01-10',
    status: 'Processing'
  },
  {
    id: '4',
    type: 'Weekly Report',
    class: '303105222 - Microprocessor Systems',
    period: 'Jan 1-7, 2024',
    attendance: 86.3,
    students: 6,
    generated: '2024-01-08',
    status: 'Generated'
  },
  {
    id: '5',
    type: 'Monthly Report',
    class: '303191203 - Linear Algebra',
    period: 'December 2023',
    attendance: 91.0,
    students: 4,
    generated: '2024-01-05',
    status: 'Generated'
  },
  {
    id: '6',
    type: 'Weekly Report',
    class: '303201302 - Database Management Systems',
    period: 'Jan 8-14, 2024',
    attendance: 85.7,
    students: 4,
    generated: '2024-01-15',
    status: 'Generated'
  },
  {
    id: '7',
    type: 'Semester Report',
    class: '303105223 - Communication Systems',
    period: 'Fall 2023',
    attendance: 88.5,
    students: 4,
    generated: '2024-01-12',
    status: 'Processing'
  }
];