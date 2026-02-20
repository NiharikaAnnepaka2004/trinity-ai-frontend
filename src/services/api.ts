const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSolutions = async () => {
  const res = await fetch(`${API_URL}/solutions`);
  const data = await res.json();
  return data.data;
};

export const fetchServices = async () => {
  const res = await fetch(`${API_URL}/services`);
  const data = await res.json();
  return data.data;
};

export const fetchIndustries = async () => {
  const res = await fetch(`${API_URL}/industries`);
  const data = await res.json();
  return data.data;
};

export const fetchHeroSection = async () => {
  const res = await fetch(`${API_URL}/hero-sections`);
  const data = await res.json();
  return data.data;
};

export const fetchMission = async () => {
  const res = await fetch(`${API_URL}/missions`);
  const data = await res.json();
  return data.data;
};

export const fetchContact = async () => {
  const res = await fetch(`${API_URL}/contacts`);
  const data = await res.json();
  return data.data;
};

export const fetchFooter = async () => {
  const res = await fetch(`${API_URL}/footers?populate=links`);
  const data = await res.json();
  return data.data;
};

export const fetchNavigation = async () => {
  const res = await fetch(`${API_URL}/navigations`);
  const data = await res.json();
  return data.data;
};

export const fetchApproach = async () => {
  const res = await fetch(`${API_URL}/approaches`);
  const data = await res.json();
  return data.data;
};

export const fetchPartnership = async () => {
  const res = await fetch(`${API_URL}/partnerships?populate=logos`);
  const data = await res.json();
  return data.data;
};

export const fetchContactPage = async () => {
  const res = await fetch(`${API_URL}/contact-pages`);
  const data = await res.json();
  return data.data;
};

export const fetchNavigationItems = async () => {
  try {
    const res = await fetch(`${API_URL}/navigation-items`);
    if (!res.ok) throw new Error('Failed to fetch navigation items');
    const data = await res.json();
    console.log('API Response:', data);
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
};