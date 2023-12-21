import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { notFound } from 'next/navigation';

interface LocationData {
  [index: number]: string | number | undefined;
}

export const getLocationHit = async (
  linkId?: string
): Promise<LocationData[]> => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const link = linkId
    ? await prismadb.link.findUnique({
        where: {
          id: linkId
        }
      })
    : undefined;

  if (linkId && !link) {
    notFound();
  }

  const logs = await prismadb.log.groupBy({
    by: ['countryCode'],
    where: {
      ...(linkId ? { linkKeyword: link?.keyword } : {}),
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
  });

  if (logs.length < 1) {
    return [['Country', 'Hits']];
  }

  const regionName = new Intl.DisplayNames(['en'], { type: 'region' });

  // Convert logs to a list of arrays
  const resultList = [...logs].map((item) => {
    if (item.countryCode === 'Unknown') {
      return [item.countryCode, item._count._all];
    }
    return [regionName.of(item.countryCode), item._count._all];
  });

  const locationData: LocationData[] = [['Country', 'Hit'], ...resultList];

  return locationData;
};
