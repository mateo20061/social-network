import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ProfileFilterItemProps {
  filterName: string | undefined;
  displayText: string;
}

const ProfileFilterItem = ({
  filterName,
  displayText,
}: ProfileFilterItemProps) => {
  const router = useRouter();
  const selectedFilter = router.query?.filter as string | undefined;
  const basePath = router.asPath.split('?')[0]!;

  const href = filterName ? `${basePath}?filter=${filterName}` : `${basePath}`;

  return (
    <Link href={href} shallow scroll={false} replace>
      <a
        className={clsx(
          'block p-5 hover:text-primary-700 relative w-1/3 text-center',
          selectedFilter === filterName && '!text-blue-500'
        )}
      >
        {displayText}
      </a>
    </Link>
  );
};

export default ProfileFilterItem;
