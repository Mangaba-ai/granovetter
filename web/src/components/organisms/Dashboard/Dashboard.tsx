import React from 'react';
import styles from './Dashboard.module.css';

export type BentoSize = 'sm' | 'md' | 'wide' | 'tall' | 'hero';
export type BentoAccent = 'aurora' | 'cyan' | 'violet' | 'magenta' | 'lime' | 'amber';

export interface DashboardSection {
  id: string;
  title: string;
  /** Rótulo curto acima do título (ex.: "Módulo 02") */
  kicker?: string;
  content: React.ReactNode;
  /** Tamanho do bloco no grid bento */
  size?: BentoSize;
  /** Cor do brilho do bloco */
  accent?: BentoAccent;
  /** Compatibilidade com a API anterior */
  colspan?: 1 | 2;
  rowspan?: 1 | 2;
}

export interface DashboardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  /** Texto de status ao lado do título (ex.: "Simulação ao vivo") */
  status?: string;
  /** Ações no canto do cabeçalho (botões) */
  actions?: React.ReactNode;
  sections: DashboardSection[];
}

function sizeOf(s: DashboardSection): BentoSize {
  if (s.size) return s.size;
  if (s.colspan === 2 && s.rowspan === 2) return 'hero';
  if (s.colspan === 2) return 'wide';
  if (s.rowspan === 2) return 'tall';
  return 'md';
}

const Dashboard = React.forwardRef<HTMLElement, DashboardProps>(
  ({ title, description, status, actions, sections, className = '', ...props }, ref) => (
    <section ref={ref} className={[styles.dashboard, className].filter(Boolean).join(' ')} {...props}>
      {(title || description || actions) && (
        <header className={styles.header}>
          <div className={styles.heading}>
            {status && (
              <span className={styles.status}>
                <span className={styles.pulse} aria-hidden="true" />
                {status}
              </span>
            )}
            {title && <h1 className={styles.title}>{title}</h1>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}

      <div className={styles.bento}>
        {sections.map((section) => {
          const size = sizeOf(section);
          const headingId = `${section.id}-title`;
          return (
            <article
              key={section.id}
              className={[styles.tile, styles[`size-${size}`], styles[`accent-${section.accent ?? 'aurora'}`]].join(' ')}
              aria-labelledby={headingId}
            >
              <div className={styles.tileHeader}>
                {section.kicker && <span className={styles.kicker}>{section.kicker}</span>}
                <h2 id={headingId} className={styles.tileTitle}>{section.title}</h2>
              </div>
              <div className={styles.tileContent}>{section.content}</div>
            </article>
          );
        })}
      </div>
    </section>
  )
);

Dashboard.displayName = 'Dashboard';

export default Dashboard;
