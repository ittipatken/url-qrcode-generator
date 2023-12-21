import { auth } from '@/auth';
import { Link } from '@prisma/client';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface StatisticData {
  totalLinks: number;
  totalHits: number;
  topLink: Link | null;
  topCountry: string | undefined;
}

export const getStatistic = async (): Promise<StatisticData> => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const [totalLinks, totalHits, topLink, country] = await prismadb.$transaction(
    [
      prismadb.link.count({
        where: {
          userId: session?.user?.id
        }
      }),
      prismadb.log.count({
        where: {
          link: {
            userId: session?.user?.id
          }
        }
      }),
      prismadb.link.findFirst({
        where: {
          userId: session?.user?.id
        },
        orderBy: {
          click: 'desc'
        }
      }),
      prismadb.log.groupBy({
        take: 1,
        by: ['countryCode'],
        where: {
          link: {
            userId: session?.user?.id
          }
        },
        _count: {
          _all: true
        },
        orderBy: {
          _count: {
            countryCode: 'desc'
          }
        }
      })
    ]
  );

  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  const topCountry =
    country.length > 0 ? (country[0].countryCode === 'Unknown' ? 'N/A' : regionName.of(country[0].countryCode)) : 'N/A';


  return { totalLinks, totalHits, topLink, topCountry };
};
