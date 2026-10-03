import React from 'react';
import styles from './Header.module.css';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface UserMenuProps {
  name: string;
  email: string;
  avatar?: string;
  onLogout?: () => void;
}

interface HeaderProps extends React.HTMLAttributes<HTMLHeaderElement> {
  /** App logo */
  logo?: React.ReactNode;
  /** Navigation links */
  navLinks?: NavLink[];
  /** User menu config */
  userMenu?: UserMenuProps;
  /** Active navigation link */
  activeNavLink?: string;
  /** Header variant */
  variant?: 'default' | 'compact';
}

const Header = React.forwardRef<HTMLHeaderElement, HeaderProps>(
  ({
    logo,
    navLinks = [],
    userMenu,
    activeNavLink,
    variant = 'default',
    className = '',
    ...props
  }, ref) => {
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const headerClasses = [
      styles.header,
      styles[`variant-${variant}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <header
        ref={ref}
        className={headerClasses}
        {...props}
      >
        <div className={styles.container}>
          {/* Logo */}
          {logo && (
            <div className={styles.logo}>
              {logo}
            </div>
          )}

          {/* Navigation */}
          {navLinks.length > 0 && (
            <nav className={styles.nav} aria-label="Main navigation">
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={[
                        styles.navLink,
                        activeNavLink === link.href && styles.active,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={activeNavLink === link.href ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* User Menu */}
          {userMenu && (
            <div className={styles.userMenuContainer}>
              <button
                className={styles.userMenuButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                {userMenu.avatar && (
                  <img
                    src={userMenu.avatar}
                    alt={userMenu.name}
                    className={styles.avatar}
                  />
                )}
                {!userMenu.avatar && (
                  <div className={styles.avatarPlaceholder}>
                    {userMenu.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className={styles.userName}>{userMenu.name}</span>
              </button>

              {userMenuOpen && (
                <div className={styles.dropdown} role="menu">
                  <div className={styles.userInfo} role="presentation">
                    <p className={styles.userEmail}>{userMenu.email}</p>
                  </div>
                  <hr className={styles.divider} role="separator" />
                  {userMenu.onLogout && (
                    <button
                      className={styles.logoutButton}
                      onClick={() => {
                        userMenu.onLogout?.();
                        setUserMenuOpen(false);
                      }}
                      role="menuitem"
                    >
                      Sair
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
