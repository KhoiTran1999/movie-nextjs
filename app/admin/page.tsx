import Dashboard from '@/components/adminPage/content/Dashboard/Dashboard';
import { CategoryType, StatisticType } from '@/types';

interface featureType {
  CinemaFilm: string;
  StandaloneFilm: string;
  TVSeries: string;
}

export default async function page() {
  let statisticsData: StatisticType;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Admin/Statistics`, {
      cache: 'no-store',
    });
    statisticsData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch Statistics');
  }

  let categoryData: CategoryType;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Admin/Categories`, {
      cache: 'no-store',
    });
    categoryData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch Statistics');
  }

  let featureData: featureType;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Admin/Features`, {
      cache: 'no-store',
    });
    featureData = await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch Statistics');
  }

  return (
    <Dashboard
      statisticsData={statisticsData}
      categoryData={categoryData}
      featureData={featureData}
    />
  );
}
