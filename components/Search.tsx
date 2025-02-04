import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useSearchParams } from 'next/navigation';
import { getFilesApi } from '@/lib/services/fileServices';
import Thumbnail from './Thumbnail';
import FormatedDateTime from './FormatedDateTime';
import { formatDateTime } from '@/lib/utils';
import useDebounce from '@/lib/hooks/useDebounce';
import Link from 'next/link';

const Search = () => {

  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [results, setResults] = useState<FileState[]>([]);
  const [open, setOpen] = useState(false);

  const debounceSearch = useDebounce(query)

  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal

    if (!query) {
      setOpen(false);
      return;
    }

    const fetchFiles = async () => {
      try {

        const data = await getFilesApi({ query: query });

        setResults(data.data?.files);
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFiles();

  }, [debounceSearch]);



  useEffect(() => {
    if (!searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);


  return (
    <div className='search'>

      <div className='search-input-wrapper'>
        <Image src={'/assets/icons/search.svg'} alt='search' width={24} height={24} />
        <Input value={query} placeholder='Search...' className='search-input' onChange={(e) => setQuery(e.target.value)} />

        {
          open && (
            <ul className="search-result max-h-[500px] overflow-y-auto">
              {
                results.length > 0 ? (
                  results.map((file, index) => (
                    <li key={index} >
                      <Link href={file.url} target='_blank' className='flex items-center justify-between ' >
                        <div className='flex cursor-pointer items-center gap-4 mb-2'>
                          <Thumbnail type={file.type} extension={file.extension} url={file.url} />
                          <p className="subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
                        </div>
                        <p className='body-1 text-light-200 text-xs' >
                          {formatDateTime(file.createdAt)}
                        </p>
                     </Link>
                    </li>
                  ))
                ) : (
                  <p className='empty-results'>No Files...</p>
                )
              }
            </ul>
          )
        }
      </div>

    </div>
  );
};

export default Search;
