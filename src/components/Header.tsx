'use client';
import { useEffect, useState } from 'react';
import { fetchNavigation, fetchNavigationItems } from '@/services/api';
import Link from 'next/link';

interface NavItem {
  id: number;
  label?: string;
  url?: string;
  isDropdown?: boolean;
  order?: number;
}

interface DropdownItem {
  id: number;
  label: string;
  url: string;
  parentMenu: string;
  order: number;
}

export default function Header() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [dropdownItems, setDropdownItems] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNav = async () => {
      try {
        const navData = await fetchNavigation();
        const dropdownData = await fetchNavigationItems();
        
        console.log('Nav Items:', navData);
        console.log('Dropdown Items:', dropdownData);
        
        if (Array.isArray(navData)) {
          const sorted = navData.sort((a, b) => (a.order || 0) - (b.order || 0));
          setNavItems(sorted);
        }
        
        if (Array.isArray(dropdownData)) {
          setDropdownItems(dropdownData);
        }
      } catch (error) {
        console.error('Error loading navigation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNav();
  }, []);

  if (loading) return <div>Loading...</div>;

  const getDropdownItems = (label: string) => {
    const items = dropdownItems.filter(item => item.parentMenu === label);
    console.log(`Dropdown items for "${label}":`, items);
    return items.sort((a, b) => a.order - b.order);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Trinity AI
        </Link>

        <nav className="flex gap-8">
          {navItems.map((item) => {
            const label = item.label || '';
            const url = item.url || '/';
            const isDropdown = item.isDropdown === true;
            
            const dropdownList = isDropdown ? getDropdownItems(label) : [];
            
            console.log(`${label}: isDropdown=${isDropdown}, items=${dropdownList.length}`);

            return (
              <div key={item.id} className="relative group">
                <Link
                  href={url}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {label}
                </Link>

                {isDropdown && dropdownList.length > 0 && (
                  <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border border-gray-200 z-10">
                    {dropdownList.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.url}
                        className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}