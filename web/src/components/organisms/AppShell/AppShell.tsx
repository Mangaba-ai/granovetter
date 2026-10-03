import React from 'react';
import styles from './AppShell.module.css';

export interface AppShellNavItem {
  label: string;
  href: string;
  /** Ícone curto (emoji, SVG ou glifo) */
  icon?: React.ReactNode;
  active?: boolean;
  /** Contador ao lado do item */
  badge?: string | number;
}

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: React.ReactNode;
  nav: AppShellNavItem[];
  /** Seção secundária do menu (ex.: configurações) */
  footerNav?: AppShellNavItem[];
  user?: { name: string; role?: string };
  /** Indicador no rodapé do menu (ex.: "Motor online") */
  systemStatus?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  /** Ações à direita da barra de comando */
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

function NavList({ items, label }: { items: AppShellNavItem[]; label: string }) {
  return (
    <ul className={styles.navList} aria-label={label}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className={[styles.navItem, item.active && styles.active].filter(Boolean).join(' ')}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.icon && <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>}
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge !== undefined && <span className={styles.navBadge}>{item.badge}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    { brand, nav, footerNav, user, systemStatus, searchPlaceholder = 'Buscar decisão, grupo ou cenário…', onSearch, toolbar, children, className = '', ...props },
    ref
  ) => {
    const [query, setQuery] = React.useState('');
    const searchId = React.useId();

    return (
      <div ref={ref} className={[styles.shell, className].filter(Boolean).join(' ')} {...props}>
        <a href="#conteudo-principal" className={styles.skip}>Pular para o conteúdo</a>

        <aside className={styles.sidebar}>
          <div className={styles.brand}>{brand}</div>
          <nav className={styles.nav} aria-label="Navegação principal">
            <NavList items={nav} label="Seções" />
            {footerNav && footerNav.length > 0 && (
              <>
                <div className={styles.navDivider} role="presentation" />
                <NavList items={footerNav} label="Sistema" />
              </>
            )}
          </nav>
          {(systemStatus || user) && (
            <div className={styles.sidebarFooter}>
              {systemStatus && (
                <p className={styles.systemStatus}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {systemStatus}
                </p>
              )}
              {user && (
                <div className={styles.user}>
                  <span className={styles.avatar} aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>
                  <span className={styles.userText}>
                    <span className={styles.userName}>{user.name}</span>
                    {user.role && <span className={styles.userRole}>{user.role}</span>}
                  </span>
                </div>
              )}
            </div>
          )}
        </aside>

        <div className={styles.main}>
          <div className={styles.commandBar} role="search">
            <label htmlFor={searchId} className={styles.srOnly}>Buscar</label>
            <div className={styles.search}>
              <span className={styles.searchIcon} aria-hidden="true">⌕</span>
              <input
                id={searchId}
                type="search"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') onSearch?.(query); }}
              />
              <kbd className={styles.kbd} aria-hidden="true">⌘K</kbd>
            </div>
            {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
          </div>
          <main id="conteudo-principal" className={styles.content} tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';

export default AppShell;
