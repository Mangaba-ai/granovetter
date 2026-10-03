import React from 'react';
import styles from './Dashboard.module.css';

interface DashboardSection {
  id: string;
  title: string;
  content: React.ReactNode;
  colspan?: 1 | 2;
  rowspan?: 1 | 2;
}

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dashboard title */
  title?: string;
  /** Dashboard description */
  description?: string;
  /** Dashboard sections/cards */
  sections: DashboardSection[];
  /** Grid columns */
  columns?: number;
}

const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({
    title,
    description,
    sections,
    columns = 3,
    className = '',
    ...props
  }, ref) => {
    const dashboardClasses = [
      styles.dashboard,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={dashboardClasses}
        {...props}
      >
        {/* Header */}
        {(title || description) && (
          <div className={styles.header}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {/* Grid */}
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className={styles.section}
              style={{
                gridColumn: `span ${section.colspan ?? 1}`,
                gridRow: `span ${section.rowspan ?? 1}`,
              }}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>
              <div className={styles.sectionContent}>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Dashboard.displayName = 'Dashboard';

export default Dashboard;
